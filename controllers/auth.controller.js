const User = require("../models").User;
const UserRole = require("../models").UserRole;
const Role = require("../models").Role;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app");
const { Op ,QueryTypes, where } = require("sequelize");
const { sequelize } = require("../models");
const{RandomNumberGenerator}=require("../util/passwordGeneratore")
const {TimeStampToDate}=require("../util/timeStampToDate")

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).send({
                status: 'Error',
                message: "User not found!"
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({
                status: "Error",
                message: "Incorrect password!"
            });
        }
        let userRoles = [];
        const roles = await UserRole.findAll({
            where: { userId: user.id },
            include: [
                {
                    model: Role
                }
            ]

        })
        roles.forEach(role => {
            userRoles.push(role.Role.title)
        })
        const userWithToken = generateToken(user.get({ raw: true }), userRoles)
        return res.send(userWithToken)

    } catch (error) {
        return res.status(500).send({
            status: 'Error',
            message: error.message
        });
    }
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
exports.loginWithEmail = async (req, res) => {
    const { email } = req.body;
    try {
   
        const user =await User.findOne({
            where: {
                email: email
            }
        })
       
        if (user) {
            console.log("iffffffffffffffffffffffffffffffffffffffffff")
            const verifyCode = RandomNumberGenerator()
            var data={
                verificationCode:verifyCode,
                verificationCodeExpireTime:TimeStampToDate(Date.now() + (3 * 60 * 1000)),
            }

            const updatedUser = await User.update(data, { where: { email: email } })
            res.status(200).send({
            message: "verifiction code send successfully!",
            codeExpireTime: TimeStampToDate(Date.now() + (3 * 60 * 1000)),
            status: 'Success',
            verificationCode: verifyCode,

        });

        } else {
            console.log("elessssssssssssssssssssssssss")
            const verifyCode = RandomNumberGenerator()
            const data = {
                email: req.body.email,
                verificationCode: verifyCode,
                isVerified: 0,
                verificationCodeExpireTime: TimeStampToDate(Date.now() + (3 * 60 * 1000))
            }
            await User.create(data)
            return res.status(200).json({
                message: "User successfully created",
                verificationCode: verifyCode

            })

        }
    } catch (e) {
        return res.status(500).send({
            status: 'Error',
            message: e.message
        })
    }
}
exports.loginWithVerifyCode=async(req,res)=>{
    try {
        const{email,verificationCode}=req.body;
        const user=await User.findOne({
        where:{email:email}})
        if (!user) {
            return res.status(404).send({
                status: 'Error',
                message: "User not found!"
            });}
        if (user.verificationCode != verificationCode || user.verificationCodeExpireTime < TimeStampToDate(Date.now())) {
            return res.status(403).send({
                message: "code is not valid!",
                status: 'Error'

            });
        }
        const userWithToken = generateToken(user.get({ raw: true }))
        return res.send(userWithToken)      

    } catch (e) {
        return res.status(500).send({
            status: 'Error',
            message: e.message
        })
    }
}
exports.updateUsers=async(req,res)=>{
    try {
        // const{password}=req.body.password;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const user = await User.update(req.body , {where:{id : req.user.id}})
        return res.status(200).send({
            message : 'Success',
            status:200
        })
    } catch (e) {
        return res.status(500).send({
            status:'Error',
            message:e.message
        })
    }


}
exports.forghetPassword=async(req,res)=>{
    try {
        const{email}=req.body;
        const user = await User.findOne({
            where:{email:email}})
        if(!user){
            return res.status(400).send({
                message:"user not found!",
                status:"Error"
            })
        }else if(user.verificationCode !== req.body.code || user.verificationCodeExpireTime < TimeStampToDate(Date.now())){
            return res.status(400).send({
                status: 'Error',
                message: 'Code is not valid!'
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
       const  updateUser = await User.update(req.body , {where:{email : req.user.email}})
      
        return res.status(200).send({
            message : 'Success',
            status:200
        })
    } catch (e) {
        return res.status(500).send({
            status:'Error',
            message:e.message
        })
    }
}
exports.changePassword = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.email } })
        if (!user) {
            return res.status(404).send({
                status: 'Error',
                message: 'User not found!'
            })
        } else {
            const validPassword = await bcrypt.compare(req.body.password,user.password);
            if (!validPassword) {
                return res.status(403).send({
                    status: 'Error',
                    message: 'Password does not match!'
                })
            } else {
                const dataToUpdate = {
                    password: await bcrypt.hash(req.body.newPassword, 10)
                }
                await User.update(dataToUpdate, { where: { email: req.user.email } })
                return res.status(200).send({
                    status: 'Success',
                    message: 'Password changed successfully!'
                })
            }
        }
    } catch (e) {
        return res.status(500).send({
            status:'Error',
            message:e.message
        })
    }
}
const generateToken = (user, roles) => {
    delete user.password;
    user.roles = roles;
    const token = jwt.sign(user, config.appKey, )

    user.authToken = token
    return { ...{ user }}
}
