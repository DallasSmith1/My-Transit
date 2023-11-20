import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import "./Nav.css";

function Nav() {

    const location = window.location.pathname;

    if (location == "/" || location == "/index.html")
    {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Home</a>

                <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./updates.html">Updates</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./stops.html">Stops</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./schedule.html">Schedule</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="fareCosts.html">Fare Costs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="presets.html">Presets</a>
                </li>
                </ul>

            </nav>
        );
    }
    else if(location == "/updates.html")
    {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Updates</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="./index.html">Home</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="./updates.html">Updates</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./stops.html">Stops</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./schedule.html">Schedule</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="fareCosts.html">Fare Costs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="presets.html">Presets</a>
                </li>
                </ul>
            </div>
            </nav>
        );
    }

    else if(location == "/stops.html")
    {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Stops</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="./index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./updates.html">Updates</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="./stops.html">Stops</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./schedule.html">Schedule</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="fareCosts.html">Fare Costs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="presets.html">Presets</a>
                </li>
                </ul>
            </div>
            </nav>
        );
    }

    else if(location == "/stops.html")
    {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Stops</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="./index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./updates.html">Updates</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="./stops.html">Stops</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./schedule.html">Schedule</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="fareCosts.html">Fare Costs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="presets.html">Presets</a>
                </li>
                </ul>
            </div>
            </nav>
        );
    }

    else if(location == "/schedule.html")
    {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Schedule</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="./index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./updates.html">Updates</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./stops.html">Stops</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="./schedule.html">Schedule</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="fareCosts.html">Fare Costs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="presets.html">Presets</a>
                </li>
                </ul>
            </div>
            </nav>
        );
    }

    else if(location == "/fareCosts.html")
    {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Fare Costs</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="./index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./updates.html">Updates</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./stops.html">Stops</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./schedule.html">Schedule</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="fareCosts.html">Fare Costs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="presets.html">Presets</a>
                </li>
                </ul>
            </div>
            </nav>
        );
    }

    else if(location == "/presets.html")
    {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Presets</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="./index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./updates.html">Updates</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./stops.html">Stops</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./schedule.html">Schedule</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="fareCosts.html">Fare Costs</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="presets.html">Presets</a>
                </li>
                </ul>
            </div>
            </nav>
        );
    }
}


export default Nav;
