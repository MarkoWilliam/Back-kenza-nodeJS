const mysql = require("mysql");

const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});


//-----------------------texte boutton ----------------------
//-------------List produit ANDROID-----------------
exports.list = (req, res) => {
    try {
        db.query('SELECT  COUNT(uuid) as `ard` FROM devices WHERE BINARY uuid <> BINARY UPPER(uuid)  ', async(error, results) => {
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}

//-------------List produit IOS-----------------
exports.listIOS = (req, res) => {
    try {
        db.query('SELECT  COUNT(uuid) as `iphone` FROM devices WHERE BINARY uuid <> BINARY LOWER(uuid)   ', async(error, results) => {
            res.json(results);
        })
    } catch (err) {
        console.log(err);
    }
}

//--------------insertion-------------------
exports.insertion = (req, res) => {
    console.log("************", req.body);
    const { uuid, created_date } = req.body;
    try {
        db.query('INSERT INTO devices SET ?', { uuid: uuid, created_date: created_date }, (error, results) => {
            if (results) {
                res.send({
                    success: true
                });
            } else {
                res.send({
                    success: error
                });
            }
        })
    } catch (err) {
        console.log(err);
    }
}