let body = document.querySelector('body');

function add_service(nom,path) {
    let service = document.createElement('div');
    service.className = 'service';
    service.id = nom;
    body.appendChild(service);

    let serviceTitle = document.createElement('h2');
    serviceTitle.className = 'service-title';
    serviceTitle.id = 'service-title'+nom;
    serviceTitle.innerHTML = nom;
    service.appendChild(serviceTitle);

    let upload_fichier_title = document.createElement('h3');
    upload_fichier_title.className = 'upload-fichier-title';
    upload_fichier_title.id = 'upload-fichier-title';
    upload_fichier_title.innerHTML = 'Uploader un fichier';

    let upload_fichier_path = document.createElement('input');
    upload_fichier_path.type = 'hidden';
    upload_fichier_path.id = 'upload-fichier-path'+nom;
    upload_fichier_path.name = 'upload_path';
    upload_fichier_path.value = path;

    let upload_fichier = document.createElement('input');
    upload_fichier.type = 'file';
    upload_fichier.id = 'file';
    upload_fichier.name = 'file_name';

    let upload_fichier_button = document.createElement('button');
    upload_fichier_button.className = 'btn btn-primary';
    upload_fichier_button.id = 'upload-fichier-button'+nom;
    upload_fichier_button.innerHTML = 'Uploader le fichier';
    upload_fichier_button.onclick = function() {
        uploadfichier(nom,path,upload_fichier);
    }

    service.appendChild(upload_fichier_title);
    service.appendChild(upload_fichier_path);
    service.appendChild(upload_fichier);
    service.appendChild(upload_fichier_button);

    let upload_folder_title = document.createElement('h3');
    upload_folder_title.className = 'upload-folder-title';
    upload_folder_title.id = 'upload-folder-title'+nom;
    upload_folder_title.innerHTML = 'Uploader un dossier';
    
    let upload_folder = document.createElement('input');
    upload_folder.type = 'file';
    upload_folder.id = 'folder';
    upload_folder.name = 'folder';
    upload_folder.setAttribute('webkitdirectory', '');
    upload_folder.setAttribute('directory', '');
    upload_folder.setAttribute('multiple', '');

    let upload_folder_button = document.createElement('button');
    upload_folder_button.className = 'btn btn-primary';
    upload_folder_button.id = 'upload-folder-button'+nom;
    upload_folder_button.innerHTML = 'Uploader le dossier';
    upload_folder_button.onclick = function() {
        uploadFolder(nom, path,upload_folder);
    }

    service.appendChild(upload_folder_title);
    service.appendChild(upload_folder);
    service.appendChild(upload_folder_button);
}