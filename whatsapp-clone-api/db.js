const {Mongoose , Schema , model, default: mongoose} = require('mongoose');

//const uri_db = 'mongodb://mongo:27017'
const uri_db = 'mongodb+srv://whatsappdb:psZNJNSY30fxcCHA@cluster0.tp6azbm.mongodb.net/whatsapp?retryWrites=true&w=majority'
const UserwShema = new Schema({
    name:String,
    phoneNumber:String,
    socketId:String,
    avatarImage:String,
    friendsList:Array
});

const UserwModel = new model('Userw', UserwShema)

module.exports.Userw = UserwModel

module.exports.init = async()=>{
    await mongoose.connect(uri_db)
    await UserwModel.deleteMany({})
    await new UserwModel({name:'Neo' , phoneNumber:'121777', avatarImage:'http://www.avatarstock.com/img/matrix-avatar-1487_15827.jpg', friendsList:["121777","121110","121121"]}).save()
    await new UserwModel({name:'Trinity' , phoneNumber:'121110' , avatarImage:'http://2.bp.blogspot.com/-pFh5cVd7mlI/UgQnNeh335I/AAAAAAAAM1s/6Io8KEtQGGA/s180/Trinity.jpg',friendsList:["121777","121110","121121"]}).save()
    await new UserwModel({name:'Morpheus' , phoneNumber:'121121' , avatarImage:'https://www.listchallenges.com/f/items/18b1a46f-36c9-4af4-aedd-faae3fcfed4b.jpg',friendsList:["121777","121110","121121"]}).save()
    await new UserwModel({name:'Smith' , phoneNumber:'666' , avatarImage:'https://www.monologuedb.com/wp-content/uploads/2011/04/Hugo-Weaving-Agent-Smith-The-Matrix-150x150.gif', friendsList:["121777"]}).save()
    console.log('db is ready');
}
