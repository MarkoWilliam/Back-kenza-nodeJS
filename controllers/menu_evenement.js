const mysql = require("mysql");

const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});


//-----------------------texte boutton ----------------------
//-------------List produit-----------------
exports.list = (req, res) => {
    try {
        db.query('SELECT * FROM event_bouton AS event ORDER BY event.id ASC LIMIT 3', async(error, results) => {
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}

//--------------insertion-------------------
exports.insertion = (req, res) => {
    console.log(req.body);
    const { texte } = req.body;
    try {
        db.query('INSERT INTO event_bouton SET ?', { texte: texte }, (error, results) => {
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

//----update----------
exports.update = (req, res) => {
    console.log(req.body);
    const { id, texte, } = req.body;
    try {
        db.query('UPDATE event_bouton SET   texte=? WHERE id= ?', [texte, id], async(error, results) => {
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

//-----------------------titre boutton ----------------------
//-------------List produit-----------------
exports.listTitre = (req, res) => {
    try {
        db.query('SELECT * FROM event_texte AS event GROUP BY event.id ASC LIMIT 3', async(error, results) => {
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}

//--------------insertion-------------------
exports.insertionTitre = (req, res) => {
    console.log(req.body);
    const { tittre, libelle, texte, bouton, lien } = req.body;
    try {
        db.query('INSERT INTO event_texte SET ?', { tittre: tittre, libelle: libelle, texte: texte, bouton: bouton, lien: lien }, (error, results) => {
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

//----update----------
exports.updateTitre = (req, res) => {
    console.log(req.body);
    const { id, tittre, libelle, texte, bouton, lien } = req.body;
    try {
        db.query('UPDATE event_texte SET   tittre=?,libelle=?,texte=?, bouton=?, lien=? WHERE id= ?', [tittre, libelle, texte, bouton, lien, id], async(error, results) => {
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

//-----------------List id-------------
exports.listeId = (req, res) => {
    const { num } = req.params;
    console.log(req.query);
    try {
        db.query(' SELECT DISTINCT  * FROM event_texte WHERE id = ? ', [num], async(error, results) => {
            res.json(results[0]);
            console.log(results);
        })
    } catch (err) {
        res.json(err);
        console.log(err);
    }
}