import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
export default function ChatUserRender(object){
    const link = `/message/dm/${object.object._id}`;
    return(
        <Link to={link} className="chatSection w-100 m-0 p-0 row dotText text-light" style={{height:'50px', textDecoration:'none'}}>
            <div className="col-3 m-auto p-0 center">
                <FontAwesomeIcon icon="fa-solid fa-user" />
            </div>
            <div className="col-9 text-start p-0 m-auto fs-5 pr-2">
                {object.object.name}
            </div>
        </Link>
    )
}
