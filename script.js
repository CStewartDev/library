const library = document.querySelector('.library');
console.log(library);

const myLibrary = [];

function Book(title,author,pages,hasRead) {
    this.Title = title;
    this.Author=author;
    this.Pages = pages;
    this.hasRead=hasRead;
}

function addBooktoLibrary(title,author,pages,hasRead){
    let book = new Book(title,author,pages,hasRead);
    myLibrary.push(book)
}

function makeCard(item){
    const newDiv = document.createElement("div");
    const newUl = document.createElement("ul");
    
    for(let prop in item) {
        const newLi = document.createElement("li");
        const text = document.createTextNode(`${prop}: ${item[prop]}`)
        newLi.appendChild(text);
        newUl.appendChild(newLi);
    }
    return newDiv.appendChild(newUl);
    
}

addBooktoLibrary("The Count of Monte Cristo","Alexandre Dumas",1316,true)
addBooktoLibrary("The Hobbit","J.R.R Tolkien",308,true)
addBooktoLibrary("LOTR: Fellowship of the Ring","J.R.R Tolkien",308,true)
addBooktoLibrary("LOTR: The Two Towers","J.R.R Tolkien",308,true)
addBooktoLibrary("LOTR: Return of the King","J.R.R Tolkien",308,true)

myLibrary.forEach(book=> {
    const card =makeCard(book);
    library.appendChild(card);
})