import { createElement } from "react";
import "./Alerts.css";
import { invoke } from "@tauri-apps/api/tauri";

function Alerts()
{
    invoke("get_alerts").then((alerts) =>{
        alerts = JSON.parse(alerts);

        let alertDiv = document.getElementById("alerts");
        alertDiv.innerHTML = "";

        for (let i = 0; i < alerts.entity.length; i++)
        {
            if(alerts.entity[i].alert.informed_entity[0].stop_id != "")
            {
                invoke("get_stop_details", {stop: alerts.entity[i].alert.informed_entity[0].stop_id}).then((stopDetails) => {
                    stopDetails = JSON.parse(stopDetails);

                    let founndButton = document.getElementById(alerts.entity[i].id);
                    let foundP = document.getElementById(alerts.entity[i].id + "_content");
                    if (founndButton)
                    {
                        founndButton.remove();
                    }
                    if (foundP)
                    {
                        foundP.remove();
                    }

                    let button = document.createElement("button");
                    button.type = "button";
                    button.className = "collapsible";
                    button.innerHTML = stopDetails.Stop.StopName + " - " + alerts.entity[i].alert.header_text.translation[0].text;
                    button.id = alerts.entity[i].id;
                    button.addEventListener("click", function() {
                        this.classList.toggle("active");
                        var content = this.nextElementSibling;
                        if (content.style.display === "block") {
                        content.style.display = "none";
                        } else {
                        content.style.display = "block";
                        }
                    })
        
                    let div = document.createElement("div");
                    div.className = "content";
        
                    let p = document.createElement("p");
                    p.innerHTML = "<br/>"+alerts.entity[i].alert.description_text.translation[0].text;
                    p.id = alerts.entity[i].id + "_content";
        
                    let br = document.createElement("p");
        
                    alertDiv.appendChild(button);
                    div.appendChild(p);
                    alertDiv.appendChild(div);
                    alertDiv.appendChild(br);
                });
            }
            else
            {
                let button = document.createElement("button");
                button.type = "button";
                button.className = "collapsible";
                button.innerHTML = alerts.entity[i].alert.header_text.translation[0].text;
                button.addEventListener("click", function() {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.display === "block") {
                    content.style.display = "none";
                    } else {
                    content.style.display = "block";
                    }
                })
    
                let div = document.createElement("div");
                div.className = "content";
    
                let p = document.createElement("p");
                p.innerHTML = "<br/>"+alerts.entity[i].alert.description_text.translation[0].text;
    
                let br = document.createElement("p");
    
                alertDiv.appendChild(button);
                div.appendChild(p);
                alertDiv.appendChild(div);
                alertDiv.appendChild(br);
            }
        }
    });

    return (
        <>
        <h1>Alerts</h1>
        <div id="alerts">
        </div>
        </>
    );
}

export default Alerts;