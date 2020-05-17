import app from "./src/server";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl =
  process.env.MONGO_URI || "mongodb://localhost:27017/adventurecapitalist";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("\nDatabase connection successful\n");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
