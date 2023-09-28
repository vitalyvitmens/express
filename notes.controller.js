const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString(),
  }

  notes.push(note)

  await saveNotes(notes)
  console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
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

async function editNote(id) {
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
  editNote,
}
