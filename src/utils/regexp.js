const regExpLib = {
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  number: /^\d+$/,
  integer: /^[1-9]\d*|0$/,
  float: /^([1-9]\d*\.\d+|0\.\d+|[1-9]\d*|0)$/,
  money: /^([1-9]\d*\.\d{1,2}|0\.\d{1,2}|[1-9]\d*|0)$/,
  telephone: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,16})+$/,
  enchar: /^[ \w]*$/,
  cnchar: /^[\u4E00-\u9FA5\uF900-\uFA2D]*$/,
  idcard: /^(\d{15}|\d{18}|\d{17}X?)$/i,
};

export default regExpLib;
