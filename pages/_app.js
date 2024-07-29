import '@/styles/globals.css'

import {SupplyChainProvider} from '../context/SupplyChainContext'
import { NavBar, Footer } from '../components'

export default function App({ Component, pageProps }) {
  return  (
  <>
      <SupplyChainProvider>
      <NavBar />
      <Component {...pageProps} />
      </SupplyChainProvider>
      <Footer />
    </>
  );
}
