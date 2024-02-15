const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const fileUpload = require("express-fileupload");
const passport = require("passport");

const SecurityResource = require("./resources/SecurityResource");
const UtilisateurResource = require("./resources/UtilisateurResource");

require("./config/passport");

const app = express();

app.use(fileUpload());
app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

const verification_authentification = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Merci de vous connecter" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

app.use("/api", SecurityResource);
app.use("/api/utilisateur", verification_authentification, UtilisateurResource);

db.sequelize.sync().then(() => {
  app.listen(9000, () => {
    console.log("http://localhost:9000");
  });
});
