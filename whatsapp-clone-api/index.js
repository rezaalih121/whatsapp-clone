const express = require('express');
const app = express();
const server = require('http').createServer(app);
const db = require('./db');
const req = require('express/lib/request');
const res = require('express/lib/response');
const Server =  require('socket.io')
const cors = require('cors');
const { log } = require('console');
const io = Server(server , 
    { 
        cors: {
            origin:'http://localhost',
            methods:['GET' , 'POST']
        }
    }
    )
    db.init()
    
    app.use(cors())
    app.use(express.json())
    
    server.listen(3000 ,() => {
        console.log('Listen on 3000');
    });
    
    app.get('/userw/:phoneNumber' , async (req,res) => {
        
        const userw = await db.Userw.findOne({phoneNumber:req.params.phoneNumber}).exec()
        console.log(userw + '=====>>>'+req.params.phoneNumber);
        res.send(userw)
    });
    
    app.get('/userw', () => {
        const users = db.Userw.find({}).exec(); 
        res.send(users);
    });

    app.put('/userw',async (req,res)=>{
    const result = await db.Userw.updateOne({phoneNumber:req.body.phoneNumber},{socketId:req.body.socketId})
    res.send(result)
})


io.on('connection' , (socket)=>{
    socket.on('messages',(data)=>{
        socket.to(data.socketId).emit('messages', data)
    })
})
