
//addeventlisterners to respective elements
document.getElementById("programmingElement").addEventListener("click", getProgramming);
document.getElementById("fictionElement").addEventListener("click", getFiction);
document.getElementById("horrorElement").addEventListener("click", getHorror);
document.getElementById("newAjexSearchSubmit").addEventListener("click", getSearchValue);
//document.getElementsByClassName("favCheck").addEventListener("checked", addFav);

//allow user to add a book to local storage to access again in favs section.
function addFav() {
    $("favCheck").checked(function () {
        //get title from element tr with the class of booktitles
        var getTitle = $(this).closest('tr').find('.bookTitles');
        //get the key for title to the name of the title found in jquery
        localStorage.setItem(getTitle.attr('title'), getTitle.val());
    });


}


//grab string from the input value from catalog html and pass that onto the searchurl funciton
function getSearchValue() {
    var input = document.getElementById("newAjexSearch").value;
    searchURL(input);
}

src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"

//handler that will take the data from the ajax request and log the data from the api to the console.
function handleResponse(data) {
    const json = JSON.parse(data);
    const books = json.works;
    books.forEach(book => {
        checkbook(book)

    });


}

//alt handler for any search requests
function handleResponseSearch(search) {
    const json = JSON.parse(search);
    const restult = json.docs;
    restult.forEach(restult => {
        serachbook(restult)

    });


}

function serachbook(restult) {
    const title = restult.title;
    //create new table colume  with the tag of div

    const titleTableNewRow = document.createElement('tr');
    const tablecell = document.createElement('td');
    const content = document.createTextNode(title);
    // apend the value of divelemnt to the body of html document
    tablecell.appendChild(content);
    document.getElementById("Title").appendChild(tablecell);
    document.getElementById("Title").appendChild(titleTableNewRow);


    const BookEdition = restult.edition_count;
    const tableNewRow = document.createElement('tr');
    const tablecellA = document.createElement('td');
    const contentA = document.createTextNode(BookEdition);
    tablecellA.appendChild(contentA);
    document.getElementById("bookEdition").appendChild(tablecellA);
    document.getElementById("bookEdition").appendChild(tableNewRow);


    const coverId = restult.edition_key[0];
    const tableNewRowB = document.createElement('tr');
    const tablecellB = document.createElement('td');
    const contentB = document.createTextNode(coverId);
    tablecellB.appendChild(contentB);
    document.getElementById("coverId").appendChild(tablecellB);
    document.getElementById("coverId").appendChild(tableNewRowB);
    const status = restult.availability;
    checkStatusSearch(status);
    const authors = restult.author_name;
    console.log(authors);

    authors.forEach(authors => {
        checkAuthorSearch(authors)

    });


}

function checkAuthorSearch(author) {
    const viewableUnknown = "N/A";
    const name = author;
    const tableNewRowD = document.createElement('tr');
    const tablecellC = document.createElement('td');
    const contentC = document.createTextNode(name);
    tablecellC.appendChild(contentC);
    document.getElementById("author").appendChild(tablecellC);
    document.getElementById("author").appendChild(tableNewRowD);
    addChecks();

}

function checkStatusSearch(status) {
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
        checkAuthor(authors);

    });

    const cover = book.cover_id;
    getCovers(cover)


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

    addChecks();


}

function getCovers(key) {
    const coverUrl = "https://covers.openlibrary.org/b/id/" + key;
    const final = coverUrl + "-S.jpg"

    const coverRow = document.createElement('tr');
    const coverCell = document.createElement('td');
    const content = document.createElement('img');
    content.src = final;
    // apend the value of divelemnt to the body of html document
    coverCell.appendChild(content);
    document.getElementById("Image").appendChild(coverCell);
    document.getElementById("Image").appendChild(coverRow);
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


//adds checkmarks to each of the inserted books that will be used to favorite books.
function addChecks() {
    const checkRow = document.createElement('tr');
    const checkCell = document.createElement('td');
    //create input that will be used to create checkbox
    var checkbox = document.createElement('input');
    //create label for input for accessabiltiy
    var label = document.createElement('label');
    //set attritutes to the input
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('value', 'yes');
    checkbox.setAttribute('class', 'favCheck');
    //set label to checkbox
    label.setAttribute('for', 'favCheck');
    label.appendChild(document.createTextNode('Favorite?'));
    //append to table
    checkCell.appendChild(checkbox);
    document.getElementById("favorite").appendChild(checkRow);
    document.getElementById("favorite").appendChild(checkCell);
}


function getProgramming() {
    const tableNewRowE = document.createElement('tr');
    document.getElementById("author").appendChild(tableNewRowE);
    ajax("https://openlibrary.org/subjects/programming.json", handleResponse);



}

function getFiction() {
    const tableNewRowE = document.createElement('tr');
    document.getElementById("author").appendChild(tableNewRowE);
    //request data to ajax
    ajax("https://openlibrary.org/subjects/fiction.json", handleResponse);


}

function getHorror() {
    const tableNewRowE = document.createElement('tr');
    document.getElementById("author").appendChild(tableNewRowE);
    //request data to ajax
    ajax("https://openlibrary.org/subjects/horror.json", handleResponse);


}

function searchURL(input) {
    //check if search is empty
    if (input != undefined) {
        // if search has text inside grab text and combind it with the openlibary search 
        var newURL = "http://openlibrary.org/search.json?title=" + input;
        console.log(newURL);
        ajax(newURL, handleResponseSearch);
    } else {
        return
    }
}





function ajax(url, callback) {
    //create a new ajax request
    const xhr = new XMLHttpRequest();
    // open a specific ul passed
    xhr.open("GET", url);
    //before the request is sent off while the loading remove the class hidden from the div element with teh id of loader to show the loading icon                         
    $.ajax({
        beforeSend: function () {
            $('#loader').removeClass('hidden')
        },
    });

    // after state changes
    xhr.onreadystatechange = () => {
        //if successfull pass the xmlhttp restuest to the callback function to handle ajax response.
        if (xhr.readyState == 4 && xhr.status === 200) {
            //when ajax function as finished reteving data set the loader class to hidden to remove the loading icon    
            $.ajax({
                complete: function () {
                    $('#loader').addClass('hidden')
                },
            });
            callback(xhr.response);

        }
    }
    //send request
    xhr.send();
}

