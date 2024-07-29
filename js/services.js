let services = document.getElementsByClassName('card');
if (screen.width > 950) {
    for (let i = 0; i < services.length; i++) {
        services[i].addEventListener('mouseover', () => {
            for (let j = 0; j < services.length; j++) {
                services[j].style.boxShadow = "";
                services[j].style.transform = '';
                services[j].style.transition = 'all 0.2s';
                services[j].querySelector('.btn_card').style.opacity = '0';
                services[j].querySelector('.btn_card').style.pointerEvents = '';
            }
            services[i].style.transition = 'all 1s';
            services[i].style.boxShadow = '0px 0px 30px 0px rgba(0, 0, 0, 0.6), 0px 0px 30px 0px rgba(0, 0, 0, 0.6), 50px 0px 30px 0px rgba(0, 0, 0, 0.6), -50px 0px 30px 0px rgba(0, 0, 0, 0.6)';
            services[i].style.transform = 'scale(1.05)';
            services[i].querySelector('.btn_card').style.opacity = '1';
            services[i].querySelector('.btn_card').style.pointerEvents = 'all';
        });
        services[i].addEventListener('mouseout', () => {
            services[i].style.boxShadow = "";
            services[i].style.transform = '';
            services[i].querySelector('.btn_card').style.opacity = '0';
        });
    }
}

let btn_services = document.getElementsByClassName('btn_card');
for (let i = 0; i < btn_services.length; i++) {
    btn_services[i].addEventListener('click', () => {
        let id = btn_services[i].id;
        console.log(id);
        fetch('./php/get_service_by_id.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + id
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                window.location.href = `../service/?service_name=${id}#${data[0].nom}`;
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch request
                console.error(error);
            });
    });
}


let btn_services_go = document.getElementById('services_btn');
btn_services_go.addEventListener('click', () => {
    let targetDiv = document.getElementsByClassName('all_services_div')[0];
    window.scrollTo({
        top: targetDiv.offsetTop,
        behavior: 'smooth'
    });
    window.location.hash = 'services';
});
