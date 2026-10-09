const db = require('../config/db');

exports.listarGrupos = async (req, res) => {
    try {
        // DQL: Contando miembros por grupo (Agregación)
        const [rows] = await db.query(`
            SELECT g.*, COUNT(m.usuario_id) AS total_miembros 
            FROM grupos g 
            LEFT JOIN miembros_grupos m ON g.id = m.grupo_id 
            GROUP BY g.id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.unirseAGrupo = async (req, res) => {
    res.status(501).json({ message: "No implementado" });
};