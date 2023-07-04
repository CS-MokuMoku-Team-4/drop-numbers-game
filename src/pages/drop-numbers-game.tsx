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
  const NORMAL_SPEED = 500;
  const dispatch = useDispatch();
  const board = useSelector((state: MyAppState) => state.myApp.board);
  const currentBlock = useSelector((state: MyAppState) => state.myApp.currentBlock);
  const nextBlockArea = useSelector((state: MyAppState) => state.myApp.nextBlockArea);
  const currentColumn = useSelector((state: MyAppState) => state.myApp.currentColumn);
  const isMoving = useSelector((state: MyAppState) => state.myApp.isMoving);
  const isMoved = useSelector((state: MyAppState) => state.myApp.isMoved);
  // const isMerged = useSelector((state: MyAppState) => state.myApp.isMerged);
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

  const isBottom = useCallback(
    (rowIndex: number, currentBoard: Block[][]) => {
      return rowIndex >= board.length - 1 || currentBoard[rowIndex + 1][colIndex.current].num !== 0;
    },
    [board],
  );

  // ブロックがマージされた結果、空洞ができたかどうかチェックする
  const isHole = useCallback((row: number, col: number, currentBoard: Block[][]): boolean => {
    if (row - 1 >= 0) {
      return currentBoard[row][col].num === 0 && currentBoard[row - 1][col].num !== 0;
    }

    return false;
  }, []);

  const calculateNumbers = (num: number): number => {
    let power = 1;

    while (num > 2) {
      num = num / 2;
      power++;
    }

    return power;
  };

  const isTheSameNumber = (
    currentNumber: number,
    row: number,
    col: number,
    currentBoard: Block[][],
  ): boolean => {
    return currentNumber === currentBoard[row][col].num;
  };

  const fillHole = useCallback(
    (row: number, col: number, currentBoard: Block[][]): Block[][] => {
      const cloneBoard = structuredClone(currentBoard);
      const aboveBlock = structuredClone(currentBoard[row - 1][col]);

      cloneBoard[row][col] = aboveBlock;
      cloneBoard[row - 1][col] = EMPTY_BLOCK;
      dispatch(myAppActions.setBoard(cloneBoard));

      return cloneBoard;
    },
    [EMPTY_BLOCK, dispatch],
  );

  const numberCheck = useCallback(
    (row: number, col: number, currentBoard: Block[][]): Block[][] => {
      const cloneBoard = structuredClone(currentBoard);
      let currentNumber = currentBoard[row][col].num;
      let count = 0; // ブロックの数値が一致した数を記録する
      let rowIndex = row;
      let colIndex = col;

      if (
        col + 1 < Config.board.size.row &&
        isTheSameNumber(currentNumber, row, col + 1, cloneBoard)
      ) {
        count++;
        cloneBoard[row][col + 1] = EMPTY_BLOCK;
        dispatch(myAppActions.setBoard(cloneBoard));
      }

      if (col - 1 >= 0 && isTheSameNumber(currentNumber, row, col - 1, cloneBoard)) {
        count++;
        cloneBoard[row][col - 1] = EMPTY_BLOCK;
        dispatch(myAppActions.setBoard(cloneBoard));
      }

      if (
        row + 1 < Config.board.size.col &&
        isTheSameNumber(currentNumber, row + 1, col, cloneBoard)
      ) {
        count++;
        cloneBoard[row + 1][col] = EMPTY_BLOCK;
        dispatch(myAppActions.setBoard(cloneBoard));
      }

      if (count > 0) {
        currentNumber *= count;
        dispatch(myAppActions.setIsMerged(true));

        const mergedBlock = blockList8[calculateNumbers(currentNumber)];
        let newBoard = structuredClone(cloneBoard);

        newBoard[row][col] = mergedBlock;
        dispatch(myAppActions.setBoard(newBoard));

        // 下の段をチェック
        while (rowIndex + 1 < Config.board.size.col && isHole(rowIndex + 1, col, newBoard)) {
          newBoard = fillHole(rowIndex + 1, col, newBoard);
          newBoard = numberCheck(rowIndex + 1, col, newBoard);
          rowIndex++;
        }

        rowIndex = row;

        // 右側をチェック
        while (
          rowIndex - 1 >= 0 &&
          colIndex + 1 < Config.board.size.row &&
          isHole(rowIndex, colIndex + 1, newBoard)
        ) {
          while (colIndex + 1 < Config.board.size.row && isHole(rowIndex, colIndex + 1, newBoard)) {
            newBoard = fillHole(rowIndex, colIndex + 1, newBoard);
            newBoard = numberCheck(rowIndex, colIndex + 1, newBoard);
            colIndex++;
          }
          rowIndex--;
        }

        rowIndex = row;
        colIndex = col;

        // 左側をチェック
        while (rowIndex - 1 >= 0 && colIndex - 1 >= 0 && isHole(rowIndex, colIndex - 1, newBoard)) {
          while (colIndex - 1 >= 0 && isHole(rowIndex, colIndex - 1, newBoard)) {
            newBoard = fillHole(rowIndex, colIndex - 1, newBoard);
            newBoard = numberCheck(rowIndex, colIndex - 1, newBoard);
            colIndex--;
          }
          rowIndex--;
        }

        currentBoard = newBoard;
      }

      return currentBoard;
    },
    [EMPTY_BLOCK, dispatch, fillHole, isHole],
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
          let newBoard2 = updateBoard(rowIndex, newBoard1, currentBlockIndex);
          newBoard2 = numberCheck(rowIndex, colIndex.current, newBoard2);
          dispatch(myAppActions.setCurrentRow(0));
          dispatch(myAppActions.setIsMoving(false));
          dispatch(myAppActions.setIsMoved(false));
          isMovedRef.current = false;
          dispatch(myAppActions.setIsMerged(false));
          dropBlock(0, newBoard2, nextBlockIndex, prepareNextBlock()); // 次のブロック
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
  }, [gameStart, currentColumn, colIndex, isMoving, isMoved]);

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
