export type MyAppState = {
  myApp: {
    board: Block[][];
    currentBlock: Block;
    nextBlock: Block;
    currentColumn: number;
    currentRow: number;
    isBeginning: boolean;
    isMoving: boolean;
    isMoved: boolean;
  };
};

export type Block = {
  num: number;
  color: string;
  topColor: string;
  leftColor: string;
  borderColor: string;
  textSize: string;
  textSizeNext: string;
  rowIndex: number;
  colIndex: number;
};
