const catchAsync = require("../utils/catchAsync");
const Projet = require("../models/projectModel");
const factory = require("./handlerFactory");
exports.createProject = catchAsync(async (req, res, next) => {
  const project = await (await Projet.create(req.body));
  res.status(201).json({
    status: "success",
    data: {
      project,
    },
  });
});
exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projets = await Projet.find().populate("user");
  res.status(200).json({
    status: "success",
    results: projets.length,
    projets,
  });
});
exports.updateProject = catchAsync(async (req, res, next) => {
  const project = await Projet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});
exports.deleteProject = catchAsync(async (req, res, next) => {
  await Projet.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
