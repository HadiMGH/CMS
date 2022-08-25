const Category = require("../models").Category;
const Product = require("../models").Product;
const ProductDetail = require("../models").ProductDetails;
const Supplier = require("../models").Supplier;
const Status = require("../models").Status;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app");
const { Op ,QueryTypes, where } = require("sequelize");
const { sequelize } = require("../models");

exports.create = async (req, res) => {
    try {
      const productDetail = await ProductDetail.create(req.body);
      res.status(201).send({ status: "Success", messages: "Data created" });
    } catch (e) {
      res.status(500).send({
        status: "Error",
        message: e.message,
      });
    }
  };
  exports.update = async (req, res) => {
    try {
      const productDetail = await ProductDetail.update(req.body, {
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
      await ProductDetail.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.json({
        status: "Success",
        message: "Car deleted successfully",
      });
    } catch (e) {
      return res.status(500).json({
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
      const productDetail = await ProductDetail.findAndCountAll({
        where: req.query,
        limit,
        offset,
      });
      const totalPage = Math.ceil(productDetail.count / limit);
      if (page > totalPage) return res.json({ data: [] });
      res.status(200).send({
        status: "Success",
        data: productDetail.rows,
        length: productDetail.count,
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
      const productDetail = await ProductDetail.findOne({ where: { id: req.params.id } });
      res.status(200).send({
        status: "Success",
        data: productDetail,
      });
    } catch (e) {
      res.status(500).send({
        status: "Error",
        message: e.message,
      });
    }
  };