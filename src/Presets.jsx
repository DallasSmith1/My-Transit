import "./Presets.css";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { invoke } from "@tauri-apps/api/tauri";

function Presets({setJSON})
{
    let allCardIds = [];
    let currentJSON = "";
    const navigate = useHistory();
    invoke("get_selected_presets").then((selected) => {
        invoke("get_all_presets").then((result) => {
            let files = result.split(":");
            console.log(files)
            let presets = [];
        
            for (let i = 0; i < files.length; i++)
            {
                let preset = files[i].split("_.");
                preset = preset[0].replace(".\\saved_presets\\", "");
                let presetNum = preset;
                while (presetNum.includes("_"))
                {
                    presetNum = presetNum.replace("_","");
                }
                if (!isNaN(presetNum.split("--")[1]))
                {
                    presets.push(preset);
                }
            }

            
            let div = document.getElementById("presets");
            div.innerHTML = "";

            if (presets.length == 0)
            {
                let button = document.createElement("button");
                button.onclick = function() {
                    navigate.push("./schedule");
                }
                button.innerHTML = "See Schedules";

                let p = document.createElement("p");
                p.innerHTML = "It seems you do not have any trips saved. To save a trip, head over to <a href='./schedule' class='aboutPage'>schedules<a/>, search for a trip, and save one that you would like to save! If you have trouble, <a href='./about' class='aboutPage'>click here<a/> for further details and instructions.";
            
                div.appendChild(p);
                div.appendChild(button);
            }
    
            for (let i = 0; i < presets.length; i++)
            {
                let article = document.createElement("article");
                if (selected.includes(presets[i]))
                {
                    article.className = "cta_select";
                }
                else
                {
                    article.className = "cta";
                    article.onclick = function () {
                        ShowBasicDetails(presets[i]);
                    }
                    article.id = "article_"+presets[i];
                }

                
                

                let ctaDiv = document.createElement("div");
                ctaDiv.className = "cta__text-column";
    
                let h2 = document.createElement("h2");
                h2.innerHTML = presets[i].split("-")[0] + " | " +presets[i].split("-")[3] + " | " +presets[i].split("-")[1];
    
                let a1 = document.createElement("a");
                a1.innerHTML = "Track On Dashboard";
                let newHash = presets[i] + "_";
                a1.onclick =  function () {
                    invoke("set_selected_presets", {hash: newHash}).then((result) => {
                        location.reload();
                    });
                }
    
                let a2 = document.createElement("a");
                a2.innerHTML = "Delete";
    
                ctaDiv.appendChild(h2);
                if (!selected.includes(presets[i]))
                {
                    ctaDiv.appendChild(a1);
                    a2.onclick =  function () {
                        invoke("delete_presets", {hash: newHash}).then((result) => {
                            location.reload();
                        });
                    }
                }
                else
                {
                    a2.onclick =  function () {
                        invoke("set_selected_presets", {hash: ""}).then((result) => {
                            invoke("delete_presets", {hash: newHash}).then((result) => {
                                location.reload();
                            });
                        });
                    }
                }

                let detailsP = document.createElement("p");
                detailsP.id = presets[i];
                if (!selected.includes(presets[i]))
                {
                    allCardIds.push(presets[i]);
                }

                ctaDiv.appendChild(a2);
                ctaDiv.appendChild(detailsP);
                article.appendChild(ctaDiv);
                div.appendChild(article);

                if (selected.includes(presets[i]))
                {
                    let hashed = presets[i] + "_";
                    invoke("get_presets", {hash: hashed}).then((retPreset) => {
                        let json = JSON.parse(retPreset);
                        currentJSON = json;
                        let tripNumber = document.getElementById("tripNumber");
                        tripNumber.innerHTML = json.tripHash.replace("_","").replace("_","");

                        let fromCode = document.getElementById("fromCode");
                        fromCode.innerHTML = json.Trips.Trip[0].Stops.Stop[0].Code;

                        invoke("get_stop_details", {stop: json.Trips.Trip[0].Stops.Stop[0].Code}).then((stopDetails) => {
                            let details = JSON.parse(stopDetails);

                            let fromName = document.getElementById("fromName");
                            fromName.innerHTML = details.Stop.StopName;

                            let map = document.getElementById("map");
                            map.innerHTML = "<p class='title'>"+details.Stop.StopName+"</p><iframe width='100%' height='500' src='https://maps.google.com/maps?q="+details.Stop.Latitude+","+details.Stop.Longitude+"&output=embed'></iframe>";
                        });

                        let toCode = document.getElementById("toCode");
                        toCode.innerHTML = json.Trips.Trip[json.Trips.Trip.length-1].Stops.Stop[json.Trips.Trip[json.Trips.Trip.length-1].Stops.Stop.length-1].Code;

                        invoke("get_stop_details", {stop: json.Trips.Trip[json.Trips.Trip.length-1].Stops.Stop[json.Trips.Trip[json.Trips.Trip.length-1].Stops.Stop.length-1].Code}).then((stopDetails) => {
                            let details = JSON.parse(stopDetails);

                            let toName = document.getElementById("toName");
                            toName.innerHTML = details.Stop.StopName;
                        });

                        let type = document.getElementById("tripType");
                        let line = document.getElementById("tripLine");
                        let icons = "";
                        let lines = "";
                        for (let i = 0; i < json.Trips.Trip.length; i++)
                        {
                            if (json.Trips.Trip[i].Type == "T")
                            {
                                icons = icons+'<i class="fa-solid fa-train"></i>';
                            }
                            else if (json.Trips.Trip[i].Type == "B")
                            {
                                icons = icons+'<i class="fa-solid fa-bus"></i>';
                            }

                            lines = lines+json.Trips.Trip[i].Line+" ";
                        }
                        type.innerHTML = icons;
                        line.innerHTML = lines;

                        let transfers = document.getElementById("tripTransfers");
                        transfers.innerHTML = json.TransferLinks.Link.length;

                        let direction = document.getElementById("tripDirection");
                        direction.innerHTML = json.Trips.Trip[0].Direction;

                        let departure = document.getElementById("tripDepart");
                        departure.innerHTML = moment(json.Trips.Trip[0].Stops.Stop[0].Time, 'hh:mm a').format('hh:mm a');

                        let arrive = document.getElementById("tripArrival");
                        arrive.innerHTML = moment(json.Trips.Trip[json.Trips.Trip.length -1].Stops.Stop[(json.Trips.Trip[json.Trips.Trip.length -1].Stops.Stop.length - 1)].Time, 'hh:mm a').format('hh:mm a');

                        let duration = document.getElementById("tripDuration");
                        let time = json.Duration.split(':');
                        duration.innerHTML = time[0] +  ":" + time[1];

                        let wait = document.getElementById("tripWait");
                        let waitMin = 0;
                        let waitHour = 0;
                        
                        for (let i = 0; i < json.TransferLinks.Link.length; i++)
                        {
                            let time = json.TransferLinks.Link[i].TransferDuration;
                            time = time.replace(":","").replace(":","");
                            waitMin += parseInt(time[2]+time[3]);
                            waitHour += parseInt(time[0]+time[1]);
                        }

                        while (waitMin >= 60)
                        {
                            waitMin -= 60;
                            waitHour++;
                        }

                        wait.innerHTML = waitHour.toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":" + waitMin.toLocaleString('en-US', {minimumIntegerDigits: 2});
                    });
                }
            }
        });
    })

    function ShowBasicDetails(id)
    {
        for (let i = 0; i < allCardIds.length; i++)
        {
            let article = document.getElementById("article_"+allCardIds[i]);
            let p = document.getElementById(allCardIds[i]);
            
            if (id == allCardIds[i])
            {
                article.className = "cta_click";
                let hash = allCardIds[i]+"_";
                invoke("get_presets", {hash: hash}).then((retPreset) => {
                    let json = JSON.parse(retPreset);
                    invoke("get_stop_details", {stop: json.Trips.Trip[0].Stops.Stop[0].Code}).then((startDetails) => {
                        let details = JSON.parse(startDetails);
                        invoke("get_stop_details", {stop: json.Trips.Trip[json.Trips.Trip.length-1].Stops.Stop[json.Trips.Trip[json.Trips.Trip.length-1].Stops.Stop.length-1].Code}).then((stopDetails) => {
                            stopDetails = JSON.parse(stopDetails);
                            p.innerHTML = details.Stop.StopName + " to " + stopDetails.Stop.StopName + " at " + moment(json.Trips.Trip[0].Stops.Stop[0].Time, 'hh:mm a').format('hh:mm a');
                        });
                    });
                });
            }
            else
            {
                p.innerHTML = "";
                article.className = "cta"
            }
        }
    }


    return (
        <table className="presettable">
            <tbody>
                <td className="td-preset">
                    <div>
                        <div className="boarding-pass">
                            <header>
                                <div class="flight">
                                <strong id="tripNumber">0000</strong>
                                </div>
                            </header>
                            <section class="cities">
                                <table>
                                    <tbody>
                                        <td className="thirdy">
                                        <small id="fromName">from</small>
                                        <strong id="fromCode">from</strong>
                                        </td>
                                        <td className="thirdy"><strong><i className="fa-solid fa-right-long"></i></strong></td>
                                        <td className="thirdy">
                                            <small id="toName">to</small>
                                            <strong id="toCode">to</strong>
                                        </td>
                                    </tbody>
                                </table>
                            </section>
                            <section class="infos">
                                <div class="places">
                                <div class="box">
                                    <small>type</small>
                                    <strong id="tripType"><i class="fa-solid fa-train"></i><i class="fa-solid fa-bus"></i></strong>
                                </div>
                                <div class="box">
                                    <small>Line</small>
                                    <strong id="tripLine">AA BB</strong>
                                </div>
                                <div class="box">
                                    <small>transfers</small>
                                    <strong id="tripTransfers">1</strong>
                                </div>
                                <div class="box">
                                    <small>Direction</small>
                                    <strong id="tripDirection">N</strong>
                                </div>
                                </div>
                                <div class="times">
                                <div class="box">
                                    <small>Departure</small>
                                    <strong id="tripDepart">00:00 AM</strong>
                                </div>
                                <div class="box">
                                    <small>Arrival</small>
                                    <strong id="tripArrival">00:00 AM</strong>
                                </div>
                                <div class="box">
                                    <small>Duration</small>
                                    <strong id="tripDuration">00:00</strong>
                                </div>
                                <div class="box">
                                    <small>Wait</small>
                                    <strong id="tripWait">00:00</strong>
                                </div>
                                </div>
                            </section>
                            </div>
                    </div>
                    <br/>
                    <button onClick={function() {
                        setJSON(currentJSON);
                        navigate.push('/tripdetails');
                    }}>
                        <i class="fa-solid fa-book-open"></i> Show more
                    </button>
                </td>
                <td className="td-preset-middle">
                    <p className="title">Saved Trips</p>
                    <hr/>
                    <div id="presets" className="presets">
                    </div>
                </td>
                <td className="td-preset-right" id="map">
                </td>
            </tbody>
        </table>
    );
}

export default Presets;