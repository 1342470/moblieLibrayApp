
//addeventlisterners to respective elements
document.getElementById("programmingElement").addEventListener("click", getProgramming);
document.getElementById("fictionElement").addEventListener("click", getFiction);
document.getElementById("horrorElement").addEventListener("click", getHorror);


src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"

//handler that will take the data from the ajax request and log the data from the api to the console.
function handleResponse(data) {
    const json = JSON.parse(data);
    const books = json.works;
    books.forEach(book => {
        checkbook(book)

    });


}

function stopProRequest() {
    var request = null;
    $('#programmingElement')(function () {
        var id = $(this).val();
        request = $.ajax({
            type: "POST",
            data: { 'id': id },
            success: function () {

            },
            beforeSend: function () {
                if (request !== null) {
                    request.abort();
                }
            }
        });
    });

}


//grabs parsed data from book and displays data in the console.
function checkbook(book) {
    const title = book.title;
    //create new table colume  with the tag of div

    const titleTableNewRow = document.createElement('tr');
    const tablecell = document.createElement('td');
    const content = document.createTextNode(title);
    // apend the value of divelemnt to the body of html document
    tablecell.appendChild(content);
    document.getElementById("Title").appendChild(tablecell);
    document.getElementById("Title").appendChild(titleTableNewRow);
    console.log(book);

    const BookEdition = book.edition_count;
    const tableNewRow = document.createElement('tr');
    const tablecellA = document.createElement('td');
    const contentA = document.createTextNode(BookEdition);
    tablecellA.appendChild(contentA);
    document.getElementById("bookEdition").appendChild(tablecellA);
    document.getElementById("bookEdition").appendChild(tableNewRow);


    const coverId = book.cover_id;
    const tableNewRowB = document.createElement('tr');
    const tablecellB = document.createElement('td');
    const contentB = document.createTextNode(coverId);
    tablecellB.appendChild(contentB);
    document.getElementById("coverId").appendChild(tablecellB);
    document.getElementById("coverId").appendChild(tableNewRowB);
    const authors = book.authors;
    authors.forEach(authors => {
        checkAuthor(authors)

    });

    const status = book.availability;
    checkStatus(status);
}


function checkAuthor(author) {
    const name = author.name;
    const tableNewRowD = document.createElement('tr');
    const tablecellC = document.createElement('td');
    const contentC = document.createTextNode(name);
    tablecellC.appendChild(contentC);
    document.getElementById("author").appendChild(tablecellC);
    document.getElementById("author").appendChild(tableNewRowD);



}

function checkStatus(status) {
    const viewableUnknown = "N/a";
    // will try and get the values for availablity from the books and insert like previous collums
    try {
        const Availability = status.available_to_borrow;
        const tableNewStatusRow = document.createElement('tr');
        const tablecellStatus = document.createElement('td');
        const contentStatus = document.createTextNode(Availability);
        tablecellStatus.appendChild(contentStatus);
        document.getElementById("availabililty").appendChild(tablecellStatus);
        document.getElementById("availabililty").appendChild(tableNewStatusRow);
        
    }
    // if a book doesn't have a value set the value to viewableUnknown, next set the value of undefined to the newly assined value of availbe to borrow so the script can still output the rest of the results
    catch (available_to_borrow_undefined) {
        if (available_to_borrow_undefined == undefined) {
            status.available_to_borrow = viewableUnknown;
            undefined = status.available_to_borrow;
            const tableNewStatusRow = document.createElement('tr');
            const tablecellStatus = document.createElement('td');
            const contentStatus = document.createTextNode(viewableUnknown);
            tablecellStatus.appendChild(contentStatus);
            document.getElementById("availabililty").appendChild(tablecellStatus);
            document.getElementById("availabililty").appendChild(tableNewStatusRow);
        }
    }

    try {
    // will try and get the values for readable from the books and insert like previous collums
        const viewable = status.is_readable;
        const viewableRow = document.createElement('tr');
        const viewableStatus = document.createElement('td');
        const contentViewable = document.createTextNode(viewable);
        viewableStatus.appendChild(contentViewable);
        document.getElementById("readable").appendChild(viewableStatus);
        document.getElementById("readable").appendChild(viewableRow);
    }
    // if a book doesn't have a value set the value to viewableUnknown, next set the value of undefined to the newly assined value of availbe to borrow so the script can still output the rest of the results
    catch (is_readable_undefined) {
        if (is_readable_undefined == undefined) {
            status.is_readable = viewableUnknown;
            undefined = status.is_readable;
            const viewableRow = document.createElement('tr');
            const viewableStatus = document.createElement('td');
            const contentViewable = document.createTextNode(viewableUnknown);
            viewableStatus.appendChild(contentViewable);
            document.getElementById("readable").appendChild(viewableStatus);
            document.getElementById("readable").appendChild(viewableRow);
        }
    }





}


function getProgramming() {
    //stopRequest(ajax("https://openlibrary.org/subjects/fiction.json"));
    const tableNewRowE = document.createElement('tr');
    document.getElementById("author").appendChild(tableNewRowE);
    ajax("https://openlibrary.org/subjects/programming.json", handleResponse);



}

function getFiction() {
    //stopRequest(ajax("https://openlibrary.org/subjects/fiction.json"));
    const tableNewRowE = document.createElement('tr');
    document.getElementById("author").appendChild(tableNewRowE);
    //request data to ajax
    ajax("https://openlibrary.org/subjects/fiction.json", handleResponse);


}

function getHorror() {
    //stopRequest(ajax("https://openlibrary.org/subjects/fiction.json"));
    const tableNewRowE = document.createElement('tr');
    document.getElementById("author").appendChild(tableNewRowE);
    //request data to ajax
    ajax("https://openlibrary.org/subjects/horror.json", handleResponse);


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

