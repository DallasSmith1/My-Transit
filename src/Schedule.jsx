import "./Schedule.css"
import { invoke } from "@tauri-apps/api/tauri";
import moment from "moment";
import { useHistory } from "react-router-dom";

function Schedule({setJSON})
{
    const navigate = useHistory();
    async function search()
    {
        let max = 5;
        let from = document.getElementById('fromInputTrain').value;
        let to = document.getElementById('toInputTrain').value;
        let date = document.getElementById('time').value.split("T");
        let error = document.getElementById('error');
        
        if (from == null || from == "" || to == null || to == "" || date == "" || date == null)
        {
            error.innerHTML = "All fields are required.";
        }
        else
        {
            error.innerHTML = "";
            let fromCode = from.split(" | ");
            let toCode = to.split(" | ");
            date[0] = date[0].replace("-", "");
            date[0] = date[0].replace("-", "");
            date[1] = date[1].replace(":", "");
            
            let data = await invoke("get_schedules", { from: fromCode[1], to: toCode[1], date: date[0], time: date[1] });
    
            let obj = JSON.parse(data);

            let results =  document.getElementById("display-items");
    
            results.innerHTML = "";

            let filter = document.getElementsByName("filter");

            let filtertype = "";
            for(let i = 0; i < filter.length; i++)
            {
                if (filter[i].checked)
                {
                    filtertype = filter[i].value;
                }
            }

            if (obj.SchJourneys.length > 0)
            {
                let notif = document.getElementById("notification");
                notif.innerHTML = "";

                let counter = 0;
                
                for (let i = 0; i < obj.SchJourneys[0].Services.length &&  counter < max; i++)
                {
                    let transitType = "";

                    for (let j = 0; j < obj.SchJourneys[0].Services[i].Trips.Trip.length; j++)
                    {
                        if (!transitType.includes(obj.SchJourneys[0].Services[i].Trips.Trip[j].Type))
                        {
                            transitType = transitType + obj.SchJourneys[0].Services[i].Trips.Trip[j].Type;
                        };
                    }

                    if (transitType == filtertype || filtertype == "R")
                    {
                        counter++;

                        let newItem = document.createElement("div");
                        newItem.className="ag-courses_item";
    
                        let newA = document.createElement("a");
                        newA.className="ag-courses-item_link";
                        newA.onclick =  function () {
                            setJSON(obj.SchJourneys[0].Services[i]);
                            navigate.push('/tripdetails');
                        }
    
                        let newBack = document.createElement("div");
                        newBack.className="ag-courses-item_bg";
    
                        let newTitle = document.createElement("div");
                        newTitle.className="ag-courses-item_title";
                        newTitle.innerHTML = fromCode[0] + ' <i class="fa-solid fa-right-long"></i> ' + toCode[0];
    
                        let newDesc = document.createElement('div');
                        newDesc.className="ag-courses-item_date-box";
    
                        let newTable = document.createElement('table');
    
                        let newTBody = document.createElement('tbody');
    
                        let newLTD = document.createElement("td");
    
                        
    
                        if (transitType.includes("B") && transitType.includes("T"))
                        {
                            newLTD.innerHTML = '<i class="fa-solid fa-train"></i>+<i class="fa-solid fa-bus"></i> Depart: '+ fromCode[1] + " at " +moment(obj.SchJourneys[0].Services[i].Trips.Trip[0].Stops.Stop[0].Time, 'hh:mm a').format('hh:mm a');
                        }
                        else if (transitType.includes("B"))
                        {
                            newLTD.innerHTML = '<i class="fa-solid fa-bus"></i> Depart: '+ fromCode[1] + " at " +moment(obj.SchJourneys[0].Services[i].Trips.Trip[0].Stops.Stop[0].Time, 'hh:mm a').format('hh:mm a');
                        }
                        else if (transitType.includes("T"))
                        {
                            newLTD.innerHTML = '<i class="fa-solid fa-train"></i> Depart: '+ fromCode[1] + " at " +moment(obj.SchJourneys[0].Services[i].Trips.Trip[0].Stops.Stop[0].Time, 'hh:mm a').format('hh:mm a');
                        }
    
                        let newMTD = document.createElement('td');
                        newMTD.innerHTML = 'Transfers: ' + (obj.SchJourneys[0].Services[i].Trips.Trip.length-1);
    
                        let newRTD = document.createElement('td');
                        newRTD.innerHTML = '<i class="fa-solid fa-location-dot"></i> Arrive: ' + toCode[1] + " at " + moment(obj.SchJourneys[0].Services[i].Trips.Trip[obj.SchJourneys[0].Services[i].Trips.Trip.length -1].Stops.Stop[(obj.SchJourneys[0].Services[i].Trips.Trip[obj.SchJourneys[0].Services[i].Trips.Trip.length -1].Stops.Stop.length - 1)].Time, 'hh:mm a').format('hh:mm a');
    
                        newTBody.appendChild(newLTD);
                        newTBody.appendChild(newMTD);
                        newTBody.appendChild(newRTD);
                        newTable.appendChild(newTBody);
                        newDesc.appendChild(newTable);
                        newA.appendChild(newBack);
                        newA.appendChild(newTitle);
                        newA.appendChild(newDesc);
                        newItem.appendChild(newA);
                        results.appendChild(newItem);
                    }
                }
            }
            else
            {
                let notif = document.getElementById("notification");
                notif.innerHTML = "Unable to find scheduled routes. Please try alternate times or stops.";
            }
        }
    }

    invoke("get_all_stops").then((result) => {
        let json = JSON.parse(result);

        let list1 = document.getElementById("fromListTrain");
        let list2 = document.getElementById("toListTrain");

        list1.innerHTML = "";
        list2.innerHTML = "";

        for (let i = 0; i < json.Stations.Station.length; i++)
        {
            let option1 = document.createElement("option");
            option1.value = json.Stations.Station[i].LocationName + " | " + json.Stations.Station[i].LocationCode;

            let option2 = document.createElement("option");
            option2.value = json.Stations.Station[i].LocationName + " | " + json.Stations.Station[i].LocationCode;

            list1.appendChild(option1);
            list2.appendChild(option2);
        }
    });

    return (
        <div className="container" style={{alignItems: "center"}}>
        <p id="notification"></p>
        <h1>Search Scheduled Trips</h1>
        <label>Date and Time of Departure:</label>
        <input type="datetime-local" id="time" name="time" style={{width: 250}}></input><br/>
        <div className="search-container">
            <input type="text" id="fromInputTrain" placeholder="Depart From" style={{width: 200}} list="fromListTrain"/>
            <datalist id="fromListTrain">
                
            </datalist>
            <i className="fa-solid fa-right-long" style={{padding: 5}}></i>
            <input type="text" id="toInputTrain" placeholder="Arrive To" style={{width: 200}} list="toListTrain"/>
            <datalist id="toListTrain">
            
            </datalist>
            <br/>
            <p id="error" className="error"></p>
            <button onClick={search}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
            <br/>
            <br/>
            <div className="middle">
            <label>
            <input type="radio" name="filter" value="T"/>
            <div className="front-end box">
                <span><i className="fa-solid fa-train"></i></span>
            </div>
            </label>

            <label>
            <input type="radio" name="filter" value="R" defaultChecked/>
            <div className="front-end box">
                <span><i className="fa-solid fa-arrows-left-right"></i></span>
            </div>
            </label>

            <label>
            <input type="radio" name="filter" value="B"/>
            <div className="front-end box">
                <span><i className="fa-solid fa-bus"></i></span>
            </div>
            </label>
            </div>

        </div>
        <div id="results">
        <div className="ag-format-container-schedule" id="display-items">
        </div>
        </div>
        </div>
    );
}

export default Schedule;