const express = require('express')
const mongoose = require('mongoose')
const usermodel = require('./user')
const app = express()
const port = 4001
require('dotenv').config()

mongoose.connect(process.env.DBurl, {useNewUrlParser: true, useUnifiedTopology: true,}).then(()=>{
    app.listen(port, ()=>{
        console.log(`connected to DB`)
        console.log(`Running on ${port}`)
    })
});

// -----------------create----------------
const usersArray = [
    {name: "Eya", email: 'eya@gmail.com'},
    {name: "Mariem", email: 'mariem@gmail.com'},
    {name: "Amna", email: 'amna@gmail.com'}
]

usermodel.create(usersArray).then((data)=>{
    // console.log(`saved people : ${data}`)
}).catch((err)=>{
    console.log(err)
})
// -----------------End create----------------



// ----------------------------------------------
app.get('/users',async(req,res)=>{
    try {
        const users = await usermodel.find();
        res.json(users)
    } catch (error) {
        res.status(404).json(`error : ${error}`)
    }
})

app.post('/users', async(req,res)=>{
    try {
        const newUser = new usermodel({name: 'ahmed', email: 'ahmed@gmail.com'})
        await newUser.save()
        res.json(newUser)
    } catch (error) {
        res.status(404).json(`error : ${error}`)
    }
})

app.put('/users', async(req,res)=>{
    try {
        const updatedUser = usermodel.findByIdAndUpdate("6506cb89fca387fba4e1c3f1" , {name: 'sarra', email:'sarra@gmail.com'})
        if (!updatedUser) {
            res.status(404).json("user not found")
        } else {
            res.json(`User updated succesfully : ${updatedUser}`)
        }
    } catch (error) {
        res.status(404).json(`error : ${error}`)
    }
})


app.delete('/users/:id', async(req,res)=>{
    try {
        const userId = req.params.id
        const updatedUser = usermodel.findByIdAndDelete(userId)
        if (!updatedUser) {
            res.status(404).json("user not found")
        } else {
            res.json(`User deleted succesfully `)
            console.log(`deleted successfully`)
        }
    } catch (error) {
        res.status(404).json(`error : ${error}`)
    }
})