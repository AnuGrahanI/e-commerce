import { Box, List, ListItem } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const Cataside = ({ item }) => {
    console.log('anu ', item)
    const categories = useSelector((state) => state.stateSlice.Cartcategorys);
    let fitem=categories.find((ite)=>ite.navname===item)
    console.log(fitem);
  return (
    <>
        <Box>
        <p style={{borderBottom:'1px gray solid',padding:'0 0 5px  0 ',marginBottom:'10px',color:'green'}}>category</p>
        <Box sx={{ml:1,mt:1}}>
        {fitem.category}
        <List >
            {fitem.items.map((ele,index)=>{
            return<ListItem sx={{pr:'3px',p:0,ml:2,mb:1,color: '#676768',lineHeight:'140%',fontSize:'1rem'}} key={index}>{ele}</ListItem>
        })}
        </List>
        </Box>
        </Box>
    </>
  )
}

export default Cataside;
