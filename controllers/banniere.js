const mysql = require("mysql");

const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});



exports.banniereImg = (req, res) => {
    const id = req.query;
    console.log("Id******", id);
    try {
        db.query('SELECT * FROM bannieres where etat=1 and id_page= ?', [id.id], async(error, results) => {
            //    console.log(results);
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}

//---------- modif tojo pour le systeme de gestion banniere
exports.allban = (req, res) => {
    try {
        db.query('SELECT ban.etat,ban.id_ban,ban.nom_image,ban.num_ban,ban.id_page,pac.nom_page,pac.nb_image FROM `bannieres` as ban left outer join page_apk_client as pac on pac.id_page = ban.id_page', async(error, results) => {
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}


//---------- modif tojo pour le systeme de gestion banniere Insertion
exports.insertbann = (req, res) => {
    console.log(req.body);
    const { id_page, nom_image, num_ban, etat, lien } = req.body;
    try {
        db.query('INSERT INTO bannieres SET ?', { id_page: id_page, nom_image: nom_image, num_ban: num_ban }, (error, results) => {
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


//---------- modif tojo pour le systeme de gestion banniere Update
exports.updateBann = (req, res) => {
    try {
        const { id_ban, nom_image, num_ban, id_page, etat } = req.body;
        db.query('UPDATE bannieres SET  nom_image=?, num_ban=?, id_page=?,etat=?  WHERE id_ban= ?', [nom_image, num_ban, id_page, etat, id_ban], async(error, results) => {
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

//---------- modif tojo pour le systeme de gestion banniere majEtatBann
exports.majEtatBann = (req, res) => {
    try {
        console.log(req.body)
        const id = req.body.id;
        const etat = req.body.etat;

        db.query('UPDATE bannieres SET  etat=?  WHERE id_ban= ?', [etat, id], async(error, results) => {
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