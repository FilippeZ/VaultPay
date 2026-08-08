# 🚀 VaultPay - NextGen Revolut-Style Banking & Azure Security Architecture

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Cloud Provider](https://img.shields.io/badge/Azure-Key%20Vault%20%7C%20Entra%20ID%20%7C%20AI%20ML-0078D4?logo=microsoftazure)](https://azure.microsoft.com/)
[![Security Standard](https://img.shields.io/badge/Security-Zero%20Trust%20%7C%20FIDO2%20Passkeys-00F0FF)](https://fidoalliance.org/)
[![Architecture](https://img.shields.io/badge/Architecture-Hybrid%20Cloud-7DFFA2)](https://azure.microsoft.com/)

**VaultPay** is a cutting-edge, Revolut-style digital banking and fiduciary platform engineered for ultra-fast 2-minute onboarding, Zero-Trust security, dynamic card encryption, and regulatory compliance using **Microsoft Azure Cloud Security Services**.

---

## 🌟 Key Features & 4 Architectural Pillars

VaultPay adapts its fintech architecture directly to the **Revolut Model**, backed by Microsoft Azure enterprise security:

### 1. 🤖 Ψηφιακό Onboarding & Ταυτοποίηση (AI KYC) σε 2 Λεπτά
- **Photo ID & Selfie/Video Capture**: Seamless document scanning via **Azure AI Document Intelligence (OCR)**.
- **Azure AI & ML Liveness Detection**: Real-time multi-modal analysis (face mesh landmarks & voice frequency spectrum) to prevent deepfakes and spoofing.
- **Identity & Passkey Creation**: **Microsoft Entra ID** automatically creates the User Principal Name (UPN) (e.g. `user@vaultpay.azure.net`) and issues a hardware-bound **FIDO2 Passkey**, storing the public key directly in **Azure Key Vault Premium**.

### 2. 🌍 Παγκόσμια Ασφάλεια για Ταξιδιώτες (Real-Time Conditional Access)
- **Entra ID Sign-In Risk Engine**: Real-time evaluation of traveler sign-in risk based on IP geolocation, device compliance, and behavioral telemetry.
- **Passwordless Challenge**: When an unusual location is detected (e.g., connection from Tokyo), the system bypasses vulnerable passwords and mandates a **FIDO2 Passkey biometric signature challenge** verified against Azure Key Vault.

### 3. 💳 Διαχείριση Καρτών, Crypto & APIs (Azure Key Vault)
- **API Secrets Protection**: Partner API keys (Visa/Mastercard networks, crypto exchange liquidity providers) are stored as encrypted Secrets in Azure Key Vault—never hardcoded in source code or config files.
- **Dynamic AES/RSA Card Encryption**: Sensitive card details (PAN, CVV) are encrypted using **AES-256 / RSA CMK** keys inside Azure Key Vault and decrypted instantaneously only when the user clicks *"Show Card Details"* inside the app.

### 4. 🏢 Υβριδική Αρχιτεκτονική για Συμμόρφωση (Hybrid Cloud)
- **Public Cloud (Azure)**: Everyday operations (UI, transaction history, messaging, real-time FX calculations) run on Public Cloud for maximum speed and global scalability.
- **Private Cloud (On-Premises Core Vault)**: Core database balances and sensitive identity/KYC data are hosted in a Private Cloud Subnet to ensure strict regulatory compliance with Central Bank standards (PCI-DSS v4.0, GDPR).

---

## 📱 Revolut-Style Pages Included

1. **🚀 Welcome & Quick Launch Page**: Modern landing screen with instant registration and Passkey login options.
2. **🤖 AI KYC Onboarding Page**: Step-by-step interactive guide for document OCR, face/voice liveness verification, and Entra ID UPN provisioning.
3. **🔑 Passwordless Login Page**: 1-second login using fingerprint / Face ID WebAuthn Passkeys.
4. **📊 Hub / Dashboard**: Dynamic multi-currency wallets (EUR, USD, BTC), balance masking (`€24.590,00` <-> `••••••`), and quick actions.
5. **💸 Transfer & Exchange Page**: Instant FX currency converter (EUR to USD) with FIDO2 Passkey cryptographic transaction signing.
6. **💳 Cards Management Page**: Disposable virtual cards with instant Azure Key Vault AES/RSA decryption on *"Show Card Details"*.
7. **🛡️ Admin Security Portal**: Bank internal audit portal enforcing Entra ID Role-Based Access Control (RBAC) and real-time SIEM audit log streams.
8. **🗝️ Azure Key Vault & Technical Report Center**: Interactive Key Vault operations console and PDF specification download center.

---

## 📄 Technical Specification PDF Report

VaultPay includes an automated Python script (`generate_pdf_report.py`) that builds a professional 5-page Technical Specification Report (`VaultPay_Technical_Specification_Report.pdf`) featuring:
- Full Greek typography rendering (`Segoe UI`).
- Zero-Trust security specifications & encryption standards.
- Azure CLI deployment scripts.
- Python (`azure-identity` & `azure-keyvault-secrets`) and TypeScript draft code snippets.

---

## 🛠️ Azure CLI Provisioning Commands

```bash
# 1. Create Resource Group & VNet Subnets
az group create --name rg-vaultpay-prod-westeurope --location westeurope
az network vnet create --resource-group rg-vaultpay-prod-westeurope --name vnet-vaultpay-prod --address-prefix 10.0.0.0/16 --subnet-name snet-public-app --subnet-prefix 10.0.1.0/24
az network vnet subnet create --resource-group rg-vaultpay-prod-westeurope --vnet-name vnet-vaultpay-prod --name snet-private-vault --address-prefix 10.0.2.0/24

# 2. Provision Azure Key Vault Premium (RBAC & Soft Delete)
az keyvault create \
  --name kv-vaultpay-prod-01 \
  --resource-group rg-vaultpay-prod-westeurope \
  --location westeurope \
  --sku premium \
  --enable-rbac-authorization true \
  --enable-soft-delete true \
  --retention-days 90 \
  --enable-purge-protection true \
  --public-network-access Disabled

# 3. Create Private Endpoint & Assign Managed Identity RBAC
az network private-endpoint create \
  --name pe-kv-vaultpay-prod \
  --resource-group rg-vaultpay-prod-westeurope \
  --vnet-name vnet-vaultpay-prod \
  --subnet snet-private-vault \
  --private-connection-resource-id $(az keyvault show --name kv-vaultpay-prod-01 --query id -o tsv) \
  --group-id vault --connection-name conn-kv-private

PRINCIPAL_ID=$(az webapp identity assign --name app-vaultpay-backend --resource-group rg-vaultpay-prod-westeurope --query principalId -o tsv)
az role assignment create --assignee $PRINCIPAL_ID --role "Key Vault Secrets User" --scope $(az keyvault show --name kv-vaultpay-prod-01 --query id -o tsv)
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18+ 
- **Python**: v3.10+ (with `reportlab` installed)

### Installation & Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/FilippeZ/VaultPay.git
   cd VaultPay
   ```

2. **Install Node Dependencies**:
   ```bash
   npm install
   ```

3. **Generate Technical Specification PDF Report**:
   ```bash
   python generate_pdf_report.py
   ```

4. **Start the Express Server**:
   ```bash
   node server.js
   ```

5. **Access in Browser**:
   - Web App UI: `http://localhost:3000`
   - PDF Report Viewer: `http://localhost:3000/api/view-pdf`
   - PDF Download Link: `http://localhost:3000/api/download-report`

---

## 🔐 Security & Compliance Standard
- **PCI-DSS v4.0** & **GDPR** Compliant
- **FIPS 140-2 Level 3** Hardware Security Module (HSM) Backed Keys
- **Microsoft Entra ID** System-Assigned Managed Identity & FIDO2 WebAuthn Passkeys

---

© 2026 VaultPay Engineering Team. All rights reserved.
