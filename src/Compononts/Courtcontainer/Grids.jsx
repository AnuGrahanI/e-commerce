import React, { useEffect, useState } from 'react';
import './cartcontainer.css';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container, Typography } from '@mui/material';
import CartItems from '../Cart/Cart';
import ItemsCarousel from 'react-items-carousel';
import { useSelector } from 'react-redux';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  flexWrap: 'wrap',
  margin: '0 auto',
  boxShadow: '0 0 0 white',
  color: theme.palette.text.secondary,
}));

export default function BestSelers() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const products = useSelector((state) => state.stateSlice.products); 
  const bestSellingProducts = products.filter((item) => item.bestSelers);
  

  const handleItemChange = (value) => {
    setActiveItemIndex(value);
  };

  return (
    <Container sx={{ position: 'relative' }}>
      <Typography variant="h4" component="h3" className="homeTitles">
        Best Sellers
      </Typography>
      <ItemsCarousel
        numberOfCards={5}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={handleItemChange}
        rightChevron={<button style={{color:'red',p:2}}>{'>'}</button>}
        leftChevron={<button>{'<'}</button>}
        chevronWidth={0}
        outsideChevron
      >
        {bestSellingProducts.map((item) => (
          <Item key={item.id}>
            <CartItems item={item} />
          </Item>
        ))}
      </ItemsCarousel>
    </Container>
  );
}
