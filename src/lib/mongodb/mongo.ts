import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const globalMongoose = global as { mongoose?: mongoose.Mongoose };

let connected = false;

export async function connectToDB() {
  if (!connected) {
    try {
      if (globalMongoose.mongoose) {
        mongoose.set("debug", process.env.NODE_ENV === "development");
        return globalMongoose.mongoose;
      }

      mongoose.set("strictQuery", true);

      const conn = await mongoose.connect(MONGODB_URI!);

      globalMongoose.mongoose = conn;
      connected = true;

      console.log("Připojeno k MongoDB");
      return conn;
    } catch (error) {
      console.error("Chyba při připojení k MongoDB:", error);
      throw error;
    }
  }

  return globalMongoose.mongoose;
}
