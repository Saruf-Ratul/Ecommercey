import mongoose from "mongoose";

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectToDB = async() => {
    const connectionUrl =
        "mongodb+srv://srft12345678:srft12345678@traversymedia.rxkgp.mongodb.net/proshop?retryWrites=true&w=majority";
    // "mongodb://localhost:27017/ecommerce";

    mongoose
        .connect(connectionUrl, configOptions)
        .then(() => console.log("Ecommerce database connected successfully!"))
        .catch((err) =>
            console.log(`Getting Error from DB connection ${err.message}`)
        );
};

export default connectToDB;