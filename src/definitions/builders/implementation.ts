import { ISwaggerMethodParam } from '../swagger';

export type ArgumentsGroup = {
  [P in ISwaggerMethodParam['in']]: ISwaggerMethodParam;
};
