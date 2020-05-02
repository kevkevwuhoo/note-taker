// DEPENDENCIES
const util = require("util");
const fs = require("fs");
const { v4: uuid4 } = require("uuid");

// make fs.readFile promise-based
// make fs.appendFile promise-based
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DbFunctions {
	constructor() {
		this.id = 0;
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
			const notes = await readFileAsync("db/db.json", "utf8");
			return JSON.parse(notes);
		} catch (err) {
			throw err;
		}
	}

	async addNote(note) {
		try {
			const notes = await this.getNotes();
			const { title, text } = note;
			if (!title || !text) {
				throw new Error("Missing required fields!");
			}
			const newNote = { title, text, id: uuid4() };
			notes.push(newNote);
			this.writeNotes(notes);
		} catch (err) {
			throw err;
		}
	}

	async deleteNote(id) {
		try {
			const notes = await this.getNotes();
			const newNotes = notes.filter((note) => note.id !== id);
			await this.writeNotes(newNotes);
			const updatedNotes = await this.getNotes();
			return updatedNotes;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = DbFunctions;
