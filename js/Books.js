//request data to ajax
ajax("https://openlibrary.org/subjects/fiction.json", handleResponse)

//handler that will take the data from the ajax request and log the data from the api to the console.
function handleResponse(data) {
    const json = JSON.parse(data)
    const books = json.works
}
