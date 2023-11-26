import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import "./StationDetails.css";
import { invoke } from "@tauri-apps/api/tauri";

function StationDetails()
{
    // parses the JSON string that was stored into local storage in the Stations.jsx
    let passvars = document.cookie.split("; ").find(row => row.startsWith("pass"));
    passvars = passvars.replace("pass=","");
    let params = new URLSearchParams(passvars);
    let json = params.get("JSON");
    let obj = JSON.parse(json);
    let object = JSON.parse(obj)
    
    // const { json } = useParams();
    // let obj = JSON.parse(json);
    // replace "<h1>{obj}</h1>" with "<h1>{obj.Stop.StopName}</h1>" to test it
    
    let mapSrc = "https://maps.google.com/maps?q="+object.Stop.Place.Latitude+", "+object.Stop.Place.Longitude+"&output=embed";
    return (
        <div>
            <br/>
            <div style={{alignContent: 'left'}}>
            <button className="button">
                <span className="button-text">Back</span>
                <div className="fill-container"></div>
            </button>
            </div>
            <h1>{object.Stop.StopName}</h1>
            <address>
                <strong>Code: {object.Stop.Code}</strong>
            </address>

            <div className="facilities">
            <table>
                <tbody>
                    <tr>
                        <td>
                        <ul>
                            <li><strong>Address:</strong> {object.Stop.StreetNumber} {object.Stop.StreetName}</li>
                            <li><strong>City: </strong>{object.Stop.City}</li>
                            <li><strong>Intersection: </strong>{object.Stop.Intersection}</li>
                            <li><strong>Directions: </strong>{object.Stop.DrivingDirections}</li>
                        </ul>
                        </td>
                        <td>
                        <iframe width="100%" height="400" src={mapSrc}></iframe>
                        </td>
                    </tr>
                </tbody>
            </table>
                
            </div>

            <div className="info">
                <h2>Additional Information</h2>
                <p>This train station serves as a major transportation hub connecting various destinations. It provides a range of facilities and services to ensure a comfortable travel experience for passengers.</p>
            </div>
        </div>
    );
}

export default StationDetails;