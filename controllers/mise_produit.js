const mysql = require("mysql");

const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});



//-------------Insertion produit mise en avant---------------------
exports.miseEnavant = (req, res) => {
    console.log("Insertion produit mise en avant", req.body.id);
    const { id, statue } = req.body;
    db.query('SELECT id_product FROM push_produit WHERE id_product = ?', [id], async(error, results) => {
        if (results.length > 0) {
            console.log("Id à supprimer", id);

            return db.query('DELETE  FROM push_produit WHERE id_product = ?', [id], (error, results) => {
                console.log("Le donnée est supprimer test");
                if (results) {
                    res.json(results);
                } else {
                    console.log(error);
                    return res.json(results);
                }
            })
        }
        //-----------INSERTION dans la base de données-------------------
        db.query('INSERT INTO push_produit SET ?', { id_product: id, statue: 0 }, (error, results) => {
            if (results) {
                console.log("Inscription results", results);
                //------------Renvoyer le json----------------
                res.json(results);
            } else {
                console.log(error);
                return res.json(results);
            }
        })
    });

}


//--------------------List product 13------------------
exports.selectPr = (req, res) => {
    try {
        db.query('SELECT id_product FROM push_produit',
            async(error, results) => {
                let response = [];
                await results.forEach(async element => {
                    await response.push(element.id_product);
                });

                res.json(response)
                console.log("List Produit mise en avant", response)
            })

    } catch (err) {
        console.log(err);
    }
}

//--------------------Supprimer------------------
exports.supprimer = (req, res) => {
    // const ids = req.query;
    // console.log("Suppression test")
    // console.log(req.query);
    console.log("Id à supprimer", req.params.id);
    try {
        db.query('DELETE  FROM push_produit WHERE id_product = ? ', [req.params.id], async(error, results) => {
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}

//-------------Insertion produit mise en avant MF---------------------
exports.insertMf = (req, res) => {
    console.log("Insertion produit mise en avant", req.body.id);
    const { id, statue } = req.body;
    db.query('SELECT id_product FROM push_mere_fille WHERE id_product = ?', [id], async(error, results) => {
        if (results.length > 0) {
            console.log("Id à supprimer", id);

            return db.query('DELETE  FROM push_mere_fille WHERE id_product = ?', [id], (error, results) => {
                console.log("Le donnée est supprimer test");
                if (results) {
                    res.json(results);
                } else {
                    console.log(error);
                    return res.json(results);
                }
            })
        }
        //-----------INSERTION dans la base de données-------------------
        db.query('INSERT INTO push_mere_fille SET ?', { id_product: id }, (error, results) => {
            if (results) {
                console.log("Inscription results", results);
                //------------Renvoyer le json----------------
                res.json(results);
            } else {
                console.log(error);
                return res.json(results);
            }
        })
    });

}

//-------------Insertion produit mise en avant curvy---------------------
exports.insertcurvy = (req, res) => {
    console.log("Insertion produit mise en avant", req.body.id);
    const { id, statue } = req.body;
    db.query('SELECT id_product FROM push_curvy WHERE id_product = ?', [id], async(error, results) => {
        if (results.length > 0) {
            console.log("Id à supprimer", id);

            return db.query('DELETE  FROM push_curvy WHERE id_product = ?', [id], (error, results) => {
                console.log("Le donnée est supprimer test");
                if (results) {
                    res.json(results);
                } else {
                    console.log(error);
                    return res.json(results);
                }
            })
        }
        //-----------INSERTION dans la base de données-------------------
        db.query('INSERT INTO push_curvy SET ?', { id_product: id }, (error, results) => {
            if (results) {
                console.log("Inscription results", results);
                //------------Renvoyer le json----------------
                res.json(results);
            } else {
                console.log(error);
                return res.json(results);
            }
        })
    });

}

//-------------Insertion produit mise en avant promo---------------------
exports.insertpromo = (req, res) => {
    console.log("Insertion produit mise en avant", req.body.id);
    const { id, statue } = req.body;
    db.query('SELECT id_product FROM push_promo WHERE id_product = ?', [id], async(error, results) => {
        if (results.length > 0) {
            console.log("Id à supprimer", id);

            return db.query('DELETE  FROM push_promo WHERE id_product = ?', [id], (error, results) => {
                console.log("Le donnée est supprimer test");
                if (results) {
                    res.json(results);
                } else {
                    console.log(error);
                    return res.json(results);
                }
            })
        }
        //-----------INSERTION dans la base de données-------------------
        db.query('INSERT INTO push_promo SET ?', { id_product: id }, (error, results) => {
            if (results) {
                console.log("Inscription results", results);
                //------------Renvoyer le json----------------
                res.json(results);
            } else {
                console.log(error);
                return res.json(results);
            }
        })
    });

}


//-------------Insertion produit mise en avant filelle---------------------
exports.insertfilette = (req, res) => {
    console.log("Insertion produit mise en avant", req.body.id);
    const { id, statue } = req.body;
    db.query('SELECT id_product FROM push_filette WHERE id_product = ?', [id], async(error, results) => {
        if (results.length > 0) {
            console.log("Id à supprimer", id);

            return db.query('DELETE  FROM push_filette WHERE id_product = ?', [id], (error, results) => {
                console.log("Le donnée est supprimer test");
                if (results) {
                    res.json(results);
                } else {
                    console.log(error);
                    return res.json(results);
                }
            })
        }
        //-----------INSERTION dans la base de données-------------------
        db.query('INSERT INTO push_filette SET ?', { id_product: id }, (error, results) => {
            if (results) {
                console.log("Inscription results", results);
                //------------Renvoyer le json----------------
                res.json(results);
            } else {
                console.log(error);
                return res.json(results);
            }
        })
    });

}

//-------------Insertion produit mise en avant filelle---------------------
exports.insertbebe = (req, res) => {
    console.log("Insertion produit mise en avant", req.body.id);
    const { id, statue } = req.body;
    db.query('SELECT id_product FROM push_bebe WHERE id_product = ?', [id], async(error, results) => {
        if (results.length > 0) {
            console.log("Id à supprimer", id);

            return db.query('DELETE  FROM push_bebe WHERE id_product = ?', [id], (error, results) => {
                console.log("Le donnée est supprimer test");
                if (results) {
                    res.json(results);
                } else {
                    console.log(error);
                    return res.json(results);
                }
            })
        }
        //-----------INSERTION dans la base de données-------------------
        db.query('INSERT INTO push_bebe SET ?', { id_product: id }, (error, results) => {
            if (results) {
                console.log("Inscription results", results);
                //------------Renvoyer le json----------------
                res.json(results);
            } else {
                console.log(error);
                return res.json(results);
            }
        })
    });

}


//--------------------List product curvy------------------
exports.selecteCurvy = (req, res) => {
    try {
        db.query('SELECT id_product FROM push_curvy',
            async(error, results) => {
                let response = [];
                await results.forEach(async element => {
                    await response.push(element.id_product);
                });

                res.json(response)
                console.log("List Produit mise en avant", response)
            })

    } catch (err) {
        console.log(err);
    }
}

//--------------------List product mf------------------
exports.selectemf = (req, res) => {
    try {
        db.query('SELECT id_product FROM push_mere_fille',
            async(error, results) => {
                let response = [];
                await results.forEach(async element => {
                    await response.push(element.id_product);
                });

                res.json(response)
                console.log("List Produit mise en avant", response)
            })

    } catch (err) {
        console.log(err);
    }
}