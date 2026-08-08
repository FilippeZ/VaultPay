const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// VaultPay Revolut-style Memory Storage & Mock Azure Services
const mockVaultSecrets = {
  'Visa-Mastercard-Partner-API-Key': { value: 'sk_live_visa_prod_908234a7b9c1d2e3f4a5b6c7d', updated: '2026-08-08T09:30:00Z', type: 'API Key' },
  'Crypto-Exchange-Liquidity-Secret': { value: '0x9F82A4B6C81D3E5F7A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E1F', updated: '2026-08-08T10:15:00Z', type: 'Secret Key' },
  'CardEncryptionKey-AES256-RSA': { value: 'rsa-key-fips140-2-l3-vaultpay-card-key-9012', updated: '2026-08-08T08:00:00Z', type: 'Crypto Key (HSM)' },
  'Entra-ID-FIDO2-Passkey-PubKey-User1': { value: 'pub_fido2_mfa_passkey_bound_device_9028', updated: '2026-08-07T14:20:00Z', type: 'FIDO2 Passkey' }
};

const mockAuditLogs = [
  { id: 'LOG-9105', type: 'AI_KYC_LIVENESS', status: 'SUCCESS', caller: 'Azure AI Document Intelligence', action: 'FaceVoiceBiometricLivenessVerify', target: 'UPN: maria.k@vaultpay.azure.net', timestamp: '10:45:12 AM' },
  { id: 'LOG-9104', type: 'FIDO2_PASSKEY_BOUND', status: 'SUCCESS', caller: 'Microsoft Entra ID', action: 'CreateUPN_BindFIDO2Passkey', target: 'KeyVault: Entra-ID-FIDO2-Passkey-PubKey-User1', timestamp: '10:45:15 AM' },
  { id: 'LOG-9103', type: 'CONDITIONAL_ACCESS', status: 'CHALLENGE_PASSED', caller: 'Entra ID Risk Engine', action: 'TravelerSign`RiskCheck (IP: Tokyo, Japan)', target: 'Passkey Signature Verified vs Key Vault', timestamp: '10:40:02 AM' },
  { id: 'LOG-9102', type: 'CARD_DECRYPTION', status: 'SUCCESS', caller: 'VaultPay Cards Module', action: 'InstantAESDecryption (Show Card Details)', target: 'Disposable Virtual Card ****4921', timestamp: '09:15:00 AM' },
  { id: 'LOG-9101', type: 'HYBRID_CLOUD_SYNC', status: 'SUCCESS', caller: 'Private Cloud Core DB Vault', action: 'SyncBalanceAudit', target: 'Private Cloud KYC Vault Subnet', timestamp: '08:30:45 AM' }
];

// Endpoint to download PDF report
app.get('/api/download-report', (req, res) => {
  const pdfPath = path.join(__dirname, 'VaultPay_Technical_Specification_Report.pdf');
  if (fs.existsSync(pdfPath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=VaultPay_Technical_Specification_Report.pdf');
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    res.status(404).json({ error: 'PDF report not found' });
  }
});

// Endpoint to view PDF in browser inline
app.get('/api/view-pdf', (req, res) => {
  const pdfPath = path.join(__dirname, 'VaultPay_Technical_Specification_Report.pdf');
  if (fs.existsSync(pdfPath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=VaultPay_Technical_Specification_Report.pdf');
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    res.status(404).send('PDF not found');
  }
});

// Key Vault Secrets API
app.get('/api/keyvault/secrets', (req, res) => {
  res.json({ vault: 'kv-vaultpay-prod-01.vault.azure.net', secrets: mockVaultSecrets });
});

app.get('/api/keyvault/secrets/:name', (req, res) => {
  const name = req.params.name;
  if (mockVaultSecrets[name]) {
    res.json({ name, ...mockVaultSecrets[name] });
  } else {
    res.status(404).json({ error: `Secret '${name}' not found in Key Vault kv-vaultpay-prod-01` });
  }
});

app.post('/api/keyvault/secrets', (req, res) => {
  const { name, value, type } = req.body;
  if (!name || !value) {
    return res.status(400).json({ error: 'Secret name and value are required' });
  }
  mockVaultSecrets[name] = {
    value,
    type: type || 'Secret Key',
    updated: new Date().toISOString()
  };
  mockAuditLogs.unshift({
    id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    type: 'KEYVAULT_WRITE',
    status: 'SUCCESS',
    caller: 'VaultPay App (Managed Identity)',
    action: 'SetSecret',
    target: name,
    timestamp: new Date().toLocaleTimeString()
  });
  res.json({ success: true, message: `Secret '${name}' successfully stored in Azure Key Vault`, name });
});

// Real-Time Conditional Access Traveler Assessment API
app.post('/api/auth/conditional-access', (req, res) => {
  const { location, deviceCompliant } = req.body;
  const isTraveler = location && location !== 'Greece';
  
  mockAuditLogs.unshift({
    id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    type: 'CONDITIONAL_ACCESS',
    status: isTraveler ? 'PASSKEY_CHALLENGE' : 'ALLOW_DIRECT',
    caller: 'Entra ID Conditional Access Risk Engine',
    action: `SignInAssessment (Location: ${location || 'Home IP'})`,
    target: isTraveler ? 'Required FIDO2 Passkey Signature Verification' : 'Low Risk Direct Sign-in',
    timestamp: new Date().toLocaleTimeString()
  });

  res.json({
    signInRisk: isTraveler ? 'MEDIUM_TRAVELER_UNUSUAL_LOCATION' : 'LOW',
    requirePasskeyChallenge: isTraveler,
    message: isTraveler ? 'Unusual traveler location detected. Biometric Passkey signature challenge initiated.' : 'Direct sign-in allowed.'
  });
});

// Card Instant Decryption API (Show Card Details)
app.post('/api/cards/decrypt', (req, res) => {
  const { cardId } = req.body;
  mockAuditLogs.unshift({
    id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    type: 'CARD_DECRYPTION',
    status: 'SUCCESS',
    caller: 'VaultPay UI (Managed Identity)',
    action: 'AES256_RSA_KeyVault_Decryption',
    target: `Disposable Virtual Card ${cardId || '4921'}`,
    timestamp: new Date().toLocaleTimeString()
  });

  res.json({
    success: true,
    pan: '4921 8023 9912 4921',
    cvv: '892',
    exp: '08/29',
    decryptionMethod: 'Azure Key Vault AES/RSA Customer Managed Key (CMK)'
  });
});

app.get('/api/keyvault/logs', (req, res) => {
  res.json({ logs: mockAuditLogs });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 VaultPay Revolut-Style App Running on http://localhost:${PORT}`);
  console.log(`📄 Technical PDF Report: http://localhost:${PORT}/api/view-pdf`);
  console.log(`=======================================================`);
});
