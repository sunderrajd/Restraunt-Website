import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "RESTRAUNT",
    })
    .then(() => {
      console.log("Connected to DB successfully");
    })
    .catch((err) => {
      console.log(`some error occured while connecting to DB! ${err}`);
    });
};
