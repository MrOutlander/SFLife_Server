import express from "express";

import {     
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser
} from '../controllers/users.controller.js'

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/').post(createUser);
router.route('/:id').patch(editUser);
router.route('/:id').delete(deleteUser);

export default router;