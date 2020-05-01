// DEPENDENCIES
const util = require("util");
const fs = require("fs");
//TODO: UUID

// make fs.readFile promise-based
// make fs.appendFile promise-based
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DbFunctions {
	constructor() {
		this.id = 0;
	}

	// async readNotes() {
	// 	try {
	// 		return await readFileAsync("db/db.json", "utf8");
	// 	} catch (err) {
	// 		throw err;
	// 	}
	// }
	// async readNotes() {
	// 	try {
	// 		const data = await readFileAsync("db/db.json", "utf8");
	// 		console.log("read", data);
	// 		return JSON.parse(data);
	// 	} catch (err) {
	// 		throw err;
	// 	}
	// }

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
			console.log("addnotes", notes);
			const { title, text } = note;
			if (!title || !text) {
				throw new Error("Missing required fields!");
			}
			const newNote = { title, text, id: this.id };
			notes.push(newNote);
			this.writeNotes(notes);
		} catch (err) {
			throw err;
		}
	}

	async deleteNote(id) {
		console.log(id);
		try {
			const notes = await this.getNotes();
			const newNotes = notes.filter((note, index) => {
				console.log(id);
				console.log(note.id !== parseInt(id));
				return index !== parseInt(id);
			});
			console.log("delete", newNotes);
			await this.writeNotes(newNotes);
			const updatedNotes = await this.getNotes();
			return JSON.parse(updatedNotes);
		} catch (err) {
			throw err;
		}
	}
}

module.exports = DbFunctions;
