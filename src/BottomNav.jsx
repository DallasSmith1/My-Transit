import "./BottomNav.css";
import { invoke } from "@tauri-apps/api/tauri";

function BottomNav()
{
    invoke("get_alerts").then((alerts) => {
        alerts = JSON.parse(alerts);

        let text = document.getElementById("scroll-text");

        text.innerHTML = "";

        let numCharacters = 0;
        
        for (let i = 0; i < alerts.entity.length; i++)
        {
            if (alerts.entity[i].alert.informed_entity[0].stop_id != "")
            {
                invoke("get_stop_details", {stop: alerts.entity[i].alert.informed_entity[0].stop_id}).then((stopDetails) => {
                    stopDetails = JSON.parse(stopDetails);
                    let alertText = document.getElementById("scroll-text");
                    alertText.innerHTML = alertText.innerHTML + " | " + alerts.entity[i].alert.header_text.translation[0].text + " at " + stopDetails.Stop.StopName;

                    const scrollText = document.getElementById('scroll-text');
                    const animationDuration = (scrollText.scrollWidth / scrollText.clientWidth) * 100; // Adjust multiplier as needed
                    scrollText.style.setProperty('--animation-duration', animationDuration + 's');
                    // Get the elements
                    let sliderContent = document.getElementById('scroll-text');

                    let duration = (scrollText.scrollWidth + scrollText.clientWidth) / 100; // Adjust the factor as needed
                
                    // Apply the dynamic duration to the animation
                    sliderContent.style.animationDuration = `${duration}s`;
                });
            }
            else
            {
                let alertText2 = document.getElementById("scroll-text");
                alertText2.innerHTML = alertText2.innerHTML + " | " + alerts.entity[i].alert.header_text.translation[0].text;
            }
        }
    });


    return (
        <>
        <br/>
        <br/>
        <br/>
        <nav className="navbar foxed-bottom navbar-dark bg-dark bringFront" style={{position: "fixed", overflow: "hidden", bottom: 0,width: '100%', left: 0}}>
            <span className="navbar-text">
                <div id="scroll-container" className="slider-container">
                    <div>
                        <p id="scroll-text" className="slider-content">
                            
                        </p>
                    </div>
                </div>
            </span>
        </nav>
        </>
    );
}

export default BottomNav;