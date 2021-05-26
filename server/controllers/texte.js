const mysql = require("mysql");

const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});


//-----------------------texte   ----------------------
//-------------List produit-----------------
exports.list = (req, res) => {
    try {
        db.query("SELECT CONCAT('{',GROUP_CONCAT('\"',label,'\":\"',value,'\"'),'}') as data FROM `texte` ", async(error, results) => {
            res.send(results);

        })
    } catch (err) {
        console.log(err);
    }
}


//----update----------
exports.update = (req, res) => {
    console.log(req.body);
    const { id, value } = req.body;
    try {
        db.query('UPDATE texte SET    value=? WHERE id= ?', [value, id], async(error, results) => {
            if (results) {
                return res.send({
                    success: true
                });
            } else {
                return res.send({
                    success: error
                });
            }
        })
    } catch (err) {
        console.log(err);
    }
}

//-------------List produit-----------------
exports.ListeText = (req, res) => {
    try {
        db.query("SELECT  * FROM texte ", async(error, results) => {
            res.send(results);

        })
    } catch (err) {
        console.log(err);
    }
}