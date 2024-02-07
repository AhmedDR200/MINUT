const express = require('express');
const router = express.Router();

const{ 
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    deactivateLoggedUser,
    updateLoggedUserData,
    updateLoggedUserPassword,
    getLoggedUserData,
    changePassword
} = require('../controllers/userController');

const {
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    getUserValidator,
    changePasswordValidator,
    updateLoggedUserValidator
} = require('../utils/validetors/userValidetor')

const { protect, allowedTo } = require("../controllers/authController");

// Admin Routes
router.route('/')
.get(
    protect,
    allowedTo("admin"),
    getAllUsers
)
.post(
    protect,
    allowedTo("admin"),
    createUserValidator,
    createUser
);

router.route('/:id')
.get(
    getUserValidator,
    getSingleUser
)
.put(
    protect,
    allowedTo("admin"),
    updateUserValidator,
    updateUser
)
.delete(
    protect,
    allowedTo("admin"),
    deleteUserValidator,
    deleteUser
);

router.put("/changePassword/:id",
    protect,
    allowedTo("admin"),
    changePasswordValidator,
    changePassword
);


// Logged User Routes
router.put('/updateMyPassword',
 protect,
 allowedTo("guest"),   
 updateLoggedUserPassword
);

router.put('/updateMyData',
 protect,
 allowedTo("guest"),
 updateLoggedUserValidator,
 updateLoggedUserData
);

router.put('/deactivateMe',
 protect,
 allowedTo("guest"),
 deactivateLoggedUser
);

router.get("/getMe",
 protect,
 getLoggedUserData,
 getSingleUser,
);


module.exports = router;