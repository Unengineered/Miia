import * as app from 'firebase-admin'
const serviceAccount = require('./everything-25-firebase-adminsdk-35m8b-5493345397.json')
app.initializeApp({credential: app.credential.cert(serviceAccount)})
export {app}