import React from 'react';
import './news.css';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

const News = () => {
  const categories = useSelector((state) => state.stateSlice.Cartcategorys);
  const nav = useNavigate()
  const handleloops=(item)=>{
    nav(`/showItem?category=${item.navname}`)
}
  return (
    <Box>
      <Stack alignItems='center'>
        <Box sx={{position:'relative',width:'100%','&:hover':{
          cursor:'pointer'
        }}}>
          <Box id="shop" sx={{fontWeight:'bold',color:'#fff',padding:'5px 2px'}}>SHOP BY CATEGORY
            <Box className="dropdown__menu" sx={{display: 'none',boxShadow:'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',position:'absolute'}}>
              <List sx={{p:0}}>
                {categories.map((categoryItem, index) => (
                  <li key={index} className="list" onClick={()=>{handleloops(categoryItem)}}>
                    {categoryItem.category}
                    <Box className="dropdown__menu-1">
                      <List sx={{p:0}}>
                        {categoryItem.items.map((item, itemIndex) => ( 
                            <ListItem className="list" key={itemIndex}>
                              {item}
                            </ListItem>
                        ))}
                      </List>
                    </Box>
                  </li>
                ))}
                <li><Link style={{textDecoration:'none'}} to="/all">viwe All</Link></li>
              </List>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default News;
