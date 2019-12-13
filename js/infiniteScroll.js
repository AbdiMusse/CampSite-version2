/**
 * Shows the next 10 records when the button is clicked
 * If clicked and is reaches page 2, show the previous button
 */
function showMore() {
    pageNo++;
    if (pageNo === 2) {
        previousButton();
    }
    var searched = document.getElementById('myInput').value;
    ajaxObj.CreateConnection('js/IndexAjax.php?showMore='+searched+"&page="+pageNo, displayCamps);
    window.scroll(0, 200);
}

/**
 * Shows the previous 10 records when the button is clicked
 * If clicked and is reaches page 1, hide the previous button
 */
function showPrevious() {
    pageNo--;
    if (pageNo === 1) {
        document.getElementById('toShowPrevious').innerHTML = "";
    }
    var searched = document.getElementById('myInput').value;
    ajaxObj.CreateConnection('js/IndexAjax.php?showMore='+searched+"&page="+pageNo, displayCamps);
    window.scroll(0, 200);
}

/**
 * Create the show previous button and add the event listener to it to work
 */
function previousButton() {
    var buttonDiv = document.getElementById('toShowPrevious');
    var button = document.createElement('div');
    buttonDiv.appendChild(button);

    button.type = 'button';
    button.id = 'showPrevious';
    button.className = 'btn btn-primary';
    button.style = 'width: 100%; margin-bottom: 10px;';
    button.innerHTML = 'Show Previous';
    document.getElementById('showPrevious').addEventListener('click', showPrevious , false);
}

//Event handlers
document.getElementById('showMore').addEventListener('click', showMore , false);