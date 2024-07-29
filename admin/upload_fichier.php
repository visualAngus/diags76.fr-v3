<?php
// Vérification si un fichier a été sélectionné
if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
    // Chemin où le fichier sera enregistré sur le serveur
    $uploadPath = $_POST['upload_path']; // Récupérer le chemin d'upload depuis les paramètres
    $nom = $_POST['file_name'];
    $nom = str_replace('/', '_', $nom);
    // Vérifier et créer le dossier si nécessaire
    if (!file_exists($uploadPath)) {
        mkdir($uploadPath, 0777, true);
    }

    // Nom du fichier sur le serveur
    $originalFileName = $_FILES['file']['name'];
    $extension = pathinfo($originalFileName, PATHINFO_EXTENSION);
    $newFileName = $nom .'.'. $extension;
    $uploadFile = $uploadPath . '/' . $newFileName;

    // Déplacer le fichier temporaire vers l'emplacement souhaité
    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
        echo "Le fichier est valide et a été téléchargé avec succès.\n";
    } else {
        echo "Erreur lors de l'upload du fichier.";
    }
} else {
    echo "Une erreur est survenue : code " . $_FILES['file']['error'];
}
?>
