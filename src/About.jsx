import { Link } from "react-router-dom";
import "./About.css";

function About()
{//"C:\Users\dalla\Downloads\logo (1).png"
    return (
        <>
        <h1>My Transit</h1>
        <p>
            Welcome to My Transit, your ultimate companion for seamless travel on Go Transit! This application is designed to enhance your commuting experience. Whether you're a daily commuter or an occasional traveler, our application is tailored to meet all your Go Transit needs.
        </p>
        <h3>Track Go Transit Trains and Buses</h3>
        <p>
            Stay on top of your journey by effortlessly tracking Go Transit trains and buses in real-time. The application provides live updates, ensuring that you are always informed about the current status and location of your transit options.
            <br/>
            <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseTrack" aria-expanded="false" aria-controls="collapseExample">
            <i class="fa-solid fa-square-caret-down"></i>
            </button>
            <div class="collapse" id="collapseTrack">
            <div class="facilities" style={{textAlign: "center"}}>
                <p>
                    On your <Link to="./" className="aboutPage">Dashboard</Link> (which only displays when a trip is saved and selected), there will be a card displaying your saved trip's information:
                </p>
                <img src="https://i.imgur.com/xw8jvgX.png" alt="Green Dashboard Card" className="aboutImage"/>
                <ol>
                    <li>
                        <p>
                            <h5>Live Indicator</h5>
                            The live indicator is a pulsing circle that indicates when your trip is coming close to departure and your train/bus has connected to the system. This usually starts about an hour prior to departure.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Trip Title</h5>
                            The trip title will display the departure location/stop name of your trip, and an arrow pointing to the location/stop you are arriving too. 
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Status</h5>
                            The status bar displays the status of the train, whether its On Time, Delayed, Departed, or Canceled as shown below:
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="onTime-tab" data-toggle="tab" href="#onTime" role="tab" aria-controls="onTime" aria-selected="true">On Time</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="delayed-tab" data-toggle="tab" href="#delayed" role="tab" aria-controls="delayed" aria-selected="false">Delayed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="departed-tab" data-toggle="tab" href="#departed" role="tab" aria-controls="departed" aria-selected="false">Departed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="canceled-tab" data-toggle="tab" href="#canceled" role="tab" aria-controls="canceled" aria-selected="false">Canceled</a>
                            </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="onTime" role="tabpanel" aria-labelledby="home-tab"><img src="https://i.imgur.com/AeN0LQ0.png" alt="Green On Time Card" className="aboutImage"/></div>
                                <div class="tab-pane fade" id="delayed" role="tabpanel" aria-labelledby="profile-tab"><img src="https://i.imgur.com/uiFwXzr.png" alt="Green Delayed Card" className="aboutImage"/></div>
                                <div class="tab-pane fade" id="departed" role="tabpanel" aria-labelledby="contact-tab"><img src="https://i.imgur.com/diJPo6l.png" alt="Green Departed Card" className="aboutImage"/></div>
                                <div class="tab-pane fade" id="canceled" role="tabpanel" aria-labelledby="contact-tab"><img src="https://i.imgur.com/ripusUc.png" alt="Green Canceled Card" className="aboutImage"/></div>
                            </div>
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Information</h5>
                            The information box will provide information regarding the departure of the trip. It displays the schedueled departure time and the actual (computed) departure time
                            based on the location of the train. It also displays the Platform the train is scheduled to arrive on, and the displayed trip name that would be displayed on the train or bus and at the stations/stops.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Updates</h5>
                            The updates box will display any updates with the scheduled trip such as canceled stops, construction, or any alerts that may be convenient to know. All updates displayed will also be available on the <Link to="./alerts" className="aboutPage">Alerts page</Link>.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Reload Bar</h5>
                            The reload bar is an indicator to indicate when the information is updated next. Every time the bar is filled, all the information on the dashboard is updated with real tile information.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Tracker</h5>
                            The tracker window displays the exact location of the train or bus that will be picking you up.
                        </p>
                    </li>
                </ol>
                <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseTrack" aria-expanded="false" aria-controls="collapseExample">
                Collapse
                </button>
            </div>
            </div>
        </p>
        <h3>Search Scheduled Trips</h3>
        <p>
            Planning your next trip is a breeze with our user-friendly search functionality. Easily find and explore scheduled trips, allowing you to plan your travels with confidence and convenience.
            <br/>
            <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseSearch" aria-expanded="false" aria-controls="collapseExample">
            <i class="fa-solid fa-square-caret-down"></i>
            </button>
            <div class="collapse" id="collapseSearch">
            <div class="facilities" style={{textAlign: "center"}}>
                <p>
                    Head over to the <Link to="./schedule" className="aboutPage">Schedules page</Link> to search for any train or bus trips. You will be prompted to provide details and filters when searching:
                </p>
                <img src="https://i.imgur.com/hGZBVyA.png" alt="Search Scheduled Trips Image" className="aboutImage"/>
                <ol>
                    <li>
                        <p>
                            <h5>Details</h5>
                            You will be prompted to provide details so the application can search for the right trips to fit your needs. It will ask for a date and time you will be departing (departing from the train station/bus stop).
                            It also asks for the station/stop you are going to depart from, and arrive too. If you are unsure what the exact name of the station/stop is, it has a drop down feature that displays all stations/stops.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Filters</h5>
                            The search allows basic filters. The filters are: Trains Only, Buses Only, or Both. When using the filters, it only shows trips that are relatively close to the departure time. (If there is a bus trip 5 hours later than your departure time, it will not show)
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Results</h5>
                            Here are the results of your search. It will provide up to 5 results for each search and display the trips from earliest/shortest to latest/longest. The restuls display the time of departure, the number of transfers, and the time of arrival. 
                            If you wish to see further details click on the trip you want the details of.
                        </p>
                    </li>
                </ol>
                <p>
                    After clicking on a trip, further details of the trip will then be displayed providing more information: 
                </p>
                <img src="https://i.imgur.com/Lrv9gBj.png" alt="Trip Details Image" className="aboutImage"/>
                <ol>
                    <li>
                        <p>
                            <h5>Details</h5>
                            The details in the trip details page shows the departure stop, and the arrival stop for the trip, along with the total length of the trip.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Trip Information</h5>
                            The trip information displays all information about the trip including the departing stop, every stop, every transfer, and the arrival stop too.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Stops</h5>
                            All the trips stops between the departure and arrival will appear here along with the time of arrival for each.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Stop Location</h5>
                            The stop location is available for any stop/station listed on screen. Any station or stop you see in the trip info, you can click it which will display the location of that stop in the map view.
                        </p>
                    </li>
                </ol>
                <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseSearch" aria-expanded="false" aria-controls="collapseExample">
                Collapse
                </button>
            </div>
            </div>
        </p>
        <h3>Save Trips for Later and Quicker Use</h3>
        <p>
            Save your favorite or frequently used trips for quick and easy access. Our application allows you to create a personalized list of saved trips, streamlining your daily commute or regular journeys.
            <br/>
            <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseSave" aria-expanded="false" aria-controls="collapseExample">
            <i class="fa-solid fa-square-caret-down"></i>
            </button>
            <div class="collapse" id="collapseSave">
            <div class="facilities" style={{textAlign: "center"}}>
                <p>
                    On the trip details page, which you can access after searching for a trip on the <Link to="./schedule" className="aboutPage">Schedules page</Link>, you can click the save trip button save the trip:
                </p>
                <img src="https://i.imgur.com/S23Q8S5.png" alt="Save Trip Image" className="aboutImage"/>
                <ol>
                    <li>
                        <p>
                            <h5>Save Trip</h5>
                            The save trip button will save the currently displayed trip into your saved trip list.
                        </p>
                    </li>
                </ol>
                <p>
                    After saving a trip, you will be redirected to your <Link to="./presets" className="aboutPage">Saved Trips page</Link> to display all your saved trips in grey cards:
                </p>
                <img src="https://i.imgur.com/Bv3466O.png" alt="Presets Image" className="aboutImage"/>
                <ol>
                    <li>
                        <p>
                            <h5>Saved Trips</h5>
                            The middle column will display all your saved trips where you can select as the main trip, which is selecting what trip will be tracked on the dashboard, or delete a saved trip from your list.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>View Trip</h5>
                            You can click on any of the saved trips without having to select them to see better details to tell which trip is which, doing this will turn the card blue.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Selecting A Trip</h5>
                            After selecting a trip, it will turn green indicating it's been selected, and will begin to display the trip info in the ticket (preview 5), and the map view (preview 4).
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Map View</h5>
                            The map view will display the location the departure station/stop of the selected trip.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Ticket</h5>
                            The ticket displays details about the saved trip in the form of a ticket. It displays the departure and arrival stops and times, along with the duration, transfers, and wait time of the total trip.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>More Details</h5>
                            The show more button will take you back to the trip details page showing all information about the trip.
                        </p>
                    </li>
                </ol>
                <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseSave" aria-expanded="false" aria-controls="collapseExample">
                Collapse
                </button>
            </div>
            </div>
        </p>
        <h3>In-Depth Details about Bus Stops and Train Stations</h3>
        <p>
            Get to know your transit stops like never before. Our application offers in-depth details about bus stops and train stations, providing you with valuable information on amenities, accessibility, and available parking.
            <br/>
            <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseDetails" aria-expanded="false" aria-controls="collapseExample">
            <i class="fa-solid fa-square-caret-down"></i>
            </button>
            <div class="collapse" id="collapseDetails">
            <div class="facilities" style={{textAlign: "center"}}>
                <p>
                    Head over to the <Link to="./stations" className="aboutPage">Stations page</Link> to search for any station or stop:
                </p>
                <img src="https://i.imgur.com/VPGRpCm.png" alt="Station Image" className="aboutImage"/>
                <ol>
                    <li>
                        <p>
                            <h5>Station Search</h5>
                            In the text field, you can type in any station or stop, if you don't know the exact name, it has a drop down menu too with all stops and stations. After finding the desired station or stop, click details to display them.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Service Type</h5>
                            This will display either a train, bus, or both indicating what srvices come through this station or stop.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Details</h5>
                            This details box will provide all the information about the stop. It provides the name, address, and the intersection. It offers the times the stop is open to sell tickets, and boarding information for buses.
                            The map view will display the location of the stop for easier navigation.
                        </p>
                    </li>
                </ol>
                <p>
                    Below the Details box, there will be extra information provided if available:
                </p>
                <img src="https://i.imgur.com/8lBwyJ3.png" alt="Station Image" className="aboutImage"/>
                <ol>
                    <li>
                        <p>
                            <h5>Notice</h5>
                            If there is an alert (which would also be displayed on the <Link to="./alerts" className="aboutPage">Alerts page</Link>) that is connected to this stop, it will be displayed here. 
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Facilities</h5>
                            This section will list all facilities that are available at this stop.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Parking</h5>
                            This will show all parking options available at this stop.
                        </p>
                    </li>
                </ol>
                <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseDetails" aria-expanded="false" aria-controls="collapseExample">
                Collapse
                </button>
            </div>
            </div>
        </p>
        <h3>Fare Costs</h3>
        <p>
            Say goodbye to surprises with our fare estimation feature. Quickly and accurately estimate the cost of your trip, and be redirected to buy your ticket in one click. 
            <br/>
            <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseCosts" aria-expanded="false" aria-controls="collapseExample">
            <i class="fa-solid fa-square-caret-down"></i>
            </button>
            <div class="collapse" id="collapseCosts">
            <div class="facilities" style={{textAlign: "center"}}>
                <p>
                    When viewing a trip on the trip details page, you should see a cost button:
                </p>
                <img src="https://i.imgur.com/JyDRW9F.png" alt="Fares Image" className="aboutImage"/>
                <ol>
                    <li>
                        <p>
                            <h5>Cost Button</h5>
                            The cost button will open a menu (preview 2) displaying all costs.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Cost Menu</h5>
                            The cost meny will display the cost of a 1 way, round, and presto trips for adult, student, senior, and child prices, along with an estimate group pass price.
                        </p>
                    </li>
                </ol>
                <p>
                    You can click on any of the prices, and it will redirect you to the Go Transit website to purchase that exact ticket:
                </p>
                <img src="https://i.imgur.com/wUv3kVN.png" alt="Go Transit Image" className="aboutImage"/>
                <p></p>
                <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseCosts" aria-expanded="false" aria-controls="collapseExample">
                    Collapse
                </button>
            </div>
            </div>
        </p>
        <h3>View Alerts</h3>
        <p>
            Stay informed about any disruptions or changes to your travel plans. Receive alerts related to specific bus or train trips, as well as general Go Transit alerts, ensuring you're always in the loop.
            <br/>
            <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseAlerts" aria-expanded="false" aria-controls="collapseExample">
            <i class="fa-solid fa-square-caret-down"></i>
            </button>
            <div class="collapse" id="collapseAlerts">
            <div class="facilities" style={{textAlign: "center"}}>
                <p>
                    Head over to the <Link to="./alerts" className="aboutPage">Alerts page</Link> to view all the alerts:
                </p>
                <img src="https://i.imgur.com/qZHj4Ok.png" alt="Alerts Image" className="aboutImage"/>
                <ol>
                    <li>
                        <p>
                            <h5>Alert</h5>
                            This page will list all current alerts with Go Transit. 
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>More Details</h5>
                            You can click on any alert to drop down a description offering further details about the alert.
                        </p>
                    </li>
                    <li>
                        <p>
                            <h5>Alert Bar</h5>
                            The alert bar is seen across the entire app, displaying all the alerts listed here.
                        </p>
                    </li>
                </ol>
                <button class="btn btn-success" type="button" data-toggle="collapse" data-target="#collapseAlerts" aria-expanded="false" aria-controls="collapseExample">
                    Collapse
                </button>
            </div>
            </div>
        </p>
        </>
    );
}

function DropDown(id)
{
    let div = document.getElementById(id);
    console.log(div);
    if(div != null)
    {
        if (div.style.display === "block") {
            div.style.display = "none";
        } else {
            div.style.display = "block";
        }
    }
}

export default About;