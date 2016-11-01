var Mn = require('backbone.marionette');
var _ = require('underscore');
var $ = require('jquery');

var tpl = _.template('<section class="kwfUp-streetsContainer"></section><section class="kwfUp-resultContainer"></section>');

var StreetsView = require('./streets');
var StreetsCollection = require('../collections/streets')
//var ResultView = require('./Result/Layout');
require('./main.css');

var view = Mn.LayoutView.extend({
    className: "kwfUp-main",
    template: tpl,
    regions: {
        streetsContainer: '.kwfUp-streetsContainer',
        //resultContainer: '.kwfUp-resultContainer'
    },

    initialize: function (options) {
        
        var streetsCollection = new StreetsCollection([
            {id: 1, name: "Foo", points: [{x:10, y:10}, {x:100, y:10}, {x:110, y:50}, {x:100, y:100}]},
            {id: 2, name: "Bar", points: [{x:10, y:100}, {x:10, y:110}, {x:30, y:120}, {x:100, y:100}, {x:150, y:110}]},
            //{name: "Baz", points: [{x:10, y:10}, {x:10, y:10}, {x:10, y:10}, {x:10, y:10}]}
        ]);

        this.streetsView = new StreetsView({
            collection: streetsCollection
        });
/*
        this.resultView = new ResultView({
            componentId: this.componentId
        });
*/
    },

    onRender: function () {
        this.bindEvents();
    },

    bindEvents: function () {

    },

    showContainers: function () {
        this.streetsContainer.show(this.streetsView);
        //this.resultContainer.show(this.resultView);
    }
});

module.exports = view;
