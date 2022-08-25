const router = require('express').Router();

const { create, update,delete: deleteRole,get,getAll } = require('../controllers/category.controller');
const {auth , isAdmin} = require('../middlewares/auth')





router.post("/create", [auth,isAdmin] ,create)
router.post("/delete", [auth,isAdmin] ,deleteRole)
router.post("/update", [auth,isAdmin] ,update)
router.get("/getOne", [] ,get)
router.get("/getAll", [] ,getAll)




module.exports = router;