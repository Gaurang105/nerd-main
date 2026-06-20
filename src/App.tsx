import Hero from './components/Hero'
import IntroFeatureSection from './components/IntroFeatureSection'
import SyncedKnowledgeSection from './components/SyncedKnowledgeSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <IntroFeatureSection />
      <SyncedKnowledgeSection />
      <Footer />
    </main>
  )
}
