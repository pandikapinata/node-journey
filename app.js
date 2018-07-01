console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];
console.log('Command :',command);
console.log('Yargs',argv);

if (command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if(note){
        console.log('Note Created');
        notes.logNote(note);
    }else{
        console.log('Note title taken');
    }
}else if(command === 'list'){
    notes.getAll();
}else if(command === 'read'){
    var readNote = notes.getNote(argv.title);
    // console.log('====');
    // console.log(readNote[0].title);
    if(readNote){
        notes.logNote(readNote);
    }else{
        console.log('Thats Note not found');
    }
}else if(command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}else{
    console.log('Command not recognized');
}