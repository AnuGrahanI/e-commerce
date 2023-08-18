import { createSlice } from '@reduxjs/toolkit';
import product from  '../CartItem.json'
import Cartcategory from '../Cartcategory.json'
import User from '../User.json'


const slice = createSlice({
  name: 'state',
  initialState: {
    islogedin: JSON.parse(localStorage.getItem('islogedin')),
    cartItems: [],
    phoneNumber: '',
    email: '',
    products:product,
    Cartcategorys:Cartcategory,
    UserDeatials:User,
  },
  reducers: {
    login(state, action) {
      state.islogedin = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    addItem(state, action) {
      const itemToAdd = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.titleName === itemToAdd.titleName
      );
  
      if (existingItem) {
        // Item already exists in the cart, update its quantity
        existingItem.qty = itemToAdd.qty;
      } else {
        // Item does not exist in the cart, add it to the cartItems array
        state.cartItems.push(itemToAdd);
      }
    },
    removeItem(state, action) {
      state.cartItems=action.payload;
    },
    saveRegistrationData(state, action) {
      state.UserDeatials.push(action.payload)
      
    },
    setUserDetails(state,action) {
      const updatedUser = action.payload;
      const userIndex = state.UserDeatials.findIndex(
        (user) => user.userId === updatedUser.userId
      );
      state.UserDeatials[userIndex] = updatedUser;
    },
  },
});


export const { login, setEmail, setPhoneNumber, addItem ,removeItem,saveRegistrationData,setUserDetails } = slice.actions;
export default slice.reducer;
