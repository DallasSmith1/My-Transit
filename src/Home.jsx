import "./Home.css";
import { invoke } from "@tauri-apps/api/tauri";
import moment from "moment";

function Home()
{
    let map;

    let first = true;

    window.setTimeout(initMap, 1000);

    function initMap() {
        if (first)
        {
            let bar = document.getElementById("scrollBar");
            bar.addEventListener("animationiteration", function() {
            initMap();
            });

            first = false;
        }
        // get selected preset
        invoke("get_selected_presets").then((selected) => {
            if (selected != "")
            {
                let hashed = selected.replace(".txt", "");
                // get the custom trip information
                invoke("get_presets", {hash: hashed}).then((mytrip) => {
                    mytrip = JSON.parse(mytrip);
                    let date = new Date();
                    let currentDate = date.getFullYear().toString() + (date.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2}) + date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2});
                    // get the entire trip info of the train/bus they are taking
                    invoke("get_trip_info", {date: currentDate, trip: mytrip.Trips.Trip[0].Number}).then((trainTrip) => {
                        trainTrip = JSON.parse(trainTrip);
                        // get the next services at the stop you are departing from
                        invoke("get_next_service", {stop: mytrip.Trips.Trip[0].Stops.Stop[0].Code}).then((nextServices) => {
                            nextServices = JSON.parse(nextServices);
                            // get all current trains
                            invoke("get_all_trains").then((allTrains) => {
                                allTrains = JSON.parse(allTrains);
                                // get all buses
                                invoke("get_all_buses").then((allBuses) => {
                                    allBuses = JSON.parse(allBuses);
                                    // get all train exceptions
                                    invoke("get_train_exceptions").then((trainExceptions) => {
                                        trainExceptions = JSON.parse(trainExceptions);
                                        // get all bus exceptions
                                        invoke("get_bus_exceptions").then((busExceptions) => {
                                            busExceptions = JSON.parse(busExceptions);
                                            // get departure stop name
                                            invoke("get_stop_details", {stop: mytrip.Trips.Trip[0].Stops.Stop[0].Code}).then((departureStop) => {
                                                departureStop = JSON.parse(departureStop);
                                                // get arrival stop
                                                invoke("get_stop_details", {stop: mytrip.Trips.Trip[mytrip.Trips.Trip.length-1].Stops.Stop[mytrip.Trips.Trip[mytrip.Trips.Trip.length-1].Stops.Stop.length-1].Code}).then((arrivalStop) => {
                                                    arrivalStop = JSON.parse(arrivalStop);

                                                    let from = document.getElementById("from");
                                                    from.innerHTML = departureStop.Stop.StopName;

                                                    let to = document.getElementById("to");
                                                    to.innerHTML = arrivalStop.Stop.StopName;

                                                    let board = document.getElementById("departure");
                                                    board.innerHTML = "Display: "+ mytrip.Trips.Trip[0].Display;

                                                    let scheduledTime = document.getElementById("scheduledTime");

                                                    let sTime = moment(mytrip.Trips.Trip[0].Stops.Stop[0].Time, 'hh:mm a').format('hh:mm a');

                                                    scheduledTime.innerHTML = "Scheduled: " + sTime;

                                                    let tripTime = mytrip.Trips.Trip[0].Stops.Stop[0].Time.split(":");
                                                    let tripDepartureTime = new Date();
                                                    tripDepartureTime.setHours(tripTime[0], tripTime[1], 0);

                                                    let found = false;

                                                    if (date.getTime() < tripDepartureTime.getTime())
                                                    {
                                                        for (let i = 0; i < nextServices.NextService.Lines.length && !found; i++)
                                                        {
                                                            if (nextServices.NextService.Lines[i].TripNumber == mytrip.Trips.Trip[0].Number)
                                                            {
                                                                found = true;

                                                                let actualTime = document.getElementById("actualTime");

                                                                let aTime = nextServices.NextService.Lines[i].ComputedDepartureTime.split(" ");
                                                                aTime = moment(aTime[1].slice(0, -3), 'hh:mm a').format('hh:mm a');
                                                                actualTime.innerHTML = "Actual: " + aTime;

                                                                let card = document.getElementById("display");
                                                                let status = document.getElementById("status");
                                                                if (sTime == aTime)
                                                                {
                                                                    status.innerHTML = "ON TIME";
                                                                    card.className = "tripcard green";
                                                                }
                                                                else
                                                                {
                                                                    status.innerHTML = "DELAYED";
                                                                    card.className = "tripcard yellow";
                                                                }


                                                                for (let tripstop = 0; tripstop < trainTrip.Trips[0].Stops.length; tripstop++)
                                                                {
                                                                    if (trainTrip.Trips[0].Stops[tripstop].Code == mytrip.Trips.Trip[0].Stops.Stop[0].Code)
                                                                    {
                                                                        let track = document.getElementById("track");
                                                                        if (trainTrip.Trips[0].Stops[tripstop].Track.Scheduled != "")
                                                                        {
                                                                            track.innerHTML = "Track: " + trainTrip.Trips[0].Stops[tripstop].Track.Scheduled;
                                                                        }
                                                                        else
                                                                        {
                                                                            track.innerHTML = "Track: N/A";
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else
                                                    {
                                                        let status = document.getElementById("status");
                                                        status.innerHTML = "DEPARTED";
                                                        status.className = "tripcard green";
                                                    }

                                                    
                                                    let longitude = 0;
                                                    let latitude = 0;
                                                    let features = [
                                                        {
                                                        position: new google.maps.LatLng(latitude, longitude),
                                                        type: "train",
                                                        },
                                                    ];

                                                    if (mytrip.Trips.Trip[0].Type == "T")
                                                    {
                                                        let trainFound = false;
                                                        for (let train = 0; train < allTrains.Trips.Trip.length && !trainFound; train++)
                                                        {
                                                            if (allTrains.Trips.Trip[train].TripNumber == mytrip.Trips.Trip[0].Number)
                                                            {
                                                                found = true;
                                                                trainFound = true;
                                                                longitude = allTrains.Trips.Trip[train].Longitude;
                                                                latitude = allTrains.Trips.Trip[train].Latitude;
                                                            }
                                                        }
                                                        features = [
                                                            {
                                                            position: new google.maps.LatLng(latitude, longitude),
                                                            type: "train",
                                                            },
                                                        ];
                                                    }
                                                    else
                                                    {
                                                        let busFound = false;
                                                        for (let bus = 0; bus < allBuses.Trips.Trip.length && !busFound; bus++)
                                                        {
                                                            if (allBuses.Trips.Trip[bus].TripNumber == mytrip.Trips.Trip[0].Number)
                                                            {
                                                                found = true;
                                                                busFound = true;
                                                                longitude = allBuses.Trips.Trip[bus].Longitude;
                                                                latitude = allBuses.Trips.Trip[bus].Latitude;
                                                            }
                                                        }
                                                        features = [
                                                            {
                                                            position: new google.maps.LatLng(latitude, longitude),
                                                            type: "bus",
                                                            },
                                                        ];
                                                    }

                                                    map = new google.maps.Map(document.getElementById("map"), {
                                                        center: new google.maps.LatLng(latitude, longitude),
                                                        zoom: 14,
                                                    });
                                            
                                                    const icons = {
                                                        train: {
                                                            icon: "https://i.imgur.com/M8P8aGa.png",
                                                        },
                                                        bus: {
                                                            icon: "https://i.imgur.com/Sa6syJH.png",
                                                        }
                                                    };
                                            
                                                    // Create markers.
                                                    for (let i = 0; i < features.length; i++) {
                                                        const marker = new google.maps.Marker({
                                                        position: features[i].position,
                                                        icon: icons[features[i].type].icon,
                                                        map: map,
                                                        });
                                                    };

                                                    let spinner = document.getElementById("spinner");
                                                    if (!found)
                                                    {
                                                        spinner.innerHTML = "";
                                                    }
                                                    else
                                                    {
                                                        spinner.innerHTML = '<span class="homeloader"></span>';
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }
            else
            {
                
            }

            
        })

    }

    return (
        <div id="display" className="tripcard green">
            <table className="hometable">
                <tbody>
                    <tr style={{height: "10%"}}>
                        <td className="loadertd" id="spinner"></td>
                        <td id="from" className="hometd" style={{width: "43%", textAlign: "right", fontSize: 25}}>FROM</td>
                        <td className="hometd" style={{width: "4%", fontSize: 25}}><i className="fa-solid fa-right-long"></i></td>
                        <td id="to" className="hometd" style={{width: "43%", textAlign: "left", fontSize: 25}}>TO</td>
                    </tr>
                    <tr style={{height: "10%"}}>
                        <td id="status" className="hometd homestatus" colSpan={4} style={{fontSize: 35}}>STATUS</td>
                    </tr>
                    <tr>
                        <td className="hometd" colSpan={2}>
                            <table className="homedetailtable">
                                <tbody>
                                    <tr className="homedetailtr">
                                        <td className="hometd homelabeltd" id="scheduledTime">Scheduled: 00:00 AM</td>
                                    </tr>
                                    <tr className="homedetailtr">
                                        <td className="hometd homelabeltd" id="actualTime">Actual:N/A</td>
                                    </tr>
                                    <tr className="homedetailtr">
                                        <td className="hometd homelabeltd" id="track">Track: N/A</td>
                                    </tr>
                                    <tr className="homedetailtr">
                                        <td className="hometd homelabeltd" id="departure">Display: N/A</td>
                                    </tr>
                                    <tr className="homedetailupdatetr">
                                        <td className="hometd homeupdatetd" colSpan={2}>Updates</td>
                                    </tr>
                                    <tr className="homedetailupdatevaluetr">
                                        <td className="hometd homeupdatevaluetd" colSpan={2} id="updates">None</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td className="hometd" colSpan={2}>
                            <div id="map"></div>
                        </td>
                    </tr>
                    <tr style={{height: "5%"}}>
                        <td className="hometd" colSpan={4} style={{verticalAlign: "bottom"}}>
                            <div class="bar">
                                <div id="scrollBar" class="in"></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}

export default Home;