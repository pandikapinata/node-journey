const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    descibe: 'Title of Note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    descibe: 'Body of Note',
    deman: true,
    alias: 'b'
};
const argv = yargs
    .command('add','add a new note',{
        title:titleOptions,
        body:bodyOptions
    })
    .command('list', 'List all Notes')
    .command('read', 'Read a Note',{
        title:titleOptions
    })
    .command('remove', 'Remove a Note',{
        title:titleOptions
    })
    .help()
    .argv;
var command = argv._[0];


if (command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if(note){
        console.log('Note Created');
        notes.logNote(note);
    }else{
        console.log('Note title taken');
    }
}else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note));
}else if(command === 'read'){
    var readNote = notes.getNote(argv.title);
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