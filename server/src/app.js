import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import homeRouter from "./routes/home.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const __dirname= path.resolve();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes declaration
app.use("/api", homeRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

export { app };
