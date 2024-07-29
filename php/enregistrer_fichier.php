<?php
// Récupérer le contenu HTML envoyé par le client
$data = json_decode(file_get_contents('php://input'), true);
$htmlContent = $data['htmlContent'];

// Déplacer le fichier vers le dossier historique avec un nom basé sur la date actuelle
$date = date('Ymd_His');
$newFileName = '../historique/index_' . $date . '.html';
$filePath = '../index.html';
if (!rename($filePath, $newFileName)) {
    throw new Exception('Erreur lors du déplacement du fichier.');
}
$filePath = $newFileName;


// Nom du fichier à enregistrer
$fileName = 'index.html';
$filePath = '../' . $fileName;

// Tentative d'enregistrement du fichier
try {
    if (file_put_contents($filePath, $htmlContent) === false) {
        throw new Exception('Erreur lors de l\'écriture du fichier.');
    }
    echo 'Fichier enregistré avec succès : ' . $filePath;
} catch (Exception $e) {
    http_response_code(500);
    echo 'Erreur : ' . $e->getMessage();
}
?>
