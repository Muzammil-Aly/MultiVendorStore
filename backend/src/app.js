import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // extended allows objects within objects

app.use(express.static("public")); //used it for files like pdf , images etc to store at local server

app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";

app.use("/api/v1/users", userRouter);

app.use("/api/v1/product", productRouter);

export { app };
