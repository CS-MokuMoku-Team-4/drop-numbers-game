export type MyAppState = {
  myApp: {
    board: Block[][];
    nextBlockArea: Block[];
    currentBlock: Block;
    nextBlock: Block;
    currentColumn: number;
    currentRow: number;
    isMoving: boolean;
    isMoved: boolean;
    isMerged: boolean;
  };
};

export type Block = {
  num: number;
  fromColor: string;
  toColor: string;
  topColor: string;
  leftColor: string;
  borderColor: string;
  textSize: string;
  textSizeSmall: string;
  isMerged: boolean;
};
