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

        invoke("get_fares", {from: json.Trips.Trip[0].Stops.Stop[0].Code, to: destination}).then((fares) => {
            let details = JSON.parse(fares);
    
            //https://tickets.gotransit.com/en-us/book?type=p2p&ticket_adult=1&start_address=WH&start_name=Whitby%20GO&end_address=EX&end_name=&utm_source=google&utm_campaign=GoTransitSEM&utm_medium=sem_paid
            //https://prestocard.ca/en/about/get-a-presto-card

            let val = document.getElementById("adultSingle");
            val.innerHTML = "";
            let a = document.createElement("a");
            a.innerHTML = "$"+details.AllFares.FareCategory[0].Tickets[0].Fares[0].Amount.toFixed(2);
            a.href = "https://tickets.gotransit.com/en-us/book?type=p2p&ticket_adult=1&start_address="+json.Trips.Trip[0].Stops.Stop[0].Code+"&end_address="+destination+"&utm_source=google&utm_campaign=GoTransitSEM&utm_medium=sem_paid";
            a.target = "_blank";
            a.className = "black";
            val.appendChild(a);

            let val2 = document.getElementById("adultDay");
            val2.innerHTML = "";
            let a2 = document.createElement("a");
            a2.innerHTML = "$"+details.AllFares.FareCategory[0].Tickets[0].Fares[1].Amount.toFixed(2);
            a2.href = "https://tickets.gotransit.com/en-us/book?type=p2p&mode=round_trip&ticket_adult=1&start_address="+json.Trips.Trip[0].Stops.Stop[0].Code+"&end_address="+destination+"&utm_source=google&utm_campaign=GoTransitSEM&utm_medium=sem_paid";
            a2.target = "_blank";
            a2.className = "black";
            val2.appendChild(a2);

            let val3 = document.getElementById("adultPresto");
            val3.innerHTML = "";
            let a3 = document.createElement("a");
            a3.innerHTML = "$"+details.AllFares.FareCategory[0].Tickets[1].Fares[0].Amount.toFixed(2);
            a3.href = "https://prestocard.ca/en/about/get-a-presto-card";
            a3.target = "_blank";
            a3.className = "black";
            val3.appendChild(a3);

            let val4 = document.getElementById("studentSingle");
            val4.innerHTML = "";
            let a4 = document.createElement("a");
            a4.innerHTML = "$"+details.AllFares.FareCategory[1].Tickets[0].Fares[0].Amount.toFixed(2);
            a4.href = "https://tickets.gotransit.com/en-us/book?type=p2p&ticket_adult=1&start_address="+json.Trips.Trip[0].Stops.Stop[0].Code+"&end_address="+destination+"&utm_source=google&utm_campaign=GoTransitSEM&utm_medium=sem_paid";
            a4.target = "_blank";
            a4.className = "black";
            val4.appendChild(a4);

            let val5 = document.getElementById("studentDay");
            val5.innerHTML = "";
            let a5 = document.createElement("a");
            a5.innerHTML = "$"+details.AllFares.FareCategory[1].Tickets[0].Fares[1].Amount.toFixed(2);
            a5.href = "https://tickets.gotransit.com/en-us/book?type=p2p&mode=round_trip&ticket_adult=1&start_address="+json.Trips.Trip[0].Stops.Stop[0].Code+"&end_address="+destination+"&utm_source=google&utm_campaign=GoTransitSEM&utm_medium=sem_paid";
            a5.target = "_blank";
            a5.className = "black";
            val5.appendChild(a5);

            let val6 = document.getElementById("studentPresto");
            val6.innerHTML = "";
            let a6 = document.createElement("a");
            a6.innerHTML = "$"+details.AllFares.FareCategory[1].Tickets[1].Fares[0].Amount.toFixed(2);
            a6.href = "https://prestocard.ca/en/about/get-a-presto-card";
            a6.target = "_blank";
            a6.className = "black";
            val6.appendChild(a6);

            let val7 = document.getElementById("seniorSingle");
            val7.innerHTML = "";
            let a7 = document.createElement("a");
            a7.innerHTML = "$"+details.AllFares.FareCategory[2].Tickets[0].Fares[0].Amount.toFixed(2);
            a7.href = "https://tickets.gotransit.com/en-us/book?type=p2p&ticket_senior=1&start_address="+json.Trips.Trip[0].Stops.Stop[0].Code+"&end_address="+destination+"&utm_source=google&utm_campaign=GoTransitSEM&utm_medium=sem_paid";
            a7.target = "_blank";
            a7.className = "black";
            val7.appendChild(a7);

            let val8 = document.getElementById("seniorDay");
            val8.innerHTML = "";
            let a8 = document.createElement("a");
            a8.innerHTML = "$"+details.AllFares.FareCategory[2].Tickets[0].Fares[1].Amount.toFixed(2);
            a8.href = "https://tickets.gotransit.com/en-us/book?type=p2p&mode=round_trip&ticket_senior=1&start_address="+json.Trips.Trip[0].Stops.Stop[0].Code+"&end_address="+destination+"&utm_source=google&utm_campaign=GoTransitSEM&utm_medium=sem_paid";
            a8.target = "_blank";
            a8.className = "black";
            val8.appendChild(a8);

            let val9 = document.getElementById("seniorPresto");
            val9.innerHTML = "";
            let a9 = document.createElement("a");
            a9.innerHTML = "$"+details.AllFares.FareCategory[2].Tickets[1].Fares[0].Amount.toFixed(2);
            a9.href = "https://prestocard.ca/en/about/get-a-presto-card";
            a9.target = "_blank";
            a9.className = "black";
            val9.appendChild(a9);

            document.getElementById("childSingle").innerHTML = "$"+details.AllFares.FareCategory[3].Tickets[0].Fares[0].Amount.toFixed(2);
            document.getElementById("childDay").innerHTML = "$"+details.AllFares.FareCategory[3].Tickets[0].Fares[1].Amount.toFixed(2);
            document.getElementById("childPresto").innerHTML = "$"+details.AllFares.FareCategory[3].Tickets[1].Fares[0].Amount.toFixed(2);

            let val1 = document.getElementById("group");
            val1.innerHTML = "";
            let a1 = document.createElement("a");
            a1.innerHTML = "$30.00-$60.00";
            a1.href = "https://tickets.gotransit.com/en-us/?utm_source=google&utm_campaign=GoTransitSEM&utm_medium=sem_paid";
            a1.target = "_blank";
            a1.className = "black";
            val1.appendChild(a1);
        });

        return (
            <>
            <h3><i class="fa-solid fa-stopwatch"></i> {duration}</h3>
            <div class="btn-group">
            <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa-solid fa-dollar-sign"></i>
            </button>
            <div class="dropdown-menu">
                <table>
                    <tbody style={{textAlign: "center"}}>
                        <tr>
                            <td colSpan={4} >Estimate Fare Prices</td>
                        </tr>
                        <tr>
                            <td>
                                <b></b>
                            </td>
                            <td>
                                <b>Single</b>
                            </td>
                            <td>
                                <b>Day</b>
                            </td>
                            <td>
                                <b>Presto</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Adult</b>
                            </td>
                            <td className="faretd" id="adultSingle">
                                $0.00
                            </td>
                            <td className="faretd" id="adultDay">
                                $0.00
                            </td>
                            <td className="faretd" id="adultPresto">
                                $0.00
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Student</b>
                            </td>
                            <td className="faretd" id="studentSingle">
                                $0.00
                            </td>
                            <td className="faretd" id="studentDay">
                                $0.00
                            </td>
                            <td className="faretd" id="studentPresto">
                                $0.00
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Senior</b>
                            </td>
                            <td className="faretd" id="seniorSingle">
                                $0.00
                            </td>
                            <td className="faretd" id="seniorDay">
                                $0.00
                            </td>
                            <td className="faretd" id="seniorPresto">
                                $0.00
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Child</b>
                            </td>
                            <td className="faretd" id="childSingle">
                                $0.00
                            </td>
                            <td className="faretd" id="childDay">
                                $0.00
                            </td>
                            <td className="faretd" id="childPresto">
                                $0.00
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td colSpan={2}>
                                <b>Group Pass</b>
                            </td>
                            <td className="faretd" id="group" colSpan={2}>
                                $0.00
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            </>
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
                invoke("get_stop_details", {stop: code}).then((stopDetails) => {
                    let details = JSON.parse(stopDetails);
            
                    let dest = document.getElementById("destination");
                    dest.innerHTML = details.Stop.StopName + " | " + details.Stop.Code;
            
                    let start = document.getElementById(details.Stop.Code+"stop");
                    start.innerHTML = details.Stop.StopName;
                });
                return <><hr/><table><tbody><td className="bigTDl"><i class="fa-solid fa-location-dot"></i> Arrived</td><td className="bigTD"><i class="fa-solid fa-map-pin"></i> <a href="#popup1" id={code+"stop"} onClick={() => GetStationDetails(code)}>{code}</a></td><td className="bigTDr">{time}</td></tbody></table></>
            }
            else
            {
                invoke("get_stop_details", {stop: code}).then((stopDetails) => {
                    let details = JSON.parse(stopDetails);
                      
                    let start = document.getElementById(details.Stop.Code+"stop");
                    start.innerHTML = details.Stop.StopName;
                });
                return <><hr/><table><tbody><td className="bigTDl"><i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i> Exit <TransitName type={Type}/></td><td className="bigTD"><i class="fa-solid fa-map-pin"></i> <a href="#popup1" id={code+"stop"} onClick={() => GetStationDetails(code)}>{code}</a></td><td className="bigTDr">{time}</td></tbody></table></>
            }
        }

        function TransitIcon({type})
        {
            if (type == "B")
            {
                return <i className="fa-solid fa-bus lightgreen"></i>
            }
            else
            {
                return <i className="fa-solid fa-train lightgreen"></i>
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
                <p className="secondary"><strong>Line:</strong> {trip.Line} - {trip.Direction}</p>
                <table><tbody><td className="bigTDl"><TransitIcon type={trip.Type}/> Board <TransitName type={trip.Type}/></td><td className="bigTD"> <i class="fa-solid fa-map-pin"></i> <a href="#popup1" id={trip.Stops.Stop[0].Code} onClick={() => GetStationDetails(trip.Stops.Stop[0].Code)}>{trip.Stops.Stop[0].Code}</a></td><td className="bigTDr">{moment(trip.Stops.Stop[0].Time, 'hh:mm a').format('hh:mm a')}</td></tbody></table><hr/>
                {stops.map(function(obj) {
                return (
                    <StopDetails stop={obj} number={trip.Number}/>
                );
                })}
                <ArriveIcon code={trip.Stops.Stop[trip.Stops.Stop.length-1].Code} last={last} time={moment(trip.Stops.Stop[trip.Stops.Stop.length-1].Time, 'hh:mm a').format('hh:mm a')} Type={trip.Type}/> 
            </div>
        )
    }

    function StopDetails({stop, number})
    {   
        invoke("get_stop_details", {stop: stop.Code}).then((stopDetails) => {
            let details = JSON.parse(stopDetails);
  
            let start = document.getElementById(details.Stop.Code);
            start.innerHTML = details.Stop.StopName + " | " + details.Stop.Code;

            invoke("get_train_exceptions").then((trainExceptions) => {
                trainExceptions = JSON.parse(trainExceptions);
                invoke("get_bus_exceptions").then((busExceptions) => {
                    busExceptions = JSON.parse(busExceptions);
                    for (let i = 0; i < trainExceptions.Trip.length; i++)
                    {
                        if (trainExceptions.Trip[i].TripNumber == number)
                        {
                            for (let j = 0; j < trainExceptions.Trip[i].Stop.length; j++)
                            {
                                if (trainExceptions.Trip[i].Stop[j].Code == stop.Code)
                                {
                                    if (trainExceptions.Trip[i].Stop[j].IsCancelled == "1")
                                    {
                                        start.innerHTML = '<strong class="frontRed" ><i class="fa-solid fa-triangle-exclamation"></i> CANCELED</strong>';
                                    }
                                }
                            }
                        }
                    }

                    for (let i = 0; i < busExceptions.Trip.length; i++)
                    {
                        if (busExceptions.Trip[i].TripNumber == number)
                        {
                            for (let j = 0; j < busExceptions.Trip[i].Stop.length; j++)
                            {
                                if (busExceptions.Trip[i].Stop[j].Code == stop.Code)
                                {
                                    if (busExceptions.Trip[i].Stop[j].IsCancelled == "1")
                                    {
                                        start.innerHTML = '<strong class="frontRed" ><i class="fa-solid fa-triangle-exclamation"></i> CANCELED</strong>';
                                    }
                                }
                            }
                        }
                    }
                })
            })
        });
        return (
            <p className="secondary" id={"p_"+stop.code}><i class="fa-solid fa-map-pin"></i> <a  id={stop.Code} href="#popup1" onClick={() => GetStationDetails(stop.Code)}>{stop.Code}</a> - {moment(stop.Time, 'hh:mm a').format('hh:mm a')}</p>
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
            

            invoke("get_stop_details", {stop: json.TransferLinks.Link[id].FromStopCode}).then((stopDetails) => {
                let details = JSON.parse(stopDetails);
        
                let start = document.getElementById(details.Stop.Code+"transfer1");
                start.innerHTML = details.Stop.StopName;
            });
            invoke("get_stop_details", {stop: json.TransferLinks.Link[id].FromStopCode}).then((stopDetails) => {
                let details = JSON.parse(stopDetails);
        
                let start = document.getElementById(details.Stop.Code+"transfer2");
                start.innerHTML = details.Stop.StopName;
            });

            return (
                <div className="trips">
                    <table>
                        <tbody>
                            <td><p className="secondary">TRANSFER</p></td>
                            <td><p className="secondary" style={{textAlign: "center"}}><a id={json.TransferLinks.Link[id].FromStopCode + "transfer1"} href="#popup1" onClick={() => GetStationDetails(json.TransferLinks.Link[id].FromStopCode)}>{json.TransferLinks.Link[id].FromStopCode}</a> <i className="fa-solid fa-person-walking-arrow-right"></i> <a  id={json.TransferLinks.Link[id].ToStopCode + "transfer2"} href="#popup1" onClick={() => GetStationDetails(json.TransferLinks.Link[id].ToStopCode)}>{json.TransferLinks.Link[id].ToStopCode}</a></p></td>
                            <td><p className="secondary" style={{textAlign: "right"}}><i className="fa-solid fa-stopwatch"></i> {out}</p></td>
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
                                            <TripInfo />
                                        </tr>
                                    </tbody>
                                </table>
                            <br/>
                            </div>
                        </td>
                        <td className="mapRight" id="map"></td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    );
}

export default TripDetails;