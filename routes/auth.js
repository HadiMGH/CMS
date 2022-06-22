const router = require("express").Router();
const {
  login,
  refreshToken,
  register,
  getAllAdmins,
  getAllUsers,
  updateUser,
  deleteUser,
  addAdmin,
} = require("../controllers/auth.controller");
const { auth, isAdmin } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1.0/auth/login:
 *  post:
 *   tags: [Auth]
 *   description: Login user
 *   produces: [application/json]
 *   parameters: [{name: "body", in: "body", example: {email: "test@gmail.com", password: "123456"}}]
 *   responses: { 200: {status:"Success",message: "Login successfully!"}, 400: {status:"Error",message: "Email and password are required!"} , 500: {status:"Error",message: "Internal server error"}}
 * /api/v1.0/auth/register:
 *  post:
 *   tags: [Auth]
 *   description: Register user
 *   produces: [application/json]
 *   parameters: [{name: "body", in: "body", example: {firstName:"John","lastName":"Doe",email: "test@gmail.com", password: "123456",gender:",male",dateOfBirth:"1009-09-09",nationalCode:"4276656542",phone:"09129876543"}}]
 *   responses: { 200: {status:"Success",message: "Register successfully!"}, 400: {status:"Error",message: "Email and password are required!"} , 500: {status:"Error",message: "Internal server error"}}
 * /api/v1.0/auth/refreshToken:
 *  get:
 *   tags: [Auth]
 *   description: Get Refresh Token
 *   produces: [application/json]
 *
 *
 *
 */

router.post("/login", login);
router.post("/register", [], register);
router.get("/refreshToken", [auth], refreshToken);
router.get("/getAllAdmins", [auth, isAdmin], getAllAdmins);
router.get("/getAllUsers", [auth, isAdmin], getAllUsers);
router.post("/addAdmin", [auth, isAdmin], addAdmin);
router.put("/updateUser", [auth, isAdmin], updateUser);
router.delete("/deleteUser", [auth, isAdmin], deleteUser);

module.exports = router;
