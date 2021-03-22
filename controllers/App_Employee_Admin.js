const mysql = require("mysql");
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

//------- Mobile login---------
exports.login = (req, res) => {
    try {
        const { email, password } = req.body;          
        db.query('SELECT * FROM user WHERE etat=1 and email = ?', [email], async(error, user) => {
            if (req.method === 'OPTIONS') {
                console.log('! OPTIONS');
                var headers = {};                
                headers["Access-Control-Allow-Origin"] = "*";
                headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
                headers["Access-Control-Allow-Credentials"] = false;
                headers["Access-Control-Max-Age"] = '86400'; // 24 heures
                headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
                res.writeHead(200, en - têtes);
                res.end();
            }
           if(user.length>0){                
                let index=0;
                user.forEach(async element => {                    
                    if((bcrypt.compareSync(password, user[index]["password"]))){                        
                        res.json({
                            "data" : [{
                                "id":user[index]["id"],
                                "nom":user[index]["nom"],
                                "prenom":user[index]["prenom"],
                                "email":user[index]["email"],
                                "id_type":user[index]["id_type"]
                            }]
                        });
                        
                    }else{
                        res.json({
                            "error" :"Erreur lors de la connexion",
                            "data" : null
                        });
                    }                
                    index++;
                });
           }else{
                res.json({
                    "error" :"Erreur lors de la connexion",
                    "data" : null
                });
           }
        })
    } catch (err) {
        console.log(err);
    }
}

//------ insert notif new commande
exports.NotifNewOrder = (req, res) => {
    const id = req.query;
    try {
        db.query('INSERT INTO notif_commande SET ?', { id_order: id }, (error, results) => {
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

exports.Listeneworder = (req, res) => {
    try {
        db.query('SELECT id_order FROM notif_commande', async(error, results) => {
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

