// Get the UI elements

let form = document.querySelector("#book-form");
let bookList = document.querySelector("#book-list");
let filter = document.querySelector("#filter")

// Book Class

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}



// UI Class 

class UI {
    constructor(){

    }

    static addToBooklist(book) {
        let list = document.querySelector("#book-list");
        let crate = document.createElement("tr");
        crate.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete"<a><i class="bi bi-trash icon"></i></td>`;

        list.appendChild(crate);


    }

    static clearFleds(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }

    static showAlert(messege, className){
        let div = document.createElement("div");
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(messege));



        let container = document.querySelector(".container");
        let form = document.querySelector("#book-form");
        container.insertBefore(div, form);


        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 2000);
    }

    static deleteFromBook(target){
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert("Book Removed !!", "success")
        }
    }
 

}

// Local Storage Class


class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }


    static displyBooks(){
        let books = Store.getBooks();

        books.forEach(book => {
            UI.addToBooklist(book);
        });
    }

    static removeBook(isbn){
        let books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}



// Add Event Listener

form.addEventListener('submit', newBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displyBooks());
filter.addEventListener("keyup", filterSearch )


// Define fuctions

function newBook(e){
    let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

    // let ui = new UI();

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert("Please fill the input", "error")
    }else{
        let book = new Book(title, author, isbn);


        UI.addToBooklist(book);
        UI.clearFleds();

        UI.showAlert("Added Book", "success")


        Store.addBook(book);
    }

   

    e.preventDefault();
}


function removeBook(e) {
    UI.deleteFromBook(e.target);
    e.preventDefault();
}

function filterSearch (e){
    let text = e.target.value.toLowerCase();
    
    document.querySelector("#book-list").querySelectorAll('tr').forEach(search  => {
        let item = search.firstChild.nextSibling.innerText;
        if(item.toLowerCase().indexOf(text)!= -1){
            search.style.display = "block";
        }else{
            search.style.display = "none";
        }
    });
}

let typed  = new Typed(".auto-typed", {
    strings: ["Student", "Developer", "Desginer"],
    typeSpeed: 170,
    backSkpeed: 150,
    loop: true
});

