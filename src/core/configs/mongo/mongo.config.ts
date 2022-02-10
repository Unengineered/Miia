import dotenv from 'dotenv'

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
}

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'admin';
const MONGO_PASSWORD = process.env.MONGO_USERNAME || 'hDB0xtfpAkYsqZer';
const MONGO_HOST = process.env.MONGO_URL || `cluster0.xlja1.mongodb.net/mia`;

const MongoConfig = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

export default {MongoConfig}