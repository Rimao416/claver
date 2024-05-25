const mongoose = require("mongoose");
const congeSchema = new mongoose.Schema({
  debutConge: {
    type: Date,
    required: true,
  },
  finConge: {
    type: Date,
    required: true,
  },
  raison: {
    type: String,
    required: true,
  },
  explication: {
    type: String,
  },
  statut: {
    type: String,
    default: "EN ATTENTE",
    enum: ["EN ATTENTE", "ACCEPTE", "REJETEE"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Conge", congeSchema);
