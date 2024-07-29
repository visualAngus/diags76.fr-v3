
const urlParams = new URLSearchParams(window.location.search);
const id_service = urlParams.get('service_name');

fetch('../php/get_service_by_id.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'id=' + id_service
})
.then(response => response.json())
.then(data => {
    let contenu =data[0].contenu;
    let logo_vid = document.getElementsByClassName('logo_vid')[0];
    logo_vid.src = data[0].logo;
    let nom = data[0].nom;
    nom = nom.replace(/\//g, "_");

    console.log(nom+".htm");

    path = nom+".htm";
    load_htm(path)
})
.catch(error => {
    console.error(error);
});
