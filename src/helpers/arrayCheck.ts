export const arrayCheck = (value: string | string[]) => {
  return typeof value !== 'string'
    ? value.join(', ')
    : value;
};
