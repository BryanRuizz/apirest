const db = require("../database/db");

const requireAdmin = async (req, res, next) => {

    try {

        const userId = req.user.id;

        const result = await db.query(
            `SELECT rol FROM usuarios WHERE id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(403).json({
                status: "FAILED",
                message: "User role not found"
            });
        }

        const userRole = result.rows[0].rol;

        if (userRole !== "admin") {
            return res.status(403).json({
                status: "FAILED",
                message: "Admin access required"
            });
        }

        next();

    } catch (error) {

        console.error("Role verification error:", error);

        return res.status(500).json({
            status: "FAILED",
            message: "Authorization error"
        });
    }
};

module.exports = requireAdmin;