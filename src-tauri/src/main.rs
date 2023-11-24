// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
async fn get_all_stops() -> Result<String, String> {
    let url = "http://api.openmetrolinx.com/OpenDataAPI/api/V1/Stop/All?key=30023794";
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();

    Ok(json_response)
}

#[tauri::command]
async fn get_stop_details(stop: String) -> Result<String, String> {
    let url = format!("http://api.openmetrolinx.com/OpenDataAPI/api/V1/Stop/Details/{stop}?key=30023794");
    let response = reqwest::get(url).await.unwrap();
    let json_response = response.text().await.unwrap();

    Ok(json_response)
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_all_stops, get_stop_details])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
