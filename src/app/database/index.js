import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl = process.env.MONGODB_URI;

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Blog database connection is successful :)"))
    .catch((error) => console.log(error));
};

export default connectToDB;
