import navbarStyles from '../styles/navbar.module.css';
import indexStyles from '../styles/index.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperature0, faWind, faCompass, faDroplet, faCloudRain, faTachometerAlt, faSun, faLocationDot, faLuggageCart, faCloudMoon, faCogs, faSchool, faPhone, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Chart } from "chart.js";

import { sharedContext } from '../contexts/sharedContext.js';

import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';


import app from '../firebase.js';
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore";

var db;

export default function Index() {
    
    const {email, mainSettings, stations, setEmail, setMainSettings, setStations} = useContext(sharedContext);

    const [station, setStation] = useState(
        (stations.length > 0) ? stations[0].stationID : 0
    );
    const [stationActive, setStationActive] = useState(false);
    const [temperature, setTemperature] = useState(29.56);
    const [wind, setWind] = useState(19.25);
    const [windDirection, setWindDirection] = useState(0);
    const [rainfall, setRainfall] = useState(15);
    const [humidity, setHumidity] = useState(0);
    const [atmosphericPressure, setAtmosphericPressure] = useState(101356);
    const [light, setLight] = useState(56);
    const [lastUpdate, setLastUpdate] = useState('0000-00-00 00:00:00');
    const [fetchedData, setFetchedData] = useState([]);

    const fetchStationData = async () => {
        try {
            const response = await fetch('http://192.248.11.33/manoj.php'); // Replace with your API URL
            const data = await response.json();
            let stationActiveCurrent = false;
            setFetchedData([...data]);

            // Set all weather states to 0
            setTemperature(0);
            setWind(0);
            setWindDirection(0);
            setRainfall(0);
            setHumidity(0);
            setAtmosphericPressure(0);
            setLight(0);



            setStationActive(false);
            if (data.length > 0) {
                setLastUpdate(convertTime(data[data.length - 1].Time));
            } else {
                stationActiveCurrent = false;
                setStationActive(false);
            }

            let updatedArray = [0, 0, 0, 0, 0, 0, 0]; // Temperature, Wind, WindDirection, Rainfall, Humidity, AtmosphericPressure, Light
            console.log(data);
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].StationId == station) {
                    console.log(station, data[i].StationId, stationActive)
                    if (stationActiveCurrent == false) {
                        stationActiveCurrent = true;
                        setStationActive(true);
                    }
                    switch (data[i].Sensor) {
                        case 'air-temperature-external':
                            if (updatedArray[0] == 0) {
                                updatedArray[0] = true;
                                setTemperature(Math.round(data[i].Value * 1000) / 1000);
                            }
                            break;
                        case 'air-wind-velocity':
                            if (updatedArray[1] == 0) {
                                updatedArray[1] = true;
                                setWind(Math.round(data[i].Value * 1000) / 1000);
                            }
                            break;
                        case 'air-wind-direction':
                            if (updatedArray[2] == 0) {
                                updatedArray[2] = true;
                                setWindDirection(Math.round(data[i].Value * 1000) / 1000);
                            }
                            break;
                        case 'air-rainfall':
                            if (updatedArray[3] == 0) {
                                updatedArray[3] = true;
                                setRainfall(Math.round(data[i].Value * 1000) / 1000);
                            }
                            break;
                        case 'air-humidity-relative':
                            if (updatedArray[4] == 0) {
                                updatedArray[4] = true;
                                setHumidity(Math.round(data[i].Value * 1000) / 1000);
                            }
                            break;
                        case 'air-pressure':
                            if (updatedArray[5] == 0) {
                                updatedArray[5] = true;
                                setAtmosphericPressure(Math.round(data[i].Value * 1000) / 1000);
                            }
                            break;
                        case 'solar-light':
                            if (updatedArray[6] == 0) {
                                updatedArray[6] = true;
                                setLight(Math.round(data[i].Value * 1000) / 1000);
                            }
                            break;
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    useEffect(() => {

        const interval = setInterval(fetchStationData, 300000);

        fetchStationData();
    }, [])

    useEffect(() => {
        fetchStationData();
    }, [station]);

    useEffect(() => {

    }, [fetchedData]);



    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
                <title>Environment Monitoring System</title>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" async/>
                <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;500;700&display=swap" rel="stylesheet" />
            </Head>


            <nav className={`navbar navbar-expand-lg py-3 px-md-5 px-3 position-fixed ${navbarStyles.navbar}`}>
                <img src="/images/logo/uom.png" className={`${navbarStyles.brand}`} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto  me-0 ms-auto">
                        <li className="nav-item active mx-2">
                            <Link className={`nav-link ${navbarStyles.navLink}`} href="..">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active mx-2">
                            <Link className={`nav-link ${navbarStyles.navLink}`} href="/singin">EMS <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active mx-2">
                            <a className={`nav-link ${navbarStyles.navLink}`} href="https://uom.lk/">UOM HOME <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active mx-2">
                            <a className={`nav-link ${navbarStyles.navLink}`} href="https://uom.lk/itfac">ITFAC HOME <span className="sr-only">(current)</span></a>
                        </li>
                        <select className={`form-select ${navbarStyles.stationSelect}`} aria-label="Default select example" style={{ width: 260, backgroundColor: (stationActive == false) ? '#c0392b' : '#27ae60' }} value={station}
                            onChange={(event) => setStation(event.target.value)}>
                            {stations.map((station) => (
                                <option key={station.stationID} value={station.stationID}>{station.stationName}</option>
                            ))}
                        </select>
                    </ul>
                </div>
            </nav>
            <section
                className={`${indexStyles.headerCover}`}>
                <div className='row w-100 h-100' style={{ zIndex: 2 }}>
                    <div className={`col-12 d-flex flex-column h-100 px-5 ${indexStyles.headerCoverText} justify-content-center align-items-center`}>
                        <div className='d-flex flex-row justify-content-center align-items-center mb-5'>
                            <img src='/images/logo/uom2.png' style={{objectFit: 'cover' }} className={`ms-2 me-2 ${indexStyles.uomLogo}`} />
                            <img src='/images/logo/ahead.png' style={{objectFit: 'cover' }} className={`ms-2 me-2 ${indexStyles.aheadLogo}`}/>
                        </div>
                        <p className={`text-white ms-5 text-center ${indexStyles.heading}`}>Empowering a Greener Future</p>
                        <p className={`ms-5 text-center ${indexStyles.subheading}`}>Leading the Way in Environmental Monitoring and Protection</p>
                    </div>
                </div>
            </section>


            <section className='d-flex flex-column justify-content-center align-items-center'>
                <h3 className='mt-5 text-center' style={{ fontWeight: 'bold', fontFamily: 'Epilogue, sans-serif' }}>Detailed Weather Analysis</h3>
                <div className='d-flex justify-content-center align-items-center px-4 rounded-5 text-white' style={{fontFamily: 'Epilogue, sans-serif', paddingTop: 5, backgroundColor: (stationActive == false) ? '#c0392b' : '#27ae60' }}>Station {(stationActive) ? 'Active' : 'Inactive'}</div>
                <div className={`d-flex flex-wrap justify-content-center align-items-center postion-relative mt-5 px-5 mb-5`}>
                    <div className={`${indexStyles.parameterCard}`} style={{ border: (stationActive) ? '1px solid rgba(0,0,0,0.1)' : '2px solid rgba(192, 57, 43,1)' }}>
                        <div className={`${indexStyles.titleRow} d-flex align-items-center`}>
                            <FontAwesomeIcon icon={faTemperature0} className={`${indexStyles.icon}`} style={{ color: '#d63031' }} />
                            <h6>Temperature</h6>
                        </div>
                        <div className={`d-flex flex-column justify-content-center align-items-center ${indexStyles.cardBody}`}>
                            <h1>{temperature}</h1>
                            <h4>°C</h4>
                        </div>
                        <p className={`text-center mt-3 ${indexStyles.updateDate}`}>Last Update : <span className={``}>{lastUpdate}</span></p>
                    </div>
                    <div className={`${indexStyles.parameterCard}`} style={{ border: (stationActive) ? '1px solid rgba(0,0,0,0.1)' : '2px solid rgba(192, 57, 43,1)' }}>
                        <div className={`${indexStyles.titleRow} d-flex align-items-center`}>
                            <FontAwesomeIcon icon={faWind} className={`${indexStyles.icon}`} style={{ color: '#10ac84' }} />
                            <h6>Wind</h6>
                        </div>
                        <div className={`d-flex flex-column justify-content-center align-items-center ${indexStyles.cardBody}`}>
                            <h1>{wind}</h1>
                            <h4>ms<sup>-1</sup></h4>
                        </div>
                        <p className={`text-center mt-3 ${indexStyles.updateDate}`}>Last Update : <span className={``}>{lastUpdate}</span></p>
                    </div>
                    <div className={`${indexStyles.parameterCard}`} style={{ border: (stationActive) ? '1px solid rgba(0,0,0,0.1)' : '2px solid rgba(192, 57, 43,1)' }}>
                        <div className={`${indexStyles.titleRow} d-flex align-items-center`}>
                            <FontAwesomeIcon icon={faCompass} className={`${indexStyles.icon}`} style={{ color: '#0984e3' }} />
                            <h6>Wind Direction</h6>
                        </div>
                        <div className={`d-flex flex-column justify-content-center align-items-center ${indexStyles.cardBody}`}>
                            <img src='/images/icons/winddir.png' className={`${indexStyles.windDirectionIcon}`} style={{ rotate: `${windDirection}deg` }} />
                            <h4>{windDirection}° From North</h4>
                        </div>
                        <p className={`text-center mt-3 ${indexStyles.updateDate}`}>Last Update : <span className={``}>{lastUpdate}</span></p>
                    </div>
                    <div className={`${indexStyles.parameterCard}`} style={{ border: (stationActive) ? '1px solid rgba(0,0,0,0.1)' : '2px solid rgba(192, 57, 43,1)' }}>
                        <div className={`${indexStyles.titleRow} d-flex align-items-center`}>
                            <FontAwesomeIcon icon={faCloudRain} className={`${indexStyles.icon}`} style={{ color: '#b71540' }} />
                            <h6>Rainfall</h6>
                        </div>
                        <div className={`d-flex flex-column justify-content-center align-items-center ${indexStyles.cardBody}`}>
                            <h1>{rainfall}</h1>
                            <h4>mmh<sup>-1</sup></h4>
                        </div>
                        <p className={`text-center mt-3 ${indexStyles.updateDate}`}>Last Update : <span className={``}>{lastUpdate}</span></p>
                    </div>
                    <div className={`${indexStyles.parameterCard}`} style={{ border: (stationActive) ? '1px solid rgba(0,0,0,0.1)' : '2px solid rgba(192, 57, 43,1)' }}>
                        <div className={`${indexStyles.titleRow} d-flex align-items-center`}>
                            <FontAwesomeIcon icon={faDroplet} className={`${indexStyles.icon}`} style={{ color: '#ff9f43' }} />
                            <h6>Humidity</h6>
                        </div>
                        <div className={`d-flex flex-column justify-content-center align-items-center ${indexStyles.cardBody}`}>
                            <div className={`${indexStyles.progressBarContainer}`}>
                                <CircularProgressbar value={humidity} text={`${humidity}%`} styles={buildStyles({ pathColor: '#ff9f43', textColor: '#ff9f43' })} />
                            </div>
                        </div>
                        <p className={`text-center mt-3 ${indexStyles.updateDate}`}>Last Update : <span className={``}>{lastUpdate}</span></p>
                    </div>
                    <div className={`${indexStyles.parameterCard}`} style={{ border: (stationActive) ? '1px solid rgba(0,0,0,0.1)' : '2px solid rgba(192, 57, 43,1)' }}>
                        <div className={`${indexStyles.titleRow} d-flex align-items-center`}>
                            <FontAwesomeIcon icon={faTachometerAlt} className={`${indexStyles.icon}`} style={{ color: '#192a56' }} />
                            <h6>Atmospheric Pressure</h6>
                        </div>
                        <div className={`d-flex flex-column justify-content-center align-items-center ${indexStyles.cardBody}`}>
                            <h1>{atmosphericPressure}</h1>
                            <h4>kPa</h4>
                        </div>
                        <p className={`text-center mt-3 ${indexStyles.updateDate}`}>Last Update : <span className={``}>{lastUpdate}</span></p>
                    </div>
                    <div className={`${indexStyles.parameterCard}`} style={{ border: (stationActive) ? '1px solid rgba(0,0,0,0.1)' : '2px solid rgba(192, 57, 43,1)' }}>
                        <div className={`${indexStyles.titleRow} d-flex align-items-center`}>
                            <FontAwesomeIcon icon={faSun} className={`${indexStyles.icon}`} style={{ color: '#3d3d3d' }} />
                            <h6>Light</h6>
                        </div>
                        <div className={`d-flex flex-column justify-content-center align-items-center ${indexStyles.cardBody}`}>
                            <h1>{light}</h1>
                            <h4>LUX</h4>
                        </div>
                        <p className={`text-center mt-3 ${indexStyles.updateDate}`}>Last Update : <span className={``}>{lastUpdate}</span></p>
                    </div>

                </div>
            </section>

            {/* <hr className='mx-md-5' /> */}

            {/* <section className={`d-flex flex-column w-100 align-items-center mt-3 px-md-5 py-5 ${indexStyles.contactSection}`}>
                <h3>Need Technical Help?</h3>
                <h6 style={{ color: '#636e72' }}>Let the Faculty of IT assist you</h6>
                <div className='d-flex flex-wrap justify-content-center align-items-center mt-3'>
                    <div className={`${indexStyles.servicesCard} d-flex flex-column align-items-center justify-content-center`} >
                        <FontAwesomeIcon icon={faCloudMoon} fontSize={50} style={{ color: '#192a56' }} />
                        <h5 className='mt-3'>Weather Station Data</h5>
                        <h6 className='text-center mt-3' style={{ color: '#636e72' }}>Get the latest weather station data from the Faculty of IT</h6>
                    </div>
                    <div className={`${indexStyles.servicesCard} d-flex flex-column align-items-center justify-content-center`} >
                        <FontAwesomeIcon icon={faCogs} fontSize={50} style={{ color: '#d63031' }} />
                        <h5 className='mt-3'>Technical Assistance</h5>
                        <h6 className='text-center mt-3' style={{ color: '#636e72' }}>Get support for your IoT problem</h6>
                    </div>
                    <div className={`${indexStyles.servicesCard} d-flex flex-column align-items-center justify-content-center`} >
                        <FontAwesomeIcon icon={faSchool} fontSize={50} style={{ color: '#10ac84' }} />
                        <h5 className='mt-3'>IoT Workshops</h5>
                        <h6 className='text-center mt-3' style={{ color: '#636e72' }}>Get hands-on experience on IoT</h6>
                    </div>
                </div>

                <h3 className='mt-5'>Contact Us</h3>
                <h6 style={{ color: '#636e72' }}>We are here to help you</h6>
                <div className='d-flex flex-wrap justify-content-center align-items-center mt-3'>
                    <div className={`${indexStyles.contactCard} d-flex flex-column align-items-center justify-content-center`} >
                        <FontAwesomeIcon icon={faUserCircle} fontSize={50} style={{ color: '#192a56' }} />
                        <h5 className='mt-3'>Mr. B.H. Sudantha</h5>
                        <h6 className='text-center mt-1' style={{ color: '#636e72' }}>Dean</h6>
                        <h6 className='text-center' style={{ color: '#636e72' }}>Faculty of IT</h6>
                        <div className='d-flex flex-row justify-content-center align-items-center mt-3'>
                            <FontAwesomeIcon icon={faPhone} fontSize={20} />
                            <h6 className='ms-2' >+94 71 572 1744</h6>
                        </div>
                    </div>
                    <div className={`${indexStyles.contactCard} d-flex flex-column align-items-center justify-content-center`} >
                        <FontAwesomeIcon icon={faUserCircle} fontSize={50} style={{ color: '#d63031' }} />
                        <h5 className='mt-3'>Mr. Manoj Silva</h5>
                        <h6 className='text-center mt-1' style={{ color: '#636e72' }}>Technical Assistant</h6>
                        <h6 className='text-center' style={{ color: '#636e72' }}>Faculty of IT</h6>
                        <div className='d-flex flex-row justify-content-center align-items-center mt-3'>
                            <FontAwesomeIcon icon={faPhone} fontSize={20} />
                            <h6 className='ms-2' >+94 71 235 8403</h6>
                        </div>
                    </div>
                    
                </div>
            </section> */}

            {/* <footer className={`w-100 d-flex flex-column justify-content-center align-items-center ${indexStyles.footerStyle}`} style={{ height: 130 }}>
                <h5 className='text-white text-center'>Developed by Faculty of Information Technology, University of Moratuwa</h5>
                <h6 className={`text-white text-center`}>©2023 All Rights Reserved</h6>

            </footer> */}
        </>
    );
}

const convertTime = (timeString) => {
    let day, month, year, hour, minute, second;
    // timeString = "2023-07-25 07:10:00+00"
    year = timeString.substring(0, 4);
    month = timeString.substring(5, 7);
    day = timeString.substring(8, 10);
    hour = timeString.substring(11, 13);
    minute = timeString.substring(14, 16);
    second = timeString.substring(17, 19);

    // This is in GMT. Convert this to Sri Lanka standard time (+5.30)
    hour = parseInt(hour) + 5;
    minute = parseInt(minute) + 30;

    if (minute >= 60) {
        hour = hour + 1;
        minute = minute - 60;
    }

    if (hour >= 24) {
        day = day + 1;
        hour = hour - 24;
    }

    if (month == 2 && day > 28) {
        month = month + 1;
        day = day - 28;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (day > 30) {
            month = month + 1;
            day = day - 30;
        }
    } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (day > 31) {
            month = month + 1;
            day = day - 31;
        }
    }

    if (month > 12) {
        year = year + 1;
        month = month - 12;
    }

    timeString = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return timeString;
}