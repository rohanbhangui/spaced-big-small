export const encodeSpaceUrlParam = (param: string) => {
  return param.toLowerCase().split(" ").join("-")
}
