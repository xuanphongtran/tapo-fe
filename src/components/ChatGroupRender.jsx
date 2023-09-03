import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, useNavigate } from 'react-router-dom'
import { VolumeRender, MuteVolumeRender } from './Volume'
import ZoomImageModal from './ZoomImageModal'
import TimeSince from '../library/TimeSince'
import axios from 'axios'
import Icon from '../Data/Icon'
import io from 'socket.io-client'
import api from '../API/api'
import sound from '../Data/Sound.mp3'
export default function ChatGroupRender({Objects, allGroups, setAllGroups}){
    const socket = useRef()
    let { id } = useParams()
    const message = useRef()
    const addImage = useRef()
    const navigate = useNavigate()
    const [imgSource, setImageSource] = useState()
    const element = useRef()
    const [sendButton, setSendButton] = useState(true)
    const [data, setData] = useState(Icon)
    const [allMessages, setAllMessages] = useState([])
    const [volume, setVolume] = useState(true)
    useEffect(() => {
        element.current.scrollTop = element.current.scrollHeight
    })
    useEffect(() => {
        socket.current = io("https://siri-real-time-chat-app-server-side.onrender.com/",{
            withCredentials: true,
        })
        socket.current.on('user-chat', (message) => {
            if(
                message.to_id === id
            ){
                setAllMessages(oldArray => [...oldArray, message])
                if(message.from_id._id !== sessionStorage.getItem('AccountID') && volume === true){
                    const audio = new Audio(sound);
                    audio.play()
                    .then(() => {})
                    .catch(() => {})
                }
            }
        })
        return () => {
            socket.current.disconnect()
        }
    }, [id, allMessages, volume])
    useEffect(() => {
        const to = sessionStorage.getItem('AccountID')
        axios.post(api.getGroupMessagesChat, {
            user1_id: to,
            user2_id: id
        },{
            headers: {
                withCredentials: true
            }
        }).then(res => {
            setAllMessages(res.data)
        })
    }, [id])
    const GetName = () => {
        if(Objects.length === 0) return <></>
        return(
            <b>
                {Objects.find(group => group._id === id).name}
            </b>
        )
    }
    const sendMessage = () => {
        socket.current.emit('on-chat',{
            type: 'g',
            chatDate: new Date(),
            content:  message.current.value,
            from_id: sessionStorage.getItem('AccountID'),
            to_id: id,
            chatCategory: "0"
        })
        message.current.value = ''
    }
    const sendPicture = (name) => {
        socket.current.emit('on-chat',{
            type: 'g',
            chatDate: new Date(),
            content:  name,
            from_id: sessionStorage.getItem('AccountID'),
            to_id: id,
            chatCategory: "1"
        })
    }
    const showPicture = () => {
        if(addImage.current.value === "" || addImage.current.value === null) return
        const formData = new FormData();
        formData.append('file', addImage.current.files[0])
        formData.append('name', addImage.current.files[0].name)
        axios.post(api.loadGroupImage, formData,
            {
                headers: {
                  'Content-Type': "multipart/form-data",
                  withCredentials: true
                }
            }
        ).then(res => {
            if(res.data === null){
                alert("Gửi ảnh thất bại")
            }
            sendPicture(res.data.name)
        }) 
        addImage.current.value = ""
    }
    const submit = (event) => {
        if(event.which === 13) {
            if(message.current.value.length !== 0){
                sendMessage()
            }
        }
    }
    const MessageRender = (message) => {
        if(message.message.content === "The message was deleted!!"){
            return(
                <div className="rounded m-0 mb-5 p-2 bg-secondary" style={{maxWidth:'100%',width:'max-content', height:'max-content'}}>
                    <div className="text-light" style={{maxWidth:'100%',width:'max-content', height:'max-content'}}>
                        <div className="text-start">
                            <FontAwesomeIcon icon="fa-solid fa-user" />&nbsp;<span className="fw-bold dotText">{message.message.from_id.name}</span> - <span className="fst-italic text-light"><TimeSince date={(new Date(message.message.chatDate))}/></span>
                        </div>
                        <div className="text-start" style={{maxWidth:'100%'}}>
                            <span className="text-decoration-line-through" style={{maxWidth:'100%', wordWrap:'break-word'}}>{message.message.content}</span>
                        </div>
                    </div>
                </div>
            )
        }
        if(message.message.from_id._id === sessionStorage.getItem('AccountID')){
            if(message.message.chatCategory === "1"){
                return(
                    <div className="rounded m-0 mb-5 p-2 bg-mainColor" style={{maxWidth:(window.screen.width > window.screen.height? '50%':'75%'),width:'max-content', height:'max-content'}}>
                        <div className="text-light" style={{maxWidth:'100%',width:'max-content', height:'max-content'}}>
                            <div className="text-start dotText">
                                <FontAwesomeIcon icon="fa-solid fa-user" />&nbsp;<span className="fw-bold dotText">{message.message.from_id.name}&nbsp;(You)</span> - <span className="text-light fst-italic"><TimeSince date={(new Date(message.message.chatDate))}/></span>
                            </div>
                            <button data-bs-toggle="modal" data-bs-target="#zoomImageModal" onClick={() => setImageSource(api.getImage + "/" + message.message.content)} className="text-start border-0 p-0 m-0 rounded-3" style={{maxWidth:'100%',background:'none'}}>
                                <img className="rounded-3" alt="" src={api.getImage + "/" + message.message.content} style={{maxWidth:'100%', wordWrap:'break-word'}}/>
                            </button>
                        </div>
                    </div>
                )
            }
            return(
                <div className="rounded m-0 mb-5 p-2 bg-mainColor" style={{maxWidth:'100%',width:'max-content', height:'max-content'}}>
                    <div className="text-light" style={{maxWidth:'100%',width:'max-content', height:'max-content'}}>
                        <div className="text-start dotText">
                            <FontAwesomeIcon icon="fa-solid fa-user" />&nbsp;<span className="fw-bold dotText">{message.message.from_id.name}&nbsp;(You)</span> - <span className="fst-italic text-light"><TimeSince date={(new Date(message.message.chatDate))}/></span>
                        </div>
                        <div className="text-start" style={{maxWidth:'100%'}}>
                            <span style={{maxWidth:'100%', wordWrap:'break-word'}}>{message.message.content}</span>
                        </div>
                    </div>
                </div>
            )
        }
        if(message.message.chatCategory === "1"){
            return(
                <div className="rounded m-0 mb-5 p-2 bg-light" style={{maxWidth:(window.screen.width > window.screen.height? '50%':'75%'),width:'max-content', height:'max-content'}}>
                    <div className="text-dark" style={{marginLeft:'auto',maxWidth:'100%',width:'max-content', height:'max-content'}}>
                        <div className="text-start dotText">
                            <FontAwesomeIcon icon="fa-solid fa-user" />&nbsp;<span className="fw-bold dotText">{message.message.from_id.name}</span> - <span className="fst-italic text-secondary"><TimeSince date={(new Date(message.message.chatDate))}/></span>
                        </div>
                        <button data-bs-toggle="modal" data-bs-target="#zoomImageModal" onClick={() => setImageSource(api.getImage + "/" + message.message.content)} className="text-start border-0 p-0 m-0 rounded-3" style={{maxWidth:'100%',background:'none'}}>
                            <img className="rounded-3" alt="" src={api.getImage + "/" + message.message.content} style={{maxWidth:'100%', wordWrap:'break-word'}}/>
                        </button>
                    </div>
                </div>
            )
        }
        return (
            <div className="rounded m-0 mb-5 p-2 bg-light" style={{ maxWidth: '100%', width: 'max-content', height: 'max-content' }}>
                <div className="text-dark" style={{ marginLeft: 'auto', maxWidth: '100%', width: 'max-content', height: 'max-content' }}>
                    <div className="text-start dotText">
                        <FontAwesomeIcon icon="fa-solid fa-user" />&nbsp;<span className="fw-bold dotText">{message.message.from_id.name}</span> - <span className="fst-italic text-secondary"><TimeSince date={(new Date(message.message.chatDate))} /></span>
                    </div>
                    <div className="text-start" style={{ maxWidth: '100%' }}>
                        <span style={{ maxWidth: '100%', wordWrap: 'break-word' }}>{message.message.content}</span>
                    </div>
                </div>
            </div>
        )
        
    }
    const leaveGroup = () => {
        axios.put(api.leaveGroup,{
            _id: sessionStorage.getItem("AccountID"),
            group_id: id
        },{
            headers: {
                withCredentials: true
            }
        }).then(res => {
            if(res.data === null){
                alert("Failed to leave the group, please try again")
                return
            }
            for(var i = 0; i < allGroups.length; i++){
                if(allGroups[i]._id === res.data._id){
                    allGroups.splice(allGroups.indexOf(allGroups[i]), 1)
                    setAllGroups([...allGroups])
                    navigate("/")
                    break
                }
            }
        })
    }
    const RenderIcon = ({Icon}) => {
        return (
            <>
                <button onClick={() => {
                    message.current.value = message.current.value + Icon
                    checkSendButton()
                }} className="col border-0 icon">{Icon}</button>
            </>
        )
    } 
    const checkSendButton = () => {
        if(message.current.value.trim() === '' || message.current.value.trim().length === 0){
            setSendButton(true)
        }else{
            setSendButton(false)
        }
    }
    return(
        <div className="w-100 h-100 m-0 p-0 text-light">
            <div className="w-100 center m-0 p-0" style={{height:'15%',boxShadow:'0px 3px 3px #000316'}}>
                <div className="text-start dotText" style={{width:'45%'}}>
                    <FontAwesomeIcon icon="fa-solid fa-people-group" />
                    &nbsp; <GetName/>
                </div>
                <div className="drop-down text-end" style={{width:'45%'}}>
                    <button className="settingButton" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                        <FontAwesomeIcon icon="fa-solid fa-bars" />
                    </button>
                    <ul className="dropdown-menu">
                        {volume === true? <VolumeRender setVolume={setVolume}/>:<MuteVolumeRender setVolume={setVolume}/>}
                        <span className="dropdown-item-text"><FontAwesomeIcon icon="fa-solid fa-plus" /> &nbsp;Group id: <b>{id}</b></span>
                        <button className="dropdown-item text-danger" onClick={leaveGroup}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> &nbsp;Leave this group</button>
                    </ul>
                </div>
            </div>
            <div className="w-100 center m-0 pt-3 pb-3 ps-2 pe-2" style={{height:'70%'}}>
                <div ref={element} className="w-100 h-100 pe-1 text-start" style={{overflowY:'auto'}}>
                    {
                        allMessages.map(message => <MessageRender key={message._id} message={message}/>)
                    }
                </div>
                <ZoomImageModal imgSource={imgSource}/> 
            </div>
            <div className="w-100 center m-0 p-0" style={{height:'15%'}}>
                <div className="text-start row" style={{width:'95%'}}>
                    <div className="drop-down col-1 m-0 p-0">
                        <button data-bs-toggle="dropdown" aria-expanded="false" className="h-100 w-100 fs-5 m-0 p-0 border-0 text-light" style={{background:'none'}}><FontAwesomeIcon icon="fa-solid fa-face-smile" /></button>
                        <div className="dropdown-menu" style={{maxWidth:"250px"}}>
                            {data.map(icon => <RenderIcon key={icon} Icon={icon}/>)}
                        </div>
                    </div>
                    <div className="col-1 m-0 p-0">
                        <input ref={addImage} onChange={showPicture} type="file" style={{display:'none'}}/>
                        <button className="fs-5 text-light m-0 p-0 border-0 h-100 w-100" style={{background:'none'}} onClick={() => {
                            addImage.current.click()
                        }}><FontAwesomeIcon icon="fa-solid fa-image" /></button>
                    </div>
                    <input ref={message} onKeyDown={event => submit(event)} onKeyUp={checkSendButton} className="col-7 m-auto fw-bold rounded-3" style={{transition:'0.1s',padding:'5px',background:'none', border:'0.5px solid white'}}/>
                    <button disabled={sendButton} onClick={sendMessage} className="col-2 btn m-auto btn-success text-center text-light rounded-3" style={{padding:'5px'}}><FontAwesomeIcon icon="fa-solid fa-paper-plane" /></button>
                </div>
            </div>
        </div>
    )
}