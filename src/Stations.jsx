import "./Stations.css";

function search() {
    if (document.getElementById('searchInput') != null)
    {
        // In a real application, you would perform an AJAX request here to fetch search results
        // For demonstration purposes, let's use some dummy data
        const destinations = ['Paris', 'Tokyo', 'New York', 'London', 'Sydney'];
    
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.toLowerCase();
        const resultsContainer = document.getElementById('results');
    
        // Clear previous results
        resultsContainer.innerHTML = '';
    
        // Filter destinations based on the search term
        const filteredDestinations = destinations.filter(destination =>
            destination.toLowerCase().includes(searchTerm)
        );
    
        // Display results
        filteredDestinations.forEach(destination => {
            const destinationItem = document.createElement('div');
            destinationItem.classList.add('destination-item');
            destinationItem.textContent = destination;
            resultsContainer.appendChild(destinationItem);
        });
    }
}

function Stations()
{
    return (
    <div className="container">
        <h1>Station Search</h1>

        <div className="search-container">
            <input type="text" id="searchInput" placeholder="Search for destinations..."/>
            <button onclick={search()}>Search</button>
        </div>

        <div className="results" id="results">
        </div>
    </div>
    );
}



export default Stations;