import "./Schedule.css"
import { invoke } from "@tauri-apps/api/tauri";
import moment from "moment";

function Schedule({setJSON})
{
    async function search()
    {
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
            console.log(obj);
            let results =  document.getElementById("display-items");
    
            results.innerHTML = "";

            if (obj.SchJourneys.length > 0)
            {
                for (let i = 0; i < obj.SchJourneys[0].Services.length; i++)
                {
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
                    newLTD.innerHTML = '<i class="fa-solid fa-train"></i> Depart: '+ fromCode[1] + " at " +moment(obj.SchJourneys[0].Services[i].Trips.Trip[0].Stops.Stop[0].Time, 'hh:mm a').format('hh:mm a');

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
            else
            {
                results.innerHTML = "<br/><p>Unable to find a scheduled route. Try again with a different time.</p>"
            }
        }
    }

    return (
        <div className="container" style={{alignItems: "center"}}>
        <h1>Search Scheduled Trips</h1>
        <label>Date and Time of Departure:</label>
        <input type="datetime-local" id="time" name="time" style={{width: 250}}></input>
        <div className="search-container">
            <input type="text" id="fromInputTrain" placeholder="Depart From" style={{width: 200}} list="fromListTrain"/>
            <datalist id="fromListTrain">
                <option value={"Acton GO | AC"}/>
                <option value={"Allandale Waterfront GO | AD"}/>
                <option value={"Agincourt GO | AG"}/>
                <option value={"Ajax GO | AJ"}/>
                <option value={"Aldershot GO | AL"}/>
                <option value={"Appleby GO | AP"}/>
                <option value={"Aurora GO | AU"}/>
                <option value={"Barrie South GO | BA"}/>
                <option value={"Bradford GO | BD"}/>
                <option value={"Bramalea GO | BE"}/>
                <option value={"Bloor GO | BL"}/>
                <option value={"Bloomington GO | BM"}/>
                <option value={"Bronte GO | BO"}/>
                <option value={"Brampton Innovation District GO | BR"}/>
                <option value={"Burlington GO | BU"}/>
                <option value={"Centennial GO | CE"}/>
                <option value={"Clarkson GO | CL"}/>
                <option value={"Cooksville GO | CO"}/>
                <option value={"Danforth GO | DA"}/>
                <option value={"Dixie GO | DI"}/>
                <option value={"Downsview Park GO | DW"}/>
                <option value={"East Gwillimbury GO | EA"}/>
                <option value={"Eglinton GO | EG"}/>
                <option value={"Erindale GO | ER"}/>
                <option value={"Etobicoke GO | ET"}/>
                <option value={"Exhibition GO | EX"}/>
                <option value={"Georgetown GO | GE"}/>
                <option value={"Guelph Central GO | GL"}/>
                <option value={"Gormley GO | GO"}/>
                <option value={"Guildwood GO | GU"}/>
                <option value={"Hamilton GO Centre | HA"}/>
                <option value={"King City GO | KC"}/>
                <option value={"Kennedy GO | KE"}/>
                <option value={"Kitchener GO | KI"}/>
                <option value={"Kipling GO | KP"}/>
                <option value={"Langstaff GO | LA"}/>
                <option value={"Old Elm GO | LI"}/>
                <option value={"Long Branch GO | LO"}/>
                <option value={"Lisgar GO | LS"}/>
                <option value={"Malton GO | MA"}/>
                <option value={"Meadowvale GO | ME"}/>
                <option value={"Mimico GO | MI"}/>
                <option value={"EgliMount Joynton GO | MJ"}/>
                <option value={"Milliken GO | MK"}/>
                <option value={"Milton GO | Ml"}/>
                <option value={"Mount Pleasant GO | MO"}/>
                <option value={"Maple GO | MP"}/>
                <option value={"Markham GO | MR"}/>
                <option value={"Newmarket GO | NE"}/>
                <option value={"Niagara Falls GO | NI"}/>
                <option value={"Oakville GO | OA"}/>
                <option value={"Old Cummer GO | OL"}/>
                <option value={"Oriole GO | OR"}/>
                <option value={"Durham College Oshawa GO | OS"}/>
                <option value={"Pearson Airport Terminal 1 | PA"}/>
                <option value={"Pickering GO | PIN"}/>
                <option value={"Port Credit GO | PO"}/>
                <option value={"Richmond Hill GO | RI"}/>
                <option value={"Rouge Hill GO | RO"}/>
                <option value={"Rutherford GO | RU"}/>
                <option value={"Scarborough GO | SC"}/>
                <option value={"St. Catharines GO | SCTH"}/>
                <option value={"Streetsville GO | SR"}/>
                <option value={"Stouffville GO | ST"}/>
                <option value={"Unionville GO | UI"}/>
                <option value={"Union Station GO | UN"}/>
                <option value={"Weston GO | WE"}/>
                <option value={"Whitby GO | WH"}/>
                <option value={"West Harbour GO | WR"}/>
            </datalist>
            <i className="fa-solid fa-right-long" style={{padding: 5}}></i>
            <input type="text" id="toInputTrain" placeholder="Arrive To" style={{width: 200}} list="toListTrain"/>
            <datalist id="toListTrain">
            <option value={"Acton GO | AC"}/>
                <option value={"Allandale Waterfront GO | AD"}/>
                <option value={"Agincourt GO | AG"}/>
                <option value={"Ajax GO | AJ"}/>
                <option value={"Aldershot GO | AL"}/>
                <option value={"Appleby GO | AP"}/>
                <option value={"Aurora GO | AU"}/>
                <option value={"Barrie South GO | BA"}/>
                <option value={"Bradford GO | BD"}/>
                <option value={"Bramalea GO | BE"}/>
                <option value={"Bloor GO | BL"}/>
                <option value={"Bloomington GO | BM"}/>
                <option value={"Bronte GO | BO"}/>
                <option value={"Brampton Innovation District GO | BR"}/>
                <option value={"Burlington GO | BU"}/>
                <option value={"Centennial GO | CE"}/>
                <option value={"Clarkson GO | CL"}/>
                <option value={"Cooksville GO | CO"}/>
                <option value={"Danforth GO | DA"}/>
                <option value={"Dixie GO | DI"}/>
                <option value={"Downsview Park GO | DW"}/>
                <option value={"East Gwillimbury GO | EA"}/>
                <option value={"Eglinton GO | EG"}/>
                <option value={"Erindale GO | ER"}/>
                <option value={"Etobicoke GO | ET"}/>
                <option value={"Exhibition GO | EX"}/>
                <option value={"Georgetown GO | GE"}/>
                <option value={"Guelph Central GO | GL"}/>
                <option value={"Gormley GO | GO"}/>
                <option value={"Guildwood GO | GU"}/>
                <option value={"Hamilton GO Centre | HA"}/>
                <option value={"King City GO | KC"}/>
                <option value={"Kennedy GO | KE"}/>
                <option value={"Kitchener GO | KI"}/>
                <option value={"Kipling GO | KP"}/>
                <option value={"Langstaff GO | LA"}/>
                <option value={"Old Elm GO | LI"}/>
                <option value={"Long Branch GO | LO"}/>
                <option value={"Lisgar GO | LS"}/>
                <option value={"Malton GO | MA"}/>
                <option value={"Meadowvale GO | ME"}/>
                <option value={"Mimico GO | MI"}/>
                <option value={"EgliMount Joynton GO | MJ"}/>
                <option value={"Milliken GO | MK"}/>
                <option value={"Milton GO | Ml"}/>
                <option value={"Mount Pleasant GO | MO"}/>
                <option value={"Maple GO | MP"}/>
                <option value={"Markham GO | MR"}/>
                <option value={"Newmarket GO | NE"}/>
                <option value={"Niagara Falls GO | NI"}/>
                <option value={"Oakville GO | OA"}/>
                <option value={"Old Cummer GO | OL"}/>
                <option value={"Oriole GO | OR"}/>
                <option value={"Durham College Oshawa GO | OS"}/>
                <option value={"Pearson Airport Terminal 1 | PA"}/>
                <option value={"Pickering GO | PIN"}/>
                <option value={"Port Credit GO | PO"}/>
                <option value={"Richmond Hill GO | RI"}/>
                <option value={"Rouge Hill GO | RO"}/>
                <option value={"Rutherford GO | RU"}/>
                <option value={"Scarborough GO | SC"}/>
                <option value={"St. Catharines GO | SCTH"}/>
                <option value={"Streetsville GO | SR"}/>
                <option value={"Stouffville GO | ST"}/>
                <option value={"Unionville GO | UI"}/>
                <option value={"Union Station GO | UN"}/>
                <option value={"Weston GO | WE"}/>
                <option value={"Whitby GO | WH"}/>
                <option value={"West Harbour GO | WR"}/>
            </datalist>
            <button onClick={search}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
            <p id="error" className="error"></p>
        </div>
        <div id="results">
        <div className="ag-format-container-schedule" id="display-items">
        </div>
        </div>
        </div>
    );
}

export default Schedule;