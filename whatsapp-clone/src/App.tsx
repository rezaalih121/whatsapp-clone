
import './App.css';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import { AttachFile, InsertEmoticon, Mic, Search } from '@mui/icons-material';
import ChatItem from './chat-item';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';


const uri_ws = 'http://localhost:3000';

const socket = io(uri_ws);

const myPhoneNumber = prompt('your number?','')

function App() {
  const [message,setMessage] = useState('')
  const [phoneNumberChat , setPhoneNumberChat] = useState('')
  const [socketIdChat , setSocketIdChat] = useState('')
  const [mySocketId , setMySocketId] = useState('')
  const [myFriendsList , setMyFriendsList] = useState('')
  const [myAvatar , setMyAvatar] = useState('')


  const updateUser = async (socketId:String)=> {
    console.log('==========================updateUser');
    
    let res = await fetch(uri_ws + '/userw' , {
      method: 'PUT',
      body:JSON.stringify({phoneNumber:myPhoneNumber,socketId:socketId}),
      headers:{'content-type':'application/json'}
    });
    let data = await res.json()
    setMySocketId(data.socketId);
    console.log('socketId : ' + data.socketId + '-------------------------------------------');
    console.log('Data : ');
    console.log(data);
    getUserInfo(myPhoneNumber);

  }
  const getUserInfo = async (Phone:any)=> {
   
    let res = await fetch(uri_ws + '/userw/' +Phone , {
      method: 'GET',
      headers:{'content-type':'application/json'}
    });
    let data = await res.json()
    console.log(data.socketId);
    console.log(data.phoneNumber);
    console.log(myFriendsList);
    setPhoneNumberChat(data.phoneNumber)
    setSocketIdChat(data.socketId)


    setMyFriendsList(data.friendsList)
    setMyAvatar(data.avatarImage)
  }
  const getUser = async ()=> {
      
    let  number = prompt('Type phone number' , '')
   
    let res = await fetch(uri_ws + '/userw/' +number , {
      method: 'GET',
      headers:{'content-type':'application/json'}
    });
    let data = await res.json()
    console.log(data.socketId);
    console.log(data.phoneNumber);
    console.log(myFriendsList);
    setPhoneNumberChat(data.phoneNumber)
    setSocketIdChat(data.socketId)

  }

  const sendMsg = (e:any) => {
    if(e.key == 'Enter'){
      socket.emit('messages' , {socketId:socketIdChat , phoneNumber:phoneNumberChat, message:message, from: {
        socketId: mySocketId , myPhoneNumber:myPhoneNumber 
      }})
      setMessage('')
      const chatBody = document.getElementById('chat-body')
      chatBody!.innerHTML += '<span class="message-out">' +  message + '</span><br />';

    }
  }
  useEffect(()=>{
    socket.on('connect' , ()=>{
      console.log('connected id : '+ socket.id);
      updateUser(socket.id)
      setSocketIdChat(socket.id)
    })

    socket.on('messages' , (data)=>{
      const chatBody = document.getElementById('chat-body')
      chatBody!.innerHTML += '<span class="message-in">' + data.message + '</span><br />'
      setSocketIdChat(data.from.socketId)
    })

    return ()=>{
      socket.off('connect')
      socket.off('messages')
    }
  },[])

  var trinity = 'http://2.bp.blogspot.com/-pFh5cVd7mlI/UgQnNeh335I/AAAAAAAAM1s/6Io8KEtQGGA/s180/Trinity.jpg';
  var morpheus = 'https://www.listchallenges.com/f/items/18b1a46f-36c9-4af4-aedd-faae3fcfed4b.jpg';
  var smith = 'https://www.monologuedb.com/wp-content/uploads/2011/04/Hugo-Weaving-Agent-Smith-The-Matrix-150x150.gif';
  //var neo = 'http://www.avatarstock.com/img/matrix-avatar-1487_15827.jpg';


  return (
    < >
    <div className="app">
      <div className='app-body'>
        <div className='sidebar'>
          <div className='sidebar-header'>
            <Avatar src={myAvatar}/>
            <div className='sidebar-header-right'>
              <DonutLargeIcon color='action'/>
              <span onClick={getUser}>
                <ChatIcon color='action'/>
              </span> 
              <MoreVertIcon color='action'/>
            </div>
          </div>
          <div className='sidebar-search'>
            <div className='search-container'>
              <Search color='action'/>
              <input placeholder='Search or start a new chat' type="text" />
            </div>
          </div>
          <div className='sidebar-list'>
          <span ><ChatItem title='Trinnity' info='hello' avatar={trinity}/></span> 
          <span ><ChatItem title='Morpheus' info='hello friend' avatar={morpheus}/></span> 
          <span ><ChatItem title='Smith' info='hello ' avatar={smith}/></span> 
          </div>
        </div>
        <div className='chat'>
          <div className="bg-chat"></div>
            <div className="chat-header">
              <Avatar src={trinity}/>
              <div className="chat-heser-info">
                <span className="title">Trinity</span><br/>
                <span className="info">last seen at 05:00</span>
              </div>
              <div className="chat-header-right">
                <Search color='action'/>
                <MoreVertIcon color='action' />
              </div>
            </div>
            <div id='chat-body' className='chat-body'>


            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">

              <div className="chat-footer-actions">
                <InsertEmoticon color='action' />
                <AttachFile color='action' />
              </div>
              <div className="chat-footer-input">
                <input placeholder='Type a message' 
                  value={message}
                  onKeyDown={sendMsg}
                  onChange={(e)=>setMessage(e.target.value)}
                />
              </div>
              <div className="chat-footer-mic" color='action' >
                <Mic />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
