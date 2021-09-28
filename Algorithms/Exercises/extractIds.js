const str =  "[~accountid:612c978d1dbcd9006917329b] Hiiiiii [~accountid:612c978d1dbcd9006917329b]";

const extractIds = (str) => {
  return [... new Set(str
    .replace(/\~accountid:/gm, "") // extract [id]
    // .replace(/ +/gm, "") // 2 spaces to 1
    .match(/(\[(.*?)])/gm))]
    .map((item) => {
      return item
        .replace('[', '')
        .replace(']', '')
    });
}

console.log(extractIds(str));
