import "./TripDetails.css";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { invoke } from "@tauri-apps/api/tauri";

function TripDetails({json})
{
    const navigate = useHistory();

    let destination = json.Trips.Trip[(json.Trips.Trip.length)-1].Stops.Stop[json.Trips.Trip[(json.Trips.Trip.length)-1].Stops.Stop.length-1].Code;

    let time = json.Duration.split(':');

    invoke("get_stop_details", {stop: json.Trips.Trip[0].Stops.Stop[0].Code}).then((stopDetails) => {
        let details = JSON.parse(stopDetails);

        let map = document.getElementById("map");
        map.innerHTML = "<p class='title'>"+details.Stop.StopName+"</p><iframe width='100%' height='600' src='https://maps.google.com/maps?q="+details.Stop.Latitude+","+details.Stop.Longitude+"&output=embed'></iframe>";

        let dest = document.getElementById("departure");
        dest.innerHTML = details.Stop.StopName + " | " + details.Stop.Code;

        let start = document.getElementById(details.Stop.Code);
        start.innerHTML = details.Stop.StopName;
    });
    
    async function GetStationDetails(code)
    {
        let out = await invoke("get_stop_details", { stop: code });
        
        let obj = JSON.parse(out);

        let map = document.getElementById("map");
        map.innerHTML = "<p class='title'>"+obj.Stop.StopName+"</p><iframe width='100%' height='600' src='https://maps.google.com/maps?q="+obj.Stop.Latitude+","+obj.Stop.Longitude+"&output=embed'></iframe>";
        
        let content = document.getElementById("popupDetails");
        content.innerHTML = '';
        content.innerText = obj.Stop.Intersection;
    }

    function Trip() {
        let departure = json.Trips.Trip[0].Stops.Stop[0].Code;

        return (
            <h1><a href="#popup1" id="departure" onClick={() => GetStationDetails(departure)}>{departure}</a> <i className="fa-solid fa-right-long"></i> <a href="#popup1"  id="destination" onClick={() => GetStationDetails(destination)}>{destination}</a></h1>
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
            invoke("get_stop_details", {stop: code}).then((stopDetails) => {
                let details = JSON.parse(stopDetails);
        
                let dest = document.getElementById("destination");
                dest.innerHTML = details.Stop.StopName + " | " + details.Stop.Code;
        
                let start = document.getElementById(details.Stop.Code+"stop");
                start.innerHTML = details.Stop.StopName;
            });
            if (last)
            {
                return <><hr/><table><tbody><td className="bigTDl"><i class="fa-solid fa-location-dot"></i> Arrived</td><td className="bigTD"><i class="fa-solid fa-map-pin"></i> <a href="#popup1" id={code+"stop"} onClick={() => GetStationDetails(code)}>{code}</a></td><td className="bigTDr">{time}</td></tbody></table></>
            }
            else
            {
                return <><hr/><table><tbody><td className="bigTDl"><i class="fa-solid fa-location-dot"></i> Exit <TransitName type={Type}/></td><td className="bigTD"><i class="fa-solid fa-map-pin"></i> <a href="#popup1" id={code+"stop"} onClick={() => GetStationDetails(code)}>{code}</a></td><td className="bigTDr">{time}</td></tbody></table></>
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

        invoke("get_stop_details", {stop: trip.Stops.Stop[0].Code}).then((stopDetails) => {
            let details = JSON.parse(stopDetails);
     
            let start = document.getElementById(details.Stop.Code);
            start.innerHTML = details.Stop.StopName;
        });

        return (
            <div className="trips">
                <p className="secondary">Line: {trip.Line} - {trip.Direction}</p>
                <table><tbody><td className="bigTDl"><TransitIcon type={trip.Type}/> Board <TransitName type={trip.Type}/></td><td className="bigTD"> <i class="fa-solid fa-map-pin"></i> <a href="#popup1" id={trip.Stops.Stop[0].Code} onClick={() => GetStationDetails(trip.Stops.Stop[0].Code)}>{trip.Stops.Stop[0].Code}</a></td><td className="bigTDr">{moment(trip.Stops.Stop[0].Time, 'hh:mm a').format('hh:mm a')}</td></tbody></table><hr/>
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
        invoke("get_stop_details", {stop: stop.Code}).then((stopDetails) => {
            let details = JSON.parse(stopDetails);
  
            let start = document.getElementById(details.Stop.Code);
            start.innerHTML = details.Stop.StopName + " | " + details.Stop.Code;
        });
        return (
            <p className="secondary"><i class="fa-solid fa-map-pin"></i> <a  id={stop.Code} href="#popup1" onClick={() => GetStationDetails(stop.Code)}>{stop.Code}</a> - {moment(stop.Time, 'hh:mm a').format('hh:mm a')}</p>
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
            <table className="triptable">
                <tbody>
                    <tr>
                        <td className="headerl">
                            <button onClick={function() {
                                navigate.push('/schedule');
                            }}>
                                <i className="fa-solid fa-chevron-left"></i> Back
                            </button>
                        </td>
                        <td className="headerr">
                            <button onClick={function() {
                                SavePreset();
                                navigate.push('/presets');
                            }}>
                                <i className="fa-solid fa-bookmark"></i> Save Trip
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Trip />
                            <br/>
                            <Duration />
                            <br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="details">
                                <table>
                                    <tbody>
                                        <tr>
                                            <br/>
                                            <TripInfo />
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td id="map">

                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    );
}

export default TripDetails;