const str =  "[~accountid:612c978d1dbcd9006917329b] Hiiiiii [~accountid:612c978d1dbcd9006917329b]";

const extractIds = (str, userId, name) => {
  const regrex = new RegExp(`(\\[\\~accountid:${userId}(.*?)\\])`, 'gm');

  return str
    .replace(regrex, name)
}

console.log(extractIds(str, "612c978d1dbcd9006917329b", "Tochukwu Ozurumba"));
