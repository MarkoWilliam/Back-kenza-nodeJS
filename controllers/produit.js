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


///////////////////////////////////////////////////////////
////////////Modif TOJO/////////////////////////////////////
///////////////////////////////////////////////////////////
//-------------------Insert banniere
exports.insertban = (req, res) => {
        const { id_categorie, id_page, nom, position_text, text_ban, url_img, contenu_body, titre_body } = req.body;
        try {
            db.query('INSERT INTO banniere SET ?', { id_categorie: id_categorie, id_page: id_page, nom: nom, position_text: position_text, text_ban: text_ban, url_img: url_img, contenu_body: contenu_body, titre_body: titre_body }, (error, results) => {
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
    //-------------------Recup All banniere
exports.pageElement = (req, res) => {
    try {
        const { id } = req.params;
        db.query('SELECT * FROM banniere where id_page=' + id, async(error, results) => {
            /* console.log(results); */
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

//-------------------Insert new Notification
// exports.insertnotif = (req, res) => {

//     const { contenu, etat, id_attribute, id_category, id_image, id_product, id_product_attribute, link_rewrite, nom, titre, nom_image, time, date_add } = req.body;
//     console.log(req.body);
//     let now = new Date();
//     /////////////////////////////////////////////////////////
//     ////////////////Envoie notif vers onsignal///////////////
//     /////////////////////////////////////////////////////////
//     var sendNotification = function(data) {
//         var headers = {
//             "Content-Type": "application/json; charset=utf-8",
//             "Authorization": "Basic MTAyMGExZDUtMDU1Yy00NTdmLWI4MmYtNGI2NzM0YWNiOGNk"
//         };

//         var options = {
//             host: "onesignal.com",
//             port: 443,
//             path: "/api/v1/notifications",
//             method: "POST",
//             headers: headers
//         };

//         var https = require('https');
//         var req = https.request(options, function(res) {
//             res.on('data', function(data) {
//                 console.log("Response:");
//                 console.log(JSON.parse(data));
//             });
//         });

//         req.on('error', function(e) {
//             console.log("ERROR:");
//             console.log(e);
//         });

//         req.write(JSON.stringify(data));
//         req.end();
//     };



//     /////////////////////////////////////////////////////////
//     ////////////////////////////FIN//////////////////////////
//     /////////////////////////////////////////////////////////
//     try {
//         var message = {
//             app_id: "7f02b9d0-c675-4cfe-ba4b-7868a0a398ed",
//             headings: { "en": titre, "fr": titre },
//             contents: { "en": contenu, "fr": contenu },
//             included_segments: ["All"],
//             ios_attachments: {},
//         };

//         if (date_add) {
//             now = new Date(date_add);
//             message['send_after'] = new Date(date_add)
//         }

//         if (id_product) {
//             image = process.env.BASE_URL_KENZA + id_image + '-small_default/' + link_rewrite + '.jpg';
//             const d = new Date();
//             let str = d.getTime();
//             str = str.toString().substring(5);
//             message['ios_attachments']['id' + str] = image;
//             message['big_picture'] = image;
//             message['data'] = process.env.BASE_URL_KENZA + 'accueil' + '/' + id_product + '-' + id_product_attribute + '-' + link_rewrite + `.html`;

//             db.query('INSERT INTO notification SET ?', { date_add: now, contenu: contenu, etat: etat, id_attribute: id_attribute, id_category: id_category, id_image: id_image, id_product: id_product, id_product_attribute: id_product_attribute, link_rewrite: id_product_attribute, nom: id_product_attribute, titre: titre, image: 1, nom_image: '' }, (error, results) => {
//                 if (results) {
//                     // sendNotification(message);
//                     return res.send({
//                         success: true
//                     });
//                 } else {
//                     return res.send({
//                         error: error
//                     });
//                 }
//             })
//         } else {
//             if (nom_image) {
//                 image = process.env.BASE_URL + 'produit/imageban/' + nom_image;
//                 const d = new Date();
//                 let str = d.getTime();
//                 str = str.toString().substring(5);
//                 message['ios_attachments']['id' + str] = image;
//                 message['big_picture'] = image;
//             }
//             db.query('INSERT INTO notification SET ?', { date_add: now, contenu: contenu, etat: etat, id_attribute: '', id_category: '', id_image: '', id_product: '', id_product_attribute: '', link_rewrite: '', nom: '', titre: titre, image: 1, nom_image: nom_image }, (error, results) => {
//                 if (results) {
//                     // sendNotification(message);
//                     return res.send({
//                         success: true
//                     });
//                 } else {
//                     return res.send({
//                         error: error
//                     });
//                 }
//             })
//         }

//     } catch (err) {
//         console.log(err);
//     }
// }


//-------------------Insert new Notification
exports.insertnotif = (req, res) => {

    const { contenu, etat, id_attribute, id_category, id_image, id_product, id_product_attribute, link_rewrite, nom, titre, nom_image, time, date_add } = req.body;
    console.log("Data **********************************", req.body);
    let now = new Date();
    /////////////////////////////////////////////////////////
    ////////////////Envoie notif vers onsignal///////////////
    /////////////////////////////////////////////////////////
    var sendNotification = function(data) {
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic MTAyMGExZDUtMDU1Yy00NTdmLWI4MmYtNGI2NzM0YWNiOGNk"
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        var https = require('https');
        var req = https.request(options, function(res) {
            res.on('data', function(data) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
        });

        req.on('error', function(e) {
            console.log("ERROR:");
            console.log(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    };



    /////////////////////////////////////////////////////////
    ////////////////////////////FIN//////////////////////////
    /////////////////////////////////////////////////////////
    try {
        var message = {
            app_id: "7f02b9d0-c675-4cfe-ba4b-7868a0a398ed",
            headings: { "en": titre, "fr": titre },
            contents: { "en": contenu, "fr": contenu },
            included_segments: ["All"],
            ios_attachments: {},
        };

        if (date_add) {
            now = new Date(date_add);
            message['send_after'] = new Date(date_add)
        }

        if (id_product) {

            console.log("******", 'ato')
            image = process.env.BASE_URL_KENZA + id_image + '-small_default/' + link_rewrite + '.jpg';
            const d = new Date();
            let str = d.getTime();
            str = str.toString().substring(5);
            message['ios_attachments']['id' + str] = image;
            message['big_picture'] = image;
            message['data'] = process.env.BASE_URL_KENZA + 'accueil' + '/' + id_product + '-' + id_product_attribute + '-' + link_rewrite + `.html`;
            // console.log("if id_product existe", now);
            if (date_add) {
                date = date_add;
            } else {
                date = new Date();
            }
            db.query('INSERT INTO notification SET ?', { date_add: date, contenu: contenu, etat: etat, id_attribute: id_attribute, id_category: id_category, id_image: id_image, id_product: id_product, id_product_attribute: id_product_attribute, link_rewrite: id_product_attribute, nom: id_product_attribute, titre: titre, image: 1, nom_image: '' }, (error, results) => {
                if (results) {
                    sendNotification(message);
                    return res.send({
                        success: true
                    });
                } else {
                    return res.send({
                        error: error
                    });
                }
            })
        } else {
            if (nom_image) {
                db.query('INSERT INTO notification SET ?', { date_add: now, contenu: contenu, etat: etat, id_attribute: '', id_category: '', id_image: '', id_product: '', id_product_attribute: '', link_rewrite: '', nom: '', titre: titre, image: 1, nom_image: nom_image }, (error, results) => {
                    if (results) {
                        image = process.env.BASE_URL + 'produit/imageban/' + nom_image;
                        const d = new Date();
                        let str = d.getTime();
                        str = str.toString().substring(5);
                        message['ios_attachments']['id' + str] = image;
                        message['big_picture'] = image;
                        console.log("******", 'ato 2');
                        sendNotification(message);
                        return res.send({
                            success: true
                        });
                    } else {
                        return res.send({
                            error: error
                        });
                    }
                })
            } else {
                console.log("******", 'ato 3')
                image = '';
                const d = new Date();
                let str = d.getTime();
                str = str.toString().substring(5);
                message['ios_attachments']['id' + str] = image;
                message['big_picture'] = image;
                db.query('INSERT INTO notification SET ?', { date_add: now, contenu: contenu, etat: etat, id_attribute: '', id_category: '', id_image: '', id_product: '', id_product_attribute: '', link_rewrite: '', nom: '', titre: titre, image: 1, nom_image: '' }, (error, results) => {
                    if (results) {
                        sendNotification(message);
                        return res.send({
                            success: true
                        });
                    } else {
                        return res.send({
                            error: error
                        });
                    }
                })
            }

        }

    } catch (err) {
        console.log(err);
    }
}


//-------------------Recup All Notification
exports.allnotif = (req, res) => {
        try {
            db.query("SELECT `id_notification`,`titre`,`contenu`,`etat`, date_add,`id_product`,`id_attribute`,`id_category`,`nom`,`id_image`,`link_rewrite`,`id_product_attribute`,`image`, `nom_image`  FROM notification where etat=1 ORDER BY date_add DESC", async(error, results) => {
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
    //------------------ Lecture image uploads
exports.imageban = (req, res) => {

        const { image } = req.params;

        let path = __dirname + "/uploads/" + image;
        path = path.replace('\controllers', '');
        res.sendFile(path);
    }
    //-------------------Recup All Event
exports.allEvent = (req, res) => {
        try {
            db.query('SELECT * FROM evenement where etat=1 GROUP BY id_event DESC', async(error, results) => {
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
    /////////////////////////////////////////////////////////
    ////////////////////////////FIN//////////////////////////
    /////////////////////////////////////////////////////////

//---------------- majEtatNotif
exports.majNotif = (req, res) => {
    try {
        const id = req.body.id;
        const etat = req.body.etat;

        db.query('UPDATE notification SET  etat=?  WHERE id_notification= ?', [etat, id], async(error, results) => {
            if (results) {
                res.json(results);
            }
        })
    } catch (err) {
        console.log(err);
    }
}

//---------------- renVnotif
exports.renVnotif = (req, res) => {
    try {

        const { contenu, etat, id_attribute, id_category, id_image, id_product, id_product_attribute, link_rewrite, nom, titre, nom_image, time, date_add } = req.body;

        const now = new Date();

        db.query('UPDATE notification SET  date_add=?  WHERE id_notification= ?', [now, id_notification], async(error, results) => {
                if (results) {
                    res.json(results);
                }
            })
            /////////////////////////////////////////////////////////
            ////////////////Envoie notif vers onsignal///////////////
            /////////////////////////////////////////////////////////
        var sendNotification = function(data) {
            var headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Basic MTAyMGExZDUtMDU1Yy00NTdmLWI4MmYtNGI2NzM0YWNiOGNk"
            };

            var options = {
                host: "onesignal.com",
                port: 443,
                path: "/api/v1/notifications",
                method: "POST",
                headers: headers
            };

            var https = require('https');
            var req = https.request(options, function(res) {
                res.on('data', function(data) {
                    console.log("Response:", data);
                    console.log(JSON.parse(data));
                });
            });

            req.on('error', function(e) {
                console.log("ERROR:");
                console.log(e);
            });

            req.write(JSON.stringify(data));
            req.end();
        };




        var message = {
            app_id: "7f02b9d0-c675-4cfe-ba4b-7868a0a398ed",
            headings: { "en": titre, "fr": titre },
            contents: { "en": contenu, "fr": contenu },
            included_segments: ["All"],
            ios_attachments: {},
        };
        if (date_add) {
            message['send_after'] = new Date(date_add)
        }

        if (nom_image) {
            image = process.env.BASE_URL + 'produit/imageban/' + nom_image;
            const d = new Date();
            message['ios_attachments']['id' + d.getTime()] = image;
            message['big_picture'] = image;
        } else {
            image = process.env.BASE_URL_KENZA + id_image + '-small_default/' + link_rewrite + '.jpg';
            const d = new Date();
            message['ios_attachments']['id' + d.getTime()] = image;
            message['big_picture'] = image;
        }

        sendNotification(message);
        /////////////////////////////////////////////////////////
        ////////////////////////////FIN//////////////////////////
        /////////////////////////////////////////////////////////   
    } catch (err) {
        console.log(err);
    }
}



exports.allpage = (req, res) => {
    try {
        db.query('SELECT * FROM page_apk_client', async(error, results) => {
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




exports.allevenement = (req, res) => {
    try {
        db.query('SELECT * FROM evenement order by id_event DESC', async(error, results) => {
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

exports.insertevent = (req, res) => {
    console.log(req.body);
    const { nom_image, titre, texte, etat, lien, nom_button, condition_event, libellee, message_event } = req.body;
    try {
        db.query('INSERT INTO evenement SET ?', { nom_image: nom_image, titre: titre, texte: texte, etat: etat, lien: lien, nom_button: nom_button, condition_event: condition_event, libellee: libellee, message_event: message_event }, (error, results) => {
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


exports.updateevent = (req, res) => {
    console.log(req.body);


    const { id_event, nom_image, titre, texte, etat, lien, nom_button, condition_event, libellee, message_event } = req.body;
    try {
        console.log("Test");
        db.query('UPDATE evenement SET  nom_image=?, titre=?, texte=?, etat=?, lien=?, nom_button = ?, condition_event=?, 	libellee=? , message_event=?  WHERE id_event= ?', [nom_image, titre, texte, etat, lien, nom_button, condition_event, libellee, message_event, id_event], async(error, results) => {
            console.log("*******", results)
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



//---------------- majEtatEvent
exports.majEtatEvent = (req, res) => {
        try {
            const id = req.body.id;
            const etat = req.body.etat;

            db.query('UPDATE evenement SET  etat=?  WHERE id_event= ?', [etat, id], async(error, results) => {
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
    //-------------------Recup All Notification App
exports.allnotifapp = (req, res) => {
    try {
        db.query("SELECT `id_notification`,`titre`,`contenu`,`etat`, DATE_FORMAT(date_add,'%d/%m/%Y %H:%i') as date_add,`id_product`,`id_attribute`,`id_category`,`nom`,`id_image`,`link_rewrite`,`id_product_attribute`,`image` FROM notification where etat=1", async(error, results) => {
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


exports.derniere = (req, res) => {
    try {
        db.query('SELECT * FROM evenement order by id_event DESC LIMIT 1', async(error, results) => {
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

//---------------- Verion avec image ou pas 
exports.image = (req, res) => {
    try {
        const id = req.body.id;
        const image = req.body.image;

        console.log("Mode image", id, image)

        db.query('UPDATE notification SET  image=?  WHERE id_notification= ?', [image, id], async(error, results) => {
            if (results) {
                res.json(results);
                console.log("Mode image", results)
            }
        })
    } catch (err) {
        console.log(err);
    }
}


//__________________________________Carte metisse____________________________________

exports.listeCarte = (req, res) => {
    try {
        db.query('SELECT * FROM carte_metisse order by id DESC', async(error, results) => {
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

exports.insertCarte = (req, res) => {
    console.log(req.body);
    const { nom_image, etat } = req.body;
    try {
        db.query('INSERT INTO carte_metisse SET ?', { nom_image: nom_image, etat: etat }, (error, results) => {
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


exports.updateCarte = (req, res) => {
    console.log(req.body);


    const { id, nom_image, etat } = req.body;
    try {
        console.log("Test");
        db.query('UPDATE carte_metisse SET  nom_image=?, etat=? WHERE id= ?', [nom_image, etat, id], async(error, results) => {
            console.log("*******", results)
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


//---------------- majEtatEvent
exports.majEtatCarte = (req, res) => {
    try {
        const id = req.body.id;
        const etat = req.body.etat;

        db.query('UPDATE carte_metisse SET  etat=?  WHERE id= ?', [etat, id], async(error, results) => {
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


//__________________________________Carte metisse____________________________________

exports.listeCarteApk = (req, res) => {
    try {
        db.query('SELECT * FROM carte_metisse WHERE etat= 1', async(error, results) => {
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