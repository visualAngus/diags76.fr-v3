function load_htm(path){
    fetch(path)
    .then(response => response.arrayBuffer())
    .then(buffer => {
        // Décoder le buffer en utilisant windows-1252
        const decoder = new TextDecoder('windows-1252');
        const text = decoder.decode(buffer);

        // Créer un document HTML temporaire pour parser le contenu
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Supprimer les balises <style>
        const styles = doc.querySelectorAll('style');
        styles.forEach(style => style.remove());

        // Supprimer les attributs style
        const elementsWithStyle = doc.querySelectorAll('[style]');
        elementsWithStyle.forEach(el => el.removeAttribute('style'));

        // Extraire le contenu de .WordSection1
        const section = doc.querySelector('.WordSection1');

        // Sélectionner tous les <b> dans le contenu
        const boldElements = section.querySelectorAll('b');

        // Parcourir chaque <b> et ses enfants <span>
        boldElements.forEach(bold => {
            const spansInsideBold = bold.querySelectorAll('span');
            spansInsideBold.forEach(span => {
                // Modifier le contenu des <span> à l'intérieur des <b>
                span.parentElement.parentElement.id = "titre";
                // Vous pouvez également appliquer des styles ou d'autres modifications ici
            });
        });

        const boldElements2 = section.querySelectorAll('strong');

        // Parcourir chaque <b> et ses enfants <span>
        boldElements2.forEach(bold => {
            const spansInsideBold = bold.querySelectorAll('span');
            spansInsideBold.forEach(span => {
                // Modifier le contenu des <span> à l'intérieur des <b>
                span.id = "bold";
                // Vous pouvez également appliquer des styles ou d'autres modifications ici
            });
        });

        const main_tile = section.querySelectorAll('.MsoNormal')[0];
        main_tile.id = "main_title";
        main_tile.className = "main_title";

        if (section) {
            // Insérer le contenu extrait dans le DOM
            document.getElementById('contenuXHTML').innerHTML = section.innerHTML;
        } else {
            console.error('La div .WordSection1 est introuvable dans le fichier HTML.');
        }
    })
    .catch(error => console.error('Erreur lors du chargement du fichier XHTML : ', error));


}
