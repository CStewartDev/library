const library = document.querySelector('.library');
const newBtn = document.querySelector('.addBookBtn');
const bookModal = document.querySelector('.addBookPage');
const modalx = document.querySelector('.modal-x');
const modalAdd = document.querySelector('.addBookFormBtn');
const modalForm = document.querySelector('.addBookForm');
let myLibrary = [];
let ids = 1;
let modalUp = false;

function Book(title,author,pages,hasRead) {
    this.title = title;
    this.author=author;
    this.pages = `${pages} ${pages == 1 ?"page":"pages" }`;
    this.hasRead=hasRead;
    this.id = null; 
}

function addBooktoLibrary(title,author,pages,hasRead){
    let book = new Book(title,author,pages,hasRead);
    book.id = `Book ${ids}`
    ids++;
    myLibrary.push(book);
    addCardstoScreen(myLibrary[myLibrary.length-1])
}

function addCardstoScreen(book){
        const card = makeCard(book);
        library.appendChild(card);
}

function makeCard(item){
    const newDiv = document.createElement("div");
    const modalBtnDiv = document.createElement('div');
    newDiv.classList.add('bookCard');
    newDiv.id = item.id
    modalBtnDiv.classList.add('modalBtnDiv')
    for(let prop in item) {
        if(prop === "title" || prop === "author" || prop === "pages" ){
            const newh2 = document.createElement('h2');
            const newh3 = document.createElement("h3");
            const text = document.createTextNode(`${item[prop]}`);
            if(prop === "title"){
                newh2.appendChild(text);
                newDiv.appendChild(newh2)
            } else {
                newh3.appendChild(text);
                newDiv.appendChild(newh3);
            }
        }else if(prop === "hasRead"){
            let hasRead = item[prop]; 
            const btns = `
            <button class="formBtn readBtn ${hasRead?"read":""}">
                ${hasRead?"Read":"Not Read"}</button> 
            <button class="formBtn delBtn">Delete?</button>`
            modalBtnDiv.innerHTML = btns;
            newDiv.appendChild(modalBtnDiv);
            const readBtn = modalBtnDiv.firstElementChild;
            const delBtn = modalBtnDiv.lastElementChild;
            readBtn.addEventListener('click',e=>this.readToggle(e,item.id));
            delBtn.addEventListener('click',e=>this.deleteCard(item.id))
        }
    } 
    return newDiv  
}

function deleteCard (cardId){
    const toDelete = document.getElementById(cardId);
    let boop = myLibrary.map(book=>book.id).indexOf(cardId);
    myLibrary.splice(boop,1);
    toDelete.remove();
}

function readToggle (e,cardId) {
    const card = document.getElementById(cardId).lastElementChild;
    let boop = myLibrary.map(book=>book.id).indexOf(cardId);
    myLibrary[boop] = !myLibrary[boop];
    if(myLibrary[boop]){
        e.target.innerHTML = "Read";
        e.target.classList.add('read');
    } else{ 
        e.target.innerHTML = "Not Read";
        e.target.classList.remove('read');
    };
}

function toggleModalAppearance(){
    modalUp = !modalUp;
    modalUp ? bookModal.style.display = 'flex' : bookModal.style.display = 'none';
    modalForm.reset();
}

function handleModalAdd(){
    const title = document.getElementById('title');
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const hasRead = document.getElementById('hasRead').checked;
    console.log(title.valueMissing)
    addBooktoLibrary(title.value,author,pages,hasRead);
    toggleModalAppearance();
       
}

// Beginning data for cards
addBooktoLibrary("The Count of Monte Cristo","Alexandre Dumas",1316,true)
addBooktoLibrary("The Hobbit","J.R.R Tolkien",308,true)
addBooktoLibrary("LOTR: Fellowship of the Ring","J.R.R Tolkien",308,true)
addBooktoLibrary("LOTR: The Two Towers","J.R.R Tolkien",308,true)
addBooktoLibrary("LOTR: Return of the King","J.R.R Tolkien",308,true)



// MODAL EVENT LISTENERS//

newBtn.addEventListener('click',toggleModalAppearance)
modalx.addEventListener('click',toggleModalAppearance)
modalAdd.addEventListener('click',handleModalAdd)
window.addEventListener('click',(e)=>{
    if(e.target == bookModal) toggleModalAppearance();
})

