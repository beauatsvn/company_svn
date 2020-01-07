module.exports =  class DataObjectInterface
{
  getResource (_cond, _skip, _limit) {return {status: 404, send: 'Not implemented'}}
  addResource (_payload, _user) {return {status: 404, send: 'Not implemented'}}
  updateResource (_cond, _payload, _user) {return {status: 404, send: 'Not implemented'}}
  deleteResource (_cond) {return {status: 404, send: 'Not implemented'}}
}
