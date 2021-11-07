//request data to ajax
ajax("https://openlibrary.org/subjects/fiction.json", handleResponse)

//handler that will take the data from the ajax request and log the data from the api to the console.
function handleResponse(data) {
    const json = JSON.parse(data)
    const books = json.works
    books.forEach(book => {
        checkbook(book)
    });
    
  
}

//grabs parsed data from book and displays data in the console.
function checkbook(book){
    const title = book.title;
    //create divelement with the tag of div
    const divElement = document.createElement('div');
    const content = document.createTextNode(title)
    const pTag = document.createElement('p')
    // apend the value of divelemnt to the body of html document
    pTag.appendChild(content)
    divElement.appendChild(pTag)
    document.body.appendChild(divElement)
    console.log(book)
    const authors = book.authors  
    authors.forEach(author => {
        checkAuthor(author)
    });
}


function checkAuthor(author){
    console.log(author.name)
}

function ajax(url, callback) {
    //create a new ajax request
    const xhr = new XMLHttpRequest();
    // open a specific ul passed
    xhr.open("GET", url);
    // after state changes
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status === 200) {
            callback(xhr.response);
        }
    }
    xhr.send();
}

