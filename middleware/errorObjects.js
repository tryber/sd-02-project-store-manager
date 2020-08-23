function ProductNotFound(message) {
  this.message = message || 'Nenhum produto foi encontrado.';
  this.status = 404;
}

function MongoError(message) {
  this.name = 'MongoError';
  this.message = message || 'Mensagem de erro padrão';
  this.status = 500;
}

module.exports = {
  ProductNotFound,
  MongoError,
};
