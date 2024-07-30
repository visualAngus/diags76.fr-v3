diags_list = ["Amiante", "DPE", "ERP", "Plomb", "Electricité", "Loi carrez / loi Boutin","Gaz","Termites","commune"]

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

function commune(nom){
    const main = document.getElementById('diags');

    const div = document.createElement('div');
    div.className='diag';
    div.id = "commune_div";

    const div_h3 = document.createElement('div');
    div_h3.className='diag_title_commune';
    
    const h3 = document.createElement('p');
    h3.innerHTML = nom;
    h3.id = "commune_p";
    div_h3.appendChild(h3);
    div.appendChild(div_h3);
    main.appendChild(div);
}

function create_diag(nom,validite){
    const main = document.getElementById('diags');
    const div = document.createElement('div');
    div.className='diag';
    div.id = nom+"_div";

    const div_h3 = document.createElement('div');
    div_h3.className='diag_title';
    
    const h3 = document.createElement('h3');
    h3.innerHTML = nom;
    div_h3.appendChild(h3);
    div.appendChild(div_h3);

    const diag_input = document.createElement('div');
    diag_input.className='diag_input';
    const input = document.createElement('input');
    input.type='checkbox';
    input.id=nom+'_check';
    input.name=nom;

    diag_input.appendChild(input);
    div.appendChild(diag_input);

    const p = document.createElement('p');
    p.innerHTML = validite;
    div.appendChild(p);

    main.appendChild(div);
}

function remove_diag(nom){
    const div = document.getElementById(nom+'_div');
    if (div){
        div.remove();
    }
    comm_envoie = document.getElementsByClassName('comm_envoie')[0];
    comm_envoie.style.display = "none";
}

function refresh_diags(data){
    diags_list.forEach(diag => {
        remove_diag(diag);
    });
    let pass= true;
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] === "") {
            pass = false;
            break;
        }
    }
    if (pass){
        if (data.vendre_louer == 'Vendre'){
            if (data.permis_de_construire_date == '49'){
                create_diag('DPE','<u>Validité</u> : 10 ans');
                create_diag('Amiante','Illimitée si négatif, Évaluation Périodique avant 3 ans si positif');
                create_diag('ERP','<u>Validité</u> : 6 mois');
                create_diag('Plomb','<u>Validité</u> : Illimitée si négatif, 1 an si positif');
                if (data.installation_electricite == "3" || data.installation_electricite == "0"){
                    create_diag('Electricité','<u>Validité</u> : 3 ans');
                }
                if (data.installation_gaz == "3" || data.installation_gaz == "0"){
                    create_diag('Gaz','<u>Validité</u> : 3 ans');
                }
                create_diag('Termites','<u>Validité</u> : 6 mois');
            }else if (data.permis_de_construire_date == "4997"){
                create_diag('DPE','<u>Validité</u> : 10 ans');
                create_diag('Amiante','Illimitée si négatif, Évaluation Périodique avant 3 ans si positif');
                create_diag('ERP','<u>Validité</u> : 6 mois');
                if (data.installation_electricite == "3" || data.installation_electricite == "0"){
                    create_diag('Electricité','<u>Validité</u> : 3 ans');
                }
                if (data.installation_gaz == "3" || data.installation_gaz == "0"){
                    create_diag('Gaz','<u>Validité</u> : 3 ans');
                }
                create_diag('Termites','<u>Validité</u> : 6 mois');
            }else if (data.permis_de_construire_date == "97"){
                create_diag('DPE','<u>Validité</u> : 10 ans');
                create_diag('ERP','<u>Validité</u> : 6 mois');
                if (data.installation_electricite == "3" || data.installation_electricite == "0"){
                    create_diag('Electricité','<u>Validité</u> : 3 ans');
                }
                if (data.installation_gaz == "3" || data.installation_gaz == "0"){
                    create_diag('Gaz','<u>Validité</u> : 3 ans');
                }
                create_diag('Termites','<u>Validité</u> : 6 mois');
            }else if (data.permis_de_construire_date == "0"){
                create_diag('DPE','<u>Validité</u> : 10 ans');
                create_diag('Amiante','Illimitée si négatif, Évaluation Périodique avant 3 ans si positif');
                create_diag('ERP','<u>Validité</u> : 6 mois');
                create_diag('Plomb','<u>Validité</u> : Illimitée si négatif, 1 an si positif');
                if (data.installation_electricite == "3" || data.installation_electricite == "0"){
                    create_diag('Electricité','<u>Validité</u> : 3 ans');
                }
                if (data.installation_gaz == "3" || data.installation_gaz == "0"){
                    create_diag('Gaz','<u>Validité</u> : 3 ans');
                }
                create_diag('Termites','<u>Validité</u> : 6 mois');
            }
        }
        else if (data.vendre_louer == 'Louer'){
            if (data.permis_de_construire_date == '49'){
                create_diag('DPE','<u>Validité</u> : 10 ans');
                create_diag('Amiante','Illimitée si négatif, Évaluation Périodique avant 3 ans si positif');
                create_diag('ERP','<u>Validité</u> : 6 mois');
                create_diag('Plomb','<u>Validité</u> : Illimitée si négatif, 6 ans si positif"');
                if (data.installation_electricite == "3" || data.installation_electricite == "0"){
                    create_diag('Electricité','<u>Validité</u> : 6 ans');
                }
                if (data.installation_gaz == "3" || data.installation_gaz == "0"){
                    create_diag('Gaz','<u>Validité</u> : 6 ans');
                }
                create_diag('Termites','<u>Validité</u> : 6 mois');
            }else if (data.permis_de_construire_date == "4997"){
                create_diag('DPE','<u>Validité</u> : 10 ans');
                create_diag('Amiante','Illimitée si négatif, Évaluation Périodique avant 3 ans si positif');
                create_diag('ERP','<u>Validité</u> : 6 mois');
                if (data.installation_electricite == "3" || data.installation_electricite == "0"){
                    create_diag('Electricité','<u>Validité</u> : 6 ans');
                }
                if (data.installation_gaz == "3" || data.installation_gaz == "0"){
                    create_diag('Gaz','<u>Validité</u> : 6 ans');
                }
                create_diag('Termites','<u>Validité</u> : 6 mois');
            }else if (data.permis_de_construire_date == "97"){
                create_diag('DPE','<u>Validité</u> : 10 ans');
                create_diag('ERP','<u>Validité</u> : 6 mois');
                if (data.installation_electricite == "3" || data.installation_electricite == "0"){
                    create_diag('Electricité','<u>Validité</u> : 6 ans');
                }
                if (data.installation_gaz == "3" || data.installation_gaz == "0"){
                    create_diag('Gaz','<u>Validité</u> : 6 ans');
                }
                create_diag('Termites','<u>Validité</u> : 6 mois');
            }else if (data.permis_de_construire_date == "0"){
                create_diag('DPE','<u>Validité</u> : 10 ans');
                create_diag('Amiante','Illimitée si négatif, Évaluation Périodique avant 3 ans si positif');
                create_diag('ERP','<u>Validité</u> : 6 mois');
                create_diag('Plomb','<u>Validité</u> : Illimitée si négatif, 6 ans si positif"');
                if (data.installation_electricite == "3" || data.installation_electricite == "0"){
                    create_diag('Electricité','<u>Validité</u> : 6 ans');
                }
                if (data.installation_gaz == "3" || data.installation_gaz == "0"){
                    create_diag('Gaz','<u>Validité</u> : 6 ans');
                }
                create_diag('Termites','<u>Validité</u> : 6 mois');
            }
            
        }
        commune("Sur votre commune, l'arrêté préfectoral impose-t-il un diagnostic termites. Ce diagnostic dépend de votre adresse. Il sera étudié lors de la réalisation de votre devis.")
        const main = document.getElementById('diags');
        window.scrollTo({ top: main.offsetTop, behavior: 'smooth' })
        
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let pass_checkbox = false;
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked){
                    this.style.border = "0.15em solid #33af33";
                    pass_checkbox = true;
                }else{
                    this.style.border = "";
                }
                if (pass_checkbox){
                    comm_envoie = document.getElementsByClassName('comm_envoie')[0];
                    comm_envoie.style.display = "flex";
                    window.scrollTo({ top: comm_envoie.offsetTop, behavior: 'smooth' })
                }
            });
        });
    }


}


