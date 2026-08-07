const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req,res) => {
    res.json({ message: "Up", service: "task-manager-api" });
});

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
// console.log("PORT:", PORT);
mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    });