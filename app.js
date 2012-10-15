
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

	events: {
		'submit #new-activity': 'registerActivity',
		'click .delete-activity': 'deleteActivity'
	},

	initialize: function() {

		Activities.fetch();

		// Exibindo atividades salvas em LocalStorage na view.
		$(this.el).find('#activities tbody').html( _.template($(this.el).find("#activitiesTemplate").html(), {data: Activities.toJSON()} ) );

		this.totalActivities();

	},

	registerActivity: function(e) {
		e.preventDefault();

		// Serializa formulário em um objeto.
		var data = $(this.el).find('#new-activity').serializeObject();

		Activities.create(data);

		Activities.fetch();

		$(this.el).find('#activities tbody').html( _.template($(this.el).find('#activitiesTemplate').html(), {data: Activities.toJSON()} ) );

		// Limpando campos do formulário.
		$(this.el).find('#new-activity').clearFields();
		
		$(this.el).find("input:text:first").focus();
		
		this.totalActivities();
	
	},

	deleteActivity: function(e) {
		e.preventDefault();

		// Obtem id a partir do atributo do elemento da pagina.
		var id = $(e.target).data('id');

		//console.info(Activities.get( id ));

		// Exclui da coleção e do LocalStorage.
		( Activities.get( id ) ).clear();

		$(this.el).find('#activities tbody').html( _.template($(this.el).find('#activitiesTemplate').html(), {data: Activities.toJSON()} ) );

		this.totalActivities();

	},

	totalActivities: function() {

		// Somando os minutos de cada atividade registrada.
		var sum = _.reduce(Activities.pluck('time'), function(memo, time) {
			return  memo + parseInt(time); 
		}, 0);

		//console.info( sum );

		if( sum != 0 ) {
			//$(this.el).find('#total-activities h2').html( _.template( $(this.el).find('#totalTemplate').html(), {total: sum + ' minuto' + (sum > 1 ? "s" : "") } ) );
		} else {
			$(this.el).find('#total-activities h2').html('Você não fez nenhuma atividade ainda!');
		}

	}

});

$(function () {

	$("#date").mask("99/99/9999");

	$("#new-activity").validate({
		errorLabelContainer: "#message",
		focusInvalid: false,
		onfocusout: false,
		onkeyup: false
	});

});