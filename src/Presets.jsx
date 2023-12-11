import "./Presets.css";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { invoke } from "@tauri-apps/api/tauri";

function Presets()
{
    invoke("get_selected_presets").then((selected) => {
        invoke("get_all_presets").then((result) => {
            let files = result.split(":");
    
            let presets = [];
        
            for (let i = 0; i < files.length; i++)
            {
                let preset = files[i].split("_.");
                preset = preset[0].replace(".\\saved_presets\\", "");
                if (!isNaN(preset.replace("_", "")))
                {
                    presets.push(preset);
                }
            }
    
            let div = document.getElementById("presets");
            div.innerHTML = "";
    
            for (let i = 1; i < presets.length; i++)
            {
                let article = document.createElement("article");
                
                if (selected.includes(presets[i]))
                {
                    article.className = "cta_select";
                }
                else
                {
                    article.className = "cta";
                }

    
                let ctaDiv = document.createElement("div");
                ctaDiv.className = "cta__text-column";
    
                let h2 = document.createElement("h2");
                h2.innerHTML = presets[i];
    
                let a1 = document.createElement("a");
                a1.innerHTML = "Select as main";
    
                let a2 = document.createElement("a");
                a2.innerHTML = "Delete";
    
    
                ctaDiv.appendChild(h2);
                if (!selected.includes(presets[i]))
                {
                    ctaDiv.appendChild(a1);
                }
                ctaDiv.appendChild(a2);
                article.appendChild(ctaDiv);
                div.appendChild(article);
            }        
        });
    })

    return (
        <table>
            <tbody>
                <td className="td-preset">
                    <div>
                        <div class="boarding-pass">
                            <header>
                                <div class="flight">
                                <strong id="tripNumber">0000</strong>
                                </div>
                            </header>
                            <section class="cities">
                                <table>
                                    <tbody>
                                        <td className="thirdy">
                                        <small id="fromName">from</small>
                                        <strong id="fromCode">from</strong>
                                        </td>
                                        <td className="thirdy"><strong><i className="fa-solid fa-right-long"></i></strong></td>
                                        <td className="thirdy">
                                            <small id="toName">to</small>
                                            <strong id="toCode">to</strong>
                                        </td>
                                    </tbody>
                                </table>
                            </section>
                            <section class="infos">
                                <div class="places">
                                <div class="box">
                                    <small>type</small>
                                    <strong id="tripType"><i class="fa-solid fa-train"></i></strong>
                                </div>
                                <div class="box">
                                    <small>Gate</small>
                                    <strong><em>C3</em></strong>
                                </div>
                                <div class="box">
                                    <small>Seat</small>
                                    <strong>14B</strong>
                                </div>
                                <div class="box">
                                    <small>Class</small>
                                    <strong>E</strong>
                                </div>
                                </div>
                                <div class="times">
                                <div class="box">
                                    <small>Boarding</small>
                                    <strong>11:05</strong>
                                </div>
                                <div class="box">
                                    <small>Departure</small>
                                    <strong>11:35</strong>
                                </div>
                                <div class="box">
                                    <small>Duration</small>
                                    <strong>2:15</strong>
                                </div>
                                <div class="box">
                                    <small>Arrival</small>
                                    <strong>13:50</strong>
                                </div>
                                </div>
                            </section>
                            <section class="strap">
                            <div class="box">
                            <div class="passenger">
                                <small>duration</small>
                                <strong></strong>
                            </div>
                            </div>
                        </section>
                            </div>

                    </div>
                </td>
                <td className="td-preset">
                    <div id="presets" className="presets">
                    </div>
                </td>
                <td className="td-preset">

                </td>
            </tbody>
        </table>
    );
}

export default Presets;