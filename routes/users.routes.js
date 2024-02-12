import express from "express"

import {     
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    // addFavoriteVehicle
} from '../controllers/users.controller.js'

import { loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

//AUTH
router.post('/login', loginUser);

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/').post(createUser);
router.route('/:id').patch(editUser);
router.route('/:id').delete(deleteUser);



export default router;