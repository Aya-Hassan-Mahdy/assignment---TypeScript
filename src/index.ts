// Base class
class User {
   id: number;
   name: string;
   email: string;
  private password: string;
   phone: string;
  private _age!: number;

  noteBooks: NoteBook[]=[]

  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }

  addNoteBook(noteBook: NoteBook){
    this.noteBooks.push(noteBook)
  }


   get age(): number {
    return this._age;
  }

   set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this._age = value;
  }

   displayInfo(): void {
    console.log(`ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
  }
}

//inheritance

class Admin extends User {
  constructor(id:number, name: string, email:string, password: string, phone:string, age:number) {
    super(id, name, email, password, phone, age)
  }
   manageNotes():void{
    console.log(`Admin ${this.name} is managing notes...`)
  }

}


// class-Note
class Note {
  id:number;
  title:string;
  content:string;
  author:User  

  constructor(id:number,title:string, content:string, author:User) {
    this.id=id
    this.title=title
    this.content=content
    this.author=author
  }
  preview():string{
     return this.content.slice(0, 20) + "..."
  }
}

//Composition NoteBook and Note

class NoteBook{
  notes:Note[]=[]


  addNote(note:Note){
    this.notes.push(note)
  }


  removeNote(id:number){
    this.notes = this.notes.filter(n => n.id !== id)
  }
}


class Storage<T>{
  private items: T[]=[]

    addItem(item:T): void{
      this.items.push(item)
    }
    removeItem(item: T){
     this.items = this.items.filter((i)=> i !== item)
    }
    getAllItems():T[]{
      return this.items
    }
}

//aggregation
const User1 = new User(1, "Sara", "sara@gmail.com" , "1243456","0129994599", 20 )
const studyBook = new NoteBook();
const workBook = new NoteBook();

User1.addNoteBook(studyBook);
User1.addNoteBook(workBook);

console.log(User1.noteBooks);

//assocation
const myNote = new Note(1, "My First Note" , "hello world", User1)

console.log(myNote)
console.log(myNote.author.name)

//Generics - Data Storage
const noteStorage = new Storage<Note>();
noteStorage.addItem(myNote);
console.log(noteStorage.getAllItems());

const userStorage = new Storage<User>();
userStorage.addItem(User1);
console.log(userStorage.getAllItems());