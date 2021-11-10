function search() {
	var userSearch, resultFilter, table, tr, td, i;
			userSearch = document.getElementById("search");
			resultFilter = userSearch.value.toUpperCase();
			table = document.getElementById("stock");
			tr = table.getElementsByTagName("td");

			// Loop through all table rows, and hide those who don't match the search query
			for (i = 0; i < tr.length; i++) {
				td = tr[i].getElementsByTagName("tr");
				for (j = 0; j < td.length; j++) {
					let tdata = td[j];
					if (tdata) {
						if (tdata.innerHTML.toUpperCase().indexOf(resultFilter) > -1) {
							tr[i].style.display = "";
							break;
						} else {
							tr[i].style.display = "none";
						}
					}
				}
			}
}