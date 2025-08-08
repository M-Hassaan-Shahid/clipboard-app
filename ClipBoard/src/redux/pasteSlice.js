import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  paste: localStorage.getItem('paste') ? JSON.parse(localStorage.getItem('paste')) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      state.paste.push(action.payload)
      localStorage.setItem('paste', JSON.stringify(state.paste))
      toast.success("Paste created successfully!");
    },
    removeFromPaste: (state, action) => {
      state.paste = state.paste.filter(item => item._id !== action.payload)
      localStorage.setItem('paste', JSON.stringify(state.paste))
      toast.success("Paste deleted successfully!");
    },
    resetAllPaste: (state) => {
      state.paste = []
      localStorage.removeItem('paste')
      toast.success("All pastes have been reset!");
    },
    UpdateFromPaste: (state, action) => {
      const index = state.paste.findIndex(item => item._id === action.payload._id)
      if (index !== -1) {
        state.paste[index] = action.payload
        localStorage.setItem('paste', JSON.stringify(state.paste))
        toast.success("Paste updated successfully!");
      }

    }
  }
})

// Action creators are generated for each case reducer function
export const { addToPaste, removeFromPaste, resetAllPaste, UpdateFromPaste } = pasteSlice.actions
export default pasteSlice.reducer