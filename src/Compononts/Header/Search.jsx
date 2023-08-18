// 
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

export default function CustomizedInputBase() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        width: '70%',
        alignItems: 'center',
        border: 'solid 1px #a5cd39',
        borderRadius: '0px',
        height: '30px',
      }}
    >
      <InputBase
        sx={{ ml: 2, flex: '93%', fontSize: '14px' }}
        placeholder="Search For Products"
        inputProps={{ 'aria-label': 'Search For Products' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Link
        to={`/showitem?q=${searchQuery}`}
        style={{
          display: 'flex',
          flex: '7%',
          backgroundColor: '#a5cd39',
          borderRadius: '0',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          color: 'white',
        }}
      >
        <IconButton type="submit" aria-label="search"
        sx={{
          p: '3px',
          flex: '7%',
          backgroundColor: '#a5cd39',
          color: 'white',
          borderRadius: '0',
          '&:hover': {
            backgroundColor: 'darkgreen',
          },
        }}
        >

          <SearchIcon />
        </IconButton>
      </Link>
    </Paper>
  );
}
