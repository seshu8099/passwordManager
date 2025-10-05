import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const algorithm = "aes-256-cbc";

// Get key and iv from environment variables, ensuring they are the correct length
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const iv = Buffer.from(process.env.ENCRYPTION_IV, "hex");

if (!process.env.ENCRYPTION_KEY || !process.env.ENCRYPTION_IV) {
  throw new Error("ENCRYPTION_KEY and ENCRYPTION_IV must be set in .env file");
}

// Encrypt password
export function encryptPassword(password) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decrypt password
export function decryptPassword(encryptedPassword) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}