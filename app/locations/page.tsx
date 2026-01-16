import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { locations } from '@/lib/locations-data'

export const metadata: Metadata = {
  title: 'NYC Neighborhoods | Find Services by Location | Building Health X',
  description: 'Browse services by NYC neighborhood. Find trusted movers, lawyers, pest control, and more in Manhattan, Brooklyn, Queens, Bronx, and Staten Island.',
}

// Group locations by borough
const locationsByBorough = Object.entries(locations).reduce((acc, [slug, loc]) => {
  if (!acc[loc.borough]) acc[loc.borough] = []
  acc[loc.borough].push({ slug, ...loc })
  return acc
}, {} as Record<string, Array<{ slug: string; name: string; borough: string; description: string }>>)

const boroughOrder = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Locations</span>
          </nav>

          {/* Hero */}
          <div className="mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              NYC{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Neighborhoods
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Find trusted service providers in your NYC neighborhood. Each location page shows available services 
              with local tips, pricing, and what to look for.
            </p>
          </div>

          {/* Locations by Borough */}
          <div className="space-y-12">
            {boroughOrder.map((borough) => {
              const boroughLocations = locationsByBorough[borough]
              if (!boroughLocations || boroughLocations.length === 0) return null
              
              return (
                <section key={borough}>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                    {borough}
                    <span className="text-sm font-normal text-slate-500">({boroughLocations.length} areas)</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {boroughLocations.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={`/locations/${loc.slug}`}
                        className="group bg-[#12161f] border border-white/5 rounded-xl p-5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition">{loc.name}</h3>
                            <p className="text-sm text-slate-400 line-clamp-2">{loc.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
