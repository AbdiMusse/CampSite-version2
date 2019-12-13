<?php
session_start();
$view = new stdClass();
$view->pageTitle = 'look for campsites';

if (isset($_POST['submitLocation'])) {
    if (! empty($_POST['location'])) {
        header("location: ../showLocation.php?place=" . $_POST['location']);    //Go to the page with the searched term
    }
}
require_once('Views/location.phtml');