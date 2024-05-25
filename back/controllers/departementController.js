const Departement=require("../models/departementModel")

// Controller pour créer un nouveau département
exports.createDepartement = async (req, res) => {
    try {
      const { name } = req.body;
      const departement = new Departement({ name });
      await departement.save();
      res.status(201).json({ message: 'Département créé avec succès', departement });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller pour récupérer tous les départements
  exports.getAllDepartements = async (req, res) => {
    try {
      const departements = await Departement.find();
      res.status(200).json(departements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller pour récupérer un département par son ID
  exports.getDepartementById = async (req, res) => {
    try {
      const departement = await Departement.findById(req.params.id);
      if (!departement) {
        return res.status(404).json({ message: 'Département non trouvé' });
      }
      res.status(200).json(departement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller pour mettre à jour un département
  exports.updateDepartement = async (req, res) => {
    try {
      const { name } = req.body;
      const departement = await Departement.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      );
      if (!departement) {
        return res.status(404).json({ message: 'Département non trouvé' });
      }
      res.status(200).json({ message: 'Département mis à jour avec succès', Departement });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller pour supprimer un département
  exports.deleteDepartement = async (req, res) => {
    try {
      const departement = await Departement.findByIdAndDelete(req.params.id);
      if (!departement) {
        return res.status(404).json({ message: 'Département non trouvé' });
      }
      res.status(200).json({ message: 'Département supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };