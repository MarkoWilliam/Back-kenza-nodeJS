const mysql = require("mysql");

const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

//---------------------Liste Offre---------------------
exports.listeOffres = (req, res) => {
    try {
        // db.query('SELECT * FROM offres  WHERE etat = 1  order by code_offre ASC', async(error, results) => {
        db.query('SELECT * FROM offres   order by code_offre DESC', async(error, results) => {
            if (results) {
                return res.json(results);
            } else {
                return res.json({
                    success: error
                })
            }
            listeOffres
        });
    } catch (err) {
        console.log(err);
    }
}

//--------------------insertion offre---------------------
exports.insertOffre = (req, res) => {
    console.log(req.body);
    const { nom_image, titre, texte, etat, lien } = req.body;
    try {
        db.query('INSERT INTO offres SET ?', { nom_image: nom_image, titre: titre, texte: texte, etat: etat, lien: lien }, (error, results) => {
            if (results) {
                return res.send({
                    success: true
                });
            } else {
                return res.send({
                    success: error
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}


//----------------------Update offre-----------------------
exports.updateOffres = (req, res) => {
    console.log(req.body);
    const { code_offre, nom_image, titre, texte, etat, lien } = req.body;
    try {
        db.query('UPDATE offres SET nom_image=?, titre=?, texte=?, etat=?, lien=?  WHERE code_offre=?', [nom_image, titre, texte, etat, lien, code_offre], async(error, results) => {
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

//---------------- Update etat-------------------
exports.updateEtat = (req, res) => {
    try {
        const code_offre = req.body.code_offre;
        const etat = req.body.etat;

        db.query('UPDATE offres SET  etat=?  WHERE code_offre= ?', [etat, code_offre], async(error, results) => {
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



//--------------------insertion offre---------------------
exports.insertTitre = (req, res) => {
    console.log(req.body);
    const { titre, etat, type, page } = req.body;
    try {
        db.query('INSERT INTO baniere SET ?', { titre: titre, etat: etat, type: type, page: page }, (error, results) => {
            if (results) {
                return res.send({
                    success: true
                });
            } else {
                return res.send({
                    success: error
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}



//---------------------Liste Offre---------------------
exports.listeTitre = (req, res) => {
    try {
        db.query('SELECT * FROM titre', async(error, results) => {
            if (results) {
                return res.json(results);
            } else {
                return res.json({
                    success: error
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
}

//---------------- Update etat-------------------
exports.updateEtatTitre = (req, res) => {
    try {
        const id = req.body.id;
        const etat = req.body.etat;

        db.query('UPDATE titre SET  etat=?  WHERE id= ?', [etat, id], async(error, results) => {
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


//---------------------Liste Service---------------------
exports.listeService = (req, res) => {
    try {
        db.query('SELECT * FROM service   order by code_service ASC', async(error, results) => {
            if (results) {
                return res.json(results);
            } else {
                return res.json({
                    success: error
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
}


//---------------------Liste Service---------------------
exports.listeEtatServ = (req, res) => {
    try {
        db.query('SELECT * FROM service  WHERE etat = 1', async(error, results) => {
            if (results) {
                return res.json(results);
            } else {
                return res.json({
                    success: error
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
}

//--------------------insertion Service---------------------
exports.insertService = (req, res) => {
    console.log(req.body);
    const { nom_image, etat, lien } = req.body;
    try {
        db.query('INSERT INTO service SET ?', { nom_image: nom_image, etat: etat, lien: lien }, (error, results) => {
            if (results) {
                return res.send({
                    success: true
                });
            } else {
                return res.send({
                    success: error
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}


//----------------------Update Service-----------------------
exports.updateService = (req, res) => {
    console.log(req.body);
    const { code_service, nom_image, etat, lien } = req.body;
    try {
        db.query('UPDATE service SET nom_image=?, etat=?, lien=?  WHERE code_service=?', [nom_image, etat, lien, code_service], async(error, results) => {
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


//---------------- Update etat service-------------------
exports.updateEtatService = (req, res) => {
    try {
        const code_service = req.body.code_service;
        const etat = req.body.etat;

        db.query('UPDATE service SET  etat=?  WHERE code_service= ?', [etat, code_service], async(error, results) => {
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