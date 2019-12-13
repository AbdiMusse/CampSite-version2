//Creates the ajax object which will be used in all js files that use it
var ajaxObj;
ajaxObj = new AjaxCall();

//Used in the infinite scroll
var pageNo = 1;
let urlParams = new URLSearchParams(window.location.search);
pageNumber = urlParams.get('pageNo');
if (pageNumber != null) {
    pageNo = pageNumber;
}

/**
 * Displays the campsites when the page loads
 */
function showCamps() {
    ajaxObj.CreateConnection('js/IndexAjax.php?camps=1', displayCamps);
}

/**
 * Validates the filters and displays the filtered campsites
 */
function showFilteredCamps() {
    var filters;    //the list of filters
    var searchedValue = document.getElementById('myInput').value;
    filters = searchedValue+",";
    var facilityArrray = [];
    var facilities = document.getElementsByClassName('facility');
    var idealForArray = [];
    var idealFor = document.getElementsByClassName('idealFor');
    var starValue = 10;
    var starts = document.getElementsByClassName('stars');
    var countryValue = '';
    var country = document.getElementsByClassName('country');

    //Getting value of star rating
    for (let s of starts) { if (s.checked === true) { starValue = s.value; } }
    filters += starValue+ ",";
    //Getting values for countries to check
    for (let c of country) { if (c.checked === true) { countryValue = c.value; } }
    filters += countryValue+ ",";
    //Getting values for facilities
    for (let f of facilities) { if (f.checked === true) { facilityArrray.push(1); filters += 1+ ",";
        } else { facilityArrray.push(0); filters += 0+ ","; } }
    //Getting values for who it's ideal for
    for (let i of idealFor) { if (i.checked === true) { idealForArray.push(1); filters += 1+ ",";
        } else { idealForArray.push(0); filters += 0+ ","; } }

    if (facilityArrray.includes(1) || idealForArray.includes(1) || starValue !== 10 || countryValue !== "") {
        endSearch();    ///displays the button that will end the search
        filters = filters.substring(0, filters.length-1);   //get rid of extra comma
        ajaxObj.CreateConnection('js/IndexAjax.php?filterCamps='+filters+"&page="+pageNo, displayCamps);
        window.scroll(0, 200);  //scroll back to the top to display the first camp
    }
}

/**
 * Gets the data depending on what method was callled
 * Creates a new camp view
 */
function displayCamps() {
    campSites = document.getElementById('content-index');
    var camps = ajaxObj.GetData();

    campSites.innerHTML = "";
    for (let i = 0; i < camps.length; i++) {
        createAppend(camps[i]);
        attributes(camps[i]);
    }
}

/**
 * Creates all the elements that are needed and oreders the elements
 * @param camps
 */
function createAppend(camps) {
    article = document.createElement('article');
    campSites.appendChild(article);
    div1 = document.createElement('div');
    article.appendChild(div1);
    link1 = document.createElement('a');
    img = document.createElement('img');
    div1.appendChild(link1);
    link1.appendChild(img);
    div2 = document.createElement('div');
    article.appendChild(div2);
    div2_1 = document.createElement('div');
    link2 = document.createElement('a');
    p2_1 = document.createElement('p');
    div2.appendChild(div2_1);
    link2.appendChild(p2_1);
    div2_1.appendChild(link2);

    if (document.getElementById('hidden-checkEmail').value !== "") {
        if (document.getElementById('hidden-checkFav').value !== "" &&
            (document.getElementById('hidden-checkFav').value).includes(camps._idCamp) ) {
            favButton = document.createElement('button');
            div2_1.appendChild(favButton);

            favButton.type = 'button';
            favButton.disabled = true;
            favButton.className= 'btn btn-secondary';
            favButton.style = 'margin-top: 10px;';
            favButton.innerHTML = 'In Favourites';
        } else {
            addToFav_button = document.createElement('button');
            div2_1.appendChild(addToFav_button);

            addToFav_button.type = 'button';
            addToFav_button.id = 'addToFavourite'+camps._idCamp;
            addToFav_button.className = 'btn btn-primary';
            addToFav_button.style = 'margin-top: 10px';
            addToFav_button.innerHTML = 'Add to favourite';

            document.getElementById('addToFavourite'+camps._idCamp).addEventListener('click', function () {
                //alert(camps._campName + ' has been added to your favourite list');
                addToFav_button.disabled = true;
                // ajaxObj.CreateConnection('js/IndexAjax.php?addToFavourites='+camps._idCamp, function () { });
            }, false);
        }
    }

    div2_2 = document.createElement('div');
    div2.appendChild(div2_2);
    p2_2_1 = document.createElement('p');
    p2_2_2 = document.createElement('p');
    div2_2.appendChild(p2_2_1);
    div2_2.appendChild(p2_2_2);
    div2_3 = document.createElement('div');
    div2.appendChild(div2_3);
    p2_3_1 = document.createElement('p');
    div2_3.appendChild(p2_3_1);
}

/**
 * Hanldes all the attrbibutes the newly made elements need
 * @param camps
 */
function attributes(camps) {
    article.className = 'row';
    article.style = 'margin-bottom: 20px;';
    div1.className = 'col-sm-12 col-md-4';
    link1.href = '../campDetail.php?id=' + camps._idCamp;
    img.src = '../images/'+ camps._picText;
    img.style = 'height: 250px; width: 100%;';
    div2.className = 'col-sm-12 col-md-8';
    div2_1.className= 'col-sm-12';
    div2_1.style = 'background-color: #71dd8a;';
    link2.src = '../campDetail.php?id=' + camps._idCamp;
    p2_1.style = 'display: inline-block;';
    p2_1.innerHTML = camps._campName;

    div2_2.className = 'col-sm-12';
    div2_2.style = 'background-color: #71dd8a; display: inline-block;';
    p2_2_1.innerHTML = 'Description:';
    p2_2_2.innerHTML = camps._description;
    div2_3.className = 'col-sm-12';
    div2_3.style = 'background-color: #71dd8a; padding-bottom: 30px;';
    p2_3_1.innerHTML = camps._country + ", " + camps._address;
}

//Event handlers
window.addEventListener('load', showCamps, false);    //to load the camps (AJAX)
document.getElementById('campFilter').addEventListener('click', showFilteredCamps , false);