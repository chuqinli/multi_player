<?php
// always make the session_start at the beginning 
session_start();
require_once 'db.php';
$Video1Id = $_GET["Video1Id"];
$Video2Id = $_GET["Video2Id"];
$sql1 = "INSERT INTO `Video_player`.`GroupList` (`Video1Id`, `Video2Id`) VALUES ('$Video1Id', '$Video2Id')";

if(!$conn->query($sql1))
{
    die('Error : ' .mysql_error());
}

$_SESSION["lastid"] = $conn->insert_id;
$GroupId = $conn->insert_id;
if($stmt = $conn->prepare("SELECT `Route` FROM `Video_player`.`Video` WHERE VideoId = ?")){
    $stmt->bind_param("i",$Video1Id);
    $stmt->execute();
    $stmt->bind_result($Route1);
    $stmt->fetch();
    
    $stmt->bind_param("i",$Video2Id);
    $stmt->execute();
    $stmt->bind_result($Route2);
    $stmt->fetch();
    
    $arr = array('id' => $GroupId, 'video1' => $Route1, 'video2' => $Route2);
    echo json_encode($arr);
    $stmt->close();
}
//mysqli->close();

?>