const mysql = require("mysql");

const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});


exports.produitList = (req, res) => {
    try {
        db.query('SELECT * FROM produit', async(error, results) => {
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}