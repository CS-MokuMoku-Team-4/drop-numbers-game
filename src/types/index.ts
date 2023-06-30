export type MyAppState = {
  myApp: {
    board: Block[][];
    currentBlock: Block;
  };
};

export type Block = {
  num: number;
  color: string;
  textSize: string;
  rowIndex: number;
  colIndex: number;
}
