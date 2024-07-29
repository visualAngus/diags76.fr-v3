<?php
    // Inclure le fichier de connexion
    include 'connexion.php';

    $id = $_POST['id'];

    // Faire une requête SQL classique
    $sql = "SELECT * FROM services WHERE id = '" . $id . "'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Créer un tableau pour stocker les données
        $data = array();

        // Parcourir les résultats de la requête
        while($row = $result->fetch_assoc()) {
            // Récupérer les données de chaque ligne
            $col1 = $row["id"];
            $col2 = $row["titre"];
            $data[] =  array("id" => $col1, "nom" => $col2, "contenu" => $row["contenu"], "logo" => $row["logo"]);
        }

        // Afficher les données au format JSON
        echo json_encode($data);
    } else {
        echo json_encode(array("message" => "Aucun résultat trouvé."));
    }

    // Fermer la connexion
    $conn->close();
?>
