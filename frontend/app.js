var $ = require('jquery');
var _ = require('underscore');
var Mn = require('backbone.marionette');

var Layout = require('./layout');
var MainView = require('./views/main');
var Backbone = require('backbone');

var app = Mn.Application.extend({
    initialize: function (options) {
        this.addRegions({
            mainRegion: options.mainRegion
        });

        this.layout = new Layout();
        this.mainRegion.show(this.layout);

        this.componentId = options.componentId;
        this.on('start', function () {
            var mainView = new MainView({
            });
            this.layout.getRegion('mainView').show(mainView);

            var AppRouter = Backbone.Router.extend({
                routes: {
                    "home": "defaultRoute",
                    "*actions": "defaultRoute"
                }
            });

            var appRouter = new AppRouter;
            appRouter.on('route:defaultRoute', function () {
                mainView.showContainers();
            });
            Backbone.history.start();
        });
    }
});

module.exports = app;
