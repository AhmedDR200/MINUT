const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    changePassword,
    getLoggedUserData,
    updateLoggedUserPassword,
    updateLoggedUserData,
    deactivateLoggedUser,
    makeReservation
} = require('../controllers/userController');

const {
    createUserValidator,
    updateLoggedUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changePasswordValidator
} = require('../utils/validetors/userValidetor')

const { protect, allowedTo } = require("../controllers/authController");


router.get("/getMe",
 protect,
 getLoggedUserData,
 getSingleUser,
);

router.patch("/changeMyPassword",
 protect,
 updateLoggedUserPassword,
);

router.patch("/changeMyData",
 protect,
 updateLoggedUserValidator,
 updateLoggedUserData,
);

router.delete("/deactivateMe",
 protect,
 deactivateLoggedUser,
);

router.post("/makeReservation",
 protect,
 makeReservation
);

// Admin can access this routes
router.use(protect, allowedTo('admin'))

router.patch(
    "/changePassword/:id",
    changePasswordValidator,
    changePassword
);

router.route('/')
.get(protect, allowedTo('admin'), getAllUsers)
.post(
    createUserValidator,
    createUser
);

router.route('/:id')
.get(
    // getUserValidator,
    getSingleUser
)
.patch(
    updateUserValidator,
    updateUser
)
.delete(
    deleteUserValidator,
    deleteUser
);



module.exports = router;