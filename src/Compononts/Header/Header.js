import React from 'react'
import { Container, Grid, Box, Button, Typography, List, ListItem, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomizedInputBase from './Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { PhoneEnabledOutlined, LocationOnOutlined, ExpandMoreOutlined, Person4Outlined, Add, Remove, Close } from '@mui/icons-material';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../Context/Slice';
import News from '../DropDown/new';
import Userdrop from './userdrop';
import { useNavigate } from 'react-router-dom';




const Img = styled('img')({
    margin: 'auto 0',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
const font={    
  border: '1px solid gray',
  cursor: 'pointer',
  color: '#989898',
  background: '#fff',
  padding:'0px',
  '&:hover':{
    background: '#84c225',
    color: '#fff'
  }
}
let HeaderButton = {p:'0 10px',color:'black',fontSize:'12px',fontWeight:'100',opacity:'.7'};
let BasketStyle={fontFamily:'ProximaNovaA-Semibold',fontSize:'13px',color:'#4d4d4d',textAlign:'right',fontWeight:'400'}
function Header() {
  const nav= useNavigate()
  const state=useSelector(({stateSlice})=>stateSlice)
  const showitem=state.cartItems.length;
  const [showBasketList, setShowBasketList] = React.useState(false);
  const dispatch = useDispatch();
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
  const calculateSubtotal = () => {
    let subtotal = 0;
    state.cartItems.forEach((item) => {
      subtotal += item.qty * item.Rs;
    });
    return subtotal;
  };
  // const handleSearch = (searchQuery) => {
  //   console.log('Search query:', searchQuery);
  // };
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid item container spacing={1} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems='center' justifyContent='space-between'>  
          <Grid item xs={2.5}>
            <Img src={require('./Assets/bb_logo.jpeg')} alt="big_basket"/>
          </Grid>
          <Grid item xs={9.5} container >
            <Grid item xs={12} container sx={{direction:"row", justifyContent:"flex-end", alignItems:"flex-end"}}>
              <Button variant="text" sx={HeaderButton} startIcon={<PhoneEnabledOutlined/>}>98768767575</Button>
              <Button variant="text" sx={HeaderButton} startIcon={<LocationOnOutlined/>} endIcon={<ExpandMoreOutlined/>}>560008, Bangalore</Button>
              <Userdrop/>
            </Grid>
            <Grid item xs={12}>
            <Box sx={{ display:'flex', justifyContent:"space-between", alignItems:"center",}}>
            <CustomizedInputBase />
              <Box onMouseEnter={() => setShowBasketList(true)}
                  onMouseLeave={() => setShowBasketList(false)}
                  sx={{display:'flex', justifyContent:"space-around", alignItems:"center", backgroundColor:"#f2f2f2", width:'150px',position:'relative',borderBottom:'#f2f2f2'}}>
                <Grid item xs={6} textAlign={'center'}>
                  <ShoppingBasketIcon sx={{ fontSize: 55, color:'#7e1414',p:'0' }}/>
                </Grid>
                <Grid item xs={6} sx={{textAlign:'right',p:'0 5px 0 0',font:'13px ProximaNovaA-Semibold' }}>
                  <Typography component='span' sx={BasketStyle} >My Basket </Typography>
                  <br/>
                  <Typography component='span' sx={BasketStyle} >{showitem} Items </Typography>
                </Grid>
                {showBasketList?(
                <List sx={{position:'absolute',overflowY:'scroll',minHeight: '80px', maxHeight:"260px",backgroundColor:'#f2f2f2',width:'575px',top:'100%',right:'0',color:'#4d4d4d',padding:'4px 0px',zIndex:'1000'}}>
                  {showitem===0?(
                  <ListItem sx={{p:1}}><p className='emptyitem'>Your basket is empty. Start shopping now!</p></ListItem>
                  ) :(
                  state.cartItems.map((items)=>(
                  <ListItem key={items.id} sx={{p:1}}>
                    <Box className='fullitem'>
                      <Stack flexDirection={'row'}>
                        <Grid xs={2} item>
                          <Img src={`${items.img}`} className='cartimg'/>
                        </Grid>
                        <Grid xs={5} item>
                          <Box sx={{pl:.5}}>
                            <Typography variant='p' component='p' sx={{fontSize:'10px',textTransform:'uppercase',mb:'3px'}}>{items.brand}</Typography>
                            <Typography variant='p' component='p' sx={{pr:'10px',lineHeight:'1.1',cursor:'pointer',fontSize:'11px ',"&:hover":{
                              color:'green'
                              }}}>{items.titleName}</Typography>
                            <Typography variant='p' component='p' sx={{fontSize:'9px',color:'gray',mt:'5px'}}>{items.qty}*{items.Rs}</Typography>
                          </Box>
                        </Grid>
                        <Grid xs={5} item>
                          <Stack flexDirection='row' sx={{mt:'15px'}}>
                            <Grid xs={5} item>
                              <Box sx={{margin:'9px auto'}}>
                                <IconButton sx={font}><Remove sx={{fontSize:'15px'}} onClick={()=>handleDecrement(items)}/></IconButton>
                                <Box component="span" sx={{mx:1}}>{items.qty}</Box>
                                <IconButton sx={font}><Add sx={{fontSize:'15px'}} onClick={() =>handleIncrement(items)}/></IconButton>
                              </Box>
                            </Grid>
                            <Grid xs={6} item  sx={{mt:1}}>
                              <Box>
                                <Box className='font'>Rs {items.Rs}</Box>
                                <Box className='font'>Saved Rs.153.12</Box>
                              </Box>
                            </Grid>
                            <Grid xs={1} item display="flex" justifyContent="center" alignItems="center">
                              <IconButton>
                                <Close sx={{fontSize:'15px'}} onClick={()=>handeleDelete(items)}/>
                              </IconButton>
                            </Grid>
                          </Stack>
                        </Grid>
                      </Stack>
                    </Box>
                  </ListItem>)))};
                   {showitem!==0?(
                  <ListItem  sx={{p:1}}>
                    <Stack flexDirection='row' sx={{width:'100%',gap:'10px'}}>  
                      <Grid item xs={6} sx={{background:"#fff",mr:'-10px', mt:'3px',fontSize:'10px',padding:'6px 0 ',textAlign:'center',position:'relative',maxHeight:'30px'}}>
                      **Actual Delivery Charges computed at checkout 
                      </Grid>
                      <Grid item xs={6} sx={{background:"#fff",ml:'10px', mt:'3px',lineHeight:'1.5',fontSize:'12px',padding:'6px 0 '}}>
                        <Box sx={{px:1}}>Sub Total : <Box component={'span'} sx={{float:'right'}}>Rs :  {calculateSubtotal()}</Box></Box>
                        <Box sx={{px:1,mb:'5px'}}>Delivery Charge : <Box component={'span'} sx={{float:'right'}}>**</Box></Box>
                        <Box>
                          <Button onClick={()=>{nav('/basket')}} sx={{width:'100%',border:' 0',borderRadius:'0',p:1,background:"#84c225",fontSize:"10px",color:'#fff',fontWeight:'600','&:hover':{background:'#6ca516'}}} variant='contained'>View Basket & Checkout</Button>
                        </Box>
                      </Grid>
                    </Stack>
                  </ListItem>):(null)}
              </List> 
              ):(console.log(null))}
              </Box>
              
            </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <Grid item container  border='1px solid lightgray' >
            <Grid item xs={2.8} sx={{backgroundColor:'#a5cd39', p:'5px 0'}}>
                <Typography variant='p' sx={{color:'white',fontWeight:'600',P:0}}><News/></Typography>
            </Grid>
            <Grid item xs={2.8}>Offer</Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default Header;