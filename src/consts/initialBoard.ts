import type { Block } from '@/types';

const block0: Block = {
  num: 0,
  color: 'bg-black',
  topColor: 'border-t-black',
  leftColor: 'border-l-black',
  borderColor: 'border-black',
  textSize: 'text-4xl',
  textSizeSmall: 'text-3xl',
  isMerged: false,
};

export const initialBoard: Block[][] = [
  [block0, block0, block0, block0, block0],
  [block0, block0, block0, block0, block0],
  [block0, block0, block0, block0, block0],
  [block0, block0, block0, block0, block0],
  [block0, block0, block0, block0, block0],
  [block0, block0, block0, block0, block0],
  [block0, block0, block0, block0, block0],
  [block0, block0, block0, block0, block0],
];

export const initialNextBlocks: Block[] = [block0, block0, block0, block0, block0];
