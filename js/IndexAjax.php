<?php
session_start();

require_once('../Models/CampViewDataSet.php');
require_once('../Models/FavouriteDataSet.php');

$campViewDataSet = new CampViewDataSet();
$favouriteDataSet = new FavouriteDataSet();

if (isset($_GET['word'])) {     //For the live search
    $word = $_GET['word'];      //gets the word
    $campSites = $campViewDataSet->fetchSomeCampSite($word,0,5);    // returns an array of campsite records

    //Json encode the campsites and check for anything that might affect the encoding
    echo json_encode($campSites, JSON_HEX_TAG | JSON_HEX_APOS |
        JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
}

if (isset($_GET['camps'])) {    //For the initial generation of camps
    $campSites = $campViewDataSet->fetchSomeCampSite('',0,10);  // returns an array of campsite records

    //Json encode the campsites and check for anything that might affect the encoding
    echo json_encode($campSites, JSON_HEX_TAG | JSON_HEX_APOS |
        JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
}

if (isset($_GET['searchCamps'])) {
    $searched = $_GET['searchCamps'];
    $campSites = $campViewDataSet->fetchSomeCampSite($searched,0,10);   // returns an array of campsite records

    //Json encode the campsites and check for anything that might affect the encoding
    echo json_encode($campSites, JSON_HEX_TAG | JSON_HEX_APOS |
        JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
}

if (isset($_GET['showMore'])) {
    $searched = $_GET['showMore'];
    $pageNo = $_GET['page'];

    $offset = ($pageNo-1) * 10; //How many camps to skip
    $campSites = $campViewDataSet->fetchSomeCampSite($searched,$offset,10); // returns an array of campsite records

    //Json encode the campsites and check for anything that might affect the encoding
    echo json_encode($campSites, JSON_HEX_TAG | JSON_HEX_APOS |
        JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
}

if (isset($_GET['filterCamps'])) {
    $filters = $_GET['filterCamps'];

    $filterArr = explode(",", $filters);    //split the filter list in array
    $campSites = $campViewDataSet->fetchFilteredCampSite($filterArr[0], $filterArr[1], $filterArr[2],
        $filterArr[3], $filterArr[4], $filterArr[5], $filterArr[6],$filterArr[7], $filterArr[8],
        $filterArr[9], $filterArr[10], $filterArr[11], $filterArr[12], $filterArr[13], 0, 10);

    //Json encode the campsites and check for anything that might affect the encoding
    echo json_encode($campSites, JSON_HEX_TAG | JSON_HEX_APOS |
        JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
}

if (isset($_GET['addToFavourites'])) {
    $email = $_SESSION['email'];
    $campID = $_GET['addToFavourites'];
    //checks if the user has favourited tis camp already by checking database
    $getFavourite = $favouriteDataSet->checkFavouriteExists($campID, $email);
    if ( empty($getFavourite)) {
        //add the new favourite into the favourite table
        $addToFavourite = $favouriteDataSet->insertFavourite($email, $campID);
    }
}