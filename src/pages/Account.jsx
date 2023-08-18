import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Header from '../Compononts/Header/Header';
import { Box, Button, Container, Dialog, DialogActions, Grid, IconButton, List, ListItem, TextField, Typography } from '@mui/material';
import { Create, Mail } from '@mui/icons-material';
import Fotter from '../Compononts/Fotter/Fotter';
import { setUserDetails } from '../Context/Slice';
const listStyle={
    color: '#6D6E71',
    font:'400 16px "Roboto Slab", serif',
    margin:' 0',
    padding: "5px 0 5px 5px",
    '&:hover':{
        color: '#096',
        cursor:'pointer'
    },
}
const editItem={border:'1px solid #d0d0d0',width:'50%',display:'flex',alignItems:'center',justifyContent:'space-between',borderRadius:'3px',p:'8px 0 8px 10px',mb:2}
const Account = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userIds = new URLSearchParams(location.search).get('users');
    console.log('userIds:', userIds);
    const Users = useSelector((state) => state.stateSlice.UserDeatials);
    console.log('Users:', Users);
    const finduser = Users.find((item) => item.userId === userIds);
    console.log('finduser:', finduser);
    const [showForm, setShowForm] = useState(false);
    const [open, setOpen] = useState(false);
    const [opennumber, setOpennumber] = useState(false);
    const [openemail, setOpenemail] = useState(false);
    const [updatedFirstName, setUpdatedFirstName] = useState(finduser.firstName);
    const [updatedLastName, setUpdatedLastName] = useState(finduser.lastName);
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(finduser.userPhone);
    const [updatedEmail, setUpdatedEmail] = useState(finduser.userMail);
  
    
  
    const updatedUserDeatils = (data) => {
      dispatch(setUserDetails(data));
      console.log(data)
      setShowForm(false)
    };
  
    const handleFirstNameChange = (event) => {
      setUpdatedFirstName(event.target.value);
    };
  
    const handleLastNameChange = (event) => {
      setUpdatedLastName(event.target.value);
    };
  
    const handlePhoneNumberChange = (event) => {
      setUpdatedPhoneNumber(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setUpdatedEmail(event.target.value);
    };
  
    const nameUpdate = () => {
      const firstName = updatedFirstName.trim() !== '' ? updatedFirstName : finduser.firstName;
      const lastName = updatedLastName.trim() !== '' ? updatedLastName : finduser.lastName;
      const updatedUser = {
        ...finduser,
        firstName: firstName,
        lastName: lastName,
      };
      updatedUserDeatils(updatedUser);
      handleClose();
    };
  
    const handlePhoneNumberUpdate = () => {
      const phoneNumber = updatedPhoneNumber.trim() !== '' ? updatedPhoneNumber : finduser.userPhone;
      const updatedUser = {
        ...finduser,
        userPhone: phoneNumber,
      };
      updatedUserDeatils(updatedUser);
      handleClosenumber();
    };
  
    const handleEmailUpdate = () => {
      const email = updatedEmail.trim() !== '' ? updatedEmail : finduser.userMail;
      const updatedUser = {
        ...finduser,
        userMail: email,
      };
      updatedUserDeatils(updatedUser);
      handleCloseemail();
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClickOpennumber = () => {
      setOpennumber(true);
    };
  
    const handleClosenumber = () => {
      setOpennumber(false);
    };
  
    const handleClickOpenemail = () => {
      setOpenemail(true);
    };
  
    const handleCloseemail = () => {
      setOpenemail(false);
    };
  return (
    < >
    <Container>
        <Header/>
        <Container sx={{my:5}}>
            <Box sx={{display:'flex',mb:3}}>
                <Link className='a' to='home' style={{textDecoration:'none'}}>home </Link>
                <Box sx={{ml:2}}> My account</Box>
            </Box>
            <Grid Container xs={12} sx={{ display: 'flex'}}>
                <Grid item container xs={2.5}>
                    <Box sx={{position:'static',verticalAlign:'baseline',float: 'none',borderRight:'1px solid #80808087',width:'100%',mr:1}}>
                        <Box>
                        <h3 style={{color:'#58595B',fontSize:'16px',padding:'4px 0 14px 0',fontWeight:'400'}}> MY ACCOUNT</h3>
                       <h4 style={{color:'#58595B',fontSize:'14px',margin:'0 0 6px',padding:'5px 0',fontWeight:'400'}}> Personal Details</h4>
                           <List> 
                           <ListItem sx={listStyle} onClick={()=>setShowForm(true)}> - Edit Profile</ListItem>
                           <ListItem sx={listStyle}>- Delivery Addresses</ListItem>
                           <ListItem sx={listStyle}>- Email Addresses</ListItem>
                            </List>
                        </Box>
                    </Box>
                </Grid>
                <Grid container item xs={9.5}sx={{ml:3}} >
                    {!showForm?(
                    <Box sx={{color:'#58595B',font: '300 24px "Roboto Slab", serif',width:'100%'}}>
                        <h3 style={{color:'#58595B',m:'0 20px 0 0 ',font:"300 24px 'Roboto Slab', serif",borderBottom:'#F1F1F1 solid 1px',paddingBottom:'10px'}}>Profile Details<Button onClick={()=>setShowForm(true)}>(edit)</Button></h3>
                        <Box sx={{fontSize:'17px',lineHeight:'1.5',mt:2,borderBottom:'1px solid #F1F1F1',pb:3}}>
                            <p>{finduser.firstName}{finduser.lastName}</p>
                            <p> <Mail sx={{fontSize:'14px',display:'flex',alignItems:'center',mr:2,color:'gray'}}/> {finduser.userMail}</p>
                            <p>+(91) {finduser.userPhone}</p>

                        </Box>
                    </Box>
                    ):(
                    <Box sx={{color:'#58595B',font: '300 24px "Roboto Slab", serif',width:'100%'}}>
                        <Box sx={editItem}>
                            <p>
                                <span style={{fontSize:'16px'}}> Name: </span>
                                <span style={{fontSize:'22px'}}>{finduser.firstName}{finduser.lastName}</span>
                            </p>
                            <IconButton onClick={handleClickOpen}><Create/></IconButton> 
                            <Dialog open={open} onClose={handleClose}>
                            <Box sx={{display:'flex',justifyContent:'space-between',m:2}}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="firstname"
                                label="First Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                sx={{width:'45%'}}
                                value={updatedFirstName}
                                 onChange={handleFirstNameChange}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="last name"
                                label="Last Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                sx={{width:'45%'}}
                                value={updatedLastName}
                                onChange={handleLastNameChange}
                            />
                            </Box>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button variant='contained' onClick={nameUpdate}>Update</Button>
                            </DialogActions>
                        </Dialog>     
                        </Box>
                        <Box sx={editItem}>
                             <p>
                                <span style={{fontSize:'16px'}}> Mobile Number: </span>
                                <span style={{fontSize:'22px'}}>{finduser.userPhone}</span>
                            </p>
                            <IconButton onClick={handleClickOpennumber}><Create/></IconButton> 
                            <Dialog open={opennumber} onClose={handleClosenumber}>
                            <Box sx={{m:2}}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Phone number"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={updatedPhoneNumber}
                                onChange={handlePhoneNumberChange}              
                            />
                                            
                            </Box>
                            <DialogActions>
                                <Button onClick={handleClosenumber}>Cancel</Button>
                                <Button variant='contained' onClick={handlePhoneNumberUpdate}>Update</Button>
                            </DialogActions>
                        </Dialog>
                            
                        </Box>
                        
                        <Box sx={editItem}>
                            <p>
                                <span style={{fontSize:'16px'}}> Emil: </span>
                                <span style={{fontSize:'22px'}}>{finduser.userMail}</span>
                            </p>
                            <IconButton onClick={handleClickOpenemail}><Create/></IconButton>   
                            <Dialog open={openemail} onClose={handleEmailUpdate}>
                            <Box sx={{m:2}}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                value={updatedEmail}
                                onChange={handleEmailChange}
                            />
                                            
                            </Box>
                            <DialogActions>
                                <Button onClick={handleCloseemail}>Cancel</Button>
                                <Button variant='contained' onClick={handleCloseemail}>Update</Button>
                            </DialogActions>
                        </Dialog>  
                        </Box>
                    </Box>
                    )}
                    <Box sx={{border:"1px solid #d6d6d6",mt:'15px',width:'100%',minHeight:'310px',display:'flex',background:'linear-gradient(to bottom, #f0f0f0 0%, #ffffff 10%, #ffffff 100%)'}}>
                        <Grid xs={8} item >
                            <h3 style={{color:'#58595B',fontSize:'22px',padding:'4px 5px 14px 10px',fontWeight:'300',borderBottom:'1px solid #f1f1f1'}}> My Orders</h3>
                            <p style={{margin:'10px 0 0 10px'}}>You haven't placed any order yet, Start Shopping!</p>
                        </Grid>
                        <Grid xs={4} item sx={{borderLeft:'1px solid #f1f1f1'}}>
                            <h3 style={{color:'#58595B',fontSize:'22px',padding:'4px 5px 14px 10px',fontWeight:'300',borderBottom:'1px solid #f1f1f1'}}> My Walet</h3>
                            <h4 style={{color:'#58595B', fontSize:'22px', margin:' 20px auto',padding:'4px 5px 14px 10px',fontWeight:'400',}}>BALANCE: Rs 0.00</h4>
                            <Button variant='contained' sx={{background:'linear-gradient(to bottom,#fee77c 50%,#f2ca76 100%)',m:5}}>Fund Wallet</Button>
                        </Grid>

                    </Box>
                </Grid>
            </Grid>

        </Container>
        <Fotter/>
        </Container>
    </>
  )
}

export default Account