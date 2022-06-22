const User = require("../models").User;
const UserRole = require("../models").UserRole;
const Role = require("../models").Role;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app");
const { Op } = require("sequelize");

//Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
        status: "Error",
        message: "Email and password are required!",
        });
    }
    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    if (!user) {
        return res.status(400).send({
        status: "Error",
        message: "Email or password is incorrect!",
        });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).send({
        status: "Error",
        message: "Email or password is incorrect!",
        });
    }
    const token = jwt.sign({ id: user.id }, config.appKey, {
        expiresIn: "1h",
    });
    res.send({
        status: "Success",
        message: "Login successfully!",
        token: token,
    });
}

    //Register Controller
exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
        status: "Error",
        message: "Email and password are required!",
        });
    }
    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        return res.status(400).send({
        status: "Error",
        message: "Email already exists!",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        email: email,
        password: hashedPassword,
    });

    const memberRole = await Role.findOne({
        where: {
            title: "Member",
        },
    });
    await UserRole.create({
        userId: newUser.id,
        roleId: memberRole.id,
    });

    const token = jwt.sign({ id: newUser.id }, config.appKey, {
        expiresIn: "1h",
    });
    res.send({
        status: "Success",
        message: "Register successfully!",
        token: token,
    });
}


//Add new Admin
exports.addAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
        status: "Error",
        message: "Email and password are required!",
        });
    }
    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        return res.status(400).send({
        status: "Error",
        message: "Email already exists!",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        email: email,
        password: hashedPassword,
    });
    
    const adminRole = await Role.findOne({
        where: {
            title: "Admin",
        },
    });
    await UserRole.create({
        userId: newUser.id,
        roleId: adminRole.id,
    });
    res.send({
        status: "Success",
        message: "Register successfully!",
    });
}

//Refresh Token Controller
exports.refreshToken = async (req, res) => {
    const token = jwt.sign({ id: req.user.id }, config.appKey, {
        expiresIn: "1h",
    });
    res.send({
        status: "Success",
        message: "Refresh token successfully!",
        token: token,
    });
}


//Get All Users
exports.getAllUsers = async (req, res) => {
    const users = await User.findAll({
        include: [
            {
                model: UserRole,
                as: "userRoles",
                include: [
                    {
                        model: Role,
                        as: "role",
                    },
                ],
            },
        ],
    });
    res.send({
        status: "Success",
        message: "Get all users successfully!",
        data: users,
    });
}

//get All Admins
exports.getAllAdmins = async (req, res) => {
    const users = await User.findAll({
        include: [
            {
                model: UserRole,
                as: "userRoles",
                where: {
                    roleId: {
                        [Op.ne]: 1,
                    },
                },
                include: [
                    {
                        model: Role,
                        as: "role",
                    },
                ],
            },
        ],
    });
    res.send({
        status: "Success",
        message: "Get all admins successfully!",
        data: users,
    });
}

//Update User 
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
        status: "Error",
        message: "Email and password are required!",
        });
    }
    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        return res.status(400).send({
        status: "Error",
        message: "Email already exists!",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    await User.update(req.body, {
        where: {
            id: id,
        },
    });
    res.send({
        status: "Success",
        message: "Update user successfully!",
    });
}

//Delete User
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.destroy({
        where: {
            id: id,
        },
    });
    res.send({
        status: "Success",
        message: "Delete user successfully!",
    });
}

