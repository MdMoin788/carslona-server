const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.json());


app.use(cors())


const connect = require("./config/db")


const randomsController = require("./controllers/randomsController")

app.use("/random", randomsController)

app.listen(process.env.PORT || 5000, async () => {
    try {
        await connect();
        console.log('Server Connected Success')
    } catch (error) {
        console.log(error)
    }
})
