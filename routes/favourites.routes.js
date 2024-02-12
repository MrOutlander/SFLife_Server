import express from 'express';
import { addFavourite, getAllFavourites, removeFavourite } from '../controllers/favourites.controller.js'; // Adjust path as necessary

const router = express.Router();

router.post('/favourites/', getAllFavourites);
router.post('/favourites/add', addFavourite);
router.post('/favourites/remove', removeFavourite);

export default router;
