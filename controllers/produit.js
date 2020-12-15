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

        if (req.body.nom === '' || req.body.couleur === '' || req.body.stock_dispo === '' || req.body.statue === '' || req.body.prix_solde === '' || req.body.etat === '') {
            res.status(501).json({
                message: "Il a y une champ vide",
            })
        }
        db.query('UPDATE produit SET nom=?, couleur=?, stock_dispo=?, statue=?, prix=?, prix_solde=?, etat=?, image=?  WHERE id= ?', [nom, couleur, stock_dispo, statue, prix, prix_solde, etat, image, id], async(error, results) => {
                if (results.nom === '' || results.couleur === '' || results.stock_dispo === '' || results.statue === '' || results.prix_solde === '' || results.etat === '') {
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



exports.produitCheck = (req, res) => {
    // const {id, nom, couleur, stock_dispo, statue, prix, prix_solde, etat, image } = req.body;
    try {
        // const id = req.body;
        const { id } = req.params;
        console.log(id);
        const { etat } = req.body;
        console.log("Id du produit", req.body);


        db.query('UPDATE produit SET  etat=?  WHERE id= ?', [etat, id], async(error, results) => {
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


exports.insertban = (req, res) => {
    const { id_categorie, id_page, nom, position_text, text_ban, url_img } = req.body;
    try {
        db.query('INSERT INTO banniere SET ?', { id_categorie: id_categorie, id_page: id_page, nom: nom, position_text: position_text, text_ban: text_ban, url_img: url_img }, (error, results) => {
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

exports.pageElement = (req, res) => {
    try {
        db.query('SELECT * FROM banniere', async(error, results) => {
            console.log(results);
            if (results) {
                return res.json(results);
            } else {
                return res.json({
                    success: error
                });
            }
        })
    } catch (err) {
        console.log(err);
    }
}

//insert new notif
exports.insertnotif = (req, res) => {
    const { contenu, etat, titre } = req.body;
    const now = new Date();
    try {
        db.query('INSERT INTO notification SET ?', { titre: titre, contenu: contenu, etat: etat, date_add: now }, (error, results) => {
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


exports.allnotif = (req, res) => {
    try {
        db.query('SELECT * FROM notification', async(error, results) => {
            /* console.log(results);  */
            if (results) {
                return res.json(results);
            } else {
                return res.json({
                    success: error
                });
            }
        })
    } catch (err) {
        console.log(err);
    }
}