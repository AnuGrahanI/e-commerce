import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, saveRegistrationData, setEmail, setPhoneNumber } from '../Context/Slice';
import { useForm } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Grid, TextField, Stack } from '@mui/material';
import styled from '@emotion/styled';
const Title = styled('h3')({
  color: '#84c225',
  fontSize: '16px',
  textAlign: 'center',
  LineHeight: '19px',
  fontWeight: '600'
});

const Grids = styled('div')({
  position: 'absolute',
  background: '#fff',
  border: '1px solid #f2f2f2',
  left: '40%',
  top: '1%',
  width: '350px',
  overflow: 'hidden',
  minHeight: '510px',
  height: 'auto',
  transform: "translate(0, 20%)",
  boxShadow: '0 0 36px 0 rgba(141, 135, 135, 0.58'
});


const theme = createTheme({
  status: {
    danger: 'yellow',
  },
  palette: {
    primary: {
      main: '#2e7d32',
      light:'#84c225',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const Login = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const Users = useSelector((state) => state.stateSlice.UserDeatials);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registrationData, setRegistrationData] = useState({ firstName: '', lastName: '', email: '',userId:'aska' });

  const handleLoginToggle = () => {
    setIsEmailLogin((prevIsEmailLogin) => !prevIsEmailLogin);
  };

  const onSubmit = (data) => {
    const { email, phoneNumber } = data;
    const matchedUser = Users.find((user) => user.userMail === email || user.userPhone === phoneNumber);

    if (!matchedUser) {
      setIsRegisterMode(true);
      return; // Prevent navigation and further actions
    }

    if (isEmailLogin) {
      dispatch(setEmail(data.email));
      dispatch(setPhoneNumber(null));
    } else {
      dispatch(setPhoneNumber(data.phoneNumber));
      dispatch(setEmail(null));
    }

    dispatch(login(true));
    localStorage.setItem('isLoggedin', JSON.stringify(true));
    localStorage.setItem('userId', JSON.stringify(matchedUser.userId));
    nav('/home');
  };

  const handleRegistrationSubmit = (data) => {
    const userId = 'w3e4r5'; // Generate a unique userId
    const registrationDataWithId = { ...data, userId }; // Combine userId with registration data

    // Dispatch the saveRegistrationData action with the updated registration data
    dispatch(saveRegistrationData(registrationDataWithId));

    localStorage.setItem('isLoggedin', JSON.stringify(true));
    nav('/login'); // Redirect to the login form after successful registration
  };
  

  return (
    <>
      {!isRegisterMode ? (
        <Stack align="center">
          <Grid
          item
            container
            xs={12}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={0}
            sx={{
              minHeight: '100vh',
              position: 'reletive',
              top: '20px',
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 1050,
              outline: 0,
            }}
        >
          <Grids>
            <Box sx={{ mt: 5, mb: 10 }}>
              <Title>LOGIN/SIGN UP</Title>
            </Box>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                {isEmailLogin ? (
                  // email
                  <Box>
                    <TextField
                      label="Enter Email Address"
                      variant="standard"
                      color='primary'
                      {...register('email', {
                        required: 'Email address is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{ width: '90%',fontSize:'14px' }}
                    />
                    <Box sx={{ mt: 20 }}>
                      <Button
                        sx={{ width: '90%', color:'black',fontSize:'14px' }}
                        variant='outlined'
                        size='large'
                        onClick={handleLoginToggle}
                      >
                        Login Using Phone Number
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  // phone number
                  <Box>
                    <TextField
                      label="Enter Mobile Number (10-digit)"
                      variant="standard"
                      color='primary'
                      {...register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Invalid phone number'
                        }
                      })}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      sx={{ width: '90%',fontSize:'14px' }}
                    />
                    <Box sx={{ mt: 20 }}>
                      <Button
                        sx={{ width: '90%',color:'black',fontSize:'14px' }}
                        variant='outlined'
                        size='large'
                        onClick={handleLoginToggle}
                      >
                        Login Using Email Address
                      </Button>
                    </Box>
                  </Box>
                )}
                <Box sx={{ mt: 2 }}>
                  <ThemeProvider theme={theme}>
                    <Button
                      type="submit"
                      sx={{ background: theme.palette.primary.light, width: '90%',color:'#fff',fontSize:'14px' }}
                      variant='contained'
                      size='large'
                    >
                      Continue
                    </Button>
                  </ThemeProvider>
                </Box>
              </form>
            </Box>
          </Grids>
        </Grid>
        </Stack>
      ) : (
        <Stack align="center">
          <Grid
            item
            container
            xs={12}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={0}
            sx={{
              minHeight: '100vh',
              position: 'reletive',
              top: '20px',
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 1050,
              outline: 0,
            }}
          >
             <Grids>
             <Box sx={{ mt: 5, mb:5 }}>
               <Title>Almost There</Title>
               <p>Help us know you better!</p>
             </Box>
             <Box>
              <form onSubmit={handleSubmit(handleRegistrationSubmit)}>
                <Box>
                  <TextField
                    label="First Name"
                    variant="standard"
                    color="primary"
                    {...register('firstName', {
                      required: 'First Name is required',
                    })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    sx={{ width: '45%', fontSize: '14px', mr: 0.4 }}
                  />
                  <TextField
                    label="Last Name"
                    variant="standard"
                    color="primary"
                    {...register('lastName', {
                      required: 'Last Name is required',
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    sx={{ width: '45%', fontSize: '14px', mr: 0.4 }}
                  />
                  <TextField
                    label="Enter Email Address"
                    variant="standard"
                    color="primary"
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ width: '90%', fontSize: '14px' }}
                  />
                </Box>
                <Box sx={{ mt: 20 }}>
                  <ThemeProvider theme={theme}>
                    <Button
                      type="submit"
                      sx={{ background: theme.palette.primary.light, width: '90%', color: '#fff', fontSize: '14px', p: 2 }}
                      variant="contained"
                      size="large"
                    >
                      Start Shopping
                    </Button>
                  </ThemeProvider>
                </Box>
              </form>
              </Box>
              </Grids>
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default Login;
