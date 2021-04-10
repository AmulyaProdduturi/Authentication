const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const app=express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('The server has started on port: ${PORT}'));

//mongodb+srv://Amulya:<password>@cluster0.3a79u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex: true,
},
(err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
}
);

app.use("/users", require("./routes/userRouter"));