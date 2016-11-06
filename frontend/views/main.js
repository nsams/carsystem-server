var Mn = require('backbone.marionette');
var _ = require('underscore');
var $ = require('jquery');

var tpl = _.template('<section class="kwfUp-streetsContainer"></section><section class="kwfUp-resultContainer"></section>');

var StreetsView = require('./streets');
var StreetsCollection = require('../collections/streets')
var IntersectionsCollection = require('../collections/intersections')
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
            {id: 2, name: "Bar1", points: [{x:100, y:200}, {x:110, y:210}, {x:130, y:220}]},
            {id: 3, name: "Bar2", points: [{x:200, y:200}, {x:210, y:200}, {x:220, y:210}]},
            //{name: "Baz", points: [{x:10, y:10}, {x:10, y:10}, {x:10, y:10}, {x:10, y:10}]}
        ]);
        var intersectionsCollection = new IntersectionsCollection([
            {id: 1, in_street_id: 1, turnoffs: [{street_id: 2}, {street_id: 3}]},
            //{id: 2, name: "Bar", points: [{x:10, y:100}, {x:10, y:110}, {x:30, y:120}, {x:100, y:100}, {x:150, y:110}]},
            //{name: "Baz", points: [{x:10, y:10}, {x:10, y:10}, {x:10, y:10}, {x:10, y:10}]}
        ]);

        this.streetsView = new StreetsView({
            streets: streetsCollection,
            intersections: intersectionsCollection
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
