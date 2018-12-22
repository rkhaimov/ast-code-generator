export type PartialPick<T extends {}, K extends keyof T> = {
  [P in K]: T[P] extends {} ? Partial<T[P]> : T[P]
};
