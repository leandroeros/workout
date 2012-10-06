// Limpa todos os campos de um formulario.

jQuery.fn.clearFields = function() {

		this.find(':input').each(function() {
			switch (this.type) {
			case 'password':
			case 'select-multiple':
			case 'select-one':
			case 'text':
			case 'textarea':
				$(this).val('');
				break;
			case 'checkbox':
			case 'radio':
				this.checked = false;
			}
		});

};

// Serializa campos para JSON.

jQuery.fn.serializeObject = function() {

	var arrayData, objectData;

	arrayData = this.serializeArray();
	objectData = {};

	$.each(arrayData, function() {

		var value;

		if (this.value != null) {
			value = this.value;
		} else {
			value = '';
		}

		if (objectData[this.name] != null) {
			if (!objectData[this.name].push) {
				objectData[this.name] = [objectData[this.name]];
			}
			objectData[this.name].push(value);
		} else {
			objectData[this.name] = value;
		}

	});

	return objectData;

};

$(function() {

	$("#date").mask("99/99/9999");

	$("#new-activity").validate({
		errorLabelContainer: "#message"
	});
});