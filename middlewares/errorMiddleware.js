function errorBoom(err, res) {
  const {
    output: {
      payload: { statusCode, message },
    },
    data,
  } = err;

  const response = res.status(statusCode);

  if (statusCode === 400) {
    if (data) {
      return response.json({ error: { message: 'Dados Inválidos', erros: data, code: message } });
    }
    return response.json({ error: { message } });
  }

  return response.json({ error: { message: data, code: message } });
}

function errorMiddleware(err, req, res, next) {
  if (err.isBoom) {
    return errorBoom(err, res);
  }

  return res.status(500).json({ error: { message: err.message, code: 'ServerError' } });
}

module.exports = errorMiddleware;

// - Caso o recurso não seja encontrado, sua API retorne o status HTTP adequado com o body `{ message: '<recurso> não encontrado' }`
//   - Em caso de erro, sua API retorne o status HTTP adequado com o body `{ error: { message: <mensagem de erro>, code: <código do erro> } }`
//     - O código do erro deve ser determinado por você e deve seguir o mesmo padrão para toda a aplicação. Por exemplo: `'not_found'`, `'invalid_data'` e afins
//   - Em caso de dados inválidos, sua API retorne o status HTTP adequado, com o body `{ error: { message: 'Dados inválidos', code: <código do erro> } }`.
//   - Todos os retornos de erro devem seguir o mesmo formato. Para erros que requerem dados adicionais (por exemplo, para informar quais campos estão incorretos) utilize a propriedade `data` dentro do objeto `error`.
