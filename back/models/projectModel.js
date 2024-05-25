const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true,"Veuillez entrer le nom du projet"],
    trim: true,
  },
  dateDebut: {
    type: Date,
    required: [true,"Veuillez entrer la date de debut du projet"],
  },
  dateSoumission: {
    type: Date,
    required: [true,"Veuillez entrer la date de soumission du projet"],
  },
  statut:{
    type:String,
    default:"EN COURS",
    enum:["EN COURS","TERMINE","ANNULE"]
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
