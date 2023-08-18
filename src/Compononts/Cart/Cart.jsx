import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../Context/Slice';
import { Add, Remove } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const addremove={ 
  p:0,
  fontSize:'small',
  background:'linear-gradient(180deg,#fff 0,#eaeaea 99%) repeat scroll 0 0 transparent',
  '&:hover':{
    background:'linear-gradient(180deg,#eaeaea 0,#fff 99%) repeat scroll 0 0 transparent'
  },
  '&:focus':{
    outline:'offset: -2px'
  },
  '&:active':{
    outline:'offset: -2px'
  }
}
const CartInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius:'0 2px 2px 0',
    display:'flex',
    position: 'relative',
    backgroundColor:'white',
    border: '1px solid #e0e0e0',
    fontSize:11,
    width: '30px',
    padding: '3px 5px',
    fontFamily: [
      '"Segoe UI"',
      'Roboto'
    ].join(','),
    '&:focus': {
      boxShadow: '0 0 1px 1px green',
      borderColor:'green'
    },
  },
}));

export default function CartItems({ item }) {
  console.log(item,'item')
  const dispatch = useDispatch();
  const [showAddButton, setShowAddButton] =useState(true);
  const [quantity, setQuantity] = useState(1);
  const state=useSelector(({stateSlice})=>stateSlice)
  const nav= useNavigate()

  const handleAddToCart = () => {
    const itemToAdd = { ...item, qty: quantity };
    dispatch(addItem(itemToAdd));
    setShowAddButton(false);
  };
  
  
  const handleIncrement = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity); // Update the local quantity state
  
    const itemToAdd = { ...item, qty: updatedQuantity };
    const existingItem = state.cartItems.find(
      (item) => item.titleName === itemToAdd.titleName
    );
  
    if (existingItem) {
      // Item already exists in the cart, update its quantity
      dispatch(addItem({ ...existingItem, qty: updatedQuantity }));
    } else {
      // Item does not exist in the cart, add it to the cartItems array
      dispatch(addItem(itemToAdd));
    }
  
    setShowAddButton(false); // Always set showAddButton to false when incrementing.
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;
      setQuantity(updatedQuantity); // Update the local quantity state
  
      const updatedCartItem = { ...item, qty: updatedQuantity };
      dispatch(addItem(updatedCartItem)); // Dispatch the updated cart item with the decremented quantity
    } else {
      setShowAddButton(true); // Show the add button since the quantity is zero
      const updatedCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
  
      dispatch(removeItem(updatedCartItems)); // Dispatch the updated cart items after removing the item
    }
  };
  
  const handleViewItem=(item)=>{
    nav(`/item/${item.id}`)
  }
  
  
  
  return (
    <Card sx={{ maxWidth: 225,'&:hover':{
      boxShadow:'0px 2px 2px 1px #bdbdbd'
    },margin:'20px auto', }}>
      <CardHeader 
        action={
          <IconButton aria-label="settings">
            <NewReleasesIcon sx={{color: '#ba5253'}}/>
          </IconButton>
        } 
        title="Get 20% Off"
        titleTypographyProps={{
          fontSize: '0.8rem',
          fontFamily: 'ProximaNovaA-Semibold',
          color: '#ba5253',
          p:'0'
        }}
        
        sx={{margin:'12px',p:0,boxShadow:'0 2px 7px #ddd',textAlign:'right',fontFamily:' ProximaNovaA-Semibold',}}
      />
      
        <CardMedia
          component="img"
          width='245px'
          height="194"
          image={item.img}
          alt="dish"
          onClick={()=>handleViewItem(item)}
        />
      
      <CardContent sx={{textAlign:'left',p:0,m:2}}>
        <Typography variant="h6" color="text.secondary"sx={{fontSize:'0.8rem',margin:'5px 0'}}>
          {item.brand}
        </Typography>
        <Typography variant="h4" color="text.primary" sx={{fontSize:'0.9rem','&:hover':{color:'green',cursor:'pointer',}}} onClick={()=>handleViewItem(item)}>
          {item.titleName}
        </Typography>
      </CardContent>
      <CardContent sx={{backgroundColor:'#f4f3f2',m:2,p:0,}}>
        <Box sx={{m:0,display:'flex',alignItems: 'baseline'}}>
            <Typography sx={{fontSize:'.7rem', mr:1,ml:1}} variant='h5'>MRP
              <Typography variant='span' sx={{textDecoration:"line-through 1px black",ml:1}}> {item.MRP}</Typography>
            </Typography>
            <Typography sx={{fontSize:'.8rem', ml:1}} variant='h5'>Rs
              <Typography variant='span' sx={{fontSize:'.8rem'}}>{item.Rs}</Typography>
            </Typography>
        </Box>
        <Box sx={{textAlign:'left',ml:1,display:'flex'}}>
            <Typography variant='span'><LocalShippingIcon/></Typography>
            <Typography variant='span' sx={{fontSize:'10px',fontFamily:' ProximaNovaA-Regular'}}>
              Standard Delivery: Tomorrow 9:00AM - 1:30PM
            </Typography>
        </Box>
        <Box>
        {showAddButton ? (
          <Stack sx={{flexDirection:'row',width:'100%',justifyContent:'space-evenly'}}>
            
            <Box sx={{borderRadius: 1,display:'flex',border:'1px solid #e0e0e0',width:'80px',justifyContent:'space-between',backgroundColor:'#e0e0e0'}}>
              <Box sx={{margin:'auto',color:'#999'}}>qty</Box>
              <CartInput value={quantity}/>
            </Box>
            <Box sx={{borderRadius: 1,display:'flex',border:'1px solid #fee67c',width:'65px',backgroundColor:'#fee67c',justifyContent:'center'}}>
              <Button variant="outline"  sx={{p:0,backgroundColor:'transparent',fontSize:'10px'}} endIcon={<AddShoppingCartIcon/>}onClick={handleAddToCart}>
                Add
              </Button>
            </Box>
          </Stack>):(
          <Stack sx={{flexDirection:'row',justifyContent:'start',mt:.5}}>
            <Box sx={{justifyContent:'start',display:'flex',alignItems:'center',ml:'3px'}}>
              <IconButton sx={addremove} style={{borderRadius:'4px 0 0 4px'}} onClick={handleDecrement}>
              <Remove/>
              </IconButton>
              <CartInput value={quantity+' item in Buuckket'}  sx={{width:' 51%','& .MuiInputBase-input': {width:'100%',backgroundColor:"#fce681"}}}/>
              <IconButton sx={addremove} style={{borderRadius:'0 4px 4px 0'}} onClick={handleIncrement}>
                 <Add sx={{fontSize:'1.4rem'}}/>
              </IconButton>
            </Box>
        
          </Stack>
        )}
        </Box>
      </CardContent>
    </Card>
  );
}
