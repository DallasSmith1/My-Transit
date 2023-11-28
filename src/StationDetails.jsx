import "./StationDetails.css";
import { useHistory } from "react-router-dom";

function StationDetails({json})
{
    const navigate = useHistory();
    let obj = JSON.parse(json);

    function Type()
    {
        if (obj.Stop.IsBus && obj.Stop.IsTrain)
        {
            return (<><strong><i class="fa-solid fa-train"></i> <i class="fa-solid fa-bus"></i></strong></>);
        }
        else if (obj.Stop.IsBus)
        {
            return (<strong><i class="fa-solid fa-bus"></i></strong>);
        }
        else if (obj.Stop.IsTrain) {
            return (<strong><i class="fa-solid fa-train"></i></strong>);
        }
    }

    function Map()
    {
        let mapSrc = "https://maps.google.com/maps?q="+obj.Stop.Latitude+", "+obj.Stop.Longitude+"&output=embed";
        return (
            <iframe width="100%" height="400" src={mapSrc}></iframe>
        )
    }

    function Location() {
        return (
            <ul>
                <li><strong>City: </strong>{obj.Stop.City}</li>
                <li><strong>Address:</strong> {obj.Stop.StreetNumber} {obj.Stop.StreetName}</li>
                <li><strong>Intersection: </strong>{obj.Stop.Intersection}</li>
            </ul>
        );
    }

    function TicketSales()
    {
        if (obj.Stop.TicketSales != "" && obj.Stop.TicketSales != null)
        {
            let dates = obj.Stop.TicketSales;
            return (<><br/><strong><i class="fa-solid fa-ticket"></i> Ticket Sale Hours:</strong><p>{dates}</p></>);
        }
    }

    function BoardingInfo()
    {
        if (obj.Stop.BoardingInfo != "" && obj.Stop.BoardingInfo != null)
        {
            let boarding = obj.Stop.BoardingInfo;
            boarding = boarding.replace("\tBus Platforms:\n", "");
            boarding = boarding.replace("\n", "\n\n");
            return (<><br/><strong><i class="fa-solid fa-bus"></i> Boarding Information:</strong><p>{boarding}</p></>);
        }
    }

    function AdditionalInformation()
    {
        if (obj.Stop.Facilities.length > 0 || obj.Stop.Parkings.length > 0)
        {
            return (
                <table>
                    <tbody>
                        <td>
                            <Facilities/>
                        </td>
                        <td>
                            <Parking />
                        </td>
                    </tbody>
                </table>
            )
        }
    }

    function Facilities()
    {
        if (obj.Stop.Facilities.length > 0)
        {
            let list = "";
            for (let i = 0; i < obj.Stop.Facilities.length; i++)
            {
                list += obj.Stop.Facilities[i].Description + "\n";
            }
            return (
                <div className="info">
                    <h2 style={{textAlign: "center"}}>Facilities</h2>
                    <p style={{textAlign: "center"}}>{list}</p>
                </div>
            )
        }
    }

    function Parking()
    {
        if (obj.Stop.Parkings.length > 0)
        {
            let list = "";
            for (let i = 0; i < obj.Stop.Parkings.length; i++)
            {
                list += obj.Stop.Parkings[i].Name + ": " + obj.Stop.Parkings[i].ParkSpots + "\n";
            }
            return (
                <div className="info">
                    <h2 style={{textAlign: "center"}}><i class="fa-solid fa-square-parking"></i> Parking</h2>
                    <p style={{textAlign: "center"}}>{list}</p>
                </div>
            )
        }
    }


    return (
        <div>
            <br/>
            <table>
                <tbody>
                    <tr style={{textAlign: 'left'}}>
                        <button onClick={function() {
                            navigate.goBack();
                        }}>
                            <i className="fa-solid fa-chevron-left"></i> Back
                        </button>
                    </tr>
                    <tr>
                        <h1>{obj.Stop.StopName}</h1>
                        <address>
                            <Type />
                        </address>

                        <div className="facilities">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Location />
                                            <TicketSales />
                                            <BoardingInfo />
                                        </td>
                                        <td style={{width: "50%"}}>
                                            <Map/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <AdditionalInformation />
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default StationDetails;