<?php
if(isset($_FILES['files']) && isset($_POST['folderName'])) {
    $baseUploadDir = $_POST['upload_path'];
    $folderName = $_POST['folderName'];
    $folderName = str_replace('/', '_', $folderName);
    $uploadDir = $baseUploadDir . $folderName . '/';
    $errors = [];

    // Créer le dossier principal
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            die("Impossible de créer le dossier principal.");
        }
    }

    foreach($_FILES['files']['tmp_name'] as $key => $tmp_name) {
        $file_name = $_FILES['files']['name'][$key];
        $file_path = $_FILES['files']['name'][$key];
        $file_tmp = $_FILES['files']['tmp_name'][$key];

        // Créer le chemin complet du fichier
        $file = $uploadDir . $file_path;

        // Créer les sous-dossiers nécessaires
        $dir = dirname($file);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        // Déplacer le fichier
        if(!move_uploaded_file($file_tmp, $file)) {
            $errors[] = "Échec de l'upload pour $file_path";
        }
    }

    if(empty($errors)) {
        echo "Le dossier $folderName et tout son contenu ont été uploadés avec succès.";
    } else {
        echo "Erreurs lors de l'upload : " . implode(", ", $errors);
    }
} else {
    echo "Aucun fichier ou nom de dossier n'a été envoyé.";
}
?>