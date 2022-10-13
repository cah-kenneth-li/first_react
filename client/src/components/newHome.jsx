import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { DAppProvider, ChainId } from '@usedapp/core'
// import { Button } from '@mui/material'
import { default as NewHomeHeader } from "./newHomeHeader"
import { default as NewHomeBody } from "./newHomeBody"

export default function NewHome(){

    const [username, setUsername] = useState(Cookies.get('username'));

    const config = {
        supportedChains: [ChainId.Rinkeby, ChainId.Mainnet, ChainId.Polygon]
        
    }
    
    return(
        <>
        <DAppProvider config={config}>
            <NewHomeHeader />
            <NewHomeBody />
        </DAppProvider>
        </>
    )
}