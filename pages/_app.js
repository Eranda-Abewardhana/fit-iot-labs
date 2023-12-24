import 'bootstrap/dist/css/bootstrap.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import { SharedContextProvider } from '../contexts/sharedContext.js';

config.autoAddCss = false;

export default function MyApp({ Component, pageProps }) {
    return (
        <SharedContextProvider>
            <Component {...pageProps} />
        </SharedContextProvider>
    )
}