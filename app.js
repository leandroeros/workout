$(function () {

	console.info("Carregando script...");

	var Exercise = Backbone.Model.extend({});

	var Activity = Backbone.Model.extend({

		initialize: function() {
			//console.info("Iniciando uma nova atividade...");
		},

		clear: function() {
			this.model.clear();
		}
	});

	var ActivityList = Backbone.Collection.extend({
		
		// Referência o Model.
		model: Activity,

		// Salva em LocalStorage
		localStorage: new Store("backbone-activities"),

	});

	var Activities = new ActivityList;

	// var list = Activities.create({
	// 	time: 60,
	// 	exercise: "Basquete",
	// 	date: "04/10/2012"
	// })

	// ** Coleção Sample **

	// var Activities = new Backbone.Collection;

	// 	//model: Activity,

	// Activities.on("add", function(Activity) {
	// 	console.info("Você precisa praticar " + Activity.get("exercise") + "!");
	// });

	// Activities.add([
	// 	{exercise: "Natação"},
	// 	{exercise: "Basquete"},
	// ]);

	//localStorage: new Store("app-activity")

	// var App = Backbone.Model.extend({

	// 	defaults: function() {

	// 	},

	// 	initialize: function() {
			
	// 	}
	// });

	var AppView = Backbone.View.extend({

		el: $('#app'),

		// Eventos em um view.
		events: {
			"submit #new-activity": "registerActivity",
			"click .delete-activity": "deleteActivity"
		},

		template: _.template($("#activitiesTemplate").html()),

		initialize: function() {

			// Olhando para um atributo padrão.
			// console.info( (new Activity).get("exercise") );

			Activities.fetch();

			// Exibindo conteúdo do sessão atual.
			this.$el.find("#activities tbody").html( this.template( {data: Activities.toJSON()} ) );

		},

		// Método relacionado a um evento (submit)
		registerActivity: function(e) {
			e.preventDefault();

			// Serializa formulario em um objeto.
			var data = $("#new-activity").serializeObject();

			Activities.create(data);

			this.$el.find("#activities tbody").html( this.template( {data: Activities.toJSON()} ) );

			console.info("Atividade Registrada!")
		},

		deleteActivity: function(e) {
			e.preventDefault();

			$(this.el).delegate(".delete-activity", "click", function() {

				id = $(this).attr("data-id");

				console.info(id);

				Activities.remove(id);

				this.$el.find("#activities tbody").html( this.template( {data: Activities.toJSON()} ) );
			})

		}

	});

	var App = new AppView;

});