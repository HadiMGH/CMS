const models = require("../models");
const Township = models.Township;
const { Op: op } = require("sequelize");
const { sequelize } = require("../models");

exports.create = async (req, res) => {
  try {
    const township = await Township.create(req.body);
    res.status(201).send({ status: "Success", messages: "Data created" });
  } catch (e) {
    res.status(500).send({
      status: "Error",
      message: e.message,
    });
  }
};

exports.getAll = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  delete req.query.limit;
  delete req.query.page;

  let offset = 0 + (page - 1) * limit

  try {
    const township = await Township.findAndCountAll({
      where: req.query,
      limit,
      offset,
    });
    const totalPage = Math.ceil(township.count / limit);
    if (page > totalPage) return res.json({ data: [] });
    res.status(200).send({
      status: "Success",
      data: township.rows,
      length: township.count,
      pagination: {
        page,
        totalPage,
      },
    });
  } catch (e) {
    res.status(500).send({
      status: "Error",
      message: e.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const township = await Township.findOne({ where: { id: req.params.id } });
    res.status(200).send({
      status: "Success",
      data: country,
    });
  } catch (e) {
    res.status(500).send({
      status: "Error",
      message: e.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const [rows, result] = await Township.update(req.body, {
      where: { id: req.params.id },
    });
    return res
      .status(200)
      .send({ status: "Success", message: "Data updated successfully" });
  } catch (e) {
    res.status(500).send({
      status: "Error",
      message: e.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Township.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({
      status: "Success",
      message: "Country deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      status: "Error",
      message: e.message,
    });
  }
};