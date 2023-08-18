import React from 'react'

import {Box, Container, Grid, Stack, Typography} from '@mui/material'
import Headers from '../Compononts/Header/Header'
import BestSelers from '../Coursel/Coursel';

import './Home.css'
import ResponsiveGrid from '../Compononts/Courtcontainer/Grids';
import styled from '@emotion/styled';
import Fotter from '../Compononts/Fotter/Fotter';
const imagesbank=[
  { imgPath: require('../Assets/bankdetails.jpeg') },
  { imgPath: require('../Assets/banksetails2.jpeg') },
  { imgPath: require('../Assets/bankdetails3.jpeg') },
  { imgPath: require('../Assets/bankdetails4.jpeg') }
]
const images = [
  { imgPath: require('../Assets/aurveda.jpeg') },
  { imgPath: require('../Assets/combostore.jpeg') },
  { imgPath: require('../Assets/byoneget.jpeg') },
  { imgPath: require('../Assets/freshmeat.jpeg') },
  { imgPath: require('../Assets/newpass,jpeg') },
  { imgPath: require('../Assets/weekdeal.jpeg') }
];
const imagesoffer=[
  { imgPath: require('../Assets/weekoffer.jpeg') },
  { imgPath: require('../Assets/weekoffer2.jpeg') },
  { imgPath: require('../Assets/weekoffer3.jpeg') },
  { imgPath: require('../Assets/weekoffer4.jpeg') }
]
const Img = styled('img')({
  margin: 'auto 0',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  alignItems: "center",
  justifyCntent:"center"
});

function Home() {
  return (
    <>
    <Headers/>
    <Grid item xs={12} className='banner'>
    </Grid>
    <Container>
    <Box>
      <Stack flexDirection='row' sx={{margin:'40px 0 20px 0',justifyContent:'space-around',gap:2}}> 
      {images.map((step, index) => (
          <Box key={index} sx={{width:'190px'}}>
                <Img
                src={step.imgPath}

              />
          </Box>
        ))}
      </Stack>
      </Box>
      <Box>
      <Typography variant='h4' component={'h3'} className='homeTitles'>Bank Offers</Typography>
      <Stack flexDirection='row' sx={{margin:'40px 0 20px 0',justifyContent:'space-around',gap:2}}> 
      {imagesbank.map((step, index) => (
          <Box key={index} sx={{width:'300px'}}>
                <Img
                src={step.imgPath}
              />
          </Box>
        ))}
      </Stack>
      </Box>
    </Container>
    <ResponsiveGrid/>
    <Container sx={{margin:'20px auto'}}>
      <BestSelers/>
    </Container>
    <Container>
      <Box>
    <Typography variant='h4' component={'h3'} className='homeTitles'>Top Offers</Typography>
      <Stack flexDirection='row' sx={{margin:'40px 0 20px 0',justifyContent:'space-around',gap:2}}> 
      {imagesoffer.map((step, index) => (
          <Box key={index} sx={{width:'300px'}}>
                <Img
                src={step.imgPath}
              />
          </Box>
        ))}
      </Stack>
      </Box>
    </Container>
    <Fotter/>
    </>
  )
}

export default Home