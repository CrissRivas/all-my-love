import mongoose, { mongo } from 'mongoose'
import config from "./config";

mongoose.connect(config.mongodbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(db => console.log('db conectado'))
    .catch(error => console.log(error))