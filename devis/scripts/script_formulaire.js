let options_service = ["amiante_div", "dpe_div", "erp_div", "plomb_div", "electricite_div", "loi_carrez_div","gaz_div","termites_div"]

    function show(id_name){
        let main = document.getElementById(id_name)
        main.style.display = "flex";
        main.style.flexWrap = "wrap";

        let sup = main.getElementsByClassName("texte_validite")
        if (sup.length > 0){
            main.removeChild(sup[0]);
        }

        let question = main.getElementsByClassName("question")[0];
        // question.style.marginTop = "20%";

        let input = main.getElementsByClassName("input")[0];
        // input.style.marginTop = "20%";

        let p = document.createElement("p");
        p.className = "texte_validite";
        let v_ou_l = document.getElementById("vendre_louer").value;


        if (id_name == "dpe_div"){
            console.log(v_ou_l);
            if (v_ou_l == "Vendre"){
                p.innerHTML = " <u>Validité</u> : 10 ans";
            } else if (v_ou_l == "Louer"){
                p.innerHTML = " <u>Validité</u> : 10 ans";
            }
        }
        else if (id_name == "electricite_div"){
            if (v_ou_l == "Vendre"){
                p.innerHTML = " <u>Validité</u> : 3 ans";
            }else if (v_ou_l == "Louer"){
                p.innerHTML = " <u>Validité</u> : 6 ans";
            }
        }else if (id_name == "gaz_div"){
            if (v_ou_l == "Vendre"){
                p.innerHTML = " <u>Validité</u> : 3 ans";
            }
            else if (v_ou_l == "Louer"){
                p.innerHTML = " <u>Validité</u> : 6 ans";
            }
        }
        else if (id_name == "amiante_div"){
            p.innerHTML = " <u>Validité</u> : Illimitée si négatif, Évaluation Périodique avant 3 ans si positif";
        }
        else if (id_name == "termites_div"){
            p.innerHTML = " <u>Validité</u> : 6 mois";
        }
        else if (id_name == "plomb_div"){
            if (v_ou_l == "Vendre"){
                p.innerHTML = " <u>Validité</u> : Illimitée si négatif, 1 an si positif";
            }
            else if (v_ou_l == "Louer"){
                p.innerHTML = " <u>Validité</u> : Illimitée si négatif, 6 ans si positif";
            }
        }
        else if (id_name == "erp_div"){
            p.innerHTML = " <u>Validité</u> : 6 mois";
        }
        else if (id_name == "loi_carrez_div"){
            p.innerHTML = "<u>Validité</u> : Illimitée";
        }
        
        main.appendChild(p);
        document.getElementById(id_name).style.display = "flex";
    }
    function hide(id_name){
        document.getElementById(id_name).style.display = "none";
    }
    function show_or_hide(id_name){
        if(document.getElementById(id_name).style.display == "flex"){
            hide(id_name);
        } else {
            show(id_name);
        }
    }
    let select_option = document.getElementsByClassName("options_main");
    for (var i = 0; i < select_option.length; i++) {
        select_option[i].addEventListener("change", function(){
            let maison_apartement = document.getElementById("maison_apartement").value;
            let permis_de_construire_date = document.getElementById("permis_de_construire_date").value;
            let installation_gaz = document.getElementById("installation_gaz").value;
            let installation_electricite = document.getElementById("installation_electricite").value;
            let formulaire_box = document.getElementsByClassName("formulaire_services_option")[0];
            let vendre_louer = document.getElementById("vendre_louer").value;
            let btn_devis = document.getElementsByClassName("btn_devis_demande")[0];
            formulaire_box.style.transition = "all ease 0.8s";
            if (screen.width > 950){
                formulaire_box.style.width = "40%";
            } else {
                formulaire_box.style.width = "90%";
            }
            if (this.value != ""){
                this.style.border = "1px solid #33af33";
            }
            if (maison_apartement!="" && permis_de_construire_date!="" && installation_gaz!="" && installation_electricite!=""){
                for (var i = 0; i < options_service.length; i++) {
                    hide(options_service[i]);
                }
                btn_devis.style.display = "flex";  
                document.getElementsByClassName("all_inputs")[0].style.borderBottom = "0.2em solid #33af33";
                if (permis_de_construire_date!=""){
                    console.log(permis_de_construire_date);
                    show("Termites_question_div")
                    if(permis_de_construire_date == 49){
                        show("amiante_div" );
                        show("dpe_div" );
                        show("erp_div" );
                        show("plomb_div" );
                        show("electricite_div" );
                        // show("loi_carrez_div");
                        show("gaz_div" );
                        formulaire_box.style.height = "150%";
                    } else if(permis_de_construire_date == 4997){
                        show("amiante_div" );
                        show("dpe_div" );
                        show("erp_div" );
                        show("electricite_div" );
                        // show("loi_carrez_div");
                        show("gaz_div");
                        formulaire_box.style.height = "150%";
                    } else if(permis_de_construire_date == 97){
                        // show("amiante_div");
                        show("dpe_div" );
                        show("erp_div" );
                        show("electricite_div" );
                        // show("loi_carrez_div");
                        show("gaz_div");
                        formulaire_box.style.height = "150%";
                    } else if(permis_de_construire_date == 0){
                        show("amiante_div" );
                        show("dpe_div" );
                        show("erp_div" );
                        show("plomb_div" );
                        show("electricite_div" );
                        // show("loi_carrez_div");
                        show("gaz_div" );
                        formulaire_box.style.height = "150%";
                    }
                }
                if (installation_gaz!=""){
                    if(installation_gaz == 1){
                        hide("gaz_div");
                        formulaire_box.style.height = "100%";
                    } else if(installation_gaz == 2){
                        hide("gaz_div");
                        formulaire_box.style.height = "100%";
                    } else if(installation_gaz == 3){
                        show("gaz_div");
                        formulaire_box.style.height = "100%";
                    } else if(installation_gaz == 0){
                        show("gaz_div");
                        formulaire_box.style.height = "100%";
                    }
                }
                if (installation_electricite!=""){
                    if(installation_electricite == 1){
                        hide("electricite_div");
                        formulaire_box.style.height = "100%";
                    } else if(installation_electricite == 2){
                        hide("electricite_div");
                        formulaire_box.style.height = "100%";
                    } else if(installation_electricite == 3){
                        show("electricite_div" );
                        formulaire_box.style.height = "100%";
                    } else if(installation_electricite == 0){
                        show("electricite_div" );
                        formulaire_box.style.height = "100%";
                    }
                }
                let elem = document.getElementsByClassName("formulaire_services_option")[0];
                elem.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            }
        });
    }
    