const { Ecole, Eleve } = require("../models");
const { Op } = require("sequelize");

const creer_ecole = async (req, res) => {
  try {
    const { nom } = req.body;

    const nouvelle_ecole = Ecole.build({
      nom,
      UtilisateurId: req.user.id,
    });
    await nouvelle_ecole.save();

    return res.status(200).json({ message: "Ecole creée avec succès" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const creer_eleve = async (req, res) => {
  try {
    const EcoleId = req.params.EcoleId;

    const { nom, prenom, classe, age } = req.body;

    const nouveau_eleve = Eleve.build({
      nom,
      age,
      prenom,
      classe,
      EcoleId,
      UtilisateurId: req.user.id,
    });

    await nouveau_eleve.save();

    return res.status(200).json({ message: "Eleve créee avec succès" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const liste_eleve = async (req, res) => {
  try {
    const EcoleId = req.params.EcoleId;
    const liste = await Eleve.findAll({
      where: { EcoleId, UtilisateurId: req.user.id },
    });
    return res.status(200).json({ message: "Liste des élèves", liste });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const supprimer_eleve = async (req, res) => {
  try {
    const EcoleId = req.params.EcoleId;
    const id = req.params.id;

    await Eleve.destroy({ where: { id, EcoleId, UtilisateurId: req.user.id } });

    return res.status(200).json({ message: "Eleve supprimé avec succès" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const modifier_eleve = async (req, res) => {
  try {
    const { nom, prenom, age, classe } = req.body;
    const id = req.params.id;
    const EcoleId = req.params.EcoleId;

    await Eleve.update(
      {
        nom,
        prenom,
        age,
        classe,
      },
      { where: { UtilisateurId: req.user.id, EcoleId, id } }
    );

    return res.status(200).json({ message: "modifié avec succes" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const trier_par_classe = async (req, res) => {
  try {
    const EcoleId = req.params.EcoleId;
    const liste = await Eleve.findAll({
      where: { EcoleId, UtilisateurId: req.user.id },
      order: [["classe"]],
    });
    return res
      .status(200)
      .json({ message: "Trie liste des élèves par classe", liste });
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  creer_ecole,
  creer_eleve,
  liste_eleve,
  supprimer_eleve,
  modifier_eleve,
  trier_par_classe,
};
