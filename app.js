$(function () {

	var Exercise = Backbone.Model.extend({});

	var Activity = Backbone.Model.extend({

		clear: function() {
			this.destroy();
		}
	});

	var ActivityList = Backbone.Collection.extend({

		model: Activity,

		localStorage: new Store('workout-activities')

	});

	var Activities = new ActivityList;

	var AppView = Backbone.View.extend({

		el: $('#app'),

		events: {
			'submit #new-activity': 'registerActivity',
			'click .delete-activity': 'deleteActivity'
		},

		activitiesTemplate: _.template($('#activitiesTemplate').html()),
		totalTemplate: 		_.template($('#totalTemplate').html()),

		initialize: function() {

			Activities.fetch();

			// Exibindo atividades salvas em LocalStorage na view.
			$('#activities tbody').html( this.activitiesTemplate( {data: Activities.toJSON()} ) );

			this.totalActivities();

		},

		registerActivity: function(e) {
			e.preventDefault();

			// Serializa formulário em um objeto.
			var data = $('#new-activity').serializeObject();

			Activities.create(data);

			Activities.fetch();

			$('#activities tbody').html( this.activitiesTemplate( {data: Activities.toJSON()} ) );

			// Limpando campos do formulário.
			$('#new-activity').clearFields();
			
			$("input:text:first").focus();
			
			this.totalActivities();
		
		},

		deleteActivity: function(e) {
			e.preventDefault();

			// Obtem id a partir do atributo do elemento da pagina.
			var id = $(e.target).data('id');

			console.info(Activities.get( id ));

			// Exclui da coleção e do LocalStorage.
			( Activities.get( id ) ).clear();

			$('#activities tbody').html( this.activitiesTemplate( {data: Activities.toJSON()} ) );

			this.totalActivities();

		},

		totalActivities: function() {

			// Somando os minutos de cada atividade registrada.
			var sum = _.reduce(Activities.pluck('time'), function(memo, time) {
				return  memo + parseInt(time); 
			}, 0);

			console.info( sum );

			if( sum != 0 ) {
				$('#total-activities h2').html( this.totalTemplate( {total: sum + ' minutos'} ) );
			} else {
				$('#total-activities h2').html('Você não fez nenhuma atividade ainda!');
			}

		}

	});

	var App = new AppView;

	$("#date").mask("99/99/9999");

	$("#new-activity").validate({
		errorLabelContainer: "#message",
		focusInvalid: false,
		onfocusout: false,
		onkeyup: false
	});

});