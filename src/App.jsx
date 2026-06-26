import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import QuantitativeData from './pages/QuantitativeData'
import BeforeAfter from './pages/BeforeAfter'
import CreativeChallenges from './pages/CreativeChallenges'
import FutureOutlook from './pages/FutureOutlook'
import ShowcasePortfolio from './pages/ShowcasePortfolio'
import Identity from './pages/Identity'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ background: '#F8F6F1' }}>
        <Navigation />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quantitative" element={<QuantitativeData />} />
            <Route path="/before-after" element={<BeforeAfter />} />
            <Route path="/challenges" element={<CreativeChallenges />} />
            <Route path="/future" element={<FutureOutlook />} />
            <Route path="/portfolio" element={<ShowcasePortfolio />} />
            <Route path="/identity" element={<Identity />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
