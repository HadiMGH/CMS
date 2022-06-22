const router = require("express").Router();

const {
  create,
  get,
  getAll,
  update,
  delete: deleteRole,
} = require("../controllers/role.controller");
const { auth, isAdmin } = require("../middlewares/auth");

router.post("/", [auth, isAdmin], create);
router.get("/", [auth, isAdmin], getAll);
router.get("/:id", [auth, isAdmin], get);
router.put("/:id", [auth, isAdmin], update);
router.delete("/:id", [auth, isAdmin], deleteRole);


module.exports = router;