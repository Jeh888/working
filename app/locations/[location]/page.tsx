import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MapPin, Building2, Train, Home as HomeIcon, AlertTriangle, Truck, Package, Archive, Trash2, Sparkles, Scale, ClipboardCheck, Shield, Wifi, Key, Wrench, PaintBucket, Bug, Thermometer, Droplets, Zap, AlertOctagon } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { services } from '@/lib/services-data'
import { locations } from '@/lib/locations-data'

// Helper to get icon component
const getServiceIcon = (service: string, size: string = "w-6 h-6") => {
  const icons: Record<string, React.ReactNode> = {
    'moving-companies': <Truck className={size} />,
    'packing-services': <Package className={size} />,
    'storage-facilities': <Archive className={size} />,
    'junk-removal': <Trash2 className={size} />,
    'cleaning-services': <Sparkles className={size} />,
    'tenant-lawyers': <Scale className={size} />,
    'real-estate-agents': <HomeIcon className={size} />,
    'building-inspectors': <ClipboardCheck className={size} />,
    'renters-insurance': <Shield className={size} />,
    'internet-providers': <Wifi className={size} />,
    'locksmith': <Key className={size} />,
    'furniture-assembly': <Wrench className={size} />,
    'painters': <PaintBucket className={size} />,
    'pest-control': <Bug className={size} />,
    'hvac-repair': <Thermometer className={size} />,
    'plumbers': <Droplets className={size} />,
    'electricians': <Zap className={size} />,
    'mold-remediation': <AlertOctagon className={size} />,
  }
  return icons[service] || <Wrench className={size} />
}

// Group services by category
const servicesByCategory = Object.entries(services).reduce((acc, [slug, svc]) => {
  if (!acc[svc.category]) acc[svc.category] = []
  acc[svc.category].push({ slug, ...svc })
  return acc
}, {} as Record<string, Array<{ slug: string; name: string; description: string; category: string }>>)

const categoryOrder = ['Moving Services', 'Pre-Lease Research', 'Settling In', 'Ongoing Needs']
const categoryColors: Record<string, string> = {
  'Moving Services': 'emerald',
  'Pre-Lease Research': 'blue',
  'Settling In': 'purple',
  'Ongoing Needs': 'orange'
}

