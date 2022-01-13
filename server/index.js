import express from "express";
import mongoose from "mongoose";
import path from "path";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import filmRouter from "./routers/filmRouter.js";
import commentRouter from "./routers/commentRouter.js";
import reviewRouter from "./routers/reviewRouter.js";
import passRouter from "./routers/passwordRouter.js";
import cors from "cors"

const app = express();
const CORS = cors();
dotenv.config();

const PORT = 5000; // port connect to backend
//const username='OneMoreReview';
//const password='TheFourNations';
const __dirname = path.resolve(); // get the current path ..\server

// connect to database
// using .env file to config
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8gxb0.mongodb.net/cluster0?retryWrites=true&w=majority`
        );
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
connectDB();

// app use
app.use(CORS);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/resources", express.static(path.join(__dirname, "/resources")));

// routers
app.use("/api/users", userRouter);
app.use("/api/films", filmRouter);
app.use("/api/comments", commentRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/password", passRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
    console.log(__dirname);
});
