import { Block } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialMyAppState = {
  board: [],
  currentBlock: { num: 0, color: 'black', textSize: '4xl', rowIndex: -1, colIndex: -1 },
};

const myAppSlice = createSlice({
  name: 'myApp',
  initialState: initialMyAppState,
  reducers: {
    setBoard: (
      state: { board: Block[][] },
      action: {
        payload: Block[][];
      },
    ) => {
      state.board = action.payload;
    },
    setCurrentBlock: (state: { currentBlock: Block }, action: { payload: Block }) => {
      state.currentBlock = action.payload;
    },
  },
});

export const myAppActions = myAppSlice.actions;

export default myAppSlice.reducer;