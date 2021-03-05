const mongoose = require('mongoose');
const uri = ""

module.exports= () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected.');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error' + err);
    });

    mongoose.Promise = global.Promise;

}

