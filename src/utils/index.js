const numberWithCommas = x =>
  // typeof x === "number"
  // ?
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// : x;

const change_alias = (alias) => {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str;
}

const collapseArray = (data, field, sum) => {
  var dict = Object.create(null);

  var result = data.reduce(function (arr, o) {
    var current = dict[o[field]];

    if (!current) {
      current = Object.assign({}, o);

      arr.push(current);

      dict[o[field]] = current;
    } else {
      current[sum] += o[sum];
    }

    return arr;
  }, []);
  return result;
}

export {
  numberWithCommas,
  change_alias,
  collapseArray
}