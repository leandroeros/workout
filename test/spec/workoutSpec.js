$(function () {

	describe("LocalStorage", function() {
		// it("15 minutos de tênis", function() {
		// 	expect(App.Activities.create({time: 15, exercise: "Tênis", date: "12/10/2012"}))
		// 		.toEqual(App.Activities.fetch());
		// });

		beforeEach(function() {
			new AppView();
		});

		afterEach(function() {
			Activities.clear();
		});

		it("15 minutos de tenis", function() {
			expect(Activities.create({time: 15, exercise: "Tenis", date: "12/10/2012"}))
				.toEqual(Activities.last());
			console.info(Activities.toJSON());
		});



	});

});