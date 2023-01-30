const mongoose = require("mongoose");

const connectDB = async (connectStr) => {
    try {
        mongoose.set("strictQuery", true);
        const conn = await mongoose.connect(connectStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`mongodb connected: ${conn.connection.host}`);
        return;
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = { connectDB };
