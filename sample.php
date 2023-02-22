<?php 
header("Access-Control-Allow-Origin: *");
  include ("./connection.php");

  $sql = "SELECT * FROM test1";
$result = $con->query($sql);

// Convert result set to JSON
$data = array();
while($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);

// Close connection
$con->close();
?>
