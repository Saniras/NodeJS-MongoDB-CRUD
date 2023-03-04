const  mongoose  = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!');
}).catch(() => {
    console.log('MongoDB not connected 🙂');
});