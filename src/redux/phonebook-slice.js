import { createSlice } from '@reduxjs/toolkit';

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
  },
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    removeContact(state, action) {
      state.contacts = state.contacts.filter(
        item => item.id !== action.payload
      );
    },
  },
});

export const phonebookReducer = phonebookSlice.reducer;
export const { addContact, removeContact } = phonebookSlice.actions;
