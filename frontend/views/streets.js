var Backbone = require('backbone');
var Snap = require('snapsvg');
require('./streets.css');

var StreetsView = Backbone.View.extend({
    className: "kwfUp-viewStreets",

    selectedStreet: null,
    movingCircle: null,
    
    events: {
        'click': 'onClick',
        'mousemove': 'onMouseMove',
        'mousedown': 'onMouseDown',
        'mouseup': 'onMouseUp',
        'keypress': 'onKeyPress'
    },

    onClick: function(ev) {
        if (ev.target.tagName === 'line') {
            var streetId = ev.target.getAttribute('data-street-id');
            var street = this.collection.get(streetId);
            this.selectedStreet = street;
            this.render();
        } else {
            this.selectedStreet = null;
            this.render();
        }
    },
    
    onKeyPress: function(ev) {
    },
    
    onMouseDown: function(ev) {
        console.log(ev);
        if (ev.target.tagName === 'circle') {
            this.movingCircle = ev.target;
        } else if (ev.ctrlKey && this.selectedStreet) {
            let points = this.selectedStreet.get('points');
            points.push({
                x: ev.offsetX, 
                y: ev.offsetY
            });
            console.log(points);
            this.render();
        }
    },
    onMouseUp: function(ev) {
        if (this.movingCircle) {
            let streetId = this.movingCircle.getAttribute('data-street-id');
            let street = this.collection.get(streetId);

            let pointNum = this.movingCircle.getAttribute('data-point-num');
            let points = street.get('points');
            points[pointNum].x = this.movingCircle.getAttribute('cx');
            points[pointNum].y = this.movingCircle.getAttribute('cy');
            this.movingCircle = null;
        }
    },

    onMouseMove: function(ev) {
        if (this.movingCircle) {
            this.movingCircle.setAttribute('cx', ev.offsetX);
            this.movingCircle.setAttribute('cy', ev.offsetY);
        }
    },

    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html("<svg></svg>");
        this.snap = Snap(this.$el.find('svg')[0]);
      
        var s = this.snap;
        s.clear();
      
        //lines
        this.collection.forEach((street) => {
            var points = street.get('points');
            let prevPoint = null;
            points.forEach((point) => {
                if (prevPoint) {
                    var line = s.line(prevPoint.x, prevPoint.y, point.x, point.y);
                    
                    line.attr({
                        stroke: this.selectedStreet === street ? "#F00" : "#000",
                        strokeWidth: 5,
                        'data-street-id': street.get('id')
                    }); 
                }
                prevPoint = point;
            });
        });
        
        //circles
        this.collection.forEach((street) => {
            let points = street.get('points');
            let i = 0;
            points.forEach((point) => {
                let circle = s.circle(point.x, point.y, 7);
                circle.attr({
                    'data-street-id': street.get('id'),
                    'data-point-num': i
                });
                i++;
            });
        });
    }
});

module.exports = StreetsView;
