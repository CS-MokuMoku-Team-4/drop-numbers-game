import type { Block } from '@/types';
import { Config } from '@/config';
import { EMPTY_BLOCK, blockList1, blockList8 } from '@/consts/blocks';

export class GameBoard {
  currentRow: number;
  currentCol: number;
  currentBlockIndex: number;
  nextBlockIndex: number;
  board: Block[][];

  constructor(
    currentRow: number,
    currentCol: number,
    currentBlockIndex: number,
    nextBlockIndex: number,
  ) {
    this.currentRow = currentRow;
    this.currentCol = currentCol;
    this.currentBlockIndex = currentBlockIndex;
    this.nextBlockIndex = nextBlockIndex;
    this.board = [
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
    ];
  }

  isGameOver(): boolean {
    console.log(this.board);

    return this.board[0][this.currentCol].num !== 0 && this.board[1][this.currentCol].num !== 0;
  }

  isBottom(): boolean {
    return (
      this.currentRow === Config.board.size.col - 1 ||
      this.board[this.currentRow + 1][this.currentCol].num !== 0
    );
  }

  updateBoard(preRow: number, preCol: number): void {
    const cloneBoard = structuredClone(this.board);

    console.log(preRow, preCol);
    cloneBoard[this.currentRow][this.currentCol] = blockList1[this.currentBlockIndex];

    if (this.currentRow - 1 >= 0) {
      if (preCol !== this.currentCol) {
        let row = Config.board.size.col - 2;
        console.log(row);
        while (row >= 0) {
          if (cloneBoard[row][preCol].num === 0) {
            for (let i = row - 1; i >= 0; i--) {
              cloneBoard[i][preCol] = EMPTY_BLOCK;
              row--;
              console.log(row);
            }
            break;
          } else {
            row--;
          }
        }
        console.log(this.currentRow - 1, this.currentCol);
      }
      cloneBoard[this.currentRow - 1][this.currentCol] = EMPTY_BLOCK;
      console.log(preCol, this.currentCol);
    }

    console.log(cloneBoard);
    this.board = cloneBoard;
  }

  // ブロックがマージされた結果、空洞ができたかどうか調べて天井のrowIndexを返す。
  // 天井がなければ-1を返す。
  searchRowIndexOfCap(row: number, col: number): number {
    let rowIndex = row;

    if (this.board[row][col].num === 0) {
      while (rowIndex - 1 >= 0) {
        rowIndex--;
        if (this.board[rowIndex][col].num !== 0) {
          return rowIndex;
        }
      }
    }

    return -1;
  }

  isTheSameNumber(row: number, col: number, targetRow: number, targetCol: number): boolean {
    return this.board[row][col].num === this.board[targetRow][targetCol].num;
  }

  fillHole(row: number, col: number, rowOfCap: number): void {
    const capBlock = structuredClone(this.board[rowOfCap][col]);
    const cloneBoard = structuredClone(this.board);

    cloneBoard[row][col] = capBlock;
    cloneBoard[rowOfCap][col] = EMPTY_BLOCK;
    this.board = cloneBoard;
  }

  calculateIndex(num: number): number {
    let power = 0;

    while (num > 2) {
      num = num / 2;
      power++;
    }

    return power;
  }

  mergeBlocks(row: number, col: number, mergedRow: number, mergedCol: number): void {
    const mergedNumber = this.board[row][col].num * 2;
    const newBlock = structuredClone(blockList8[this.calculateIndex(mergedNumber)]);
    const cloneBoard = structuredClone(this.board);

    cloneBoard[mergedRow][mergedCol] = EMPTY_BLOCK;
    newBlock.isMerged = true;
    cloneBoard[row][col] = newBlock;
    this.board = cloneBoard;

    console.log('Merge!');
  }

  doubleMerge(mergedBlocks: string, row: number, col: number): number {
    const mergedNumber = this.board[row][col].num * 4;
    const newBlock = structuredClone(blockList8[this.calculateIndex(mergedNumber)]);
    const cloneBoard = structuredClone(this.board);

    switch (mergedBlocks) {
      case 'RIGHT_BOTTOM':
        cloneBoard[row][col + 1] = EMPTY_BLOCK;
        cloneBoard[row][col] = EMPTY_BLOCK;
        newBlock.isMerged = true;
        cloneBoard[row + 1][col] = newBlock;
        row++;
        break;
      case 'LEFT_BOTTOM':
        cloneBoard[row][col - 1] = EMPTY_BLOCK;
        cloneBoard[row][col] = EMPTY_BLOCK;
        newBlock.isMerged = true;
        cloneBoard[row + 1][col] = newBlock;
        row++;
        break;
      default:
        cloneBoard[row][col - 1] = EMPTY_BLOCK;
        cloneBoard[row][col + 1] = EMPTY_BLOCK;
        newBlock.isMerged = true;
        cloneBoard[row][col] = newBlock;
        break;
    }
    console.log('Double Merge!');
    this.board = cloneBoard;

    return row;
  }

  tripleMerge(row: number, col: number): number {
    const mergedNumber = this.board[row][col].num * 8;
    const newBlock = structuredClone(blockList8[this.calculateIndex(mergedNumber)]);
    const cloneBoard = structuredClone(this.board);

    cloneBoard[row][col - 1] = EMPTY_BLOCK;
    cloneBoard[row][col + 1] = EMPTY_BLOCK;
    cloneBoard[row][col] = EMPTY_BLOCK;
    newBlock.isMerged = true;
    cloneBoard[row + 1][col] = newBlock;
    row++;
    console.log('Triple Merge!');
    this.board = cloneBoard;

    return row;
  }
}
