// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use std::fs::File;
use std::fs::remove_file;
use std::io::Write;
use std::io::Read;
use std::fs::read_dir;
use std::fs::create_dir;
use std::path::Path;

//

#[tauri::command]
async fn get_all_buses() -> Result<String, String> {
    let url = "http://api.openmetrolinx.com/OpenDataAPI/api/V1/ServiceataGlance/Buses/All?key=30023794";
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();

    Ok(json_response)
}

#[tauri::command]
async fn get_all_trains() -> Result<String, String> {
    let url = "http://api.openmetrolinx.com/OpenDataAPI/api/V1/ServiceataGlance/Trains/All?key=30023794";
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();

    Ok(json_response)
}

#[tauri::command]
async fn get_trip_info(date: &str, trip: &str) -> Result<String, String> {
    let url = format!("http://api.openmetrolinx.com/OpenDataAPI/api/V1/Schedule/Trip/{}/{}?key=30023794", date, trip);
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();
    
    Ok(json_response)
}

#[tauri::command]
async fn get_train_exceptions() -> Result<String, String> {
    let url = "http://api.openmetrolinx.com/OpenDataAPI/api/V1/ServiceUpdate/Exceptions/Train?key=30023794";
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();

    Ok(json_response)
}

#[tauri::command]
async fn get_next_service(stop: &str) -> Result<String, String> {
    let url = format!("http://api.openmetrolinx.com/OpenDataAPI/api/V1/Stop/NextService/{}?key=30023794", stop);
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();

    Ok(json_response)
}

#[tauri::command]
async fn get_bus_exceptions() -> Result<String, String> {
    let url = "http://api.openmetrolinx.com/OpenDataAPI/api/V1/ServiceUpdate/Exceptions/Bus?key=30023794";
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();

    Ok(json_response)
}

#[tauri::command]
async fn get_all_stops() -> Result<String, String> {
    let url = "http://api.openmetrolinx.com/OpenDataAPI/api/V1/Stop/All?key=30023794";
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();

    Ok(json_response)
}

#[tauri::command]
async fn get_alerts() -> Result<String, String> {
    let url = "http://api.openmetrolinx.com/OpenDataAPI/api/V1/Gtfs/Feed/Alerts?key=30023794";
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();

    Ok(json_response)
}

#[tauri::command]
async fn get_stop_details(stop: &str) -> Result<String, String> {
    let url = format!("http://api.openmetrolinx.com/OpenDataAPI/api/V1/Stop/Details/{}?key=30023794", stop);
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();
    
    Ok(json_response)
}

#[tauri::command]
async fn get_schedules(from: &str, to: &str, date: &str, time: &str) -> Result<String, String> {
    let url = format!("http://api.openmetrolinx.com/OpenDataAPI/api/V1/Schedule/Journey/{}/{}/{}/{}/10?key=30023794", date, from, to, time);
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();
    
    Ok(json_response)
}

#[tauri::command]
async fn get_fares(from: &str, to: &str) -> Result<String, String> {
    let url = format!("http://api.openmetrolinx.com/OpenDataAPI/api/V1/Fares/{}/{}?key=30023794", from, to);
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();
    
    Ok(json_response)
}

#[tauri::command]
fn create_presets(json: &str, hash: &str) -> Result<String, String> {
    let url = format!("./saved_presets/{}.txt", hash);
    let mut data_file = File::create(url).expect("creation failed");
    data_file.write(json.as_bytes()).expect("write failed");
    
    Ok(hash.to_string())
}

#[tauri::command]
fn delete_presets(hash: &str) -> Result<String, String> {
    remove_file(format!("./saved_presets/{}.txt", hash)).expect("could not remove file");
    Ok(hash.to_string())
}

#[tauri::command]
fn get_presets(hash: &str) -> Result<String, String> {
    let mut data_file = File::open(format!("./saved_presets/{}.txt", hash)).unwrap();
    // Create an empty mutable string
    let mut file_content = String::new();
    // Copy contents of file to a mutable string
    data_file.read_to_string(&mut file_content).unwrap();
    
    Ok(file_content)
}

#[tauri::command]
fn get_selected_presets() -> Result<String, String> {
    if !Path::new("./saved_presets").exists() {
        let _ = create_dir("./saved_presets");
    }
    if !Path::new("./saved_presets/selected_trip.txt").exists() {
        let _ = File::create("./saved_presets/selected_trip.txt");
    }
    let mut data_file = File::open("./saved_presets/selected_trip.txt").unwrap();
    // Create an empty mutable string
    let mut trip = String::new();
    // Copy contents of file to a mutable string
    data_file.read_to_string(&mut trip).unwrap();

    Ok(trip)
}

#[tauri::command]
fn set_selected_presets(hash: &str) -> Result<String, String> {
    remove_file("./saved_presets/selected_trip.txt").expect("could not remove file");
    let url = "./saved_presets/selected_trip.txt";
    let mut data_file = File::create(url).expect("creation failed");
    data_file.write(hash.as_bytes()).expect("write failed");
    
    Ok(hash.to_string())
}

#[tauri::command]
fn get_all_presets() -> Result<String, String> {
    if !Path::new("./saved_presets").exists() {
        let _ = create_dir("./saved_presets");
    }
    if !Path::new("./saved_presets/selected_trip.txt").exists() {
        let _ = File::create("./saved_presets/selected_trip.txt");
    }

    let paths = read_dir(".\\saved_presets").unwrap();
    // Create an empty mutable string
    let mut trips = String::new();
    // Copy contents of file to a mutable string

    for path in paths {
        trips = format!("{}:{}", trips, path.unwrap().path().display());
    }

    Ok(trips)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_all_buses, get_all_trains, get_trip_info, get_train_exceptions, get_next_service, get_bus_exceptions, get_all_stops, get_stop_details, get_schedules, create_presets, delete_presets, get_presets, get_selected_presets, set_selected_presets, get_all_presets, get_fares, get_alerts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}



