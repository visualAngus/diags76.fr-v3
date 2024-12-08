let total_price = 0;
let liste_price = [];
let liste_diags_user_final = [];

function get_price_appart(type,nb_piece,csv,liste_diags_user,superficie){
    let diags_liste = [];
    if (type == "Appartement") {
        for (let i = 0; i < csv.length; i++) {
            if (csv[i][0].startsWith("A_")) {
                for (let j = 0; j < 9; j++) {
                    diags_liste.push(csv[i+j]);
                }
                break;
            }
        }
    }else {
        // convert nb piece to supperficie
        nb_piece = parseInt(superficie);
        for (let i = 0; i < csv.length; i++) {
            if (csv[i][0].startsWith("M_")) {
                for (let j = 0; j < 9; j++) {
                    diags_liste.push(csv[i+j]);
                }
                break;
            }
        }
    }
    let col_nb_piece = 0;
    let main_nb = diags_liste[0].slice(1,diags_liste[0].length);
    for (let i = 0; i < main_nb.length; i++) {  
        if (main_nb[i] >= nb_piece) {
            col_nb_piece = i+1;
            break;
        } else if (nb_piece > main_nb[main_nb.length - 2]) {
            col_nb_piece = main_nb.length;
            break;
        }
    }

    liste_diags_user = liste_diags_user.split(";").slice(0,-1); 
    for (let i = 0; i < diags_liste.length; i++) {
        for (let j = 0; j < liste_diags_user.length; j++) {
            if (diags_liste[i][0].trim().replace("*","") == liste_diags_user[j].trim()) {
                liste_price.push(diags_liste[i][col_nb_piece]);
                liste_diags_user_final.push(diags_liste[i][0]);
            }
        }
    }

    for (let i = 0; i < liste_price.length; i++) {
        total_price += parseInt(liste_price[i]);
    }
}

function readCSV(type,nb_piece,liste_diags_user,superficie) {
    const filePath = '../demande_devis/tableau prix.csv';
    fetch(filePath)
    .then(response => response.arrayBuffer())
    .then(buffer => {
        const uint8Array = new Uint8Array(buffer);
        const encoding = detectEncoding(uint8Array);
        const csvContent = new TextDecoder(encoding).decode(uint8Array);
        const csvData = parseCSV(csvContent);
        nb_piece = parseInt(nb_piece);
        get_price_appart(type,nb_piece,csvData,liste_diags_user,superficie);
        sendEmail2(total_price,liste_price,liste_diags_user_final);
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function detectEncoding(uint8Array) {
    // Logique de détection de l'encodage si nécessaire
    // Pour cet exemple, nous retournons 'windows-1252' ou 'utf-8' en fonction de vos besoins
    // Vous pouvez utiliser des bibliothèques externes pour une détection automatique plus précise
    return 'utf-8'; // ou 'utf-8'
}

function parseCSV(csvContent) {
    // Détecter et gérer les retours à la ligne (CRLF pour Windows ou LF pour Unix)
    const rows = csvContent.split(/\r\n|\n/);
    return rows.map(row => row.split(';'));
}

function displayCSV(csvData) {
    const outputDiv = document.getElementById('csvOutput');
    outputDiv.innerHTML = '';

    const table = document.createElement('table');
    csvData.forEach(row => {
        console.log(row);   
        const tr = document.createElement('tr');
        let class_nom = row[0];
        tr.className = class_nom;
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    outputDiv.appendChild(table);
}

function get_all_info(){
    // Retrieve all the information from the form
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;

    if (nom == "" || prenom == "" || email == "" || tel == "") {
        alert("Veuillez remplir tous les champs dans le formulaire des informations personnelles.");
        return;
    }


    let vendreLouer = document.getElementById("vendre_louer").value;

    let adresse = document.getElementById("adresse").value;
    let codePostal = document.getElementById("code_postal").value;

    if (adresse == "" || codePostal == "") {
        alert("Veuillez remplir tous les champs liés à l'adresse.");
        return;
    }


    let commentaire = document.getElementById("commentaire").value;

    let typeDeBienSelectionne = document.getElementById("type_de_bien_select");
    let typeDeBien = typeDeBienSelectionne.options[typeDeBienSelectionne.selectedIndex].innerHTML;

    let permis_de_construire_date = document.getElementById("permis_de_construire_date");
    let permisDeConstruire = permis_de_construire_date.options[permis_de_construire_date.selectedIndex].innerHTML;

    let superficie_main = document.getElementById("superficie");
    let superficie = superficie_main.options[superficie_main.selectedIndex].innerHTML;

    let nbPieces_main = document.getElementById("nb_pieces");
    let nbPieces = nbPieces_main.options[nbPieces_main.selectedIndex].innerHTML

    let installationGaz_main = document.getElementById("installation_gaz");
    let installationGaz = installationGaz_main.options[installationGaz_main.selectedIndex].innerHTML

    let installationElectricite_main = document.getElementById("installation_electricite");
    let installationElectricite = installationElectricite_main.options[installationElectricite_main.selectedIndex].innerHTML
    
    let diagnostic ="";

    let all_checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < all_checkboxes.length; i++) {
        if (all_checkboxes[i].checked) {
            diagnostic += " " + all_checkboxes[i].name+";";
        }
    }
    if (diagnostic == "") {
        alert("Veuillez sélectionner au moins un diagnostic.");
        return;
    }

    const data = {
        nom,
        prenom,
        email,
        tel,
        vendreLouer,
        typeDeBien,
        permisDeConstruire,
        superficie,
        nbPieces,
        installationGaz,
        installationElectricite,
        adresse,
        codePostal,
        diagnostic,
        commentaire
    };
    return data;
    
}
function sendEmail() {
    total_price = 0;
    liste_price = [];
    liste_diags_user_final = [];
    let data = get_all_info();
    let superficie = data.superficie;
    if (superficie== 'inférieure à 50m²') {
        superficie = "50";
    }else if (superficie == '51 à 100m²') {
        superficie = "100";
    }else if (superficie == '101 à 150m²') {
        superficie = "150";
    }else if (superficie == '151m² et plus') {
        superficie = "200";
    }

    readCSV(data.typeDeBien,data.nbPieces,data.diagnostic,superficie);
}

function sendEmail2(total,list_price,list_diags) {
    let data = get_all_info();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/email_sender_devis.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("nom=" + data.nom + "&prenom=" + data.prenom + "&email=" + data.email + "&tel=" + data.tel + "&vendreLouer=" + data.vendreLouer + "&typeDeBien=" + data.typeDeBien + "&permisDeConstruire=" + data.permisDeConstruire + "&superficie=" + data.superficie + "&nbPieces=" + data.nbPieces + "&installationGaz=" + data.installationGaz + "&installationElectricite=" + data.installationElectricite + "&adresse=" + data.adresse + "&codePostal=" + data.codePostal +"&diags="+data.diagnostic+ "&commentaire=" + data.commentaire + "&total_price=" + total + "&liste_price=" + list_price + "&liste_diags=" + list_diags);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            document.getElementById("envoie_message").style.color = "#33af33";
            document.getElementById("envoie_message").innerHTML = "Votre demande de devis a bien été envoyée. Nous vous contacterons dans les plus brefs délais.";
        }else{
            document.getElementById("envoie_message").style.color = "red";
            document.getElementById("envoie_message").innerHTML = "Une erreur est survenue lors de l'envoie de votre demande de devis. Veuillez réessayer plus tard.";
        }
    }
}