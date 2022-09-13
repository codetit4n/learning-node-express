require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        // connect to db
        await connectDB(process.env.MONGO_URI)
        // delete data that is already there
        await Product.deleteMany();
        // adding all products to db
        await Product.create(jsonProducts)
        console.log("Success!");
        // exiting the node application with error code 0 - for success
        process.exit(0)
    } catch (err) {
        console.log(err);
        // exiting the node application with error code 1 - for error
        process.exit(1)
    }
}
start()