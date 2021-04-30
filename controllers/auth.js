const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// module.exports = authorize;
//--Connection avec la base de donnée--
const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

//-------------Login-------------------
exports.login = (req, res) => {
    try {
        // passport.authenticate('local');

        const { email, password } = req.body;
        // console.log("REq body", req.body)


        // IE8 n'autorise pas la spécification de domaines, juste le *
        // headers ["Access-Control-Allow-Origin"] = req.headers.origin;
        if (req.body.password === '' || req.body.email === '') {
            console.log("Test 1")
            res.status(405).json({
                message: 'Aucun résultat'
            });
            console.log("*************************;Aucun résultat");
        }



        db.query('SELECT * FROM user left join type_utilisateur as t_use ON user.id_type = t_use.id_type_user WHERE email = ?   ', [email], async(error, results) => {
            // console.log("ito", results);
            console.log("Result", results)
            if (req.method === 'OPTIONS') {
                console.log('! OPTIONS');
                var headers = {};
                // IE8 n'autorise pas la spécification de domaines, juste le *
                // headers ["Access-Control-Allow-Origin"] = req.headers.origin;
                headers["Access-Control-Allow-Origin"] = "*";
                headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
                headers["Access-Control-Allow-Credentials"] = false;
                headers["Access-Control-Max-Age"] = '86400'; // 24 heures
                headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
                res.writeHead(200, en - têtes);
                res.end();

            } else if (!results || results == '' || !(bcrypt.compareSync(password, results[0].password))) {
                res.status(401).json({
                    message: 'Email or Password id incorrect'
                });
                console.log("*************************;Email or Password id incorrect");

            } else if (results[0].etat == 0) {
                res.status(402).json({
                    message: 'Votre compte n\'est plus validé'
                });
                console.log("*************************;Votre compte n\'est plus validé");
            } else {
                const id = results[0].id;
                console.log('ID', id)

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is:" + token);

                const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }
                    // res.cookie("cookies", token, cookieOptions);

                // const token = jwt.sign({ id: id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
                // res.cookie("cookies", token);
                // console.log("The token is:" + token);


                // ---------------Valeur à retourner-----------------
                res.json({
                    'reponse': results[0],
                    token
                });
            }

            //--------------------------------------------------

            //--------------------------------------------
        })


    } catch (err) {
        console.log(err);
    }



}

//-------------Inscription---------------------
exports.register = (req, res) => {
    console.log("Inscriptio 1", req.body);

    const { nom, email, password, prenom, id_type, etat, nom_image } = req.body;

    db.query('SELECT email FROM user WHERE email = ?', [email], async(error, results) => {
        if (results.length > 0) {
            return res.render('register', {
                message: 'Email est déja utiliser'
            })
        }

        let encryptPWD = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        //-----------INSERTION dans la base de données-------------------
        db.query('INSERT INTO user SET ?', { nom: nom, email: email, password: encryptPWD, prenom: prenom, id_type: id_type, etat: etat, nom_image: nom_image }, (error, results) => {
            if (results) {
                console.log("Inscription results", results);
                // res.send("user registered");

                //------------Renvoyer le json----------------
                res.json(results);
            } else {
                // Mais il y a une problème
                console.log(error);
                // return res.json({
                //     message: 'user registered'
                // });
                return res.json(results);
            }
        })
    });

}

//---------------- Recup list User Modif Tojo
exports.listeUser = (req, res) => {
    try {
        db.query('select u.id,u.nom,u.prenom,u.email,u.id_type,u.etat,tu.nom_type,u.nom_image  from user as u left outer join type_utilisateur as tu on tu.id_type_user = u.id_type', async(error, results) => {
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

//---------------- majEtatUser
exports.majEtatUser = (req, res) => {
        try {
            const id = req.body.id;
            const etat = req.body.etat;

            db.query('UPDATE user SET  etat=?  WHERE id= ?', [etat, id], async(error, results) => {
                if (results) {
                    res.json(results);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    //---------------- majEtatUser
exports.majUser = (req, res) => {
    try {

        const email = req.body.email;
        const etat = req.body.etat;
        const id = req.body.id;
        const id_type = req.body.id_type;
        const nom = req.body.nom;
        const password = req.body.password;
        const prenom = req.body.prenom;
        const nom_image = req.body.nom_image;

        let encryptPWD = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        db.query('UPDATE user SET  email=?,etat=?,id_type=?,nom=?,password=?,prenom=?,nom_image=?  WHERE id= ?', [email, etat, id_type, nom, encryptPWD, prenom, nom_image, id], async(error, results) => {
            if (results) {
                res.json(results);
            }
        })
    } catch (err) {
        console.log(err);
    }
}

//-----------------Type User--------------------
exports.typeUser = (req, res) => {
    try {
        db.query('SELECT * FROM type_utilisateur', async(error, results) => {
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

//--------------Insertion type utilisateur------------------------
//-------------Inscription---------------------
exports.insertType = (req, res) => {
    console.log(req.body);
    const { nom_type } = req.body;
    try {
        db.query('INSERT INTO type_utilisateur SET ?', { nom_type: nom_type }, (error, results) => {
            if (results) {
                res.json(results);
            } else {
                return res.json(error);
            }
        })
    } catch (err) {
        console.log(err);
    }
}