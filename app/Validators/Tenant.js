'use strict'

class Tenant {
  get rules () {
    return {
      name: 'required|string'
    }
  }
}

module.exports = Tenant
