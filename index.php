<?php
session_start();
$view = new stdClass();
$view->pageTitle = 'Camp Site';

require_once('Models/CampViewDataSet.php');
require_once ('Models/RequestDataSet.php');

$campViewDataSet = new CampViewDataSet();
$view->filterCountry = $campViewDataSet->getMostFrequentCountry();        //used in the phtml page for looping top 5 countries

if (isset($_GET['authorisation'])) {        //only do this section if the user has a 'normal' status and clicks request authorisation
    $email = $_SESSION['email'];
    if (! isset($_SESSION['authorise'])) {
        $_SESSION['authorise'] = [];                    //used in the header to hide or show the request authorisation link
    }
    array_push($_SESSION['authorise'], $email);     //push all the users that clicked on the request button to the session
    $requestDataSet = new RequestDataSet();
    $addRequest =  $requestDataSet->insertRequest($email);      //adds the new request to the request table
}

if (isset($_GET['logout']))  {      //set all session that need unsetting and log out.
    unset($_SESSION['admin']);
    unset($_SESSION['authorised']);
    unset($_SESSION['normal']);
    unset($_SESSION['email']);
    unset($_SESSION['myRatings']);
    header('location: index.php');
}

require_once ('Views/index.phtml');