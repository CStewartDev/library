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
    if(validateForm())return;
    addBooktoLibrary(title.value,author,pages,hasRead);
    toggleModalAppearance(); 
}

function hasError (field) {
    // Don't validate submits, buttons, file and reset inputs, and disabled fields
    if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

    // Get validity
    var validity = field.validity;

    // If valid, return null

    if (validity.valid) return;

    if(field.type ==="checkbox") return;

    if(field.type ==="number") return 'Please select a value that is no less than ' + field.getAttribute('min') + '.';

    if(field.id === "title") return "Please enter a book title";

    if(field.id === "author") return "Please enter an author's name"

    // If all else fails, return a generic catchall error
    return 'The value you entered for this field is invalid.';

}

function showError (field,error){
    field.classList.add('error');

    let id = field.id;
    if(!id) return;

    // Check if error message field already exists
    // If not, create one
    var message = field.form.querySelector('.error-message#error-for-' + id );
    if (!message) {
        message = document.createElement('div');
        message.className = 'error-message';
        message.id = 'error-for-' + id;
        field.parentNode.insertBefore( message, field.nextSibling );
    }

    // Update error message
    message.innerHTML = error;

    // Show error message
    message.style.display = 'block';
    message.style.visibility = 'visible';

};

function removeError (field) {
    field.classList.remove('error');

    // Remove ARIA role from the field
    field.removeAttribute('aria-describedby');

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // Check if an error message is in the DOM
    var message = field.form.querySelector('.error-message#error-for-' + id + '');
    if (!message) return;

    // If so, hide it
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';
};

function validateForm() {
    // Get all of the form elements
    let fields = modalForm.elements;

    // Validate each field
    // Store the first field with an error to a variable so we can bring it into focus later
    let error, hasErrors;
    for (let i = 0; i < fields.length; i++) {
        error = hasError(fields[i]);
        if (error) {
            showError(fields[i], error);
            if (!hasErrors) {
                hasErrors = fields[i];
            }
        }
    }
    // If there are errrors, don't submit form and focus on first element with error
    if (hasErrors) {
        hasErrors.focus();
        return true
    }
}



// Beginning data for cards
addBooktoLibrary("The Count of Monte Cristo","Alexandre Dumas",1316,true)
addBooktoLibrary("The Hobbit","J.R.R Tolkien",308,true)
addBooktoLibrary("LOTR: Fellowship of the Ring","J.R.R Tolkien",308,true)
addBooktoLibrary("LOTR: The Two Towers","J.R.R Tolkien",308,true)
addBooktoLibrary("LOTR: Return of the King","J.R.R Tolkien",308,true)



// MODAL EVENT LISTENERS//

modalAdd.addEventListener('click',handleModalAdd,false)
newBtn.addEventListener('click',toggleModalAppearance)
modalx.addEventListener('click',toggleModalAppearance)
//modalAdd.addEventListener('click',handleModalAdd)
window.addEventListener('click',(e)=>{
    if(e.target == bookModal) toggleModalAppearance();
})

bookModal.addEventListener('blur',
function (e) {
    //Validtate Error
    let error = hasError(e.target);

    //if error, show it
    if(error){
        showError(e.target, error)
        return;
    }

    removeError(e.target)

}, true);



