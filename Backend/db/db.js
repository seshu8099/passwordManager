import mongoose from "mongoose";

const DatabaseConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database is connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

export default DatabaseConnection;