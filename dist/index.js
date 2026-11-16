"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Base class
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    noteBooks = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    addNoteBook(noteBook) {
        this.noteBooks.push(noteBook);
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 18 || value > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this._age = value;
    }
    displayInfo() {
        console.log(`ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
    }
}
//inheritance
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes() {
        console.log(`Admin ${this.name} is managing notes...`);
    }
}
// class-Note
class Note {
    id;
    title;
    content;
    author;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
    preview() {
        return this.content.slice(0, 20) + "...";
    }
}
//Composition NoteBook and Note
class NoteBook {
    notes = [];
    addNote(note) {
        this.notes.push(note);
    }
    removeNote(id) {
        this.notes = this.notes.filter(n => n.id !== id);
    }
}
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter((i) => i !== item);
    }
    getAllItems() {
        return this.items;
    }
}
//aggregation
const User1 = new User(1, "Sara", "sara@gmail.com", "1243456", "0129994599", 20);
const studyBook = new NoteBook();
const workBook = new NoteBook();
User1.addNoteBook(studyBook);
User1.addNoteBook(workBook);
console.log(User1.noteBooks);
//assocation
const myNote = new Note(1, "My First Note", "hello world", User1);
console.log(myNote);
console.log(myNote.author.name);
//Generics - Data Storage
const noteStorage = new Storage();
noteStorage.addItem(myNote);
console.log(noteStorage.getAllItems());
const userStorage = new Storage();
userStorage.addItem(User1);
console.log(userStorage.getAllItems());
