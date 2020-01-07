const RouterHelper = require('../helper/RouterHelper.js')
const express = require('express')

module.exports = class RootRouter {

  constructor()
  {
    this.router = express.Router();
    this.RouterHelper = RouterHelper;
  }

  setGetMethod () {return 'Not implemented'}

  setPostMethod() {return 'Not implemented'}

  setPutMethod() {return 'Not implemented'}

  setDeleteMethod() {return 'Not implemented'}

  getRouter() {return this.router}

}
