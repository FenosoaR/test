const express = require("express");
const {
  creer_ecole,
  creer_eleve,
  supprimer_eleve,
  liste_eleve,
  modifier_eleve,
  trier_par_classe,
} = require("../controllers/UtilisateurController");
const router = express.Router();

router.post("/creer_ecole", creer_ecole);
router.post("/creer_eleve/:EcoleId", creer_eleve);
router.get("/liste_eleve/:EcoleId", liste_eleve);
router.delete("/supprimer_eleve/:id/:EcoleId", supprimer_eleve);
router.patch("/modifier_eleve/:id/:EcoleId", modifier_eleve);
router.get("/trier_par_classe/:EcoleId", trier_par_classe);

module.exports = router;
