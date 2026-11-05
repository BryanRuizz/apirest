const supabase = require("../config/supabase");

const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "FAILED",
            message: "Email and password are required"
        });
    }

    try {

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });

        if (error) {
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