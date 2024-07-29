
fetch('../php/connection_verif.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(response => response.json())
.then(data => {
    if (data == "0") {
        console.log("Not connected");
        window.location.href = "../connection/index.html";
    }else {
        console.log("Connected");
    }
})
.catch(error => {
    console.error(error);
});



document.head.innerHTML += `
    <style>
        .disabled {
            pointer-events: none; /* Désactive les événements de souris */
            opacity: 0.5; /* Ajoute un effet visuel pour montrer que l'élément est désactivé */
        }
    </style>`;

document.querySelectorAll('a').forEach(element => {
    element.href = "";
});


let on_edit = false;
let text = '';
let classes = '';
let id = '';
let type = '';

function disableElements() {
    document.querySelectorAll('button, a').forEach(element => {
        element.classList.add('disabled');
        if (element.tagName === 'BUTTON') {
            element.disabled = true;
        }
    });
}

function enableElements() {
    document.querySelectorAll('button, a').forEach(element => {
        element.classList.remove('disabled');
        if (element.tagName === 'BUTTON') {
            element.disabled = false;
        }
    });
}

document.addEventListener('click', function(event) {
    if(event.target.className === 'btn_modif_class') {
        return;
    }

    if (event.target.nodeName === 'TEXTAREA') {
        return;
    }
    if (on_edit) {
        let h1 = document.createElement(type);
        h1.innerText = text;
        h1.className = classes;
        h1.id = id;
        event.target.replaceWith(h1);
        on_edit = false;
        enableElements();
    } else {
        type = event.target.nodeName;
        id = event.target.id;
        classes = event.target.className;
        text = event.target.innerText;

        if (type === 'H1' || type === 'H2' || type === 'P' || type === 'A' || type ==='BUTTON') {
            let textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.id = "modify";
            textarea.className = classes;
            textarea.dataset.id = id; // Utiliser dataset pour sauvegarder l'id

            // Copier les styles du h1 au textarea
            let style = window.getComputedStyle(event.target);
            textarea.style.width = style.width;
            textarea.style.height = style.height;
            textarea.style.fontSize = style.fontSize;
            textarea.style.fontFamily = style.fontFamily;
            textarea.style.fontWeight = style.fontWeight;
            textarea.style.lineHeight = style.lineHeight;
            textarea.style.border = 'none'; // Optionnel : enlever la bordure pour correspondre à l'apparence du h1
            textarea.style.padding = style.padding;
            textarea.style.margin = style.margin;
            textarea.style.boxSizing = 'border-box';

            event.target.replaceWith(textarea);
            textarea.focus();
            on_edit = true;
            disableElements();

            textarea.addEventListener('input', function(event) {
                text = event.target.value;
            });

            // Ajouter un événement blur pour gérer la perte de focus du textarea
            textarea.addEventListener('blur', function(event) {
                if (on_edit) {
                    let h1 = document.createElement(type);
                    h1.innerText = text;
                    h1.className = textarea.className;
                    h1.id = textarea.dataset.id; // Récupérer l'id sauvegardé
                    textarea.replaceWith(h1);
                    on_edit = false;
                    enableElements();
                }
            });
        }
    }
});