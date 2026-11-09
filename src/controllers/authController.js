const supabase = require("../config/supabase");
const { decryptLogin } = require("../services/decryptLogin");

const login = async (req, res) => {
    const { iv, encryptedData } = req.body;

    if (!iv || !encryptedData) {
        return res.status(400).json({
            status: "FAILED",
            message: "IV and encrypted data are required"
        });
    }

    let email;
    let password;

    try {
        // Descifra el objeto enviado desde React.
        ({ email, password } = await decryptLogin(iv, encryptedData));
    } catch (error) {
        return res.status(400).json({
            status: "FAILED",
            message: "Could not decrypt credentials"
        });
    }

    if (!email || !password) {
        return res.status(400).json({
            status: "FAILED",
            message: "Email and password are required"
        });
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error || !data.session) {
            return res.status(401).json({
                status: "FAILED",
                message: "Invalid credentials"
            });
        }

        return res.status(200).json({
            status: "OK",
            data: {
                access_token: data.session.access_token,
                token_type: data.session.token_type,
                expires_in: data.session.expires_in
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Login failed"
        });
    }
};

module.exports = { login };