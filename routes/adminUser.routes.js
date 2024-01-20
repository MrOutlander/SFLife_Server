import express from "express"

import {     
    getAllAdminUsers,
    getAdminUserById,
    createAdminUser,
    editAdminUser,
    deleteAdminUser 
} from '../controllers/adminUsers.controller.js'

const router = express.Router();

router.route('/').get(getAllAdminUsers);
router.route('/:id').get(getAdminUserById);
router.route('/').post(createAdminUser);
router.route('/:id').patch(editAdminUser);
router.route('/:id').delete(deleteAdminUser);

export default router;