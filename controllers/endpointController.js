const endpointNotFound = (_req, res) => res.status(404).json(
  { error: { error: true, message: 'The endpoint wasn\'t found', code: 'not_found' } },
);

module.exports = { endpointNotFound };
