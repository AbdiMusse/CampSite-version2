/**
 * checks if the user has inputted 2 characters or more
 * Show the possible choices from that option
 * if input is empty, hide the option box
 * @param str   use input
 */
function showHint(str) {
    if (str.length === 0) {
        notFocus();
    } else if (str.length >=  2) {
        ajaxObj.CreateConnection('js/IndexAjax.php?word=' + str, liveSearch);
    }
}

/**
 * Get rid of all the created elements and hude the border so nothing can be seen
 */
function notFocus() {
    var nodeCount = document.getElementById('myUL').childElementCount;
    for (var i = 0; i < nodeCount; i++) {
        document.getElementById('myUL').children[0].remove();
    }
    var uic = document.getElementById('myUL');
    uic.style.border = "none";
}

/**
 * Get the data and create the box that shows the options
 */
function liveSearch() {
    var names = ajaxObj.GetData();

    var uic = document.getElementById('myUL');
    uic.style.border = "2px solid #ddd";
    if (names.length === 0 ) {
        uic.style.border = "none";
    }
    uic.innerHTML = "";

    for (let i = 0;  i < names.length; i++) {
        var opt = document.createElement('li');
        var link =  document.createElement('a');
        var image = document.createElement('img');
        link.value = names[i]._campName;
        link.href = '../campDetail.php?id='+names[i]._idCamp;
        link.innerHTML = names[i]._campName + "\t(" +names[i]._country + ")";
        image.src = '../images/'+ names[i]._picText;
        image.style = 'width: 10%; height: 30px; float: left;';
        uic.appendChild(opt);
        opt.appendChild(link);
        link.appendChild(image);
    }
}

/**
 * If search button is clicked, display the correct camps
 */
function showSearchedCamps() {
    var searched = document.getElementById('myInput').value;
    if (searched !== "") {
        endSearch();
        ajaxObj.CreateConnection('js/IndexAjax.php?searchCamps='+searched+"&page="+pageNo, displayCamps);
    }
}

/**
 * Create a button next to the search when search takes place
 * When the new button is clicked, refresh the page (gets rid of search)
 */
function endSearch() {
    var buttonDiv = document.getElementById('endSearch');
    buttonDiv.innerText = "";
    var button = document.createElement('button');
    buttonDiv.appendChild(button);
    button.id = 'endSearchButton';
    button.type = 'button';
    button.className = 'btn btn-outline-danger my-2 my-sm-0';
    button.style = 'margin-left: 10px';
    button.innerHTML = 'End filter/Search';
    document.getElementById('endSearchButton').addEventListener('click', function () {
        window.location.reload();
    } , false);
}

//Event handlers
document.getElementById('myInput').addEventListener('focusout', notFocus, false); //for live search of focus
document.getElementById('campSearch').addEventListener('click', showSearchedCamps , false);