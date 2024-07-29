<?php
    $nom = $_POST['username'];
    $mdp = $_POST['password'];

    include 'connexion.php';

    $sql = "SELECT id FROM user WHERE nom = ? AND mdp = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $nom, $mdp);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $id = $result->fetch_assoc()['id'];
        $token = bin2hex(random_bytes(16));
        $sql = "UPDATE user SET token = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $token, $id);
        $stmt->execute();
        setcookie('user_token', $token, time() + 3600*2, '/');
        echo "Vous êtes connecté !";
    } else {
        echo "Nom d'utilisateur ou mot de passe incorrect.";
    }
    // else {
    //     $token = bin2hex(random_bytes(16));
    //     $sql = "INSERT INTO user (nom, mdp, token) VALUES (?, ?, ?)";
    //     $stmt = $conn->prepare($sql);
    //     $stmt->bind_param("sss", $nom, $mdp, $token);
    //     $stmt->execute();
    //     setcookie('user_token', $token, time() + 3600*2, '/');
    // }
?>
<script>
    fetch('../php/connection_verif.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    })
    .then(response => response.json())
    .then(data => {
        if (data == "0") {
            alert("Not connected");
            window.location.href = "../connection/index.html";
        }else {
            window.location.href = "../";
            alert("Connected");
        }
    })
    .catch(error => {
        console.error(error);
    });

</script>