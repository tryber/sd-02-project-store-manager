function ProductNotFound(message = '') {
  this.message = `Produto ${message} não foi encontrado.`;
  this.status = 404;
}

function SalesNotFound(message = '') {
  this.message = `Venda ${message} não foi encontrada.`;
  this.status = 404;
}

function MongoError(message) {
  this.name = 'MongoError';
  this.message = message || 'Mensagem de erro padrão';
  this.status = 400;
}

module.exports = {
  ProductNotFound,
  MongoError,
  SalesNotFound,
};
