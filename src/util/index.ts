/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isEmpty = (obj: Object) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};
