const str =  "[~accountid:612c978d1dbcd9006917329b] Hiiiiii [~accountid:612c978d1dbcd9006917329b]";

const extractIds = (str) => {
  return [... new Set(str
    .match(/(\[~accountid:(.*?)])/gm))]
    .map((item) => {
      return item
        .replace('[~accountid:', '')
        .replace(']', '')
    });
}

console.log(extractIds(str));
