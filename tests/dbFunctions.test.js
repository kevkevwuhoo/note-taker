const DbFunctions = require("../db/dbFunctions.js");

describe("DbFunctions", () => {
	describe("readNotes", () => {
		test("should call fs.readFileAsync on db.json", () => {
			// Arrange
			const dbFunctions = new DbFunctions();
			const output = [{ title: "Test Title", text: "Test text" }];
			// Act
			const data = dbFunctions.readNotes();
			// Assert
			expect(data).resolves.toEqual(output);
		});
	});
});
