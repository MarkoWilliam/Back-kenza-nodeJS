const mysql = require("mysql");

const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

//-------------List produit-----------------
exports.produitList = (req, res) => {
    try {
        db.query('SELECT * FROM produit', async(error, results) => {
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}

exports.produitID = (req, res) => {
    // const {id, nom, couleur, stock_dispo, statue, prix, prix_solde, etat, image } = req.body;
    try {
        // const id = req.body;
        const { id } = req.params;
        console.log(id);
        const { nom, couleur, stock_dispo, statue, prix, prix_solde, etat, image } = req.body;
        console.log("Id du produit", req.body);
        db.query('UPDATE produit SET nom=?, couleur=?, stock_dispo=?, statue=?, prix=?, prix_solde=?, etat=?, image=?  WHERE id= ?', [nom, couleur, stock_dispo, statue, prix, prix_solde, etat, image, id], async(error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    res.json(results);
                    console.log('ok');
                }

            })
            // [id, nom, couleur, stock_dispo, statue, prix, prix_solde, etat, image]
    } catch (err) {
        console.log(err);
    }
}