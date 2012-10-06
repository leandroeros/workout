$(function () {

	console.info("Carregando script...");

	var Exercise = Backbone.Model.extend({});

	var Activity = Backbone.Model.extend({

		initialize: function() {
			//console.info("Iniciando uma nova atividade...");
		},

		clear: function() {
			this.destroy();
		}
	});

	var ActivityList = Backbone.Collection.extend({

		model: Activity,

		localStorage: new Store("backbone-activities"),

	});

	var Activities = new ActivityList;

	// Activities.on("add", function(Activity) {
	// 	console.info("Você precisa praticar " + Activity.get("exercise") + "!");
	// });

	var AppView = Backbone.View.extend({

		el: $('#app'),

		events: {
			"submit #new-activity": "registerActivity",
			"click .delete-activity": "deleteActivity"
		},

		activitiesTemplate: _.template($("#activitiesTemplate").html()),

		totalTemplate: _.template($("#totalTemplate").html()),

		initialize: function() {

			// Olhando para um atributo padrão.
			// console.info( (new Activity).get("exercise") );

			Activities.fetch();

			// Exibindo conteúdo do sessão atual.
			this.$el.find("#activities tbody").html( this.activitiesTemplate( {data: Activities.toJSON()} ) );

			this.totalActivities();

		},

		registerActivity: function(e) {
			e.preventDefault();

			// Serializa formulario em um objeto.
			var data = $("#new-activity").serializeObject();

			Activities.create(data);

			this.$el.find("#activities tbody").html( this.activitiesTemplate( {data: Activities.toJSON()} ) );

			console.info("Atividade Registrada!")
		
		},

		deleteActivity: function(e) {
			e.preventDefault();

			// Obtem id a partir do atributo do elemento da pagina.
			var id = $(e.target).data("id");

			// Exclui da coleção e do LocalStorage.
			( Activities.get( id ) ).clear();

			this.$el.find("#activities tbody").html( this.activitiesTemplate( {data: Activities.toJSON()} ) );

			this.totalActivities();

		},

		totalActivities: function() {

			// Somando os minutos de cada atividade registrada.
			var sum = _.reduce(Activities.pluck("time"), function(memo, time) {
				return  memo + parseInt(time); 
			}, 0);

			console.info( sum );

			this.$el.find("#total-activities h2").html( this.totalTemplate( {total: sum + " minutos"} ) );
		}

	});

	var App = new AppView;

});