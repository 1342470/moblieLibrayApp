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
    //create new table colume  with the tag of div
    const tablecell = document.createElement('tr');
    const content = document.createTextNode(title)
    // apend the value of divelemnt to the body of html document
    tablecell.appendChild(content)
    document.getElementById("Title").appendChild(tablecell);  
    console.log(book)
    
    const BookEdition = book.edition_count
    const tablecellA = document.createElement('tr');
    const contentA = document.createTextNode(BookEdition)  
    tablecellA.appendChild(contentA)
    document.getElementById("bookEdition").appendChild(tablecellA);  
    
    const coverId = book.cover_id
    const tablecellB = document.createElement('tr');
    const contentB = document.createTextNode(coverId)  
    tablecellB.appendChild(contentB)
    document.getElementById("coverId").appendChild(tablecellB);  

    const author = Object.values(book.authors);
    const tablecellC = document.createElement('tr');
    const contentC = document.createTextNode(author)  
    tablecellC.appendChild(contentC)
    document.getElementById("author").appendChild(tablecellC);
    
    
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

