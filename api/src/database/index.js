const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pinecone:ffaXesJNRkMTn6h1@cluster0.zd5kvja.mongodb.net/?retryWrites=true&w=majority"
    );

    console.log("Succesfully Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDatabase,
};
