import type { Block } from '@/types';

export const EMPTY_BLOCK: Block = {
  num: 0,
  fromColor: 'from-black',
  toColor: 'to-black',
  topColor: 'border-t-black',
  leftColor: 'border-l-black',
  borderColor: 'border-black',
  textSize: 'text-4xl',
  textSizeSmall: 'text-3xl',
  isMerged: false,
} as const;

const block2: Block = {
  num: 2,
  fromColor: 'from-red-500',
  toColor: 'to-red-700',
  topColor: 'border-t-red-300',
  leftColor: 'border-l-red-300',
  borderColor: 'border-red-800',
  textSize: 'text-4xl',
  textSizeSmall: 'text-3xl',
  isMerged: false,
} as const;

const block4: Block = {
  num: 4,
  fromColor: 'from-orange-500',
  toColor: 'to-orange-700',
  topColor: 'border-t-orange-300',
  leftColor: 'border-l-orange-300',
  borderColor: 'border-orange-800',
  textSize: 'text-4xl',
  textSizeSmall: 'text-3xl',
  isMerged: false,
} as const;

const block8: Block = {
  num: 8,
  fromColor: 'from-amber-500',
  toColor: 'to-amber-700',
  topColor: 'border-t-amber-300',
  leftColor: 'border-l-amber-300',
  borderColor: 'border-amber-800',
  textSize: 'text-4xl',
  textSizeSmall: 'text-3xl',
  isMerged: false,
} as const;

const block16: Block = {
  num: 16,
  fromColor: 'from-yellow-500',
  toColor: 'to-yellow-700',
  topColor: 'border-t-yellow-300',
  leftColor: 'border-l-yellow-300',
  borderColor: 'border-yellow-800',
  textSize: 'text-3xl',
  textSizeSmall: 'text-2xl',
  isMerged: false,
} as const;

const block32: Block = {
  num: 32,
  fromColor: 'from-lime-500',
  toColor: 'to-lime-700',
  topColor: 'border-t-lime-300',
  leftColor: 'border-l-lime-300',
  borderColor: 'border-lime-800',
  textSize: 'text-3xl',
  textSizeSmall: 'text-2xl',
  isMerged: false,
} as const;

const block64: Block = {
  num: 64,
  fromColor: 'from-green-500',
  toColor: 'to-green-700',
  topColor: 'border-t-green-300',
  leftColor: 'border-l-green-300',
  borderColor: 'border-green-800',
  textSize: 'text-3xl',
  textSizeSmall: 'text-2xl',
  isMerged: false,
} as const;

const block128: Block = {
  num: 128,
  fromColor: 'from-emerald-500',
  toColor: 'to-emerald-700',
  topColor: 'border-t-emerald-300',
  leftColor: 'border-l-emerald-300',
  borderColor: 'border-emerald-800',
  textSize: 'text-2xl',
  textSizeSmall: 'text-xl',
  isMerged: false,
} as const;

const block256: Block = {
  num: 256,
  fromColor: 'from-teal-500',
  toColor: 'to-teal-700',
  topColor: 'border-t-teal-300',
  leftColor: 'border-l-teal-300',
  borderColor: 'border-teal-800',
  textSize: 'text-2xl',
  textSizeSmall: 'text-xl',
  isMerged: false,
} as const;

const block512: Block = {
  num: 512,
  fromColor: 'from-cyan-500',
  toColor: 'to-cyan-700',
  topColor: 'border-t-cyan-300',
  leftColor: 'border-l-cyan-300',
  borderColor: 'border-cyan-800',
  textSize: 'text-2xl',
  textSizeSmall: 'text-xl',
  isMerged: false,
} as const;

const block1024: Block = {
  num: 1024,
  fromColor: 'from-sky-500',
  toColor: 'to-sky-700',
  topColor: 'border-t-sky-300',
  leftColor: 'border-l-sky-300',
  borderColor: 'border-sky-800',
  textSize: 'text-xl',
  textSizeSmall: 'text-lg',
  isMerged: false,
} as const;

const block2048: Block = {
  num: 2048,
  fromColor: 'from-blue-500',
  toColor: 'to-blue-700',
  topColor: 'border-t-blue-300',
  leftColor: 'border-l-blue-300',
  borderColor: 'border-blue-800',
  textSize: 'text-xl',
  textSizeSmall: 'text-lg',
  isMerged: false,
} as const;

const block4096: Block = {
  num: 4096,
  fromColor: 'from-indigo-500',
  toColor: 'to-indigo-700',
  topColor: 'border-t-indigo-300',
  leftColor: 'border-l-indigo-300',
  borderColor: 'border-indigo-800',
  textSize: 'text-xl',
  textSizeSmall: 'text-lg',
  isMerged: false,
} as const;

const block8192: Block = {
  num: 8192,
  fromColor: 'from-violet-500',
  toColor: 'to-violet-700',
  topColor: 'border-t-violet-300',
  leftColor: 'border-l-violet-300',
  borderColor: 'border-violet-800',
  textSize: 'text-xl',
  textSizeSmall: 'text-lg',
  isMerged: false,
} as const;

const block16384: Block = {
  num: 16384,
  fromColor: 'from-purple-500',
  toColor: 'to-purple-700',
  topColor: 'border-t-violet-300',
  leftColor: 'border-l-violet-300',
  borderColor: 'border-violet-800',
  textSize: 'text-lg',
  textSizeSmall: 'text-base',
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
export const blockList9: Block[] = [
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
  block16384,
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
export const initialNextBlocks: Block[] = [
  EMPTY_BLOCK,
  EMPTY_BLOCK,
  EMPTY_BLOCK,
  EMPTY_BLOCK,
  EMPTY_BLOCK,
];
