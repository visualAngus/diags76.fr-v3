function loadPdf(url) {
    var scale = 5; // Augmenter le facteur de mise à l'échelle pour une meilleure résolution
    var pdfCanvas = document.getElementById('pdf-render');
    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        var totalPages = pdf.numPages; // Obtenir le nombre total de pages du PDF

        // Boucle pour afficher chaque page du PDF
        for (var pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            pdf.getPage(pageNumber).then(function(page) {
                var viewport = page.getViewport({ scale: scale });

                // Configurer les dimensions du canvas pour chaque page
                pdfCanvas.height += viewport.height; // Ajuster la hauteur du canvas
                pdfCanvas.width = Math.max(pdfCanvas.width, viewport.width); // Ajuster la largeur du canvas si nécessaire

                var context = pdfCanvas.getContext('2d');
                context.imageSmoothingEnabled = true;

                // Rendu de la page PDF sur le canvas
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        }
    });
}
