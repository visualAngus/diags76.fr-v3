const url = window.location.href;
console.log(url);
if (url.split("#").length >= 2) {
    const param = url.split("#")[1];
    console.log(param);
    if (param == "services") {
        let targetDiv = document.getElementsByClassName('all_services_div')[0];
        window.scrollTo({
            top: targetDiv.offsetTop,
            behavior: 'smooth'
        });
    }else if (param == "contact") {
        let targetDiv = document.getElementsByClassName('contact_div_all')[0];
        window.scrollTo({
            top: targetDiv.offsetTop,
            behavior: 'smooth'
        });
    }
}