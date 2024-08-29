import express from "express";
import connectDB from "./database";
import loggingMiddleware from "./middleware/logging-middleware";
import authRoutes from "./routes/auth-routes";
import trackRoutes from "./routes/track-routes";
import homePage from "./routes/home-page";

const app = express();

// Connect to MongoDB
void connectDB();

app.use(express.json());
app.use(loggingMiddleware);

app.use("/", homePage);
app.use(authRoutes);
app.use("/api/v1", trackRoutes);

app.listen(3000, () => console.log(`Server started on port 3000`));
