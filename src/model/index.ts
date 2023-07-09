import type { Block } from '@/types';
import { Config } from '@/config';
import { EMPTY_BLOCK, blockList8 } from '@/consts/blocks';

export class Board {
  currentRow: number;
  currentCol: number;
  board: Block[][];

  constructor(board: Block[][], currentRow: number, currentCol: number) {
    this.currentRow = currentRow;
    this.currentCol = currentCol;
    this.board = board;
  }

  isBottom(): boolean {
    return (
      this.currentRow === Config.board.size.col - 1 ||
      this.board[this.currentRow + 1][this.currentCol].num !== 0
    );
  }

  // ブロックがマージされた結果、空洞ができたかどうか調べて天井のrowIndexを返す。
  // 天井がなければ-1を返す。
  searchRowIndexOfCap(): number {
    let rowIndex = this.currentRow;

    if (this.board[this.currentRow][this.currentCol].num === 0) {
      while (rowIndex - 1 >= 0) {
        rowIndex--;
        if (this.board[rowIndex][this.currentCol].num !== 0) {
          return rowIndex;
        }
      }
    }

    return -1;
  }

  isTheSameNumber(targetRow: number, targetCol: number): boolean {
    return (
      this.board[this.currentRow][this.currentCol].num === this.board[targetRow][targetCol].num
    );
  }

  fillHole(rowOfCap: number): void {
    const capBlock = structuredClone(this.board[rowOfCap][this.currentCol]);

    this.board[this.currentRow][this.currentCol] = capBlock;
    this.board[rowOfCap][this.currentCol] = EMPTY_BLOCK;
  }

  calculateIndex(num: number): number {
    let power = 0;

    while (num > 2) {
      num = num / 2;
      power++;
    }

    return power;
  }

  mergeBlocks(mergedRow: number, mergedCol: number, currentNumber: number): void {
    currentNumber *= 2;

    const newBlock = blockList8[this.calculateIndex(currentNumber)];

    this.board[mergedRow][mergedCol] = EMPTY_BLOCK;
    newBlock.isMerged = true;
    this.board[this.currentRow][this.currentCol] = newBlock;

    console.log('Merge!');
  }

  doubleMerge(mergedBlocks: string): void {
    const currentNumber = this.board[this.currentRow][this.currentCol].num * 4;
    const newBlock = blockList8[this.calculateIndex(currentNumber)];

    switch (mergedBlocks) {
      case 'RIGHT_BOTTOM':
        this.board[this.currentRow][this.currentCol + 1] = EMPTY_BLOCK;
        this.board[this.currentRow][this.currentCol] = EMPTY_BLOCK;
        newBlock.isMerged = true;
        this.board[this.currentRow + 1][this.currentCol] = newBlock;
        this.currentRow++;
        break;
      case 'LEFT_BOTTOM':
        this.board[this.currentRow][this.currentCol - 1] = EMPTY_BLOCK;
        this.board[this.currentRow][this.currentCol] = EMPTY_BLOCK;
        newBlock.isMerged = true;
        this.board[this.currentRow + 1][this.currentCol] = newBlock;
        this.currentRow++;
        break;
      default:
        this.board[this.currentRow][this.currentCol - 1] = EMPTY_BLOCK;
        this.board[this.currentRow][this.currentCol + 1] = EMPTY_BLOCK;
        newBlock.isMerged = true;
        this.board[this.currentRow][this.currentCol] = newBlock;
        break;
    }
    console.log('Double Merge!');
  }

  tripleMerge(): void {
    const currentNumber = this.board[this.currentRow][this.currentCol].num * 8;
    const newBlock = blockList8[this.calculateIndex(currentNumber)];

    this.board[this.currentRow][this.currentCol - 1] = EMPTY_BLOCK;
    this.board[this.currentRow][this.currentCol + 1] = EMPTY_BLOCK;
    this.board[this.currentRow][this.currentCol] = EMPTY_BLOCK;
    newBlock.isMerged = true;
    this.board[this.currentRow + 1][this.currentCol] = newBlock;
    this.currentRow++;

    console.log('Triple Merge!');
  }
}
