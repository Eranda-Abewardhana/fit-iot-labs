import navbarStyles from '../styles/navbar.module.css';
import indexStyles from '../styles/index.module.css';
import signInStyles from '../styles/signin.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperature0, faWind, faCompass, faDroplet, faCloudRain, faTachometerAlt, faSun, faLocationDot, faLuggageCart, faCloudMoon, faCogs, faSchool, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

import { sharedContext } from '../contexts/sharedContext.js';

import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import App from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signin() {
    const auth = getAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorAlert, setErrorAlert] = useState('');
    const [processing, setProcessing] = useState(false);

    const { email, mainSettings, stations, setEmail, setMainSettings, setStations } = useContext(sharedContext);

    const handleSignIn = async () => {
        setProcessing(true);
        signInWithEmailAndPassword(auth, username, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                let db = null;

                setEmail(user.email);

                try {
                    db = getFirestore();
                } catch (error) {
                    console.log(error);
                    toast.error("Error occured while connecting to server");
                    setProcessing(false);
                    return;
                }

                try {
                    await getDoc(doc(db, user.email, 'mainSettings'))
                        .then((doc) => {
                            setMainSettings(doc.data());

                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error("Error occured while loading user data");
                            setProcessing(false);
                            return;
                        });

                } catch (error) {
                    console.log(error);
                    toast.error("Error occured while loading user data (2)");
                    setProcessing(false);
                    return;
                }

                try{
                    await getDoc(doc(db, user.email, 'weatherStations'))
                        .then((doc) => {
                            setStations(doc.data().stations);
                            setProcessing(false);
                            Router.push('/ems');
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error("Error occured while loading stations");
                            setProcessing(false);
                            return;
                        });
                } catch (error) {
                    console.log(error);
                    toast.error("Error occured while loading stations (2)");
                    setProcessing(false);
                    return;
                }

                //Router.push('/ems');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                // add attractive alerts here using JSX
                if (errorCode === 'auth/wrong-password') {
                    setErrorAlert("Wrong Credentials entered.")
                    alert('Wrong Credentials entered.');
                } else if (errorCode === 'auth/user-not-found') {
                    setErrorAlert("User not found.")
                    alert('User not found.');
                } else if (errorCode === 'auth/invalid-email') {
                    setErrorAlert("Invalid email.")
                    alert('Invalid email.');
                } else {
                    setErrorAlert("Something went wrong! " + errorMessage)
                    alert("Something went wrong! " + errorMessage);
                }
            });
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
                <title>Sign In - EMS</title>
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
                            <Link className={`nav-link ${navbarStyles.navLink}`} href="/ems">EMS <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active mx-2">
                            <a className={`nav-link ${navbarStyles.navLink}`} href="https://uom.lk/">UOM HOME <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active mx-2">
                            <a className={`nav-link ${navbarStyles.navLink}`} href="https://uom.lk/itfac">ITFAC HOME <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
            <section
                className={`${indexStyles.headerCover}`}>
                <div className='row w-100 h-100' style={{ zIndex: 2 }}>
                    <div className={`col-12 d-none col-md-6 d-md-flex flex-column justify-content-center`}>
                        <div className={`d-flex flex-column justify-content-center align-items-center ${signInStyles.inputContainer}`}>
                            <div className='d-flex flex-row justify-content-center align-items-center mb-5 px-5'>
                                <img src='/images/logo/uom2.png' style={{ objectFit: 'cover' }} className={`ms-3 me-3 ${indexStyles.uomLogo}`} />
                                <img src='/images/logo/ahead.png' style={{ objectFit: 'cover' }} className={`ms-3 me-3 ${indexStyles.aheadLogo}`} />
                            </div>
                            <p className={`text-white ms-5 text-center ${indexStyles.heading}`} style={{ fontSize: 30 }}>Environment Monitoring System</p>
                            <p className={`ms-5 text-center ${indexStyles.subheading}`} style={{ fontSize: 20 }}>Sign In to the portal to monitor your device</p>
                        </div>

                    </div>

                    <div className={`col-12 col-md-6 d-flex flex-column px-5 ${indexStyles.headerCoverText} justify-content-center align-items-center`}>
                        <FontAwesomeIcon icon={faUser} className={`display-1`} style={{ color: '#a33939' }} />
                        <p className={`text-white mt-3 text-center ${indexStyles.heading}`} style={{ fontSize: 30 }}>Sign In</p>

                        <h6 className={`text-white mt-3 text-center ${indexStyles.heading}`} style={{ fontSize: 15 }}>Email</h6>
                        <input type="text" className={`form-control ${signInStyles.input} text-center`} placeholder="Email"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)} />

                        <h6 className={`text-white mt-4 text-center ${indexStyles.heading} `} style={{ fontSize: 15 }}>Password</h6>
                        <input type="password" className={`form-control ${signInStyles.input} text-center`} placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} />

                        <button disabled={processing ? true : false} className={`btn mt-4 ${signInStyles.button}`}
                            onClick={() => handleSignIn()}>
                            {processing ? 'PLEASE WAIT...' : 'SIGN IN'}
                        </button>
                    </div>

                </div>
            </section>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </>
    )
}