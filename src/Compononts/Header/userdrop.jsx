import { Box, List, ListItem } from '@mui/material'
import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, setEmail, setPhoneNumber } from '../../Context/Slice';



const liststyle={
    color:'rgb(68, 68, 68)',
    borderBottom:'1px dashed rgb(222, 222, 222)',
    p:'5px 5px',
    '&:hover':{
        color:'black',
        backgroundColor:'rgb(227, 227, 227)'
    }
}
const linkStyle={fontSize:'12px',textDecoration:'none',color:'rgb(68, 68, 68)',}
const Userdrop = () => {
    const dispatch = useDispatch();
    const userIds= JSON.parse(localStorage.getItem('userId'))
    const Users=useSelector((state)=>state.stateSlice.UserDeatials)
    const finduser=Users.find((item)=>item.userId===userIds)
    const [showItem,setShowItem]=useState(false)

    const logout=()=>{
        localStorage.clear()
        dispatch(login(false))
        dispatch(setEmail(null))
        dispatch(setPhoneNumber(null))
    }
  return (
    <>
        <Box  onMouseLeave={()=>setShowItem(false)} sx={{position:'relative'}}>
            <Box sx={{display:'flex',alignItems:'center'}} onMouseEnter={()=>setShowItem(true)}>
                <PersonIcon sx={{p:0,color:'black',fontSize:'16px',fontWeight:'100',opacity:'.7'}}/>
                <Box sx={{p:0,fontSize:'14px',display:'inline-block'}}>{finduser.firstName}</Box>
                <ExpandMoreIcon sx={{p:0,color:'black',fontSize:'16px',fontWeight:'100',opacity:'.7'}}/>
            </Box>
            {showItem?(
            <Box sx={{position:'absolute',zIndex:2,backgroundColor:'#fff',minWidth:'200px',right:'0px'}}>
                <List sx={{p:0}}>
                    <ListItem sx={liststyle}><Link to={`/Account?users=${userIds}`} style={linkStyle}> My Account</Link></ListItem>
                    <ListItem sx={liststyle}><Link to="/basket" style={linkStyle}>My Basket</Link></ListItem>
                    <ListItem sx={liststyle}><Link to="/Basket" style={linkStyle}>My Orders</Link></ListItem>
                    <ListItem sx={liststyle}><Link to="/Basket" style={linkStyle}>My Walet</Link></ListItem>
                    <ListItem sx={liststyle}><Link to="/Basket" style={linkStyle}>My Rewards</Link></ListItem>
                    <ListItem sx={liststyle}><Link to="/Basket" style={linkStyle}>Ask Us</Link></ListItem>
                    <ListItem sx={liststyle}><Link to="/*" style={linkStyle}>Customer Service</Link></ListItem>
                    <ListItem sx={liststyle}><Link onClick={logout} style={linkStyle}>Logout</Link></ListItem>
                </List>

            </Box>
            ):(console.log('anu'))}
        </Box>
    </>
  )
}

export default Userdrop