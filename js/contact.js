function sendEmail() {


    let nom = document.getElementById('nom').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let info = document.getElementById('errer_message');

    if (nom == "" ) {
        info.innerHTML = "Veuillez entrer votre nom.";
        info.style.color = "#cb2027";
    }
    else if (!email.match("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")) {
        info.innerHTML = "Veuillez entrer une adresse email valide.";
        info.style.color = "#cb2027";
    }
    else if (message == "") {
        info.innerHTML = "Veuillez entrer un message.";
        info.style.color = "#cb2027";
    }
    else if(message != "" && nom != "" && email != "" ) {
        info.innerHTML = "envoi en cours...";
        info.style.color = "#fff";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/email_sender.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("nom="+nom+"&email="+email+"&message="+message);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                info.innerHTML = "Message envoyé";
                info.style.color = "#22AB37";
                document.getElementById('nom').value = "";
                document.getElementById('email').value = "";
                document.getElementById('message').value = "";
                setInterval(() => {
                    document.getElementById('errer_message').innerHTML = ""
                }, 5000);
            }
        };
    }
}

let btn_contact_go = document.getElementById('contact_btn');
btn_contact_go.addEventListener('click', () => {
    let targetDiv = document.getElementsByClassName('contact_div_all')[0];
    window.scrollTo({
        top: targetDiv.offsetTop,
        behavior: 'smooth'
    });
    window.location.hash = 'contact';
});
