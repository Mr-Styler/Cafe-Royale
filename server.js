const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
const mongoose = require('mongoose');
const server = require('./app');

const DB = process.env.DB_URI || 'mongodb://localhost/CookApp'

mongoose.connect(DB, {useNewUrlParser: true}).then(() => {
    console.log('DB connection successful')
}).catch((err) => {
    console.log(`ERROR!!!🔥🧨💣💥💥, can't connect to ${DB}`)
})

const port = process.env.PORT || 3300

server.listen(port, () => {
    console.log(`Cook App just started on port ${port}...`)
});