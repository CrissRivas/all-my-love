import express, { json } from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import cors from 'cors'
import { createRoles } from "./libs/inicioSetup"
import helmet from "helmet";

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import artistaRoutes from './routes/artista.routes'
import inicioRoutes from './routes/inicio.routes'
import paperRoutes from './routes/paper.routes'
import shotRoutes from './routes/shot.routes'
import originRoutes from './routes/origin.routes'
import enviosRoutes from './routes/envios.routes'

const app = express();
createRoles();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.set('pkg', pkg);
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});

app.use('/api/productos', productsRoutes)

app.use('/api/auth', authRoutes)

app.use('/api/user', userRoutes)

app.use('/api/artista', artistaRoutes)

app.use('/api/inicio', inicioRoutes)

app.use('/api/paper', paperRoutes)

app.use('/api/shot', shotRoutes)

app.use('/api/origin', originRoutes)

app.use('/api/envios', enviosRoutes)

export default app;