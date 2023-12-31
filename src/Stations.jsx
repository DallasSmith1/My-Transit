import "./Stations.css";
import { invoke } from "@tauri-apps/api/tauri";

function Stations()
{
    async function search() {
        if (document.getElementById('searchInput') != null)
        {
            let stop = document.getElementById("searchInput");
            let code = stop.value.split(" | ")[1];

            let out = await invoke("get_stop_details", { stop: code });

            let json = JSON.parse(out);

            let result = document.getElementById("results");
            result.innerHTML = "";

            let hr = document.createElement("hr");
            result.appendChild(hr);

            let h1 = document.createElement("h1");
            h1.innerHTML = json.Stop.StopName;

            result.appendChild(h1);

            let type = document.createElement("strong");
            
            if (json.Stop.IsBus && json.Stop.IsTrain)
            {
                type.innerHTML = '<strong class="type"><i class="fa-solid fa-train"></i> <i class="fa-solid fa-bus"></i></strong>'
            }
            else if (json.Stop.IsBus)
            {
                type.innerHTML = '<strong class="type"><i class="fa-solid fa-bus"></i></strong>';
            }
            else if (json.Stop.IsTrain) {
                type.innerHTML = '<strong class="type"><i class="fa-solid fa-train"></i></strong>';
            }

            result.appendChild(type);

            let div = document.createElement("div");
            div.className = "facilities";
            let table = document.createElement("table");
            let body = document.createElement("tbody");
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            td1.innerHTML = "<ul><li><strong>City: </strong>"+json.Stop.City+"</li><li><strong>Address:</strong> "+json.Stop.StreetNumber+" "+json.Stop.StreetName+"</li><li><strong>Intersection: </strong>"+json.Stop.Intersection+"</li></ul>";
            
            if (json.Stop.TicketSales != "" && json.Stop.TicketSales != null)
            {
                let dates = json.Stop.TicketSales;
                td1.innerHTML = td1.innerHTML + '<br/><strong><i class="fa-solid fa-ticket"></i> Ticket Sale Hours:</strong><p>'+dates+'</p>';
            }
            if (json.Stop.BoardingInfo != "" && json.Stop.BoardingInfo != null)
            {
                let boarding = json.Stop.BoardingInfo;
                boarding = boarding.replace("\tBus Platforms:\n", "");
                boarding = boarding.replace("\n", "\n\n");
                td1.innerHTML = td1.innerHTML + '<br/><strong><i class="fa-solid fa-bus lightgreen"></i> Boarding Information:</strong><p>'+boarding+'</p>';
            }

            let td2 = document.createElement("td");
            td2.innerHTML = '<iframe width="100%" height="400" src="https://maps.google.com/maps?q='+json.Stop.Latitude+', '+json.Stop.Longitude+'&output=embed"></iframe>';
            td2.className = "map";

            tr.appendChild(td1);
            tr.appendChild(td2);
            body.appendChild(tr);
            table.appendChild(body);
            div.appendChild(table);
            result.appendChild(div);


            let subtd = document.createElement("div");

            let alertsJSON = await invoke("get_alerts");
            let alerts = JSON.parse(alertsJSON);

            for (let i = 0; i < alerts.entity.length; i++)
            {
                if (alerts.entity[i].alert.informed_entity[0].stop_id == json.Stop.Code)
                {
                    subtd.innerHTML = '<div class="info"><h2 class="middle"><i class="fa-solid fa-triangle-exclamation"></i> NOTICE</h2><p class="middle">'+alerts.entity[i].alert.description_text.translation[0].text+'</p></div>';
                }
            }

            result.appendChild(subtd);


            let subtable = document.createElement("table");
            let subbody = document.createElement("body");

            let subtr1 = document.createElement("tr");
            let subtd1 = document.createElement("td");
            if (json.Stop.Facilities.length > 0)
            {
                let list = "";
                for (let i = 0; i < json.Stop.Facilities.length; i++)
                {
                    list += json.Stop.Facilities[i].Description + "\n";
                }
                subtd1.innerHTML = '<div class="info"><h2 class="middle">Facilities</h2><p class="middle">'+list+'</p></div>';
            }

            subtr1.appendChild(subtd1);

            let subtd2 = document.createElement("td");
            if (json.Stop.Parkings.length > 0)
            {
                let list = "";
                for (let i = 0; i < json.Stop.Parkings.length; i++)
                {
                    list += json.Stop.Parkings[i].Name + ": " + json.Stop.Parkings[i].ParkSpots + "\n";
                }
                    subtd2.innerHTML = '<div class="info"><h2 class="middle"><i class="fa-solid fa-square-parking"></i> Parking</h2><p class="middle">'+list+'</p></div>';
            }
            subtr1.appendChild(subtd2);
            subbody.appendChild(subtr1);
            subtable.appendChild(subbody);
            result.appendChild(subtable);
        }
    }

    invoke("get_all_stops").then((result) => {
        let json = JSON.parse(result);

        let list1 = document.getElementById("stopList");

        list1.innerHTML = "";

        for (let i = 0; i < json.Stations.Station.length; i++)
        {
            let option1 = document.createElement("option");
            option1.value = json.Stations.Station[i].LocationName + " | " + json.Stations.Station[i].LocationCode;
            list1.appendChild(option1);
        }
    });

    return (
    <div className="container">
        <h1>Station Search</h1>

        <div className="search-container">
            <input type="text" id="searchInput" placeholder="Search for destinations..." list="stopList"/>
            <datalist id="stopList">
            </datalist>
            <button onClick={search}><i class="fa-solid fa-book-open"></i> Details</button>
        </div>

        <div className="results" id="results">
        </div>
        <br/>
    </div>
    );
}



export default Stations;