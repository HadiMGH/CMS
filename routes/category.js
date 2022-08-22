const router = require('express').Router();
const {
    delete:deleteCategory,
    create,
    get,
    update
} = require("../controllers/category.controller");
const { validate } = require("../validators");








router.post("/", [auth, isAdmin, carBrandRule(), validate], create);