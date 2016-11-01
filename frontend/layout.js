var Mn = require('backbone.marionette');
var _ = require('underscore');
var $ = require('jquery');
require('./layout.css');

var view = Mn.LayoutView.extend({
    className: "kwfUp-main",
    template: _.template('<section class="kwfUp-mainContainer"></section>'),
    regions: {
        mainView: '.kwfUp-mainContainer'
    }
});

module.exports = view;
