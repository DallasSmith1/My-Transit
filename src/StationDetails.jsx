import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./StationDetails.css";
import { invoke } from "@tauri-apps/api/tauri";

function StationDetails()
{
    const {id} = useParams();

    //let data = await invoke("get_stop_details", {id});

    //let obj = JSON.parse(data);



    return (
        <div>
            <br/>
            <h1>[StopName]</h1>

            <address>
                <strong>Address:</strong> [StreetNumber] [StreetName]
            </address>
            <address>
                <strong>Code:</strong> {id}
            </address>

            <div className="facilities">
            <table>
            <tr>
                <th colSpan="2">Location</th>
            </tr>
            <tr>
                <td>
                <ul>
                    <li><strong>City: </strong>[City]</li>
                    <li><strong>Intersection: </strong>[Intersection]</li>
                    <li><strong>Directions: </strong>[DrivingDirections]</li>
                </ul>
                </td>
                <td>
                    
                </td>
            </tr>
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