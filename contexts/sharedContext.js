import React, { createContext, useState } from 'react';

export const sharedContext = createContext();

export const SharedContextProvider = ({ children }) => {
    const [email, setEmail] = useState(0);
    const [mainSettings, setMainSettings] = useState([]);
    const [stations, setStations] = useState([

    ]);
  
    return (
      <sharedContext.Provider value={{ email, mainSettings, stations, setEmail, setMainSettings, setStations }}>
        {children}
      </sharedContext.Provider>
    );
  };