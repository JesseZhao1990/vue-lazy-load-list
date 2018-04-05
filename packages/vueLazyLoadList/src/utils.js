export function toPoint(percent){
  let str=String(percent).replace("%","");
  str= str/100;
  return str;
}
