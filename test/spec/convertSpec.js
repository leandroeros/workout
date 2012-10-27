describe("Convert library", function() {
	describe("Distance converter", function() {
		it("converts inches to centimeters", function() {
			expect(convert(12, "inches").to("cm")).toEqual(30.48);
		});
		it("converts centimeters to yards", function() {
			expect(convert(2000, "cm").to("yards")).toEqual(21.87);
		});
	});
	describe("Volume converter", function() {
		it("converts liters to gallons", function() {
			expect(convert(3, "liters").to("gallons")).toEqual(0.79);
		});
		it("converts gallons to cups", function() {
			expect(convert(2, "gallons").to("cups")).toEqual(32);
		});
	});
	describe("Unknown from-unit test", function() {
		it("throws an error when passed an unknown from-unit", function() {
			var testFn = function () {
				convert(1, "dollar").to("yens");
			};
			expect(testFn).toThrow(new Error("unrecognized from-unit"));
		});
	});
});