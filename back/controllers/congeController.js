const catchAsync = require("../utils/catchAsync");
const Conge = require("../models/congeModel");
exports.createConge = catchAsync(async (req, res, next) => {
  const conge = await Conge.create({
    ...req.body,
    user: req.user.id,
  });
  res.status(201).json({
    status: "success",
    data: {
      conges: conge,
    },
  });
});
exports.getMyConge = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const conges = await Conge.find({ user: req.user.id });
  res.status(200).json({
    status: "success",
    results: conges.length,
    data: {
      conges,
    },
  });
});

exports.updateConge = catchAsync(async (req, res, next) => {
  const conge = await Conge.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      conge,
    },
  });
});

exports.deleteConge = catchAsync(async (req, res, next) => {
  await Conge.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
});
// get all conges

exports.getAllConges = catchAsync(async (req, res, next) => {
  const conges = await Conge.find().populate("user")
  res.status(200).json({
    status: "success",
    results: conges.length,
    data: {
      conges,
    },
  });
});
