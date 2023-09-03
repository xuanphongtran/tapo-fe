import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Body from './Body'
export default function Layout(){
    return(
        <BrowserRouter>
            <Body/>
        </BrowserRouter>
    )
}