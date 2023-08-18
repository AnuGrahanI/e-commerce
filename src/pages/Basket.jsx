import React from 'react'
import Header from '../Compononts/Header/Header'
import { Box, Button, Container, Grid, IconButton, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../Context/Slice';
import { Add, ArrowCircleRight, Close, Remove } from '@mui/icons-material';
import Fotter from '../Compononts/Fotter/Fotter';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Basket = () => {
    const dispatch=useDispatch()
    let state=useSelector((state)=>state.stateSlice)
console.log(state,'cart');
    const handleIncrement=(item)=>{
        const increment=item.qty+1;
        dispatch(addItem({...item,qty:increment})) 
    }
    const handleDecrement= (item)=>{
        const decrement=item.qty-1;
        if (decrement >= 0) {
        dispatch(addItem({ ...item, qty: decrement }));
        if (decrement === 0) {
            const updatedCartItems = state.cartItems.filter((cartItem) => cartItem.id !== item.id);
            dispatch(removeItem(updatedCartItems));
        }
        }
    }
    const handeleDelete=(item)=>{
        const updatedCartItems = state.cartItems.filter((cartItem) => cartItem.id !== item.id);
        dispatch(removeItem(updatedCartItems));
      }
      const overallSubtotal = state.cartItems.reduce((acc, item) => acc + item.qty * item.Rs, 0);
      const pstyle={fontSize:'15px',color:'#555',margin:'0px 20px 0px 10px',padding:'5px 0px'}
      const tstyle={color:'#444',fontSize:'22px',margin:'10px 0 0 0'}
      const bstyle={color:'#e7685d',fontWeight:'700',margin:'0 auto',padding:'0',fontSize:'14px'}
  return (
    <>
        <Header/>
        <Container>
      
            <Box sx={{my:2}}>
                
                <Box sx={{borderBottom:'1px solid gray'}}>
                    <Typography variant='p' component='h4' sx={{fontWeight:'300',fontSize:'26px'}}>{state.cartItems.length !== 0 ? ('Your Basket', (state.cartItems.length,' items')):('There are no items in your basket.')}</Typography>
                </Box>
                {state.cartItems.length !== 0 ? (
                <Box sx={{my:2}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ITEM DESCRIPTION</StyledTableCell>
                                <StyledTableCell align="right">UNIT PRICE</StyledTableCell>
                                <StyledTableCell align="right">QUANTITY</StyledTableCell>
                                <StyledTableCell align="right">SUBTOTAL</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="center" sx={{backgroundColor:'#c6cc74 !important',color:'#000'}}>SAVINGS</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.cartItems.map((item,index)=>{
                           return <StyledTableRow key={index}>
                                <StyledTableCell component="th">{item.name}</StyledTableCell>
                                <StyledTableCell align="right">{item.Rs}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Box sx={{margin:'9px auto'}}>
                                        <IconButton ><Remove sx={{fontSize:'15px'}} onClick={()=>handleDecrement(item)}/></IconButton>
                                            <Box component="span" sx={{mx:1}}>{item.qty}</Box>
                                        <IconButton ><Add sx={{fontSize:'15px'}} onClick={() =>handleIncrement(item)}/></IconButton>
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="right">{(item.qty)*(item.Rs)}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton>
                                        <Close sx={{fontSize:'14px'}} onClick={()=>handeleDelete(item)}/>
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </StyledTableRow>
                        })}
                        </TableBody>
                        </Table>
                     </TableContainer>
                     <Box>
                    <Grid container item xs={12}>
                        <Grid item xs={6}>
                            <Box>
                            <Button endIcon={<AddShoppingCartIcon/>}>empry cart</Button>
                            </Box>
                            <Box>
                            <Button> Continue shoping</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{border:'1px solid #a2a2a2',boxShadow:'2px 2px 4px #ccc',borderRadius:'5px',background:'linear-gradient(180deg, #fff 60%, #f0f0f0)',width:'480px',float:'right',my:2}}>
                                <Stack flexDirection='row' sx={{alignItems:'space-between'}}>
                                    <Box sx={{flex:'80%',m:2}}>
                                        <Box sx={{display:'flex',justifyContent:'space-between'}}>
                                            <p style={pstyle}>Subtotal</p>
                                            <p style={pstyle}>Rs. {overallSubtotal.toFixed(2)}</p>
                                        </Box>
                                        <Box sx={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #555'}}>
                                            <p style={pstyle}>Delivery Charges </p>
                                            <p style={pstyle}>**</p>
                                        </Box>
                                        <Box sx={{display:'flex',justifyContent:'space-between',mx:1}}>
                                            <p style={tstyle}>TOTAL</p>
                                            <p style={tstyle}>Rs {overallSubtotal.toFixed(2)}</p>
                                        </Box>
                                        
                                    </Box>
                                    <Box sx={{flex:'20%',background:'url(https://www.bbassets.com/static/v2686/uiv2/css/images/your_saved_icon.png) no-repeat center 21px',borderLeft:'1px solid #555',p:1.5}}>
                                        <Box sx={{mt:6}}>
                                        <p style={bstyle}>You saved!</p>
                                        <p style={bstyle}>Rs. 1410.60</p>
                                        </Box>
                                    </Box>

                                </Stack>
                                <Box sx={{m:2,borderBottom:'1px solid #555'}}><p style={{padding:'0px',margin:'0px',fontSize:'14px'}}>* For this order: Accepted food coupon is Rs. 0.00</p></Box>
                                <Box sx={{display:'flex',justifyContent:'right'}}>
                                    <Button variant='contained' size='large' sx={{float:'right',position:'relative',mr:2,background:'linear-gradient(250deg,#fee77c 0,#f2ca76 99%)',color:'gray'}}>Check out<ArrowCircleRight sx={{color:'gray',ml:1}}/> </Button>
                                </Box>
                                <Box sx={pstyle}>** Actual delivery charges computed at checkout time</Box>
                            </Box>
                        </Grid>
                    </Grid>
                  </Box>
                </Box>
                
                ) : (
                    null
                  )}
                  
            </Box>
            
        </Container>
        <Fotter/>
    </>
  )
}

export default Basket