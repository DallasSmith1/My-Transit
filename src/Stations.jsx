import "./Stations.css";


async function search() {
    if (document.getElementById('searchInput') != null)
    {
        const [data, setData] = useState("");

        setData(await invoke("getDestinations"));
    }
}

function Stations()
{
    return (
    <div className="container">
        <h1>Station Search</h1>

        <div className="search-container">
            <input type="text" id="searchInput" placeholder="Search for destinations..."/>
            <button onClick={search}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
        </div>

        <div className="results" id="results">
        <div class="ag-format-container">
                <div class="ag-courses_item">
                <a href="#" class="ag-courses-item_link">
                    <div class="ag-courses-item_bg"></div>

                    <div class="ag-courses-item_title">
                    Ajax Go
                    </div>

                    <div class="ag-courses-item_date-box">
                    Type:&ensp;
                    <span class="ag-courses-item_date">
                    <i class="fa-solid fa-train" style={{color: "white"}}></i>&ensp;<i class="fa-solid fa-bus" style={{color: "white"}}></i>
                    </span>
                    </div>
                </a>
            </div>
            </div>
        </div>
    </div>
    );
}



export default Stations;