import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_ENCODING_KEY;

export function encodeId(id: string): string {
  const encrypted = CryptoJS.AES.encrypt(id, secretKey).toString();
  return toUrlSafeBase64(encrypted);
}
export function decodeId(encodedId: string): string {
  const encrypted = fromUrlSafeBase64(encodedId);
  const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function toUrlSafeBase64(base64: string): string {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromUrlSafeBase64(urlSafeBase64: string): string {
  return (
    urlSafeBase64.replace(/-/g, "+").replace(/_/g, "/") +
    "=".repeat((4 - (urlSafeBase64.length % 4)) % 4)
  );
}
