
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


fetch('../php/get_all_services.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(response => response.json())
.then(data => {
    for (let i = 0; i < data.length; i++) {
        let nom = data[i].nom;
        let path = data[i].contenu;
        add_service(nom,path)
    }
})
.catch(error => {
    console.error(error);
});