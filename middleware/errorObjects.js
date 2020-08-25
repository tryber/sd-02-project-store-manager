function ProductNotFound(message = '') {
  this.message = `Produto ${message} não foi encontrado.`;
  this.status = 404;
}

function SalesNotFound(message = '') {
  this.message = `Venda ${message} não foi encontrada.`;
  this.status = 404;
}

function InsuficientQuantity(message = '') {
  this.message = `Produto ${message} possui quantidade insuficiente.`;
  this.status = 400;
}

function MongoError(message, status) {
  this.name = 'MongoError';
  this.message = message || 'Mensagem de erro padrão';
  this.status = status || 400;
}

module.exports = {
  ProductNotFound,
  MongoError,
  SalesNotFound,
  InsuficientQuantity,
};
