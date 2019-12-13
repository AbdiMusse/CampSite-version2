<?php
$view = new stdClass();
$view->pageTitle = 'Search by location';

require_once('Models/CampViewDataSet.php');

$campViewDataSet = new CampViewDataSet();    // create a campsite data set object as usual
$camsiteList = $campViewDataSet->fetchAllCampSites();  // returns an array of campsite records
$view->locations = json_encode($camsiteList, JSON_HEX_TAG | JSON_HEX_APOS |
    JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);  // parses the PHP into JSON array syntax

if (isset($_GET['place'])) {
    $view->searched = json_encode($_GET['place']);
}

require_once('Views/showLocation.phtml');
