import express, { json } from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import {createRoles}  from "./libs/inicioSetup"
const app = express()

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

createRoles();

app.set('pkg',pkg);
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req,res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});

app.use('/api/productos',productsRoutes)

app.use('/api/auth',authRoutes)

app.use('/api/user',userRoutes)


export default app;