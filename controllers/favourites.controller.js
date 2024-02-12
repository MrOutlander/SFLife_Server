import Favourite from '../mongodb/models/favourites.js'

const addFavourite = async (req, res) => {
    const { userId, vehicleId } = req.body;

    try {
        let favourite = await Favourite.findOne({ user: userId });

        if (!favourite) {
            favourite = new Favourite({ user: userId, vehicles: [vehicleId] });
        } else {
            if (!favourite.vehicles.includes(vehicleId)) {
                favourite.vehicles.push(vehicleId);
            } else {
                return res.status(400).json({ message: 'Viatura ja esta nos favoritos' });
            }
        }

        await favourite.save();
        res.status(201).json(favourite);
    } catch (error) {
        console.error('Erro ao adicionar viatura:', error);
        res.status(500).json({ message: 'Erro ao adicionar aos favoritos' });
    }
};

const removeFavourite = async (req, res) => {
    const { userId, vehicleId } = req.body;

    try {
        const favourite = await Favourite.findOne({ user: userId });

        if (favourite && favourite.vehicles.includes(vehicleId)) {
            favourite.vehicles = favourite.vehicles.filter(id => id.toString() !== vehicleId);
            await favourite.save();
            res.status(200).json(favourite);
        } else {
            res.status(404).json({ message: 'Viatura não existe nos favoritos' });
        }
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
        res.status(500).json({ message: 'Erro ao remover dos favoritos' });
    }
};


export {
    addFavourite,
    removeFavourite
}