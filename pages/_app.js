import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <component>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </component>

  )
}

export default MyApp
