var IntersectionModel = require('../models/intersection');
var Backbone = require('backbone');

class IntersectionsCollection extends Backbone.Collection
{
}
IntersectionsCollection.prototype.model = IntersectionModel;

module.exports = IntersectionsCollection;
