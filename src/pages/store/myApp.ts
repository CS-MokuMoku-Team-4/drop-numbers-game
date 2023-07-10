import type { Block } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { initialBoard, initialNextBlocks } from '@/consts/blocks';

const initialMyAppState = {
  board: initialBoard,
  nextBlockArea: initialNextBlocks,
  currentBlock: {
    num: 2,
    color: 'bg-red-600',
    topColor: 'border-t-red-300',
    leftColor: 'border-l-red-300',
    borderColor: 'border-red-800',
    textSize: 'text-4xl',
    textSizeSmall: 'text-3xl',
    isMerged: false,
  },
  nextBlock: {
    num: 4,
    color: 'bg-orange-600',
    topColor: 'border-t-orange-300',
    leftColor: 'border-l-orange-300',
    borderColor: 'border-orange-800',
    textSize: 'text-4xl',
    textSizeSmall: 'text-3xl',
    isMerged: false,
  },
  currentColumn: 2,
  currentRow: -1,
  isMoving: false,
  isMoved: false,
  isMerged: false,
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
    setNextBlockArea: (
      state: { nextBlockArea: Block[] },
      action: {
        payload: Block[];
      },
    ) => {
      state.nextBlockArea = action.payload;
    },
    setCurrentBlock: (state: { currentBlock: Block }, action: { payload: Block }) => {
      state.currentBlock = action.payload;
    },
    setNextBlock: (state: { nextBlock: Block }, action: { payload: Block }) => {
      state.nextBlock = action.payload;
    },
    setCurrentColumn: (state: { currentColumn: number }, action: { payload: number }) => {
      state.currentColumn = action.payload;
    },
    setCurrentRow: (state: { currentRow: number }, action: { payload: number }) => {
      state.currentRow = action.payload;
    },
    incrementCurrentRow: (state: { currentRow: number }) => {
      state.currentRow++;
    },
    setIsMoving: (state: { isMoving: boolean }, action: { payload: boolean }) => {
      state.isMoving = action.payload;
    },
    setIsMoved: (state: { isMoved: boolean }, action: { payload: boolean }) => {
      state.isMoved = action.payload;
    },
    setIsMerged: (state: { isMerged: boolean }, action: { payload: boolean }) => {
      state.isMerged = action.payload;
    },
  },
});

export const myAppActions = myAppSlice.actions;

export default myAppSlice.reducer;