function get_all_select(){
    const vendre_louer = document.getElementById('vendre_louer').value;
    const type_bien = document.getElementById('type_de_bien_select').value;
    const permis_de_construire_date = document.getElementById('permis_de_construire_date').value;
    const superficie = document.getElementById('superficie').value;
    const nb_pièces = document.getElementById('nb_pieces').value;
    const installation_gaz = document.getElementById('installation_gaz').value;
    const installation_electricite = document.getElementById('installation_electricite').value;

    const data = {
        vendre_louer,
        type_bien,
        permis_de_construire_date,
        superficie,
        nb_pièces,
        installation_gaz,
        installation_electricite,
    };
    refresh_diags(data);

}


let selects = document.querySelectorAll('select');
selects.forEach(select => {
    select.addEventListener('change', function() {

        this.style.border="0.15em solid #33af33";
        get_all_select();
    });
});

let inputs = document.querySelectorAll('input[type="text"]');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value != ""){
            this.style.borderBottom = "0.2em solid #33af33";
        }else{
            this.style.borderBottom = "";
        }
    });
});
let emails = document.querySelectorAll('input[type="email"]');
emails.forEach(email => {
    email.addEventListener('input', function() {
        if (this.value != ""){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                this.style.borderBottom = "0.2em solid red";
            } else {
                this.style.borderBottom = "0.2em solid #33af33";
            }
        }else{
            this.style.borderBottom = "";
        }
        
    });
});
let phones = document.querySelectorAll('input[type="tel"]');
phones.forEach(phone => {
    phone.addEventListener('input', function() {
        if (this.value != "") {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(this.value)) {
                this.style.borderBottom = "0.2em solid red";
            } else {
                this.style.borderBottom = "0.2em solid #33af33";
            }
        } else {
            this.style.borderBottom = "";
        }
    });
});

