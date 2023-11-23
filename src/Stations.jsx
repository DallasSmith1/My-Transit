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
        </div>
    </div>
    );
}



export default Stations;