type Props = { params: { location: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = locations[params.location]
  if (!location) return {}
  return {
    title: `Services in ${location.name}, ${location.borough} | Building Health X`,
    description: `Find trusted moving, legal, and home services in ${location.name}. ${location.description}. Compare providers across ${Object.keys(services).length} service categories.`,
  }
}

export async function generateStaticParams() {
  return Object.keys(locations).map((location) => ({ location }))
}

export default function LocationPage({ params }: Props) {
  const location = locations[params.location]
  if (!location) return notFound()

  // Get other locations in same borough
  const relatedLocations = Object.entries(locations)
    .filter(([slug, loc]) => loc.borough === location.borough && slug !== params.location)
    .slice(0, 8)

  // Get locations from other boroughs
  const otherBoroughLocations = Object.entries(locations)
    .filter(([slug, loc]) => loc.borough !== location.borough)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/locations" className="hover:text-white transition">Locations</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{location.name}</span>
          </nav>

          {/* HERO */}
          <div className="mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-cyan-500/10 text-cyan-400">
                {location.borough}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-blue-500/10 text-blue-400">
                {Object.keys(services).length} Services Available
              </span>
            </div>
            
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                  Services in{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {location.name}
                  </span>
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                  {location.description} Find trusted service providers for moving, repairs, legal help, and more in {location.name}.
                </p>
              </div>
            </div>

            {/* Neighborhood Quick Facts */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#12161f] border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-400">Building Types</span>
                </div>
                <p className="text-sm font-medium">{location.buildingTypes}</p>
              </div>
              <div className="bg-[#12161f] border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Train className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-slate-400">Transit</span>
                </div>
                <p className="text-sm font-medium">{location.transit}</p>
              </div>
              <div className="bg-[#12161f] border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <HomeIcon className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-slate-400">Character</span>
                </div>
                <p className="text-sm font-medium">{location.character}</p>
              </div>
              <div className="bg-[#12161f] border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span className="text-sm text-slate-400">Challenges</span>
                </div>
                <p className="text-sm font-medium">{location.challenges}</p>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">

              {/* Services by Category */}
              {categoryOrder.map((category) => {
                const categoryServices = servicesByCategory[category]
                if (!categoryServices || categoryServices.length === 0) return null
                const color = categoryColors[category] || 'blue'
                
                return (
                  <section key={category}>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full bg-${color}-400`}></span>
                      {category}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {categoryServices.map((svc) => (
                        <Link
                          key={svc.slug}
                          href={`/services/${svc.slug}/${params.location}`}
                          className="group bg-[#12161f] border border-white/5 rounded-xl p-5 hover:border-blue-500/30 hover:bg-blue-500/5 transition"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-${color}-500/10 rounded-xl flex items-center justify-center text-${color}-400 group-hover:bg-${color}-500/20 transition`}>
                              {getServiceIcon(svc.slug)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-400 transition">{svc.name}</h3>
                              <p className="text-sm text-slate-400 line-clamp-2">{svc.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition flex-shrink-0 mt-1" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )
              })}

              {/* About the Neighborhood */}
              <section className="bg-[#12161f] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold">About {location.name}</h2>
                </div>
                <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
                  <p>{location.description}</p>
                  <p>
                    <strong>Neighborhood Character:</strong> {location.character}
                  </p>
                  <p>
                    <strong>Common Challenges:</strong> {location.challenges}
                  </p>
                  <p>
                    When hiring service providers in {location.name}, keep in mind the local building types ({location.buildingTypes.toLowerCase()}) 
                    and transit options ({location.transit.toLowerCase()}). These factors can affect scheduling, pricing, and the specific 
                    expertise you'll need from providers.
                  </p>
                </div>
              </section>

              {/* Building Health X CTA */}
              <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Moving to {location.name}?</h2>
                </div>
                <p className="text-slate-300 mb-6">
                  Before you sign a lease, check the building's history. Building Health X shows violations, complaints, 
                  and issues from 55+ official NYC sources—free.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition"
                >
                  Search Any NYC Address
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </section>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Quick Links to Services */}
              <div className="bg-[#12161f] border border-white/5 rounded-xl p-5 sticky top-28">
                <h3 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">Quick Links</h3>
                <nav className="space-y-1">
                  {categoryOrder.map((category) => (
                    <a 
                      key={category}
                      href={`#${category.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                    >
                      {category}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Other Locations in Same Borough */}
              {relatedLocations.length > 0 && (
                <div className="bg-[#12161f] border border-white/5 rounded-xl p-5">
                  <h3 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">
                    More in {location.borough}
                  </h3>
                  <div className="space-y-2">
                    {relatedLocations.map(([slug, loc]) => (
                      <Link
                        key={slug}
                        href={`/locations/${slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm">{loc.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Boroughs */}
              <div className="bg-[#12161f] border border-white/5 rounded-xl p-5">
                <h3 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">
                  Other Areas
                </h3>
                <div className="space-y-2">
                  {otherBoroughLocations.map(([slug, loc]) => (
                    <Link
                      key={slug}
                      href={`/locations/${slug}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition group"
                    >
                      <div>
                        <div className="text-sm font-medium">{loc.name}</div>
                        <div className="text-xs text-slate-500">{loc.borough}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                    </Link>
                  ))}
                </div>
                <Link href="/locations" className="block mt-4 text-center text-sm text-blue-400 hover:text-blue-300 transition">
                  View all locations →
                </Link>
              </div>

              {/* Popular Services */}
              <div className="bg-[#12161f] border border-white/5 rounded-xl p-5">
                <h3 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">
                  Popular Services
                </h3>
                <div className="space-y-2">
                  {['moving-companies', 'pest-control', 'cleaning-services', 'tenant-lawyers'].map((slug) => {
                    const svc = services[slug]
                    return (
                      <Link
                        key={slug}
                        href={`/services/${slug}/${params.location}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-white transition">
                            {getServiceIcon(slug, "w-4 h-4")}
                          </div>
                          <span className="text-sm">{svc.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
