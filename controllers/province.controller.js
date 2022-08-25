const models = require("../models");
const Province = models.Province;
const { Op: op } = require("sequelize");
const { sequelize } = require("../models");

exports.create = async (req, res) => {
  try {
    const province = await Province.create(req.body);
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
    const province = await Province.findAndCountAll({
      where: req.query,
      limit,
      offset,
    });
    const totalPage = Math.ceil(province.count / limit);
    if (page > totalPage) return res.json({ data: [] });
    res.status(200).send({
      status: "Success",
      data: province.rows,
      length: province.count,
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
    const province = await Province.findOne({ where: { id: req.params.id } });
    res.status(200).send({
      status: "Success",
      data: province,
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
    const [rows, result] = await Province.update(req.body, {
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
    await Province.destroy({
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