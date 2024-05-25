const express = require("express");
const congeRoutes = express.Router();
const congeController = require("../controllers/congeController");
const authController = require("../controllers/authController");
// congeRoutes.route("/").post(congeController.createConge);
congeRoutes.use(authController.protect);
// congeRoutes.route("/").get(congeController.getAllConges);
congeRoutes.route("/me").get(congeController.getMyConge);
congeRoutes.route("/").post(congeController.createConge).get(congeController.getAllConges)
congeRoutes
  .route("/:id")
  .patch(congeController.updateConge)
  .delete(congeController.deleteConge);



module.exports = congeRoutes;
