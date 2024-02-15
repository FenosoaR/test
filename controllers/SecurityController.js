const { Utilisateur } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const inscription = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, confirmation } = req.body;

    const utilisateur = await Utilisateur.findOne({ where: { email } });

    if (utilisateur) {
      return res.status(200).json({ message: "Email déja utilisé " });
    } else {
      if (confirmation != mot_de_passe)
        return res.status(200).json({ message: "Mot de passe incorrecte" });

      const mot_de_passe_hache = bcrypt.hashSync(mot_de_passe, 12);

      const nouveau_utilisateur = Utilisateur.build({
        nom,
        prenom,
        email,
        mot_de_passe: mot_de_passe_hache,
      });

      await nouveau_utilisateur.save();

      return res.status(200).json({ message: "Inscription reussie" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const connexion = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    const utilisateur = await Utilisateur.findOne({ where: { email } });

    if (!utilisateur)
      return res.status(500).json({ message: "Email invalide" });

    const isValid = bcrypt.compareSync(mot_de_passe, utilisateur.mot_de_passe);

    if (!isValid)
      return res.status(500).json({ message: "Mot de passe incorrecte" });

    const jwToken = jwt.sign(
      {
        id: utilisateur.id,
        email: utilisateur.email,
      },
      "secret"
    );

    return res.status(200).json({ message: "Connecté", utilisateur, jwToken });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { inscription, connexion };
