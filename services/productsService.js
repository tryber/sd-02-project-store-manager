async function create(bool) {
  return new Promise((resolve, reject) => {
    if (bool) {
      resolve(bool);
    }
    reject(new Error('Não deu certo gay'));
  });
}

module.exports = {
  create,
};
