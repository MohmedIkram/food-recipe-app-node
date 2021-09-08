import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/recipe.js";
import { userRouter } from "./routes/user.js";
const app = express();
const PORT = process.env.PORT || 5000;

console.log("test connection");
// Opened Connection to DB, movieData - db name
const url = "mongodb+srv://ikram:ikram98@cluster0.rlfdm.mongodb.net/FoodRecipe";

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected"));

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (request, respone) => {
  respone.send("Welcome to node app!!!! Hi Guys");
});

app.use("/users", userRouter);

app.use("/recipes", router);

app.listen(PORT, () => console.log("The server is started in " + PORT));
