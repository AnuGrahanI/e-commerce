import React from 'react';
import { Box, Button, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import Header from '../Compononts/Header/Header';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ItemsCarousel from 'react-items-carousel';
import { addItem, removeItem } from '../Context/Slice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import Cataside from '../Compononts/Aside/Cataside';
import Fotter from '../Compononts/Fotter/Fotter';

const Img = styled('img')({
  width: '100%',
  height: '100%',
});
const Title = styled(Box)({
  fontSize: '.7rem',
  color: '#666',
  borderBottom: '1px solid #666',
  transition: 'all .1s ease',
  cursor: 'pointer',

  '&:hover': {
    boxShadow: '0 2px 2px 0 rgba(0,0,0,.2)',
    padding: '2px',
    borderRadius: '4px',
  },
});

const Productitem = () => {
  const { itemId } = useParams();
  const itemIdNumber = parseInt(itemId, 10);
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);
  const [showAddButton, setShowAddButton] =useState(true);
  const state=useSelector(({stateSlice})=>stateSlice)

  const item = useSelector(({ stateSlice }) => {
    return stateSlice.products.find((item) => item.id === itemIdNumber);
  });
  const items = useSelector(({ stateSlice }) => {
    return stateSlice.cartItems.find((item) => item.id === itemIdNumber);
  });
  console.log(itemId, item, 'ananan');
  const handleAddToCart = () => {
    const itemToAdd = { ...item, qty: quantity };
    dispatch(addItem(itemToAdd));
    setShowAddButton(false);
  };
  const handleIncrement=()=>{
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity); // Update the local quantity state
    
    const itemToAdd = { ...item, qty: updatedQuantity };
    const existingItem = state.cartItems.find(
      (item) => item.id === itemToAdd.id
    );
    if (existingItem) {
      // Item already exists in the cart, update its quantity
      dispatch(addItem({ ...existingItem, qty: updatedQuantity }));
    } else {
      // Item does not exist in the cart, add it to the cartItems array
      dispatch(addItem(itemToAdd));
    }
  
    setShowAddButton(false); // Always set showAddButton to false when incrementing.

  }
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

  return (
    <>
      <Header />
      <Container>
        <Grid item container xs={12} sx={{ display: 'flex', height: '460px' }}>
          <Grid item xs={2.5}>
            <Cataside item={item.main_category} />
          </Grid>
          <Grid item xs={9.5} sx={{display:'flex'}}>
            <Grid xs={6} item>
              {/* <Carousel >
                {/* Make sure to return the JSX element inside the map */}
                {/* {.imgs.map((image, index) => (
                  <div key={index}>
                    <Img src={image} alt={`Slide ${index}`}/> {/* Use image.default to get the image URL */}
                  {/* </div>
                ))}
              </Carousel> */} 
              <ItemsCarousel numberOfCards={1}>
                {items ? items.imgs.map((image, index) => (
                    <div key={index}>
                      <Img src={image} alt={`Slide ${index}`}/> {/* Use image.default to get the image URL */}
                    </div>
                  )) : item.imgs.map((image, index) => (
                    <div key={index}>
                      <Img src={image} alt={`Slide ${index}`}/> {/* Use image.default to get the image URL */}
                    </div>
                  ))}
              </ItemsCarousel>
            </Grid>
            <Grid xs={6} item>
              <Box sx={{pl:1}}>
                <Title component='span'>{items?items.brand:item.brand}</Title>

                <Typography variant='p' component='p' sx={{fontSize:'1.1rem',color:'#222',pt:'0.3rem',m:'0 0 10px'}}>{items?items.titleName:item.titleName}</Typography>
                <Stack>
                  <Box sx={{color:'#8f8f8f', fontSize:'.7rem'}}>MRP:  <Box component='span' sx={{textDecoration:'line-through'}}>Rs {items?items.MRP:item.MRP}</Box></Box>
                  <Box sx={{color:'black',fontSize:'.9rem',fontWeight:600}}> Price:  Rs {items?items.Rs:item.Rs}</Box>
                  <Box sx={{color:'#ba5252', fontSize:'.8rem',fontWeight:400}}>You Saved Rs: 23%</Box>
                  <Box sx={{color:'#8f8f8f',fontSize:'.7rem'}}> (Inclusive of all taxes)</Box>
                </Stack>
                {showAddButton?(
                <Stack flexDirection='row' sx={{alignItems:'flex-start',my:1}}> 
                  <TextField sx={{width:'40px','&:Focus':{border:'1px solid black',outline:'black'}}} size='small'></TextField>
                  <Button variant='contained' color="success" sx={{ml:1,background:'#84c225','&:hover':{background:'#84c225',}}} onClick={()=>handleAddToCart(item)}>Add to basket</Button>
                  <Button variant="outlined"  sx={{ml:1,width:'80px',color:'black', border:'1px solid black;','&:hover':{background:'none',boxShadow:'0 2px 2px 0 rgba(0,0,0,.2);'}}}>save</Button>
                </Stack>
                ):(
                  <Stack flexDirection='row' sx={{alignItems:'flex-start',my:1}}> 
                  <IconButton onClick={handleDecrement}  variant="outlined"  sx={{ml:1,width:'40px',color:'black', border:'1px solid black;',borderRadius:'0','&:hover':{background:'none',boxShadow:'0 2px 2px 0 rgba(0,0,0,.2);'}}}><Remove/></IconButton>
                  <Box component='span'>{items?(items.qty):(item.qty)}</Box>
                  <IconButton onClick={handleIncrement} variant="outlined" sx={{ml:1,width:'40px',color:'black', border:'1px solid black;',borderRadius:'0','&:hover':{background:'none',boxShadow:'0 2px 2px 0 rgba(0,0,0,.2);'}}}><Add/></IconButton>
                </Stack>
                )}
                <Box sx={{my:5}}>Standard: 26 Jul, 9:00AM - 1:30PM</Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container>
      <Fotter/>
      </Container>
    </>
  );
};

export default Productitem;
