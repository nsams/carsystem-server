var Backbone = require('backbone');
var uuid = require('uuid');

var Intersection = Backbone.Model.extend({
    defaults: {
    },
    initialize: function() {
      if (!this.get('id')) {
          this.set('id', uuid());
      }
      if (!this.get('turnoffs')) {
        this.set('turnoffs', []);
      }
    }
});

module.exports = Intersection;
