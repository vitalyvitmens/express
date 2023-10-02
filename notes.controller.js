const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const Note = require('./models/Note')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  await Note.create({ title })
  console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
  const notes = await Note.find()

  // console.log(notes[0].id)
  // console.log(notes[1].id)
  // console.log(notes[2].id)
  // console.log(notes[0]._id)
  // console.log(notes[1]._id)
  // console.log(notes[2]._id)

  return notes
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach((note) => {
    console.log(chalk.bgWhite(note.id), chalk.blue(note.title))
  })
}

async function removeNote(id) {
  const notes = await getNotes()

  const filtered = notes.filter((note) => note.id !== id)

  await saveNotes(filtered)
  console.log(chalk.red(`Note with id="${id}" has been removed.`))
}

async function updateNote(id) {
  console.log('From notes.controller.js id:', id)
  const notes = await getNotes()

  const getNoteById = notes.find((note) => note.id === id)
  console.log('From notes.controller.js getNoteById.id:', getNoteById.id)
  console.log('From notes.controller.js getNoteById.title:', getNoteById.title)

  const oldNote = {
    title: 'oldNoteTitle',
    id: 'oldNoteId',
  }
  const newNote = {
    title: getNoteById.title,
    id: getNoteById.id,
  }

  const updatedNotes = notes.map((note) => (note.id === id ? newNote : oldNote))
  console.log('updatedNotes', updatedNotes)
  await saveNotes(notes)
  console.log(
    chalk.yellow(`Note with id="${id}" has been changed title="${id}".`)
  )
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote,
}
