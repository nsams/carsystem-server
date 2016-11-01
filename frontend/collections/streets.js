var StreetModel = require('../models/street');
var Backbone = require('backbone');

class StreetsCollection extends Backbone.Collection
{
    constructor(...args) {
        super(...args);
        //this.model = StreetModel;
    }
  //localStorage: new Store("backbone-todo")
}
StreetsCollection.prototype.model = StreetModel;

module.exports = StreetsCollection;
