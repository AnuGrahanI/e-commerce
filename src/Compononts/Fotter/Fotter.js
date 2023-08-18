import { Box, Container, Grid, Link, List, ListItem, Stack, Typography, styled } from '@mui/material'
import React from 'react'

const StyledLink = styled(Link)(({ theme }) => ({
    color: 'gray',
    fontSize: '14px',
    lineHeight: '1.42857',
    textDecoration: 'none',
    '&:hover': {
      color:'green'
    },
  }));
  const Img = styled('img')({
    margin: 'auto 0',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    display: "flex",
    alignItems: "center",
    justifyCntent:"center"
  });

function Fotter() {
  return (
    <>
    <Container>
        <Stack sx={{backgroundColor:'#fff'}}>
            <Grid item container spacing={2}>
                <Grid item xs={3}>
                    <Typography varint='h5' component='h4'  sx={{color:'green'}}>bigbasket</Typography>
                    <List>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">About Us</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">In News</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">Green bigbasket</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">Privacy Policy</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">Affiliate</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">Terms and Conditions</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">Careers At bigbasket</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">bb Instant</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">bb Daily</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">bb Blog</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">bbnow</StyledLink></ListItem>
                    </List>
                </Grid>
                <Grid item xs={3}>
                    <Typography varint='h5' component='h4' sx={{color:'green'}}>Help</Typography>
                    <List>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">FAQs</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">Contact Us</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">bb Wallet FAQs</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">bb Wallet T&Cs</StyledLink></ListItem>
                        <ListItem sx={{padding:'5px 0'}}><StyledLink href="https://www.example.com">Vendor Connect</StyledLink></ListItem>
                    </List>
                </Grid>
                <Grid item xs={3}>
                <Typography varint='h5' component='h4'  sx={{color:'green'}}>Download Our App</Typography>
                    <List>
                        <ListItem><StyledLink href="https://www.example.com"><Img src={require('./photo/apple.jpeg')}/></StyledLink></ListItem>
                        <ListItem><StyledLink href="https://www.example.com"><Img src={require('./photo/gpay.jpeg')}/></StyledLink></ListItem>
                    </List>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                  <List sx={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                    <ListItem ><Link href={'Facebook.com'}><Img  src={require('./photo/fb.png')}/></Link></ListItem>
                    <ListItem ><Link href={'Facebook.com'}><Img  src={require('./photo/Pinterest-logo.png')}/></Link></ListItem>
                    <ListItem ><Link href={'Facebook.com'}><Img  src={require('./photo/twiter.png')}/></Link></ListItem>
                    <ListItem ><Link href={'Facebook.com'}><Img  src={require('./photo/in.png')}/></Link></ListItem>
                  </List>
                  </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{border:'1px solid gray'}}></Grid>
        </Stack>
    </Container>
    </>
  )
}

export default Fotter
