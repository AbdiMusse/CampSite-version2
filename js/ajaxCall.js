/**
 * Singleton class to ensure that only one instance of xhttp request exist
 * To avoid creating multiple XMLHttpRequest objects.
 * @type {{getInstance}}
 */
var Singleton = (function () {
    var xhttp;

    function createInstance() {
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest(); // For modern browsers
        } else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP"); // For IE6, IE5
        }
        return xhttp;
    }

    return {
        getInstance: function () {
            if (!xhttp) {       //if it doesn't exist, create it
                xhttp = createInstance();
            }
            return xhttp;
        }
    };
})();

/**
 * Reusable Ajax Object that takes care of the ajax calls
 * @constructor
 */
var AjaxCall = function () {
    this.xhttp = Singleton.getInstance();   //to ensure we only have 1 instance
    this.action = null;
    this.file = null;

    //Takes care of the ajax execution, get the file to call and the function that would take place
    this.CreateConnection = function (file, action) {
        this.action = action;
        this.file = file;
        this.xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {     //if it's ready to process
                action();
            }
        };
        this.xhttp.open("GET", this.file, true);        //Specifies the type of request
        this.xhttp.send();                              //Sends the request to the server
    };

    //Retrieves the data in json format
    this.GetData = function () {
        // console.log(this.xhttp.responseText);
        return JSON.parse(this.xhttp.responseText);
    }

};