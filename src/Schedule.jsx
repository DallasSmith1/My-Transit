import "./Schedule.css"
import { invoke } from "@tauri-apps/api/tauri";

function Schedule()
{
    let json = null;

    async function DropDowns()
    {
        if (json == null)
        {
            let data = await invoke("get_all_stops");
    
            json = JSON.parse(data);

            let list1 = document.getElementById("toListTrain");
            let list2 = document.getElementById("fromListTrain");

            for (var i = 0; i < json.Stations.Station.length; i++ )
            {
                if (json.Stations.Station[i].LocationType == "Train Stop")
                {
                    let option = document.createElement("option");
                    option.value = json.Stations.Station[i].LocationName + " (" + json.Stations.Station[i].LocationCode + ")";
                    list1.appendChild(option);
                    list2.appendChild(option);
                }
            }
            
        }
    }

    return (
        <div className="container">
        <h1>Search Scheduled Trips</h1>

        <div className="search-container">
            <input type="text" id="fromInputTrain" placeholder="Depart From" style={{width: 200}} list="fromListTrain" onKeyDownCapture={DropDowns}/>
            <datalist id="fromListTrain">
            </datalist>
            <i className="fa-solid fa-right-long" style={{padding: 5}}></i>
            <input type="text" id="toInputTrain" placeholder="Arrive To" style={{width: 200}} list="toListTrain" onKeyDownCapture={DropDowns}/>
            <datalist id="toListTrain">
            </datalist>
            <button><i className="fa-solid fa-magnifying-glass"></i> Search</button>
        </div>
        <div id="results"></div>
        </div>
    );
}

export default Schedule;