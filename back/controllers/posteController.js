const Post = require("../models/posteModel");

// Controller pour créer un nouveau poste
exports.createPost = async (req, res) => {
  try {
    const { name, department } = req.body;
    const post = new Post({ name, department });
    await post.save();
    res.status(201).json({ message: "Poste créé avec succès", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller pour récupérer tous les postes
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("department");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller pour récupérer un poste par son ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Poste non trouvé" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller pour mettre à jour un poste
exports.updatePost = async (req, res) => {
  try {
    const {
      name,
      description,
      department,
      responsibilities,
      skills_required,
      salary,
    } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        department,
        responsibilities,
        skills_required,
        salary,
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Poste non trouvé" });
    }
    res.status(200).json({ message: "Poste mis à jour avec succès", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller pour supprimer un poste
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Poste non trouvé" });
    }
    res.status(200).json({ message: "Poste supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
