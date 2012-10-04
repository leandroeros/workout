var activities = [];

$(function () {

	console.info("Carregando script...");

	var Exercise = Backbone.Model.extend({

		defaults: function() {

		}
	
	});

	var Activity = Backbone.Model.extend({
		
		defaults: function() {
			return {
				time: false,
				exercise: false,
				date: false
			}
		}

	});

	var ListActivity = Backbone.Collection.extend({

		localStorage: new Store("app-activity")

	});

	var Activies = new ListActivity;

	var App = Backbone.Model.extend({

		defaults: function() {

		},

		initialize: function() {
			
		}
	});

	var AppView = Backbone.View.extend({

		el: $('#app'),

		events: {
			"submit #new-activity": "registerActivity"
		},

		initialize: function() {

		},

		template: _.template($('#list-template').html()),

		registerActivity: function(e) {
			e.preventDefault();

			var data = $("#new-activity").serializeObject();
			activities.push(data);

			this.$el.find("#activities tbody").html(this.template());

			console.info("Atividade Registrada!")
		}
	});

	var App = new AppView;

	// $('form').submit(function(e) {
	// 	e.preventDefault();
	// })

});