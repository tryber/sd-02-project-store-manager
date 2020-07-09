async function erro1(bool) {
  return new Promise((resolve, reject) => {
    if (bool) {
      resolve(2);
    }
    reject(new Error('Bad Request'));
  });
}

async function erro2(bool) {
  return new Promise((resolve, reject) => {
    if (bool) {
      resolve(1);
    }
    reject(new Error('Not Implemented'));
  });
}

module.exports = {
  erro1,
  erro2,
};
