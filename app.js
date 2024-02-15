const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const fileUpload = require("express-fileupload");
const passport = require("passport");

const SecurityResource = require("./resources/SecurityResource");
const UtilisateurResource = require("./resources/UtilisateurResource");

require("./config/passport");

// const verifier_token = (req , res , next ) =>{
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Extraction du token JWT depuis l'en-tête Authorization

//     if (!token) {
//         return res.status(401).json({ message: 'Merci de vous connecter.' }); // Token non fourni, renvoie un message personnalisé
//     }
//     next()
// }

const app = express();

app.use(fileUpload());
app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use("/api", SecurityResource);
app.use(
  "/api/utilisateur",
  passport.authenticate("jwt", { session: false }),
  UtilisateurResource
);

db.sequelize.sync().then(() => {
  app.listen(9000, () => {
    console.log("http://localhost:9000");
  });
});
