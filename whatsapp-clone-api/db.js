const {Mongoose , Schema , model, default: mongoose} = require('mongoose');

const uri_db = 'mongodb+srv://whatsappdb:psZNJNSY30fxcCHA@cluster0.tp6azbm.mongodb.net/whatsapp?retryWrites=true&w=majority'
const UserwShema = new Schema({
    name:String,
    phoneNumber:String,
    socketId:String
});

const UserwModel = new model('Userw', UserwShema)

module.exports.Userw = UserwModel

module.exports.init = async()=>{
    await mongoose.connect(uri_db)
    await UserwModel.deleteMany({})
    await new UserwModel({name:'Neo' , phoneNumber:'121777' }).save()
    await new UserwModel({name:'Trinity' , phoneNumber:'121110' }).save()
    await new UserwModel({name:'Morpheus' , phoneNumber:'121121' }).save()
    await new UserwModel({name:'Smith' , phoneNumber:'666' }).save()
    console.log('db is ready');
}