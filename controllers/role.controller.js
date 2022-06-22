const models = require("../models");
const Role = models.Role;

exports.create = async (req, res) => {
  try {
    const data = await Role.create(req.body);
    res.status(201).send({
      status: "Success",
      messages: "Data created",
      data: data.dataValues,
    });
  } catch (e) {
    return res.status(500).send({
      status: "Error",
      message: e.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Role.findAll();
    res.status(200).send({
      status: "Success",
      messages: "Data retrieved",
      data: data,
    });
  } catch (e) {
    return res.status(500).send({
      status: "Error",
      message: e.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const data = await Role.findByPk(req.params.id);
    res.status(200).send({
      status: "Success",
      messages: "Data retrieved",
      data: data,
    });
  } catch (e) {
    return res.status(500).send({
      status: "Error",
      message: e.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await Role.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      status: "Success",
      messages: "Data updated",
      data: data,
    });
  } catch (e) {
    return res.status(500).send({
      status: "Error",
      message: e.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await Role.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      status: "Success",
      messages: "Data deleted",
      data: data,
    });
  } catch (e) {
    return res.status(500).send({
      status: "Error",
      message: e.message,
    });
  }
};
