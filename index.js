const express = require("express");
const app = express()
app.use(express.json())

const port = 5000

app.listen(port, () => console.log(`Server Running at ${port}`))

const mongoose = require("mongoose");

const userSchema = require('./schema')
const dbname = "first"
const dburl = `mongodb+srv://karthik:karthik@cluster0.mks9w.mongodb.net/${dbname}`

mongoose.connect(dburl)
    .then(() => console.log("mongoose connected"))
    .catch((err) => console.log(err.message))

app.get("/api/users", async (req, res) => {
    try {
        const result = await userSchema.find()
        res.json(result)
    } catch (error) {
        console.error(error.message);
    }
})
app.post("/api/users", async (req, res) => {
    try {
        const result = userSchema.insertMany(req.body)
        res.json(result)
    } catch (error) {
        console.error(error.message);
        res.statusCode(400).send({ errormessage: `Please provide name and bio for the user.` })
    }
})

app.get("/api/users/:id", async (req, res) => {
    try {
        const result = await userSchema.findOne({ prograd_id: parseInt(req.params.id) })
        res.send(result)
    } catch (error) {
        console.log(error.message);
        res.sendStatus(400)
    }
})

app.put("/api/users/:id", async (req, res) => {
    try {
        const result = await userSchema.findOneAndUpdate({ prograd_id: parseInt(req.params.id) }, { name: req.body.name })
        res.send(result)
    } catch (error) {
        console.log(error.message);
        res.sendStatus(400)
    }
})

app.delete("/api/users/:id", async (req, res) => {
    try {
        const result = await userSchema.findOneAndDelete({ prograd_id: parseInt(req.params.id) })
        res.send(result)
    } catch (error) {
        console.log(error.message);
        res.sendStatus(400)
    }
})