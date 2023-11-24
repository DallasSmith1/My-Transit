import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import "./StationDetails.css";
import { invoke } from "@tauri-apps/api/tauri";

function StationDetails()
{
    let mapSrc = "https://maps.google.com/maps?q=43.8477020, -79.0415600&output=embed";

    // parses the JSON string that was stored into local storage in the Stations.jsx page
    let obj = JSON.parse(localStorage.getItem("stopJSON"));

    // replace "<h1>{obj}</h1>" with "<h1>{obj.Stop.StopName}</h1>" to test it
    return (
        <div>
            <br/>
            <h1>{obj}</h1>
            <address>
                <strong>Code:</strong>
            </address>

            <div className="facilities">
            <table>
                <tbody>
                    <tr>
                        <td>
                        <ul>
                            <li><strong>Address:</strong> [StreetNumber] [StreetName]</li>
                            <li><strong>City: </strong>[City]</li>
                            <li><strong>Intersection: </strong>[Intersection]</li>
                            <li><strong>Directions: </strong>[DrivingDirections]</li>
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