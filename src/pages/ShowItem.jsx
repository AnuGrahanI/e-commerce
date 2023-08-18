// import React from 'react'
// import Header from '../Compononts/Header/Header'
// import { Container, Box, Grid,Typography } from '@mui/material'
// import SwipeableTextMobileStepper from '../Coursel/Coursel'
// import { Link, useLocation } from 'react-router-dom'
// import Cart from '../Compononts/Cart/Cart'
// import { useSelector } from 'react-redux'
// import Cataside from '../Compononts/Aside/Cataside'
// const listStyle={
//     color: '#6D6E71',
//     font:'400 16px "Roboto Slab", serif',
//     margin:' 0',
//     padding: "5px 0 5px 5px",
//     '&:hover':{
//         color: '#096',
//         cursor:'pointer'
//     },
// }

// const ShowItem = () => {
//     const products = useSelector((state) => state.stateSlice.products); 
//     const location = useLocation();
//   const category = new URLSearchParams(location.search).get('category');
//   let hitems=products.filter((item)=>item.main_category===category)
//      console.log(hitems,'hhites')
//      const cate = useSelector((state) => state.stateSlice.Cartcategorys);
//      let ftitle=cate.find((ite)=>ite.navname===category)
    
//   return (
//     <>
//         <Header/>
//         <Container>
//             <Box sx={{display:'flex'}}>
//                 <Link className='a' to='home' style={{textDecoration:'none'}}>home</Link>
//                 <Box>{ftitle.category}</Box>
//             </Box>
//             <Box sx={{mb:3}}>
//                 <SwipeableTextMobileStepper/>
//             </Box>
//             <Grid Container xs={12} sx={{ display: 'flex'}}>
//                 <Grid item container xs={2.3}>
//                     <Box sx={{position:'static',verticalAlign:'baseline',float: 'none',borderRight:'1px solid #80808087',width:'100%',mr:1}}>
//                         <Box sx={listStyle}>
//                         <Cataside  item={category} />
//                         </Box>
//                     </Box>
//                 </Grid>
//                 <Grid container item xs={9.7} >
//                 <Typography varient='h3' component='h3'>{category}{hitems.length}</Typography> 
//                     <Box sx={{width:'100%',display:'flex',justifyContent:'start',alignItems:'flex-start',flexWrap:'wrap',gap:1}}>
//                     {hitems.map((item) => (
//                 <Box key={item.id}  >
//                     <Cart item={item}/>
//                 </Box>))}
                           
//                     </Box>
                
//                 </Grid>
//             </Grid>

//         </Container>
        
//     </>
//   )
// }

//export default ShowItem


import React from 'react';
import Header from '../Compononts/Header/Header';
import { Container, Box, Grid, Typography } from '@mui/material';
import SwipeableTextMobileStepper from '../Coursel/Coursel';
import { Link, useLocation } from 'react-router-dom';
import Cart from '../Compononts/Cart/Cart';
import { useSelector } from 'react-redux';
import Cataside from '../Compononts/Aside/Cataside';
import Fotter from '../Compononts/Fotter/Fotter';
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
const ShowItem = () => {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');
  const searchQuery = new URLSearchParams(location.search).get('q');

  const products = useSelector((state) => state.stateSlice.products);
  let filteredItems = [];
  if (category) {
    filteredItems = products.filter((item) => item.main_category === category);
  } else if (searchQuery) {
    filteredItems = products.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.catagry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ display: 'flex' }}>
          <Link className="a" to="home" style={{ textDecoration: 'none' }}>
            home
          </Link>
          <Box>{category || searchQuery}</Box>
        </Box>
        <Box sx={{ mb: 3 }}>
          <SwipeableTextMobileStepper />
        </Box>
        <Grid Container xs={12} sx={{ display: 'flex',my:5}}>
          <Grid item container xs={2.3}>
            <Box sx={{ position: 'static', verticalAlign: 'baseline', float: 'none', borderRight: '1px solid #80808087', width: '100%', mr: 1 }}>
              <Box>
                {category && <Cataside sx={listStyle} item={category} />}
              </Box>
            </Box>
          </Grid>
          <Grid container item xs={9.7}>
            <Typography varient="h3" component="h3">
              {category || searchQuery}
              {filteredItems.length}
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
              {filteredItems.length === 0 ? (
                <p>No items found.</p>
              ) : (
                filteredItems.map((item) => (
                  <Box key={item.id}>
                    <Cart item={item} />
                  </Box>
                ))
              )}
            </Box>
          </Grid>
        </Grid>
        <Fotter/>
      </Container>
    </>
  );
};

export default ShowItem;
