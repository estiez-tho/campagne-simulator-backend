import app from "./src/server";
import mongoose from "mongoose";

const mongoUrl =
  process.env.MONGO_PROD_URI || "mongodb://localhost:27017/adventurecapitalist";
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
