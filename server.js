const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const apiRouter = require("./Router/APIrouter")
app.use("/api",apiRouter)

const dbDriver =  process.env.DB_DRIVER
const port = process.env.PORT || 6700

mongoose.connect(dbDriver,{useNewUrlParser:false,useUnifiedTopology:false})
.then(result=>{
    app.listen(port,()=>{
        console.log(`app is running @ http://localhost:${port}`);
        console.log(`db is connected`);
    })
})
.catch(err=>{
    console.log(err.message);
})
