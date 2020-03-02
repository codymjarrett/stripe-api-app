const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('dotenv').config()


const dbPassword = process.env.DB_PASSWORD
const uri = `mongodb+srv://codyjarrett:${dbPassword}@cluster0-e7mrb.mongodb.net/shoeStore`
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}

mongoose.connect(uri, options)
mongoose.connection.once('open', () =>
	console.log(`Connected to mongo at ${uri}`)
)
