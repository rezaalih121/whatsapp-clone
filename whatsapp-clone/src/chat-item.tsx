import { Avatar } from "@mui/material";
import './chat-item.css';

export default function ChatItem(props:any){
    return (
        <div className="chat-item">
            <span/>
            <Avatar src={props.avatar}/>
            <div className="item-info">
                <span className="title">{props.title}</span><br/>
                <span className="info">{props.info}            
                </span>
            </div>
        </div>
    )
}