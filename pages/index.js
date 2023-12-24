import navbarStyles from '../styles/navbar.module.css';
import indexStyles2 from '../styles/index2.module.css';
import indexStyles from '../styles/index.module.css';
import ContactForm from '../pages/contactForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperature0, faWind, faCompass, faDroplet, faCloudRain, faTachometerAlt, faSun, faLocationDot, faLuggageCart, faCloudMoon, faCogs, faSchool, faPhone, faUserCircle, faComputer } from "@fortawesome/free-solid-svg-icons";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Chart } from "chart.js";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Index() {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <title>FIT IoT Labs</title>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" async />
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
                            <Link className={`nav-link ${navbarStyles.navLink}`} href="/signin">EMS <span className="sr-only">(current)</span></Link>
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
                className={`${indexStyles.headerCover} ${indexStyles.headerCover2}`}>
                <div className='row w-100 h-100' style={{ zIndex: 2 }}>
                    <div className={`col-12 d-flex flex-column h-100 px-5 ${indexStyles.headerCoverText} justify-content-center align-items-center`}>
                        <div className='d-flex flex-row justify-content-center align-items-center mb-5'>
                            <img src='/images/logo/uom2.png' style={{ objectFit: 'cover' }} className={`ms-2 me-2 ${indexStyles.uomLogo}`} />
                            <img src='/images/logo/iotlabs.png' style={{ objectFit: 'cover' }} className={`ms-2 me-2 ${indexStyles.aheadLogo}`} />
                        </div>
                        <p className={`text-white ms-5 text-center ${indexStyles.heading}`}>Embracing The Digital Revolution</p>
                        <p className={`ms-5 text-center ${indexStyles.subheading}`}>Unleashing Innovation Through the Internet of Things</p>
                    </div>
                </div>
            </section>

            <section style={{ width: '100vw' }} >
                <h3 className='text-center mt-5'>What we offer you</h3>
                <h6 className='text-center' style={{ color: '#7f8c8d' }}>Gather around with us</h6>
                <h4 className='mx-md-5' />
                <div className='mt-3 d-flex flex-wrap justify-content-center align-items-center'>
                    <div className={`${indexStyles2.parameterCard} d-flex flex-column justify-content-center align-items-center`} >
                        <FontAwesomeIcon icon={faSchool} className={`${indexStyles2.parameterCardIcon}`} style={{ color: '#c0392b' }} />
                        <h5 className='text-center mt-5'>Learn from the best</h5>
                        <h6 className='text-center' style={{ color: '#7f8c8d' }}>Conducting IoT Workshops Island Wide</h6>
                    </div>
                    <div className={`${indexStyles2.parameterCard} d-flex flex-column justify-content-center align-items-center`} >
                        <FontAwesomeIcon icon={faCogs} className={`${indexStyles2.parameterCardIcon}`} style={{ color: '#27ae60' }} />
                        <h5 className='text-center mt-5'>Technical Assistance</h5>
                        <h6 className='text-center' style={{ color: '#7f8c8d' }}>Get help from experts of the field</h6>
                    </div>
                    <div className={`${indexStyles2.parameterCard} d-flex flex-column justify-content-center align-items-center`} >
                        <FontAwesomeIcon icon={faComputer} className={`${indexStyles2.parameterCardIcon}`} style={{ color: '#2980b9' }} />
                        <h5 className='text-center mt-5'>External IoT Project Contracts</h5>
                        <h6 className='text-center' style={{ color: '#7f8c8d' }}>Do you have an idea in mind? We got you covered</h6>
                    </div>
                </div>

            </section>

            <section className={`mb-5 mt-5 py-3 ${indexStyles2.servicesSection}`} style={{ width: '100vw' }}>
                <h3 className='text-center mt-5'>Key Projects</h3>
                <h6 className='text-center mt-3' style={{ color: '#7f8c8d' }}>What we have done</h6>

                <div className='mt-3 d-flex flex-wrap justify-content-center align-items-center mb-4'>
                    <div className={`${indexStyles2.projectsCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/projects/ems.jpg' className={`${indexStyles2.projectImage}`} />
                        <h5 className={`mt-3 text-center mx-2`}>Environment Monitoring System</h5>
                        <p className={`text-center mx-2 mt-auto mb-3`} style={{ fontSize: 15 }}>Real time environment monitoring analysing system</p>
                    </div>
                    <div className={`${indexStyles2.projectsCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/projects/facs.jpg' className={`${indexStyles2.projectImage}`} />
                        <h5 className={`mt-3 text-center mx-2`}>Access Control System</h5>
                        <p className={`text-center mx-2 mt-auto mb-3`} style={{ fontSize: 15 }}>Safer and efficient access control system for university premises</p>
                    </div>
                    <div className={`${indexStyles2.projectsCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/projects/ems2.PNG' className={`${indexStyles2.projectImage}`} />
                        <h5 className={`mt-3 text-center mx-2`}>Air Quality Measurement System</h5>
                        <p className={`text-center mx-2 mt-auto mb-3`} style={{ fontSize: 15 }}>Air quality parameters measurement and analysing in Colombo metropolitan area</p>
                    </div>
                    <div className={`${indexStyles2.projectsCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/projects/gas.jpg' className={`${indexStyles2.projectImage}`} />
                        <h5 className={`mt-3 text-center mx-2`}>Gas Leakage Prevention System</h5>
                        <p className={`text-center mx-2 mt-auto mb-3`} style={{ fontSize: 15 }}>Real time LP gas leakage identification and automated prevention mechanism</p>
                    </div>
                </div>
            </section>

            <section style={{ width: '100vw' }} className='px-5' >
                <h3 className='text-center mt-5'>Witness The Life at IoT Labs</h3>
                <h6 className='text-center' style={{ color: '#7f8c8d' }}>Have a glimpse on our special moments</h6>
                <h4 className='mx-md-5' />

                <div className='mt-5 d-flex flex-wrap justify-content-center align-items-center mb-4'>
                    <div className={`${indexStyles2.galleryCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/gallery/gal1.jpg' className={` ${indexStyles2.galleryImage}`} />
                    </div>
                    <div className={`${indexStyles2.galleryCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/gallery/exm6.jpg' className={` ${indexStyles2.galleryImage}`} />
                    </div>
                    <div className={`${indexStyles2.galleryCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/gallery/exm1.jpg' className={` ${indexStyles2.galleryImage}`} />
                    </div>
                    <div className={`${indexStyles2.galleryCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/gallery/exm2.jpg' className={` ${indexStyles2.galleryImage}`} />
                    </div>
                    <div className={`${indexStyles2.galleryCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/gallery/exm4.jpg' className={` ${indexStyles2.galleryImage}`} />
                    </div>
                    <div className={`${indexStyles2.galleryCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/gallery/exm9.jpg' className={` ${indexStyles2.galleryImage}`} />
                    </div>
                    <div className={`${indexStyles2.galleryCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/gallery/exm10.png' className={` ${indexStyles2.galleryImage}`} />
                    </div>
                    <div className={`${indexStyles2.galleryCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/gallery/exm8.png' className={` ${indexStyles2.galleryImage}`} />
                    </div>
                    <div className={`${indexStyles2.galleryCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/gallery/exm7.jpg' className={` ${indexStyles2.galleryImage}`} />
                    </div>
                    <div className={`${indexStyles2.galleryCard} d-flex flex-column align-items-center`} >
                        <img src='/images/res/gallery/exm3.jpg' className={` ${indexStyles2.galleryImage}`} />
                    </div>
                </div>
            </section>


            <section className={`d-flex flex-column w-100 align-items-center mt-5 px-md-5 py-3 ${indexStyles.contactSection}`}>
                <h3 className='text-center'>Contact Us</h3>
                <h6 className='text-center' style={{ color: '#7f8c8d' }}>We are here to help you</h6>

                <div className='d-flex flex-wrap justify-content-center align-items-center mt-3'>
                    <div className={`${indexStyles.contactCard} d-flex flex-column align-items-center justify-content-center`} >
                        <FontAwesomeIcon icon={faUserCircle} fontSize={50} style={{ color: '#192a56' }} />
                        <h5 className='mt-3'>Mr. B.H. Sudantha</h5>
                        <h6 className='text-center mt-1' style={{ color: '#636e72' }}>Senior Lecturer</h6>
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
            </section>
            <section className="mb-4">
               
                <div className="row">
                    <div className="col-md-9 mb-md-0 mb-5" style={{width : '100%'}}>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </>
    );
}
