const models = require("../models");
const Country = models.Country;
const { Op: op } = require("sequelize");
const { sequelize } = require("../models");

exports.create = async (req, res) => {
  try {
    const country = await Country.create(req.body);
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
    const country = await Country.findAndCountAll({
      where: req.query,
      limit,
      offset,
    });
    const totalPage = Math.ceil(country.count / limit);
    if (page > totalPage) return res.json({ data: [] });
    res.status(200).send({
      status: "Success",
      data: country.rows,
      length: country.count,
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
    const country = await Country.findOne({ where: { id: req.params.id } });
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
    const [rows, result] = await Country.update(req.body, {
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
    await Country.destroy({
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