import navbarStyles from '../styles/navbar.module.css';
import indexStyles from '../styles/index.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperature0, faWind, faCompass, faDroplet, faCloudRain, faTachometerAlt, faSun, faLocationDot, faLuggageCart } from "@fortawesome/free-solid-svg-icons";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Chart } from "chart.js";

import { useEffect, useState } from 'react';
import Head from 'next/head';

var ctx;
var myChart;

export default function orderSuccess() {
    const [station, setStation] = useState(9);
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



    // States for chart
    const [selectedParameter, setSelectedParameter] = useState(-1); // 0 - Temperature, 1 - Wind, 2 - Wind Direction, 3 - Rainfall, 4 - Humidity, 5 - Atmospheric Pressure, 6 - Light
    const [selectedTimeInterval, setSelectedTimeInterval] = useState(-1); // 0 - Hourly, 1 - Daily

    const performTask = () => {
        console.log('Task performed');
    }

    useEffect(() => {
        ctx = document.getElementById('parameterBarChart').getContext('2d');
        // var myChart = new Chart(ctx, {
        //     type: 'bar',
        //     data: {
        //         //     labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        //         //     datasets: [{
        //         //         // data set of 24 array values between 100 and 0
        //         //         data: [100, 92, 75, 80, 44, 69, 100, 92, 75, 80, 44, 69, 100, 92, 75, 80, 44, 69, 100, 92, 75, 80, 44, 69],
        //         //         label: "Temperature",
        //         //         backgroundColor: "rgba(214,48,49,0.8)",
        //         //         borderColor: "rgba(214,48,49,1)",
        //         //         borderWidth: 1
        //         //     }]
        //     },
        //     options: {
        //         scales: {
        //             xAxes: [{
        //                 gridLines: {
        //                     display: false, // Remove x-axis grid lines
        //                     color: 'rgba(0, 0, 0, 0)',
        //                     zeroLineColor: '#fff'
        //                 },
        //             }],
        //             xAxes: [{
        //                 gridLines: {
        //                     display: false, // Remove x-axis grid lines
        //                     color: 'rgba(0, 0, 0, 0)',
        //                     zeroLineColor: '#fff'
        //                 },
        //             }],
        //         },
        //     },
        // });

        const interval = setInterval(fetchStationData, 300000);

        fetchStationData();
    }, [])

    useEffect(() => {
        console.log(station);
        fetchStationData();
    }, [station]);

    useEffect(() => {
        console.log('Data fetched');
        if (fetchedData.length > 0) {
            setSelectedParameter(0);
        }


    }, [fetchedData]);

    useEffect(() => {
        let dataset = [];
        let labels = [];
        let countOnCurrentHour = 0;
        let currentValue = 0;
        let crrentSensor = 0;
        let currentHour = -1;
        let currentMonth = 0;
        let currentDay = 0;

        for (let item of fetchedData) {
            if (item.StationId != station) {
                continue;
            }
            switch (item.Sensor) {
                case 'air-temperature-external':
                    crrentSensor = 0;
                    break;
                case 'air-wind-velocity':
                    crrentSensor = 1;
                    break;
                case 'air-wind-direction':
                    crrentSensor = 2;
                    break;
                case 'air-rainfall':
                    crrentSensor = 3;
                    break;
                case 'air-humidity-relative':
                    crrentSensor = 4;
                    break;
                case 'air-pressure':
                    crrentSensor = 5;
                    break;
                case 'solar-light':
                    crrentSensor = 6;
                    break;
                default:
                    crrentSensor = 7;
                    break;
            }
            if (selectedParameter == crrentSensor) {
                console.log(currentHour, countOnCurrentHour);
                if (item.Time.substring(11, 13) == currentHour) {
                    countOnCurrentHour++;

                    if (Math.round(item.Value * 1000) / 1000 < 0) {
                        continue;
                    }
                    currentValue += Math.round(item.Value * 1000) / 1000;
                } else {
                    if (countOnCurrentHour != -1) {
                        dataset.push(Math.round((currentValue / countOnCurrentHour) * 1000) / 1000);
                        labels.push(item.Time.substring(5, 7) + '/' + item.Time.substring(8, 10) + ' ' + Number(item.Time.substring(11, 13)) + ':00');
                    }
                    currentHour = Number(item.Time.substring(11, 13)) + 5;
      
                    countOnCurrentHour = 1;
                    if (Math.round(item.Value * 1000) / 1000 < 0) {
                        continue;
                    }
                    currentValue = Math.round(item.Value * 1000) / 1000;
                }
            }
            crrentSensor = 0;
        }

        let barColor = '';
        let chartLabel = '';
        switch (selectedParameter) {
            case '0':
                barColor = 'rgba(214,48,49,0.8)';
                chartLabel = 'Temperature';
                break;
            case '1':
                barColor = 'rgba(16, 172, 132,0.8)';
                chartLabel = 'Wind Speed';
                break;
            case '2':
                barColor = 'rgba(9, 132, 227,0.8)';
                chartLabel = 'Wind Direction';
                break;
            case '3':
                barColor = 'rgba(183, 21, 64,0.8)';
                chartLabel = 'Rainfall';
                break;
            case '4':
                barColor = 'rgba(255, 159, 67,0.8)';
                chartLabel = 'Humidity';
                break;
            case '5':
                barColor = 'rgba(25, 42, 86,0.8)';
                chartLabel = 'Atmospheric Pressure';
                break;
            case '6':
                barColor = 'rgba(61, 61, 61,0.8)';
                chartLabel = 'Light';
                break;
        }

        console.log(dataset);
        console.log(labels);
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    // data set of 24 array values between 100 and 0
                    data: dataset,
                    label: chartLabel,
                    backgroundColor: barColor,
                    borderColor: barColor,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false, // Remove x-axis grid lines
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: '#fff'
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false, // Remove x-axis grid lines
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: '#fff'
                        },
                    }],
                },
            },
        });
    }, [selectedParameter, selectedTimeInterval]);

    const fetchStationData = async () => {
        console.log(station);
        try {
            const response = await fetch('http://192.248.11.33/manoj.php'); // Replace with your API URL
            const data = await response.json();
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
                setStationActive(false);
            }

            let updatedArray = [0, 0, 0, 0, 0, 0, 0]; // Temperature, Wind, WindDirection, Rainfall, Humidity, AtmosphericPressure, Light
            console.log(data);
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].StationId == station) {
                    if (stationActive == false) {
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


    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;500;700&display=swap" rel="stylesheet" />
            </Head>
            <div className='' style={{ margin: 0, padding: 0 }}>
                <nav className={`navbar navbar-expand-lg py-3 px-5 position-fixed ${navbarStyles.navbar}`}>
                    <img src="/images/logo/uom.png" className={`${navbarStyles.brand}`} />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto  me-0 ms-auto">
                            <li className="nav-item active mx-2">
                                <a className={`nav-link ${navbarStyles.navLink}`} href="https://uom.lk/">UOM HOME <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item active mx-2">
                                <a className={`nav-link ${navbarStyles.navLink}`} href="https://uom.lk/">ITFAC HOME <span className="sr-only">(current)</span></a>
                            </li>
                            <select className={`form-select ${navbarStyles.stationSelect}`} aria-label="Default select example" style={{ width: 260, backgroundColor: (stationActive == false) ? '#c0392b' : '#27ae60' }} value={station}
                                onChange={(event) => setStation(event.target.value)}>
                                <option value="9" defaultValue>UoM Faculty of IT</option>
                                <option value="17" >University of Moratuwa</option>
                                <option value="15">Elpitiya Estate</option>
                                <option value="8">Mod Station</option>
                                <option value="7">Daduru Oya Dam-Pcb1</option>
                            </select>
                        </ul>
                    </div>
                </nav>
                <section
                    className={`${indexStyles.headerCover}`} style={{ width: '100vw', height: '100vh' }}>
                    <div className={`row h-100`} style={{ zIndex: 2 }}>
                        <div className={`d-none d-md-flex flex-column col-md-6 h-100 px-5 ${indexStyles.headerCoverText} justify-content-center`}>
                            <h1 className={`text-white ms-5 `} style={{ fontFamily: 'Epilogue, sans-serif', fontSize: 50 }}>Sri Lanka's Leading <br />Environment Monitoring System</h1>
                            <h1 className={`ms-5 `} style={{ fontFamily: 'Epilogue, sans-serif', fontSize: 25, color: '#bdc3c7' }}>A Qulity UOM Product</h1>
                        </div>
                        <div className={`col-12 col-md-6 h-100 ${indexStyles.headerCoverText} d-flex justify-content-center align-items-center`}>
                            <img src='/images/res/sl.png' style={{ width: 400, height: 600, marginTop: '5%' }} className={`${indexStyles.countryImage}`} />
                        </div>
                    </div>
                </section>

            </div>
            <section className='d-flex flex-column justify-content-center align-items-center'>
                <h3 className='mt-5 text-center' style={{ fontWeight: 'bold', fontFamily: 'Epilogue, sans-serif' }}>Detailed Weather Analysis</h3>
                <div className='d-flex justify-content-center align-items-center px-4 rounded-5 text-white' style={{ width: 200, fontFamily: 'Epilogue, sans-serif', paddingTop: 5, backgroundColor: (stationActive == false) ? '#c0392b' : '#27ae60' }}>Station {(stationActive) ? 'Active' : 'Inactive'}</div>
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
                            <img src='/images/icons/winddir.png' style={{ width: 120, height: 120, rotate: `${windDirection}deg` }} />
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
                            <div style={{ width: 130, height: 130 }}>
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
            <section>
                <div className={`d-flex flex-column justify-content-center align-items-center postion-relative mb-5`} style={{ paddingLeft: 200, paddingRight: 200, marginTop: 100 }}>
                    <h3 className='mt-5 text-center' style={{ fontWeight: 'bold', fontFamily: 'Epilogue, sans-serif' }}>Last 24 Hours</h3>
                    <h5 className='text-center' style={{ fontFamily: 'Epilogue, sans-serif', color: '#95a5a6', marginBottom:20 }}>Select parameter to see variations</h5>

                    <select className={`form-select ${indexStyles.parameterSelect}`} aria-label="Default select example" style={{ width: 260, marginBottom:100 }}
                        value={selectedParameter}
                        onChange={(event) => setSelectedParameter(event.target.value)}>
                        <option value="0">Temperature</option>
                        <option value="1">Wind</option>
                        <option value="2">Wind Direction</option>
                        <option value="3">Rainfall</option>
                        <option value="4">Humidity</option>
                        <option value="5">Atmospheric Pressure</option>
                        <option value="6">Light</option>
                    </select>

                    {/* <div className={`d-flex px-4 ms-5 me-2 py-2 justify-content-center align-items-center rounded-2  ${indexStyles.timeIntervalButton}`}
                        onClick={() => setSelectedTimeInterval(0)}>
                        Hourly
                    </div>
                    <div className={`d-flex px-4 ms-2 py-2 justify-content-center align-items-center rounded-2  ${indexStyles.timeIntervalButton}`}
                        onClick={() => setSelectedTimeInterval(1)}>
                        Daily
                    </div> */}
                </div>
                <div className={`d-flex justify-content-center align-items-center postion-relative mt-5 mb-5`} style={{ paddingLeft: 200, paddingRight: 200 }}>
                    <canvas id='parameterBarChart' className='' style={{ paddingLeft: 150, paddingRight: 150, height: 300 }}></canvas>
                </div>
            </section>
            <footer className={`w-100 d-flex flex-column justify-content-center align-items-center ${indexStyles.footerStyle}`} style={{ height: 130 }}>
                <h5 className='text-white'>Developed by Faculty of Information Technology, University of Moratuwa</h5>
                <h6 className={`text-white`}>©2023 All Rights Reserved</h6>

            </footer>
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