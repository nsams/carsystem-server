var Backbone = require('backbone');
var Snap = require('snapsvg');
require('./streets.css');
var Toolbar = require('./streets/toolbar');
var Street = require('../models/street')
var Intersection = require('../models/intersection')

var StreetsView = Backbone.View.extend({
    className: "kwfUp-viewStreets",
    
    constructor : function (options) {
        this.streets = options.streets;
        this.intersections = options.intersections;
        Backbone.View.prototype.constructor.call(this, options);
    },

    selected: null,
    movingCircle: null,
    
    events: {
        'click svg': 'onClick',
        'mousemove svg': 'onMouseMove',
        'mousedown svg': 'onMouseDown',
        'mouseup svg': 'onMouseUp',
        'keypress svg': 'onKeyPress'
    },

    onClick: function(ev) {
        if (ev.target.tagName === 'line') {
            var streetId = ev.target.getAttribute('data-street-id');
            if (streetId) {
                var street = this.streets.get(streetId);
                this.selected = street;
                this.render();
            }
        } else {
            this.selected = null;
            this.render();
        }
    },
    
    onKeyPress: function(ev) {
    },
    
    onMouseDown: function(ev) {
        console.log(ev, this.selected);
        if (this.selected instanceof Intersection) {
            let targetStreetId = ev.target.getAttribute('data-street-id');
            if (targetStreetId) {
                let turnoffs = this.selected.get('turnoffs');
                turnoffs.push({
                    street_id: targetStreetId
                });
                this.render();
            }                
        } else if (ev.target.tagName === 'circle') {
            this.movingCircle = ev.target;
        } else if (ev.ctrlKey && this.selected instanceof Street) {
            let points = this.selected.get('points');
            points.push({
                x: ev.offsetX, 
                y: ev.offsetY
            });
            this.render();
        }
    },
    onMouseUp: function(ev) {
        if (this.movingCircle) {
            let streetId = this.movingCircle.getAttribute('data-street-id');
            let street = this.streets.get(streetId);

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
    
    onNewStreet: function() {
        this.selected = new Street();
        this.streets.add(this.selected);
        this.render();
    },
    
    onNewIntersection: function() {
        if (!(this.selected instanceof Street)) {
            alert('Vorher Straße wählen');
            return;
        }
        let newIntersection = new Intersection();
        newIntersection.set('in_street_id', this.selected.id);
        this.intersections.add(newIntersection);
        this.selected = newIntersection;
    },

    initialize: function() {
        this.toolbar = new Toolbar();
        this.toolbar.on('newStreet', this.onNewStreet, this);
        this.toolbar.on('newIntersection', this.onNewIntersection, this);
        this.render();
    },
    render: function() {
        this.$el.html("<div class=\"kwfUp-streets__toolbar\"></div><svg></svg>");
        this.toolbar.setElement(this.$el.find('.kwfUp-streets__toolbar'));
        this.toolbar.render();

        this.snap = Snap(this.$el.find('svg')[0]);
      
        var s = this.snap;
        s.clear();
      
        //lines
        this.streets.forEach((street) => {
            var points = street.get('points');
            let prevPoint = null;
            points.forEach((point) => {
                if (prevPoint) {
                    var line = s.line(prevPoint.x, prevPoint.y, point.x, point.y);
                    
                    line.attr({
                        stroke: this.selected === street ? "#F00" : "#000",
                        strokeWidth: 5,
                        'data-street-id': street.id
                    }); 
                }
                prevPoint = point;
            });
        });
  
        //intersections
        console.log(this.intersections);
        this.intersections.forEach((intersection) => {
            console.log(intersection);
           let inStreet = this.streets.get(intersection.get('in_street_id'));
           if (!inStreet) return;
           let inPoint = inStreet.get('points')[inStreet.get('points').length-1];

           let turnoffs = intersection.get('turnoffs');
           for (var turnoff of turnoffs) {
                let turnoffStreet = this.streets.get(turnoff.street_id);
                let turnoffPoint = turnoffStreet.get('points')[0];
                let line = s.line(inPoint.x, inPoint.y, turnoffPoint.x, turnoffPoint.y);
                    
                line.attr({
                    stroke: "#666",
                    strokeWidth: 5,
                    'data-intersection-id': intersection.id
                }); 
           }
        });
        
              
        //circles
        this.streets.forEach((street) => {
            let points = street.get('points');
            let i = 0;
            points.forEach((point) => {
                let circle = s.circle(point.x, point.y, 7);
                circle.attr({
                    'data-street-id': street.id,
                    'data-point-num': i
                });
                i++;
            });
        });
        
    }
});

module.exports = StreetsView;
