<?php
session_start();
require_once 'db.php';
$GroupId = $_SESSION["lastid"];
// check whether the session is exists
// if (isset($_SESSION['lastid'])) {
//         echo "id session exists";
//     }
$StopId = $_POST["StopId"];
$Video1Id = $_POST["Video1"];
$Video2Id = $_POST["Video2"];
$sql1 = "INSERT INTO `Video_player`.`StopList` (`StopId`,`GroupId`,`Video1StopTime`, `Video2StopTime`) VALUES ('$StopId','$GroupId','$Video1Id', '$Video2Id')";
if(!$conn->query($sql1))
{
    die('Error : ' .mysql_error());
}
?>