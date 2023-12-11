import "./TripDetails.css";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { invoke } from "@tauri-apps/api/tauri";

function TripDetails({json})
{
    const navigate = useHistory();

    let destination = json.Trips.Trip[(json.Trips.Trip.length)-1].Stops.Stop[json.Trips.Trip[(json.Trips.Trip.length)-1].Stops.Stop.length-1].Code;

    let time = json.Duration.split(':');
    
    async function GetStationDetails(code)
    {
        let out = await invoke("get_stop_details", { stop: code });
        
        let obj = JSON.parse(out);
        
        let title = document.getElementById("popupLocation");
        title.innerText = obj.Stop.StopName;

        let map = document.getElementById("map");
        map.src = "https://maps.google.com/maps?q="+obj.Stop.Latitude+", "+obj.Stop.Longitude+"&output=embed";
        
        let content = document.getElementById("popupDetails");
        content.innerHTML = '';
        content.innerText = obj.Stop.Intersection;
    }

    function Trip() {
        let departure = json.Trips.Trip[0].Stops.Stop[0].Code;

        return (
            <h1><a href="#popup1" onClick={() => GetStationDetails(departure)}>{departure}</a> <i className="fa-solid fa-right-long"></i> <a href="#popup1" onClick={GetStationDetails(destination)}>{destination}</a></h1>
        );
    }

    function Duration () {
        let duration = ""

        if (time[0] != "00")
        {
            duration += time[0] + " hours ";
        }
        if (time[1] != "00")
        {
            duration += time[1] + " minutes";
        }

        return (
            <h3><i class="fa-solid fa-stopwatch"></i> {duration}</h3>
        );
    }
    
    function TripInfo() { 
        let trips = [];
        let transfers = [];
        for (let i = 0; i < json.Trips.Trip.length; i++)
        {
            trips.push(json.Trips.Trip[i]);
            if (i < json.TransferLinks.Link.length)
            {
                transfers.push(json.TransferLinks.Link[i]);
            }
        }
        let counter = -1;

        return (
            <>
            {trips.map(function(obj) {
                counter++;
                if(json.Trips.Trip.length-1 == counter)
                {
                    return (
                        <>
                        <TripDetails trip={obj} last={true}/>
                        <TransferDetails id={counter}/>
                        </>
                    ); 
                }
                else
                {
                    return (
                        <>
                        <TripDetails trip={obj} last={false}/>
                        <TransferDetails id={counter}/>
                        </>
                    );
                }
                })}
            </>
        );
    }

    function TripDetails({trip, last})
    {
        let stops = [];

        for (let i = 1; i < trip.Stops.Stop.length-1; i++)
        {
            stops.push(trip.Stops.Stop[i]);
        }

        function ArriveIcon({code, last, time, Type})
        {
            if (last)
            {
                return <p className="primary"><i class="fa-solid fa-location-dot"></i> <a href="#popup1" onClick={() => GetStationDetails(code)}>{code}</a> - Arrived - {time}</p>
            }
            else
            {
                return <p className="primary"><i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i> <a href="#popup1" onClick={() => GetStationDetails(code)}>{code}</a> - Exit <TransitName type={Type}/> - {time}</p>
            }
        }

        function TransitIcon({type})
        {
            if (type == "B")
            {
                return <i className="fa-solid fa-bus"></i>
            }
            else
            {
                return <i className="fa-solid fa-train"></i>
            } 
        }

        function TransitName({type})
        {
            if (type == "B")
            {
                return <>Bus</>
            }
            else
            {
                return <>Train</>
            } 
        }

        return (
            <div className="trips">
                <p className="secondary">Line: {trip.Line} - {trip.Direction}</p>
                <p className="primary"><TransitIcon type={trip.Type}/> <a href="#popup1" onClick={() => GetStationDetails(trip.Stops.Stop[0].Code)}>{trip.Stops.Stop[0].Code}</a> - Board <TransitName type={trip.Type}/> - {moment(trip.Stops.Stop[0].Time, 'hh:mm a').format('hh:mm a')}</p>
                {stops.map(function(obj) {
                return (
                    <StopDetails stop={obj}/>
                );
                })}
                <ArriveIcon code={trip.Stops.Stop[trip.Stops.Stop.length-1].Code} last={last} time={moment(trip.Stops.Stop[trip.Stops.Stop.length-1].Time, 'hh:mm a').format('hh:mm a')} Type={trip.Type}/> 
            </div>
        )
    }

    function StopDetails({stop})
    {
        return (
            <p className="secondary"><i className="fa-solid fa-stop"></i> <a href="#popup1" onClick={() => GetStationDetails(stop.Code)}>{stop.Code}</a> - {moment(stop.Time, 'hh:mm a').format('hh:mm a')}</p>
        )
    }

    function TransferDetails({id})
    {
        
        if (id < json.TransferLinks.Link.length)
        {
            let time = json.TransferLinks.Link[id].TransferDuration.split(":");
            let out = "";
            if(time[0] != "00")
            {
                out += time[0]+" Hours ";
            }
            if(time[1] != "00")
            {
                out += time[1]+" Minutes";
            }
            if (time[0] == "00" && time[1] == "00")
            {
                out = ">1 Minute";
            }
            

            return (
                <div className="trips">
                    <table>
                        <tbody>
                            <td><p className="secondary">TRANSFER</p></td>
                            <td><p className="secondary">{json.TransferLinks.Link[id].FromStopCode} <i className="fa-solid fa-person-walking-arrow-right"></i> {json.TransferLinks.Link[id].ToStopCode}</p></td>
                            <td><p className="secondary"><i className="fa-solid fa-stopwatch"></i> {out}</p></td>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    function SavePreset()
    {
        invoke("create_presets", { json: JSON.stringify(json), hash: json.tripHash });
    }

    return (
        <div>
            <br/>
            <table>
                <tbody>
                    <tr style={{textAlign: 'left'}}>
                        <button onClick={function() {
                            navigate.push('/schedule');
                        }}>
                            <i className="fa-solid fa-chevron-left"></i> Back
                        </button>
                    </tr>
                    <tr>
                        <Trip />
                        <br/>
                        <Duration />
                        <br/>
                    </tr>
                    <tr>
                        <br/>
                        <TripInfo />
                    </tr>
                    <tr>
                        <button onClick={function() {
                            SavePreset();
                            navigate.push('/presets');
                        }}>
                            <i className="fa-solid fa-bookmark"></i> Save Trip
                        </button>
                    </tr>
                </tbody>
            </table>
            <div id="popup1" class="overlay">
                <div class="popup">
                    <h2 id="popupLocation"></h2>
                    <a class="close" href="#">&times;</a>
                    <iframe id="map" width="100%" height="400" src=""></iframe>
                    <div class="content" id="popupDetails">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TripDetails;