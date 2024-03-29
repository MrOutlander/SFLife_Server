import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'
import helmet from "helmet"

import connectDB from "./mongodb/connect.js";
import usersRouter from './routes/users.routes.js'
import locationsRouter from './routes/locations.routes.js'
import reservationsRouter from './routes/reservations.routes.js'
import vehiclesRouter from './routes/vehicles.routes.js'
import vehicleCategoryRouter from './routes/vehicleCategory.routes.js'
import adminUserRouter from './routes/adminUser.routes.js'
import favouritesRouter from './routes/favourites.routes.js'

dotenv.config();

const app = express();


// IF THE APP IN THE BROWSER STOPS WORKING, REMOVE THIS AND "corsOptions" INSIDE CORS
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === undefined) { // When request is from a mobile app
          callback(null, true);
        } else {
          // existing logic for web origins
          const allowedOrigins = ['http://82.7.165.34', 'http://localhost:5173', '192.168.0.14', 'http://101.188.67.134','https://sflife-demo.netlify.app/', 'https://sunny-chimera-aab910.netlify.app' ];
          if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        }
    },
    allowedHeaders: ['X-App-Client', 'Content-Type', 'Authorization'], // include your custom header here
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(helmet());


app.get('/', (req, res) => {
    res.send({ message: 'Good Morning Vietanm!!!'})
})

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/admin_users', adminUserRouter);
app.use('/api/v1/locations', locationsRouter);
app.use('/api/v1/reservations', reservationsRouter);
app.use('/api/v1/vehicles', vehiclesRouter);
app.use('/api/v1/vehicle_Category', vehicleCategoryRouter);
app.use('/api/v1/favourites', favouritesRouter);
app.get('/api/config', (req, res) => {
    res.json({
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      baseUrl: process.env.API_BASE_URL,
      renderedData: process.env.RENDERED_DATA_URL,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryUploadPresetThumb: process.env.CLOUDINARY_UPLOAD_PRESET_THUMB,
      cloudinaryUploadPresetVehicles: process.env.CLOUDINARY_UPLOAD_PRESET_VEHICLES,
    });
});


const startServer = async () => {
    try {
        // Connect to database...
        connectDB(process.env.MONGODB_URL);
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log( 'Server started on port http://localhost:8080' ))
    } catch (error) {
        console.log(error)
    }
}

startServer();
