const express = require("express");
const router = express.Router();
const projetController = require("./../controllers/projetController");
router
  .route("/")
  .get(projetController.getAllProjects)
  .post(projetController.createProject);

router.route("/:id").put(projetController.updateProject);
module.exports = router;
