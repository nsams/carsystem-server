/*
var StreetsCollection = require('./collections/streets');
var StreetsView = require('./view/streets');
var $ = require('jquery');

var streets = new StreetsCollection();
debugger;
var view = new StreetsView({
    streets: streets,
    el: $('body')
});

*/


var App = require('./app');
var $ = require('jquery');
require('./main.css');

$(function() {
    var app = new App({
        mainRegion: {
            el: $('body')
        }
    });
    app.start();
});
