const { webcrypto } = require("node:crypto");

const decryptLogin = async (iv, encryptedData) => {
    const keyBase64 = process.env.LOGIN_KEY;

    if (!keyBase64) {
        throw new Error("Falta configurar LOGIN_KEY");
    }

    const key = await webcrypto.subtle.importKey(
        "raw",
        Buffer.from(keyBase64, "base64"),
        "AES-GCM",
        false,
        ["decrypt"]
    );

    const decrypted = await webcrypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: Buffer.from(iv, "base64"),
        },
        key,
        Buffer.from(encryptedData, "base64")
    );

    const credentials = new TextDecoder().decode(decrypted);
    return JSON.parse(credentials);
};

module.exports = { decryptLogin };