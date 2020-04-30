// DEPENDENCIES
const util = require("util");
const fs = require("fs");

// make fs.readFile promise-based
// make fs.appendFile promise-based
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DbFunctions {
	async readNotes() {
		try {
			const data = await readFileAsync("db/db.json", "utf8");
			console.log("data", JSON.parse(data));
			return JSON.parse(data);
		} catch (err) {
			throw err;
		}
	}

	async writeNotes(notes) {
		try {
			return await writeFileAsync("db/db.json", JSON.stringify(notes));
		} catch (err) {
			throw err;
		}
	}

	async getNotes() {
		try {
			const notes = await this.readNotes();
			console.log("notes", notes);
			return notes;
		} catch (err) {
			throw err;
		}
	}

	async addNote(note) {
		try {
			const notes = await this.getNotes();
			notes.push(note);
			await this.writeNotes(notes);
		} catch (err) {
			throw err;
		}
	}
}

module.exports = DbFunctions;
