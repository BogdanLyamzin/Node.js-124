import mongoose from "mongoose";

const {DB_HOST} = process.env;

const connectDatabase = async()=> {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Successfully connected database");
  }
  catch(error) {
    console.log("Failed connect database", error);
    throw error;
  }
}

export default connectDatabase;
