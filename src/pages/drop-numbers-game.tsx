import type { MyAppState } from '@/types';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Config } from '@/config';
import { EMPTY_BLOCK, blockList1 } from '@/consts/blocks';
import { GameBoard } from '@/model';
import Board from '@/components/Board';
import { myAppActions } from '../store/myApp';
import styles from '../styles/Home.module.scss';

const DropNumbersGame = () => {
  const HIGH_SPEED = 5;
  const NORMAL_SPEED = 1000;
  const SLOW_SPEED = 2000;
  const dispatch = useDispatch();
  // const board = useSelector((state: MyAppState) => state.myApp.board);
  const currentBlock = useSelector((state: MyAppState) => state.myApp.currentBlock);
  const nextBlockArea = useSelector((state: MyAppState) => state.myApp.nextBlockArea);
  const currentRow = useSelector((state: MyAppState) => state.myApp.currentRow);
  const currentColumn = useSelector((state: MyAppState) => state.myApp.currentColumn);
  const isMoving = useSelector((state: MyAppState) => state.myApp.isMoving);
  const isMoved = useSelector((state: MyAppState) => state.myApp.isMoved);
  const isMerged = useSelector((state: MyAppState) => state.myApp.isMerged);
  const colIndex = useRef(currentColumn);
  const preRowIndex = useRef(currentRow);
  const preColIndex = useRef(currentColumn);
  const isMovedRef = useRef(isMoved);
  const startRef = useRef(true);
  const currentBlockRef = useRef(currentBlock);
  const gameBoard = useMemo(
    () =>
      new GameBoard(
        -1,
        2,
        Math.floor(Math.random() * 7) % blockList1.length,
        Math.floor(Math.random() * 7) % blockList1.length,
      ),
    [],
  );

  const numberCheck = useCallback(
    (row: number, col: number): void => {
      const currentNumber = gameBoard.board[gameBoard.currentRow][gameBoard.currentCol].num;
      let count = 0; // ブロックの数値が一致した数を記録する
      let rowIndex = row;
      let mergedRight = false;
      let mergedLeft = false;
      let mergedBottom = false;

      console.log(currentNumber);

      // 右側の数値が同じならマージ
      if (col + 1 < Config.board.size.row && gameBoard.isTheSameNumber(row, col, row, col + 1)) {
        count++;
        mergedRight = true;
      }

      // 左側の数値が同じならマージ
      if (col - 1 >= 0 && gameBoard.isTheSameNumber(row, col, row, col - 1)) {
        count++;
        mergedLeft = true;
      }

      // 下段の数値が同じならマージ
      if (row + 1 < Config.board.size.col && gameBoard.isTheSameNumber(row, col, row + 1, col)) {
        count++;
        mergedBottom = true;
      }

      if (count >= 3) {
        rowIndex = gameBoard.tripleMerge(row, col);
      }

      if (count === 2 && mergedRight && mergedLeft) {
        rowIndex = gameBoard.doubleMerge('RIGHT_LEFT', row, col);
      }

      if (count === 2 && mergedRight && mergedBottom) {
        rowIndex = gameBoard.doubleMerge('RIGHT_BOTTOM', row, col);
      }

      if (count === 2 && mergedBottom && mergedLeft) {
        rowIndex = gameBoard.doubleMerge('LEFT_BOTTOM', row, col);
      }

      if (count === 1 && mergedRight) {
        gameBoard.mergeBlocks(row, col, row, col + 1);
      }

      if (count === 1 && mergedLeft) {
        gameBoard.mergeBlocks(row, col, row, col - 1);
      }

      if (count === 1 && mergedBottom) {
        gameBoard.mergeBlocks(row + 1, col, row, col);
        rowIndex = row + 1;
      }

      if (count > 0) {
        dispatch(myAppActions.setBoard(gameBoard.board));
        // const colIndex = col - 1;
        // 空洞が無くなるまで埋める
        for (let colIndex = col - 1; colIndex <= col + 1; colIndex++) {
          if (colIndex < 0) {
            colIndex++;
          }

          if (colIndex >= Config.board.size.row) {
            break;
          }

          let tempRow = rowIndex;

          while (tempRow - 1 >= 0) {
            const rowIndexOfCap = gameBoard.searchRowIndexOfCap(tempRow, colIndex);
            if (rowIndexOfCap > -1) {
              gameBoard.fillHole(tempRow, colIndex, rowIndexOfCap);
              dispatch(myAppActions.setBoard(gameBoard.board));
              numberCheck(tempRow, colIndex);
            }
            tempRow--;
          }
          console.log(col, colIndex);
        }
        numberCheck(rowIndex, col);
      }
    },
    [dispatch, gameBoard],
  );

  const prepareNextBlock = useCallback((): void => {
    const cloneNextBlockArea1 = structuredClone(nextBlockArea);
    const cloneNextBlockArea2 = structuredClone(nextBlockArea);

    gameBoard.currentBlockIndex = gameBoard.nextBlockIndex;
    dispatch(myAppActions.setCurrentBlock(blockList1[gameBoard.currentBlockIndex]));
    cloneNextBlockArea1[gameBoard.currentCol] = EMPTY_BLOCK;
    dispatch(myAppActions.setNextBlockArea(cloneNextBlockArea1));

    gameBoard.nextBlockIndex = Math.floor(Math.random() * 7) % blockList1.length;
    dispatch(myAppActions.setNextBlock(blockList1[gameBoard.nextBlockIndex]));
    cloneNextBlockArea2[gameBoard.currentCol] = blockList1[gameBoard.nextBlockIndex];
    dispatch(myAppActions.setNextBlockArea(cloneNextBlockArea2));
  }, [dispatch, gameBoard, nextBlockArea]);

  const dropBlock = useCallback((): void => {
    if (!gameBoard.isGameOver()) {
      gameBoard.updateBoard(preRowIndex.current, preColIndex.current);
      dispatch(myAppActions.setBoard(gameBoard.board));

      if (gameBoard.isBottom()) {
        // 一番下に到達した場合
        dispatch(myAppActions.setIsMoved(true));
        isMovedRef.current = true;
        preColIndex.current = colIndex.current;

        setTimeout(() => {
          gameBoard.updateBoard(preRowIndex.current, preColIndex.current);
          dispatch(myAppActions.setBoard(gameBoard.board));
          numberCheck(gameBoard.currentRow, gameBoard.currentCol);
          gameBoard.currentRow = 0;
          dispatch(myAppActions.setCurrentRow(0));
          prepareNextBlock();
          dispatch(myAppActions.setIsMoving(false));
          dispatch(myAppActions.setIsMoved(false));
          isMovedRef.current = false;
          dispatch(myAppActions.setIsMerged(false));
          dropBlock(); // 次のブロック
        }, NORMAL_SPEED);
      } else {
        setTimeout(
          () => {
            gameBoard.currentRow++;
            dispatch(myAppActions.setCurrentRow(gameBoard.currentRow));
            gameBoard.updateBoard(preRowIndex.current, preColIndex.current);
            dispatch(myAppActions.setBoard(gameBoard.board));
            dropBlock();
          },
          isMovedRef.current ? HIGH_SPEED : SLOW_SPEED,
        );
      }
    } else {
      console.log('Game Over!!');
    }
  }, [dispatch, gameBoard, numberCheck, prepareNextBlock]);

  const dropNextBlock = useCallback((): void => {
    dispatch(myAppActions.setIsMoving(false));
    gameBoard.currentBlockIndex = gameBoard.nextBlockIndex;
    currentBlockRef.current = blockList1[gameBoard.currentBlockIndex];
    dispatch(myAppActions.setCurrentBlock(blockList1[gameBoard.currentBlockIndex]));
    gameBoard.currentRow = 0;
    dispatch(myAppActions.setCurrentRow(0));
    prepareNextBlock();
    dropBlock();
  }, [dispatch, dropBlock, gameBoard, prepareNextBlock]);

  const gameStart = useCallback(() => {
    console.log('Start!!');
    dropNextBlock();
  }, [dropNextBlock]);

  useEffect(() => {
    if (startRef.current) {
      startRef.current = false;
      gameStart();
    }

    if (!isMoving) {
      preRowIndex.current = currentRow;
      colIndex.current = currentColumn;
      gameBoard.currentCol = currentColumn;
    } else {
      preColIndex.current = currentColumn;
    }

    if (isMoved) {
      preRowIndex.current = currentRow;
      colIndex.current = currentColumn;
      gameBoard.currentCol = currentColumn;
      isMovedRef.current = true;
    }

    console.log(isMerged);
  }, [gameStart, currentColumn, colIndex, isMoving, isMoved, isMerged, gameBoard, currentRow]);

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
