var Backbone = require('backbone');
var tpl = require('./toolbar.tpl');
require('./toolbar.scss');

var StreetsToolbar = Backbone.View.extend({
    className: "kwfUp-streetsToolbar",
    tpl: tpl,
    events: {
        'click .kwfUp-streetsToolbar__newStreet': 'onNewStreet',
        'click .kwfUp-streetsToolbar__newIntersection': 'onNewIntersection'
    },
    render: function() {
        this.$el.html(this.tpl());
    },

    onNewStreet: function() {
        this.trigger('newStreet');
    },
    
    onNewIntersection: function() {
        this.trigger('newIntersection');
    }
});
module.exports = StreetsToolbar;
