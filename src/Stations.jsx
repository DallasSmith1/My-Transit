import "./Stations.css";
import {Link} from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";

async function search() {
    if (document.getElementById('searchInput') != null)
    {
        let search = document.getElementById('searchInput').value;

        let data = await invoke("get_all_stops");

        let obj = JSON.parse(data);

        let results =  document.getElementById("display-items");

        results.innerHTML = "";

        for (var i = 0; i < obj.Stations.Station.length; i++ )
        {
            if (obj.Stations.Station[i].LocationName.toLowerCase().includes(search.toLowerCase()))
            {
                let div1 = document.createElement("div");
                div1.className = "ag-courses_item";
    
                let link = document.createElement("a");
                link.className = "ag-courses-item_link";
                link.href = `/stationdetails/${obj.Stations.Station[i].LocationCode}`;

                let div2 = document.createElement("div");
                div2.className = "ag-courses-item_bg";

                let div3 = document.createElement("div");
                div3.className = "ag-courses-item_title";
                div3.innerText = obj.Stations.Station[i].LocationName;

                let div4 = document.createElement("div");
                div4.className = "ag-courses-item_date-box";
                div4.innerText = "Type:";

                let span = document.createElement("span");
                span.className = "ag-courses-item_date";
                span.style = "color: white";

                if (obj.Stations.Station[i].LocationType == "Train Station")
                {
                    span.innerHTML = '&ensp;<i class="fa-solid fa-train"></i>';
                }
                else if (obj.Stations.Station[i].LocationType == "Bus Stop" || obj.Stations.Station[i].LocationType == "Bus Terminal")
                {
                    span.innerHTML = '&ensp;<i class="fa-solid fa-bus"></i>';
                }
                else if (obj.Stations.Station[i].LocationType == "Park & Ride")
                {
                    span.innerHTML = '&ensp;<i class="fa-solid fa-square-parking"></i>';
                }
                else if (obj.Stations.Station[i].LocationType == "Train & Bus Station")
                {
                    span.innerHTML = '&ensp;<i class="fa-solid fa-train"></i>&ensp;<i class="fa-solid fa-bus"></i>';
                }

                div4.appendChild(span);
                link.appendChild(div2);
                link.appendChild(div3);
                link.appendChild(div4);
                div1.appendChild(link);
                results.appendChild(div1);
            }


        }


    }
}

function Stations()
{
    return (
    <div className="container">
        <h1>Station Search</h1>

        <div className="search-container">
            <input type="text" id="searchInput" placeholder="Search for destinations..."/>
            <button onClick={search}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
        </div>

        <div className="results" id="results">
        <div className="ag-format-container" id="display-items">
        </div>
        </div>
    </div>
    );
}



export default Stations;