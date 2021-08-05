const library = document.querySelector('.library');
const newBtn = document.querySelector('.addBookBtn');
const bookModal = document.querySelector('.addBookPage')
const modalx = document.querySelector('.modal-x')
const modalAdd = document.querySelector('.addBookFormBtn')
const modalForm = document.querySelector('.addBookForm')
const myLibrary = [];
let modalUp = false;

function Book(title,author,pages,hasRead) {
    this.title = title;
    this.author=author;
    this.pages = `${pages} ${pages == 1 ?"page":"pages" }`;
    this.hasRead=hasRead;
    this.del = null;
}

function addBooktoLibrary(title,author,pages,hasRead){
    let book = new Book(title,author,pages,hasRead);
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
    modalBtnDiv.classList.add('modalBtnDiv')
    for(let prop in item) {
        if(prop === "title" || prop === "author" || prop === "pages" ){
            const newh = document.createElement("h3");
            const text = document.createTextNode(`${item[prop]}`)
            newh.appendChild(text);
            newDiv.appendChild(newh);
        }else if(prop === "hasRead" || prop === "del"){
            const btns = `
            <button class="formBtn" id="readBtn">
                ${item[prop]?"Read":"Not Read"}</button> 
            <button class="formBtn" id="delBtn">Delete?</button>`
            modalBtnDiv.innerHTML = btns;
            newDiv.appendChild(modalBtnDiv);
        }
    } 
    return newDiv  
}

function toggleModalAppearance(){
    modalUp = !modalUp;
    modalUp ? bookModal.style.display = 'flex' : bookModal.style.display = 'none';
}

function handleModalAdd(e){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const hasRead = document.getElementById('hasRead').checked;
    addBooktoLibrary(title,author,pages,hasRead);
    toggleModalAppearance()
    modalForm.reset()   
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
