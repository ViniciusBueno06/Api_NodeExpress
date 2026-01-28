import express from "express"
import cors from "cors"

import userRoutes from "./routes/userRoutes.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/users",userRoutes);

app.use(errorMiddleware);

export default app;