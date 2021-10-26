const fs = require('fs')
const chalk = require('chalk')

const getNotes =  ()=> {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=> note.title !== title)
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse("No note found"))

    }
    else {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("Note deleted"))

    }

}

const listNotes= ()=>{
    console.log(chalk.inverse.cyan("Your notes:"))
    const notes=loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
        
    });
}

const readNote=(title)=>{
    const notes=loadNotes()
    const duplicateNote=notes.find((note)=> note.title===title)
    if(duplicateNote){
        console.log(chalk.inverse.greenBright(duplicateNote.title))
        console.log(chalk.inverse.green(duplicateNote.body))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}