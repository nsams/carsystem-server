var Backbone = require('backbone');
var uuid = require('uuid');

var Street = Backbone.Model.extend({
    defaults: {
        name: '',
        one_way: false
    },
    initialize: function() {
      if (!this.get('id')) {
          this.set('id', uuid());
      }
      if (!this.get('points')) {
        this.set('points', []);
      }
    }
});

module.exports = Street;
