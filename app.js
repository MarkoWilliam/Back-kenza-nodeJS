// On appelle içi les dependance qu'on a besoin
const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const multer = require('multer');
dotenv.config({ path: './.env' });

const app = express();

const corsOptions = {
    origin: '*'
}



app.use(cors(corsOptions));

//--Connection avec la base de donnée--
const db = mysql.createConnection({
    //--On a déclarer tous dans .env et l'appelle seulement
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

//--Tester la connection avec la base de donnée
db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})

app.use('/', require('./routes/page'))

//--------Authentification-------------------
app.use('/auth', require('./routes/auth'));

//-------Produit------------
app.use('/produit', require('./routes/produit'));

//-------Produit------------
app.use('/banniere', require('./routes/banniere'));
// app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/auth']}));


////////////////////////////////
////////////Modif TOJO//////////
////////////////////////////////
///----------Module upload image
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


///----------------Upload image Banniere
app.post('/upload', upload.single('file'), (req, res, next) => {
    console.log(req.file.path);
    const newname = req.file.path.split('\\');
    console.log();
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });
    } else {
        console.log('File is available!');
        return res.json({
            name_img: newname[1]
        });
    }
});
/////////////////////////fin

app.post('*', (req, res) => {
    const nom = req.body.nom;
    const user = { name: nom };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})


app.listen(process.env.PORT, () => {
    console.log("Server started on Port 8080");
})