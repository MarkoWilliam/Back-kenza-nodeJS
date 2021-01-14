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