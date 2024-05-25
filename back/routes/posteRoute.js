const express = require('express');
const router = express.Router();
const posteController = require('../controllers/posteController');

// Route pour créer un nouveau poste
router.post('/', posteController.createPost);

// Route pour récupérer tous les postes
router.get('/', posteController.getAllPosts);

// Route pour récupérer un poste par son ID
router.get('/:id', posteController.getPostById);

// Route pour mettre à jour un poste
router.put('/:id', posteController.updatePost);

// Route pour supprimer un poste
router.delete('/:id', posteController.deletePost);

module.exports = router;