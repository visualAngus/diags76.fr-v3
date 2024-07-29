<?php
    include 'connexion.php';
    if (!isset($_COOKIE['user_token'])) {
        echo 0;
        return;
    }
    $token = $_COOKIE['user_token'];

    $sql = "SELECT id FROM user WHERE token = '$token'";
    $result = $conn->query($sql);
    echo $result->num_rows;
?>