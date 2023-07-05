import type { Block, MyAppState } from '@/types';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Config } from '@/config';
import { blockList1, blockList8 } from '@/consts/blocks';
import Board from '@/components/Board';
import { myAppActions } from './store/myApp';
import styles from '../styles/Home.module.scss';

const DropNumbersGame = () => {
  const HIGH_SPEED = 5;
  const NORMAL_SPEED = 1000;
  const dispatch = useDispatch();
  const board = useSelector((state: MyAppState) => state.myApp.board);
  const currentBlock = useSelector((state: MyAppState) => state.myApp.currentBlock);
  const nextBlockArea = useSelector((state: MyAppState) => state.myApp.nextBlockArea);
  const currentColumn = useSelector((state: MyAppState) => state.myApp.currentColumn);
  const isMoving = useSelector((state: MyAppState) => state.myApp.isMoving);
  const isMoved = useSelector((state: MyAppState) => state.myApp.isMoved);
  const isMerged = useSelector((state: MyAppState) => state.myApp.isMerged);
  const colIndex = useRef(currentColumn);
  const isMovedRef = useRef(isMoved);
  const startRef = useRef(true);
  const currentBlockRef = useRef(currentBlock);
  const EMPTY_BLOCK: Block = useMemo(
    () => ({
      num: 0,
      color: 'bg-black',
      topColor: 'border-t-black',
      leftColor: 'border-l-black',
      borderColor: 'border-black',
      textSize: 'text-4xl',
      textSizeSmall: 'text-3xl',
    }),
    [],
  );

  // const nextBlockIndexRef = useRef(Math.floor(Math.random() * 7) % blockList1.length);
  // const currentBlockIndexRef = useRef(Math.floor(Math.random() * 7) % blockList1.length);

  // const initializeBoard = () => {
  // const initialBoard: Block[][] = [];
  // let initialRow: Block[] = [];

  // for (let i = 0; i < Config.board.size.col; i++) {
  //   initialRow = [];
  //   for (let j = 0; j < Config.board.size.row; j++) {
  //     const emptyBlock: Block = {
  //       num: 0,
  //       color: 'bg-black',
  //       topColor: 'border-t-black',
  //       leftColor: 'border-l-black',
  //       borderColor: 'border-black',
  //       textSize: 'text-4xl',
  //       textSizeNext: 'text-3xl',
  //       rowIndex: j,
  //       colIndex: i,
  //     };
  //     initialRow.push(emptyBlock);
  //   }
  //   initialBoard.push(initialRow);
  // }

  // dispatch(myAppActions.setBoard(initialBoard));
  // };

  const prepareNextBlock = useCallback((): number => {
    const index = Math.floor(Math.random() * 7) % blockList1.length;
    const cloneNextBlockArea1 = structuredClone(nextBlockArea);
    const cloneNextBlockArea2 = structuredClone(nextBlockArea);

    cloneNextBlockArea1[colIndex.current] = EMPTY_BLOCK;
    dispatch(myAppActions.setNextBlockArea(cloneNextBlockArea1));

    // setTimeout(() => {
    dispatch(myAppActions.setNextBlock(blockList1[index]));
    cloneNextBlockArea2[colIndex.current] = blockList1[index];
    dispatch(myAppActions.setNextBlockArea(cloneNextBlockArea2));
    // }, 300);

    return index;
  }, [EMPTY_BLOCK, dispatch, nextBlockArea]);

  const updateBoard = useCallback(
    (rowIndex: number, currentBoard: Block[][], currentBlockIndex: number): Block[][] => {
      const cloneBoard = structuredClone(currentBoard);

      cloneBoard[rowIndex][colIndex.current] = blockList1[currentBlockIndex];
      dispatch(myAppActions.setBoard(cloneBoard));

      return cloneBoard;
    },
    [dispatch],
  );

  const isBottom = useCallback((rowIndex: number, currentBoard: Block[][]) => {
    console.log(currentBoard);
    console.log(rowIndex + 1);

    return (
      rowIndex === Config.board.size.col - 1 ||
      currentBoard[rowIndex + 1][colIndex.current].num !== 0
    );
  }, []);

  // ブロックがマージされた結果、空洞ができたかどうかチェックする
  const isHole = useCallback((row: number, col: number, currentBoard: Block[][]): boolean => {
    if (row - 1 >= 0) {
      return currentBoard[row][col].num === 0 && currentBoard[row - 1][col].num !== 0;
    }

    return false;
  }, []);

  const calculateIndex = (num: number): number => {
    let power = 0;

    while (num > 2) {
      num = num / 2;
      power++;
    }

    return power;
  };

  const isTheSameNumber = (
    row: number,
    col: number,
    targetRow: number,
    targetCol: number,
    currentBoard: Block[][],
  ): boolean => {
    return currentBoard[row][col].num === currentBoard[targetRow][targetCol].num;
  };

  const fillHole = useCallback(
    (row: number, col: number, currentBoard: Block[][]): Block[][] => {
      const cloneBoard = structuredClone(currentBoard);
      const aboveBlock = structuredClone(currentBoard[row - 1][col]);

      console.log(aboveBlock);
      cloneBoard[row][col] = aboveBlock;
      cloneBoard[row - 1][col] = EMPTY_BLOCK;
      dispatch(myAppActions.setBoard(cloneBoard));

      return cloneBoard;
    },
    [EMPTY_BLOCK, dispatch],
  );

  const mergeBlocks = useCallback(
    (
      row: number,
      col: number,
      mergedRow: number,
      mergedCol: number,
      currentNumber: number,
      currentBoard: Block[][],
    ): Block[][] => {
      currentNumber *= 2;
      dispatch(myAppActions.setIsMerged(true));

      const mergedBlock = blockList8[calculateIndex(currentNumber)];
      const cloneBoard = structuredClone(currentBoard);

      cloneBoard[mergedRow][mergedCol] = EMPTY_BLOCK;
      cloneBoard[row][col] = mergedBlock;
      console.log('Merge!');
      console.log(cloneBoard[row][col]);

      dispatch(myAppActions.setBoard(cloneBoard));

      return cloneBoard;
    },
    [EMPTY_BLOCK, dispatch],
  );

  const doubleMerge = useCallback(
    (
      mergedBlocks: string,
      row: number,
      col: number,
      currentNumber: number,
      currentBoard: Block[][],
    ): Block[][] => {
      currentNumber *= 4;
      dispatch(myAppActions.setIsMerged(true));

      const mergedBlock = blockList8[calculateIndex(currentNumber)];
      const cloneBoard = structuredClone(currentBoard);

      switch (mergedBlocks) {
        case 'RIGHT_BOTTOM':
          cloneBoard[row][col + 1] = EMPTY_BLOCK;
          cloneBoard[row][col] = EMPTY_BLOCK;
          cloneBoard[row + 1][col] = mergedBlock;
          break;
        case 'LEFT_BOTTOM':
          cloneBoard[row][col - 1] = EMPTY_BLOCK;
          cloneBoard[row][col] = EMPTY_BLOCK;
          cloneBoard[row + 1][col] = mergedBlock;
          break;
        default:
          cloneBoard[row][col - 1] = EMPTY_BLOCK;
          cloneBoard[row][col + 1] = EMPTY_BLOCK;
          cloneBoard[row][col] = mergedBlock;
          break;
      }
      console.log('Double Merge!');

      dispatch(myAppActions.setBoard(cloneBoard));

      return cloneBoard;
    },
    [EMPTY_BLOCK, dispatch],
  );

  const tripleMerge = useCallback(
    (row: number, col: number, currentNumber: number, currentBoard: Block[][]): Block[][] => {
      currentNumber *= 8;
      dispatch(myAppActions.setIsMerged(true));

      const mergedBlock = blockList8[calculateIndex(currentNumber)];
      const cloneBoard = structuredClone(currentBoard);

      cloneBoard[row][col - 1] = EMPTY_BLOCK;
      cloneBoard[row][col + 1] = EMPTY_BLOCK;
      cloneBoard[row][col] = EMPTY_BLOCK;
      cloneBoard[row + 1][col] = mergedBlock;

      console.log('Triple Merge!');
      console.log(cloneBoard[row][col]);

      dispatch(myAppActions.setBoard(cloneBoard));

      return cloneBoard;
    },
    [EMPTY_BLOCK, dispatch],
  );

  const numberCheck = useCallback(
    (row: number, col: number, currentBoard: Block[][]): Block[][] => {
      console.log(row, col);
      console.log(currentBoard);
      let cloneBoard = structuredClone(currentBoard);
      const currentNumber = currentBoard[row][col].num;
      let count = 0; // ブロックの数値が一致した数を記録する
      let rowIndex = row;
      let colIndex = col;
      let mergedRight = false;
      let mergedLeft = false;
      let mergedBottom = false;

      console.log(currentNumber);

      // 右側の数値が同じならマージ
      if (col + 1 < Config.board.size.row && isTheSameNumber(row, col, row, col + 1, cloneBoard)) {
        count++;
        mergedRight = true;
      }

      // 左側の数値が同じならマージ
      if (col - 1 >= 0 && isTheSameNumber(row, col, row, col - 1, cloneBoard)) {
        count++;
        mergedLeft = true;
      }

      // 下段の数値が同じならマージ
      if (row + 1 < Config.board.size.col && isTheSameNumber(row, col, row + 1, col, cloneBoard)) {
        count++;
        mergedBottom = true;
      }

      if (count >= 3) {
        cloneBoard = tripleMerge(row, col, currentNumber, cloneBoard);
        console.log(cloneBoard[row + 1][col]);
        cloneBoard = numberCheck(row + 1, col, cloneBoard);
      }

      if (mergedRight && mergedLeft) {
        cloneBoard = doubleMerge('RIGHT_LEFT', row, col, currentNumber, cloneBoard);
        console.log(cloneBoard[row][col]);
        cloneBoard = numberCheck(row, col, cloneBoard);
      }

      if (mergedRight && mergedBottom) {
        cloneBoard = doubleMerge('RIGHT_BOTTOM', row, col, currentNumber, cloneBoard);
        console.log(cloneBoard[row + 1][col]);
        cloneBoard = numberCheck(row + 1, col, cloneBoard);
      }

      if (mergedBottom && mergedLeft) {
        cloneBoard = doubleMerge('LEFT_BOTTOM', row, col, currentNumber, cloneBoard);
        console.log(cloneBoard[row + 1][col]);
        cloneBoard = numberCheck(row + 1, col, cloneBoard);
      }

      if (count === 1 && mergedRight) {
        cloneBoard = mergeBlocks(row, col, row, col + 1, currentNumber, cloneBoard);
        console.log(cloneBoard[row][col]);
        cloneBoard = numberCheck(row, col, cloneBoard);
      }

      if (count === 1 && mergedLeft) {
        cloneBoard = mergeBlocks(row, col, row, col - 1, currentNumber, cloneBoard);
        console.log(cloneBoard[row][col]);
        cloneBoard = numberCheck(row, col, cloneBoard);
      }

      if (count === 1 && mergedBottom) {
        cloneBoard = mergeBlocks(row + 1, col, row, col, currentNumber, cloneBoard);
        console.log(cloneBoard[row + 1][col]);
        cloneBoard = numberCheck(row + 1, col, cloneBoard);
      }

      if (count > 0) {
        // 右側の空洞を埋める
        while (colIndex + 1 < Config.board.size.row && isHole(rowIndex, colIndex + 1, cloneBoard)) {
          while (rowIndex - 1 >= 0 && isHole(rowIndex, colIndex + 1, cloneBoard)) {
            cloneBoard = fillHole(rowIndex, colIndex + 1, cloneBoard);
            rowIndex--;
          }
          // 列の空洞がすべて埋まったら上からnumberCheck
          while (
            rowIndex + 1 < Config.board.size.col &&
            isTheSameNumber(rowIndex, colIndex + 1, rowIndex + 1, colIndex + 1, cloneBoard)
          ) {
            cloneBoard = numberCheck(rowIndex, colIndex + 1, cloneBoard);
            rowIndex++;
          }
          colIndex++;
          rowIndex = row;
        }

        rowIndex = row;
        colIndex = col;

        // 左側の空洞を埋める
        while (colIndex - 1 >= 0 && isHole(rowIndex, colIndex - 1, cloneBoard)) {
          while (rowIndex - 1 >= 0 && isHole(rowIndex, colIndex - 1, cloneBoard)) {
            cloneBoard = fillHole(rowIndex, colIndex - 1, cloneBoard);
            rowIndex--;
          }
          colIndex--;
        }

        rowIndex = 0;
        colIndex = 0;

        // 空洞がすべて埋まったら上からnumberCheck
        while (colIndex < Config.board.size.row) {
          while (rowIndex < Config.board.size.col) {
            console.log(cloneBoard[rowIndex][colIndex]);
            if (cloneBoard[rowIndex][colIndex].num !== 0) {
              cloneBoard = numberCheck(rowIndex, colIndex, cloneBoard);
            }
            rowIndex++;
          }
          colIndex++;
        }
      }

      return cloneBoard;
    },
    [doubleMerge, fillHole, isHole, mergeBlocks, tripleMerge],
  );

  const dropBlock = useCallback(
    (
      rowIndex: number,
      currentBoard: Block[][],
      currentBlockIndex: number,
      nextBlockIndex: number,
    ): void => {
      if (!isGameOver(currentBoard)) {
        const newBoard1 = updateBoard(rowIndex, currentBoard, currentBlockIndex);

        if (isBottom(rowIndex, newBoard1)) {
          // 一番下に到達した場合
          setTimeout(() => {
            let newBoard2 = updateBoard(rowIndex, newBoard1, currentBlockIndex);
            newBoard2 = numberCheck(rowIndex, colIndex.current, newBoard2);
            dispatch(myAppActions.setCurrentRow(0));
            dispatch(myAppActions.setIsMoving(false));
            dispatch(myAppActions.setIsMoved(false));
            isMovedRef.current = false;
            dispatch(myAppActions.setIsMerged(false));
            dropBlock(0, newBoard2, nextBlockIndex, prepareNextBlock()); // 次のブロック
          }, NORMAL_SPEED);
        } else {
          setTimeout(
            () => {
              dispatch(myAppActions.setCurrentRow(rowIndex + 1));
              dropBlock(rowIndex + 1, currentBoard, currentBlockIndex, nextBlockIndex);
            },
            isMovedRef.current ? HIGH_SPEED : NORMAL_SPEED,
          );
        }
      } else {
        console.log('Game Over!!');
      }
    },
    [dispatch, isBottom, numberCheck, prepareNextBlock, updateBoard],
  );

  const dropNextBlock = useCallback(
    (rowIndex: number, currentBoard: Block[][], nextBlockIndex: number): void => {
      dispatch(myAppActions.setIsMoving(false));
      currentBlockRef.current = blockList1[nextBlockIndex];
      dispatch(myAppActions.setCurrentBlock(blockList1[nextBlockIndex]));

      dropBlock(rowIndex, currentBoard, nextBlockIndex, prepareNextBlock());
    },
    [dispatch, dropBlock, prepareNextBlock],
  );

  const isGameOver = (currentBoard: Block[][]): boolean => {
    console.log(currentBoard);

    return currentBoard[0][colIndex.current].num !== 0;
  };

  const gameStart = useCallback(() => {
    console.log('Start!!');

    const currentBlockIndex = Math.floor(Math.random() * 7) % blockList1.length;

    dropNextBlock(0, board, currentBlockIndex);
  }, [board, dropNextBlock]);

  useEffect(() => {
    if (startRef.current) {
      startRef.current = false;
      gameStart();
    }

    if (!isMoving) {
      colIndex.current = currentColumn;
    }

    if (isMoved) {
      isMovedRef.current = true;
    }

    console.log(isMerged);
  }, [gameStart, currentColumn, colIndex, isMoving, isMoved, isMerged]);

  // キー入力
  // const handleKeyDown = useCallback((event: { keyCode: number }) => {
  //   switch (event.keyCode) {
  //     case 39:
  //       columnIndex++;
  //       dispatch(myAppActions.setCurrentColumn(columnIndex));
  //       break;
  //     case 37:
  //       columnIndex--;
  //       dispatch(myAppActions.setCurrentColumn(columnIndex));
  //       break;
  //     case 40:
  //       console.log('down arrow key is pressed!');
  //       break;
  //     default:
  //       break;
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown, false);
  // }, []);

  return (
    <>
      <Head>
        <title>Drop Numbers Game</title>
        <meta
          name='description'
          content='You can play a drop numbers game on this page.'
          key='desc'
        />
      </Head>
      <div className={styles.curtain_open}>
        <div className='bg-gradient-to-b from-cyan-800 to-black w-screen h-screen flex flex-col justify-center items-center'>
          <Board />
        </div>
      </div>
    </>
  );
};

export default DropNumbersGame;
