import type { Block } from '@/types';

export const EMPTY_BLOCK: Block = {
  num: 0,
  color: 'bg-black',
  topColor: 'border-t-black',
  leftColor: 'border-l-black',
  borderColor: 'border-black',
  textSize: 'text-4xl',
  textSizeSmall: 'text-3xl',
  isMerged: false,
} as const;

const block2: Block = {
  num: 2,
  color: 'bg-red-600',
  topColor: 'border-t-red-300',
  leftColor: 'border-l-red-300',
  borderColor: 'border-red-800',
  textSize: 'text-4xl',
  textSizeSmall: 'text-3xl',
  isMerged: false,
} as const;

const block4: Block = {
  num: 4,
  color: 'bg-orange-600',
  topColor: 'border-t-orange-300',
  leftColor: 'border-l-orange-300',
  borderColor: 'border-orange-800',
  textSize: 'text-4xl',
  textSizeSmall: 'text-3xl',
  isMerged: false,
} as const;

const block8: Block = {
  num: 8,
  color: 'bg-amber-600',
  topColor: 'border-t-amber-300',
  leftColor: 'border-l-amber-300',
  borderColor: 'border-amber-800',
  textSize: 'text-4xl',
  textSizeSmall: 'text-3xl',
  isMerged: false,
} as const;

const block16: Block = {
  num: 16,
  color: 'bg-yellow-600',
  topColor: 'border-t-yellow-300',
  leftColor: 'border-l-yellow-300',
  borderColor: 'border-yellow-800',
  textSize: 'text-3xl',
  textSizeSmall: 'text-2xl',
  isMerged: false,
} as const;

const block32: Block = {
  num: 32,
  color: 'bg-lime-600',
  topColor: 'border-t-lime-300',
  leftColor: 'border-l-lime-300',
  borderColor: 'border-lime-800',
  textSize: 'text-3xl',
  textSizeSmall: 'text-2xl',
  isMerged: false,
} as const;

const block64: Block = {
  num: 64,
  color: 'bg-green-600',
  topColor: 'border-t-green-300',
  leftColor: 'border-l-green-300',
  borderColor: 'border-green-800',
  textSize: 'text-3xl',
  textSizeSmall: 'text-2xl',
  isMerged: false,
} as const;

const block128: Block = {
  num: 128,
  color: 'bg-emerald-600',
  topColor: 'border-t-emerald-300',
  leftColor: 'border-l-emerald-300',
  borderColor: 'border-emerald-800',
  textSize: 'text-2xl',
  textSizeSmall: 'text-xl',
  isMerged: false,
} as const;

const block256: Block = {
  num: 256,
  color: 'bg-teal-600',
  topColor: 'border-t-teal-300',
  leftColor: 'border-l-teal-300',
  borderColor: 'border-teal-800',
  textSize: 'text-2xl',
  textSizeSmall: 'text-xl',
  isMerged: false,
} as const;

const block512: Block = {
  num: 512,
  color: 'bg-cyan-600',
  topColor: 'border-t-cyan-300',
  leftColor: 'border-l-cyan-300',
  borderColor: 'border-cyan-800',
  textSize: 'text-2xl',
  textSizeSmall: 'text-xl',
  isMerged: false,
} as const;

const block1024: Block = {
  num: 1024,
  color: 'bg-sky-600',
  topColor: 'border-t-sky-300',
  leftColor: 'border-l-sky-300',
  borderColor: 'border-sky-800',
  textSize: 'text-xl',
  textSizeSmall: 'text-lg',
  isMerged: false,
} as const;

const block2048: Block = {
  num: 2048,
  color: 'bg-blue-600',
  topColor: 'border-t-blue-300',
  leftColor: 'border-l-blue-300',
  borderColor: 'border-blue-800',
  textSize: 'text-xl',
  textSizeSmall: 'text-lg',
  isMerged: false,
} as const;

const block4096: Block = {
  num: 4096,
  color: 'bg-indigo-600',
  topColor: 'border-t-indigo-300',
  leftColor: 'border-l-indigo-300',
  borderColor: 'border-indigo-800',
  textSize: 'text-xl',
  textSizeSmall: 'text-lg',
  isMerged: false,
} as const;

const block8192: Block = {
  num: 8192,
  color: 'bg-violet-600',
  topColor: 'border-t-violet-300',
  leftColor: 'border-l-violet-300',
  borderColor: 'border-violet-800',
  textSize: 'text-xl',
  textSizeSmall: 'text-lg',
  isMerged: false,
} as const;

export const blockList1: Block[] = [block2, block4, block8, block16, block32, block64];
export const blockList2: Block[] = [block2, block4, block8, block16, block32, block64, block128];
export const blockList3: Block[] = [
  block2,
  block4,
  block8,
  block16,
  block32,
  block64,
  block128,
  block256,
];
export const blockList4: Block[] = [
  block2,
  block4,
  block8,
  block16,
  block32,
  block64,
  block128,
  block256,
  block512,
];
export const blockList5: Block[] = [
  block2,
  block4,
  block8,
  block16,
  block32,
  block64,
  block128,
  block256,
  block512,
  block1024,
];
export const blockList6: Block[] = [
  block2,
  block4,
  block8,
  block16,
  block32,
  block64,
  block128,
  block256,
  block512,
  block1024,
  block2048,
];
export const blockList7: Block[] = [
  block2,
  block4,
  block8,
  block16,
  block32,
  block64,
  block128,
  block256,
  block512,
  block1024,
  block2048,
  block4096,
];
export const blockList8: Block[] = [
  block2,
  block4,
  block8,
  block16,
  block32,
  block64,
  block128,
  block256,
  block512,
  block1024,
  block2048,
  block4096,
  block8192,
];

export const initialBoard: Block[][] = [
  [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
  [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
  [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
  [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
  [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
  [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
  [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
  [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
];

export const initialNextBlocks: Block[] = [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK];