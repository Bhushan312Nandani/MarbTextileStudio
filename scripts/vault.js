/**
 * Marb Studio - Secure AES-256-GCM Secret Vault Utility
 * 
 * Protects project secrets (DB URLs, JWT Secrets, Admin keys) using military-grade
 * AES-256-GCM encryption with PBKDF2 key derivation (100,000 SHA-512 iterations).
 * 
 * Usage:
 *   node scripts/vault.js encrypt
 *   node scripts/vault.js decrypt
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const readline = require("readline");

const VAULT_FILE = path.join(__dirname, "..", "secrets.vault.enc");
const BACKEND_ENV_FILE = path.join(__dirname, "..", "backend", ".env");
const FRONTEND_ENV_FILE = path.join(__dirname, "..", "frontend", ".env");

const ALGORITHM = "aes-256-gcm";
const ITERATIONS = 100000;
const KEY_LEN = 32;
const SALT_LEN = 16;
const IV_LEN = 12;

function askPassword(promptText) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(promptText, (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  });
}

function deriveKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, "sha512");
}

function encrypt(text, password) {
  const salt = crypto.randomBytes(SALT_LEN);
  const iv = crypto.randomBytes(IV_LEN);
  const key = deriveKey(password, salt);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Format: SALT (16) + IV (12) + TAG (16) + CIPHERTEXT
  const result = Buffer.concat([salt, iv, authTag, encrypted]);
  return result.toString("base64");
}

function decrypt(cipherBase64, password) {
  const buffer = Buffer.from(cipherBase64, "base64");
  
  if (buffer.length < SALT_LEN + IV_LEN + 16) {
    throw new Error("Invalid vault payload format.");
  }

  const salt = buffer.subarray(0, SALT_LEN);
  const iv = buffer.subarray(SALT_LEN, SALT_LEN + IV_LEN);
  const authTag = buffer.subarray(SALT_LEN + IV_LEN, SALT_LEN + IV_LEN + 16);
  const encrypted = buffer.subarray(SALT_LEN + IV_LEN + 16);

  const key = deriveKey(password, salt);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}

async function run() {
  const action = process.argv[2]?.toLowerCase();

  if (action !== "encrypt" && action !== "decrypt" && action !== "status") {
    console.log(`
=============================================================
🔒 Marb Studio AES-256-GCM Secure Vault CLI
=============================================================
Commands:
  node scripts/vault.js encrypt   - Encrypts current local .env configs into secrets.vault.enc
  node scripts/vault.js decrypt   - Decrypts secrets.vault.enc and restores your local .env files
  node scripts/vault.js status    - Check if encrypted vault exists
=============================================================
`);
    process.exit(1);
  }

  if (action === "status") {
    if (fs.existsSync(VAULT_FILE)) {
      const stats = fs.statSync(VAULT_FILE);
      console.log(`✅ Encrypted Vault Exists (${stats.size} bytes): ${VAULT_FILE}`);
    } else {
      console.log(`⚠️ No encrypted vault file found at: ${VAULT_FILE}`);
    }
    return;
  }

  const envPass = process.env.VAULT_PASSWORD;
  const password = envPass || await askPassword("🔑 Enter Master Passphrase to " + action + " vault: ");

  if (!password) {
    console.error("❌ Error: Passphrase cannot be empty!");
    process.exit(1);
  }

  if (action === "encrypt") {
    let backendEnv = "";
    let frontendEnv = "";

    if (fs.existsSync(BACKEND_ENV_FILE)) {
      backendEnv = fs.readFileSync(BACKEND_ENV_FILE, "utf8");
    }
    if (fs.existsSync(FRONTEND_ENV_FILE)) {
      frontendEnv = fs.readFileSync(FRONTEND_ENV_FILE, "utf8");
    }

    const payload = {
      project: "Marb Textile Studio",
      timestamp: new Date().toISOString(),
      backendEnv,
      frontendEnv,
      notes: "Production and development secret vault credentials.",
    };

    const encryptedData = encrypt(JSON.stringify(payload, null, 2), password);
    fs.writeFileSync(VAULT_FILE, encryptedData, "utf8");
    console.log(`\n🎉 Vault encrypted successfully!`);
    console.log(`📁 File saved to: ${VAULT_FILE}`);
    console.log(`🔒 This encrypted file is 100% safe to store or commit. Nobody can read it without your passphrase.`);
  }

  if (action === "decrypt") {
    if (!fs.existsSync(VAULT_FILE)) {
      console.error(`❌ Error: Vault file ${VAULT_FILE} does not exist! Run encrypt first.`);
      process.exit(1);
    }

    try {
      const cipherText = fs.readFileSync(VAULT_FILE, "utf8");
      const decryptedString = decrypt(cipherText, password);
      const data = JSON.parse(decryptedString);

      console.log(`\n🔓 Vault Decrypted Successfully!`);
      console.log(`📅 Created At: ${data.timestamp}`);

      if (data.backendEnv) {
        fs.writeFileSync(BACKEND_ENV_FILE, data.backendEnv, "utf8");
        console.log(`✅ Restored: backend/.env`);
      }
      if (data.frontendEnv) {
        fs.writeFileSync(FRONTEND_ENV_FILE, data.frontendEnv, "utf8");
        console.log(`✅ Restored: frontend/.env`);
      }

      console.log(`\n✨ All project secrets and environment configurations have been unlocked for local use!`);
    } catch (err) {
      console.error(`\n❌ Decryption Failed: Invalid Passphrase or Corrupted Data.`);
      process.exit(1);
    }
  }
}

run();
