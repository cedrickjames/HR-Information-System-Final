<?php
session_start();
include ("./connection.php"); 
$username = $_POST['email'];
$password = $_POST['password'];

$query = "SELECT * FROM `user` WHERE `username` = 'cedrick' AND `password` = 'cedrick'";
$result = mysqli_query($con, $query);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);
    // $_SESSION['user_id'] = $row['id'];
    // echo 'success';
    // http_response_code(200);
    // $outp="";
    // $outp .='{"email":"}' . $row["username"].'",';
    echo $row["username"];
} else {
    echo 'error';
    echo mysqli_num_rows($result);
}
?>