import mongoose, { mongo } from 'mongoose'

mongoose.connect("mongodb://localhost/api-automata",{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(db => console.log('db conectado'))
.catch(error => console.log(error))