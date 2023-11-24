// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::Deserialize;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command




#[allow(dead_code)]
#[derive(Deserialize, Debug)]
#[serde(rename_all(deserialize = "PascalCase"))]
struct StopsResponse {
    #[serde(skip_deserializing)]
    metadata: (),
    stations: StationsWrapper
}

#[allow(dead_code)]
#[derive(Deserialize, Debug)]
#[serde(rename_all(deserialize = "PascalCase"))]
struct StationsWrapper {
    station: Vec<Station>,
}

#[allow(dead_code)]
#[derive(Deserialize, Debug)]
#[serde(rename_all(deserialize = "PascalCase"))]
struct Station {
    location_code: String,
    location_name: String,
    location_type: String,
    public_stop_id: String
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
