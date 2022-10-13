import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useEthers } from "@usedapp/core"
import { AppBar, Toolbar, Box, Button, IconButton, Typography, Stack } from "@mui/material"
import { Link } from 'react-router-dom'
import BoltIcon from '@mui/icons-material/Bolt';

import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'

export default function NewHomeHeader(){
    const { account, activateBrowserWallet } = useEthers()
    const [username, setUsername] = useState(Cookies.get('username'));


    const isConnected = account !== undefined

    useEffect( () => {
        // console.log("in useeffect")
        setUsername(Cookies.get('username'))
  
        if(typeof username !== 'undefined' && username!==''){
          console.log("username: "+username)
          // console.log(typeof username !== 'undefined')
          // console.log(username !== '')
        }
        else{
          console.log("not logged in")
          console.log("username: "+username)
          // console.log(typeof username !== 'undefined')
          // console.log(username !== '')
          window.location.href = "http://localhost:3000/login";
        }
      }, [])


    return(

        <AppBar position='static'>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <BoltIcon />
                </IconButton>

                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Just Me Prototype
                </Typography>



                <Stack direction='row' spacing={2}>
                    <Button color='inherit' href='/about'> About </Button>
                    <Button color='inherit' href='#'> Our Mission </Button>
                    <Button color='inherit' href='/patientRegister'> Register </Button>
                    {isConnected ? 
                    <Button color='inherit'>
                        Connected to MetaMask!
                    </Button> : 
                    <Button color='inherit' onClick={()=> activateBrowserWallet()}>
                        Connect    
                    </Button>}

                    {(typeof username !== 'undefined' && username!=='') ? 
                    <CDropdown>
                    <CDropdownToggle color="primary"> Welcome { username }! </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="/myHealth"> My Health History </CDropdownItem>
                      <CDropdownItem href="/myDoctors"> My Doctors </CDropdownItem>
                      <CDropdownItem href="/generalHealthRegister"> Edit / Add Health Records </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>: 
                    <Button color='inherit' 
                    onClick={()=>window.location.href = "http://localhost:3000/login"}>

                        Log In
                    </Button>}

                </Stack>
            </Toolbar>
        </AppBar>
    )
}