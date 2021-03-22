const mysql = require("mysql");

const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

//---------------------Liste push 13---------------------
//------------------------BO----------------------------
exports.listPush = (req, res) => {
        try {
            db.query('SELECT code_product, id_product FROM push_produit AS p ORDER BY p.code_product DESC LIMIT 10', async(error, results) => {
                let response = [];
                await results.forEach(async element => {
                    await response.push(element.id_product);
                });

                res.json(response)
                console.log("List Produit mise en avant", response)
            });
        } catch (err) {
            console.log(err);
        }
    }
    //-------------------------APK----------------------------- 
exports.listePushAPK = (req, res) => {
    try {
        db.query('SELECT code_product, id_product FROM push_produit AS p ORDER BY p.code_product DESC LIMIT 10', async(error, results) => {
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


//---------------------Liste push mf---------------------
//-------------BO-------------------
exports.listPushmf = (req, res) => {
    try {
        db.query('SELECT code_product, id_product FROM push_mere_fille AS p ORDER BY p.code_product DESC LIMIT 10', async(error, results) => {
            let response = [];
            await results.forEach(async element => {
                await response.push(element.id_product);
            });

            res.json(response)
            console.log("List Produit mise en avant", response)
        });
    } catch (err) {
        console.log(err);
    }
}

//------------APP-------------------
exports.listePushmfapk = (req, res) => {
    try {
        db.query('SELECT code_product, id_product FROM push_mere_fille AS p ORDER BY p.code_product DESC LIMIT 10', async(error, results) => {
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


//---------------------Liste push curvy---------------------
//---------------------BO---------------------
exports.listePushcurvy = (req, res) => {
    try {
        db.query('SELECT code_product, id_product FROM push_curvy AS p ORDER BY p.code_product DESC LIMIT 10',
            async(error, results) => {
                let response = [];
                await results.forEach(async element => {
                    await response.push(element.id_product);
                });

                res.json(response)
                console.log("List Produit mise en avant", response)
            });
    } catch (err) {
        console.log(err);
    }
}

//---------------------APK---------------------
exports.listePushcurvyapk = (req, res) => {
    try {
        db.query('SELECT code_product, id_product FROM push_curvy AS p ORDER BY p.code_product DESC LIMIT 10', async(error, results) => {
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

//---------------------Liste push promo---------------------
//---------------------BO---------------------
exports.listePushpromo = (req, res) => {
        try {
            db.query('SELECT code_product, id_product FROM push_promo AS p ORDER BY p.code_product DESC LIMIT 10',
                async(error, results) => {
                    let response = [];
                    await results.forEach(async element => {
                        await response.push(element.id_product);
                    });

                    res.json(response)
                    console.log("List Produit mise en avant", response)
                });
        } catch (err) {
            console.log(err);
        }
    }
    //---------------------APK--------------------- 
exports.listePushpromoapk = (req, res) => {
        try {
            db.query('SELECT code_product, id_product FROM push_promo AS p ORDER BY p.code_product DESC LIMIT 10', async(error, results) => {
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
    //---------------------Liste push filette---------------------
    //---------------------BO---------------------
exports.listePushfilette = (req, res) => {
        try {
            db.query('SELECT code_product, id_product FROM push_filette AS p ORDER BY p.code_product DESC LIMIT 10', async(error, results) => {
                let response = [];
                await results.forEach(async element => {
                    await response.push(element.id_product);
                });

                res.json(response)
                console.log("List Produit mise en avant", response)
            });
        } catch (err) {
            console.log(err);
        }
    }
    //---------------------APK--------------------- 
exports.listePushfiletteapk = (req, res) => {
    try {
        db.query('SELECT code_product, id_product FROM push_filette AS p ORDER BY p.code_product DESC LIMIT 10', async(error, results) => {
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

//---------------------Liste push bebe---------------------
//---------------------BO--------------------- 
exports.listePushbebe = (req, res) => {
        try {
            db.query('SELECT code_product, id_product FROM push_bebe AS p ORDER BY p.code_product DESC LIMIT 10', async(error, results) => {
                let response = [];
                await results.forEach(async element => {
                    await response.push(element.id_product);
                });

                res.json(response)
                console.log("List Produit mise en avant", response)
            });
        } catch (err) {
            console.log(err);
        }
    }
    //---------------------APK---------------------  
exports.listePushbebeapk = (req, res) => {
        try {
            db.query('SELECT code_product, id_product FROM push_bebe AS p ORDER BY p.code_product DESC LIMIT 10', async(error, results) => {
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
    //--------------------------------------------------------