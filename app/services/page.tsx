// app/services/[service]/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChevronRight,
  MapPin,
  CheckCircle2,
  Clock,
  DollarSign,
  Building2,
  Lightbulb,
  HelpCircle,
  Truck,
  Package,
  Archive,
  Trash2,
  Sparkles,
  Scale,
  Home,
  ClipboardCheck,
  Shield,
  Wifi,
  Key,
  Wrench,
  PaintBucket,
  Bug,
  Thermometer,
  Droplets,
  Zap,
  AlertOctagon,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { services } from '@/lib/services-data'
import { locations } from '@/lib/locations-data'

// Helper to get icon component
const getServiceIcon = (service: string, size: string = 'w-6 h-6') => {
  const icons: Record<string, React.ReactNode> = {
    'moving-companies': <Truck className={size} />,
    'packing-services': <Package className={size} />,
    'storage-facilities': <Archive className={size} />,
    'junk-removal': <Trash2 className={size} />,
    'cleaning-services': <Sparkles className={size} />,
    'tenant-lawyers': <Scale className={size} />,
    'real-estate-agents': <Home className={size} />,
    'building-inspectors': <ClipboardCheck className={size} />,
    'renters-insurance': <Shield className={size} />,
    'internet-providers': <Wifi className={size} />,
    locksmith: <Key className={size} />,
    'furniture-assembly': <Wrench className={size} />,
    painters: <PaintBucket className={size} />,
    'pest-control': <Bug className={size} />,
    'hvac-repair': <Thermometer className={size} />,
    plumbers: <Droplets className={size} />,
    electricians: <Zap className={size} />,
    'mold-remediation': <AlertOctagon className={size} />,
  }
  return icons[service] || <Wrench className={size} />
}

// Group locations by borough
const locationsByBorough = Object.entries(locations).reduce((acc, [slug, loc]) => {
  if (!acc[loc.borough]) acc[loc.borough] = []
  acc[loc.borough].push({ slug, ...loc })
  return acc
}, {} as Record<
  string,
  Array<{
    slug: string
    name: string
    borough: string
    description: string
    buildingTypes: string
    transit: string
    character: string
    challenges: string
  }>
>)

const boroughOrder = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']

type Props = { params: { service: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services[params.service]
  if (!service) return {}
  return {
    title: `${service.name} in NYC | All Neighborhoods | Building Health X`,
    description: `Find trusted ${service.name.toLowerCase()} across all NYC neighborhoods. ${service.description}. Compare by borough and neighborhood.`,
  }
}

export async function generateStaticParams() {
  return Object.keys(services).map((service) => ({ service }))
}

export default function ServicePage({ params }: Props) {
  const service = services[params.service]
  if (!service) return notFound()

  // Get related services in same category
  const relatedServices = Object.entries(services)
    .filter(([slug, svc]) => svc.category === service.category && slug !== params.service)
    .slice(0, 4)

  // Get other services from different categories
  const otherServices = Object.entries(services)
    .filter(([slug, svc]) => svc.category !== service.category)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{service.name}</span>
          </nav>

          {/* HERO */}
          <div className="mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-emerald-500/10 text-emerald-400">
                {service.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-blue-500/10 text-blue-400">
                {Object.keys(locations).length} NYC Neighborhoods
              </span>
            </div>

            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                {getServiceIcon(params.service, 'w-8 h-8')}
              </div>
              <div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                  {service.name} in{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                    New York City
                  </span>
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">{service.intro}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-semibold">Vetted Providers</div>
                  <div className="text-sm text-slate-500">Licensed & insured</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold">{service.timeline.split(';')[0]}</div>
                  <div className="text-sm text-slate-500">Typical timeline</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold">{service.costRange.split(',')[0]}</div>
                  <div className="text-sm text-slate-500">Starting cost</div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Browse by Borough */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Find {service.name} by Neighborhood</h2>
                <p className="text-slate-400 mb-8">
                  Select a neighborhood below to find {service.name.toLowerCase()} specific to that area,
                  including local tips, pricing, and what to look for.
                </p>

                {boroughOrder.map((borough) => {
                  const boroughLocations = locationsByBorough[borough]
                  if (!boroughLocations || boroughLocations.length === 0) return null

                  return (
                    <div key={borough} className="mb-8">
                      <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        {borough}
                        <span className="text-sm font-normal text-slate-500">
                          ({boroughLocations.length} areas)
                        </span>
                      </h3>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {boroughLocations.map((loc) => (
                          <Link
                            key={loc.slug}
                            href={`/services/${params.service}/${loc.slug}`}
                            className="group p-4 bg-[#12161f] border border-white/5 rounded-xl hover:border-blue-500/30 hover:bg-blue-500/5 transition"
                          >
                            <div className="font-medium group-hover:text-blue-400 transition">{loc.name}</div>
                            <div className="text-sm text-slate-500 mt-1 line-clamp-1">
                              {loc.character.split(',')[0]}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </section>

              {/* Why You Need This Service */}
              <section className="bg-[#12161f] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                    {getServiceIcon(params.service)}
                  </div>
                  <h2 className="text-2xl font-bold">Why NYC Renters Need {service.name}</h2>
                </div>
                <ul className="space-y-4">
                  {service.whyNeed.map((reason, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-emerald-500/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-slate-300">{reason}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* What to Look For */}
              <section className="bg-[#12161f] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <ClipboardCheck className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold">What to Look For in {service.name}</h2>
                </div>
                <div className="space-y-6">
                  {service.whatToLookFor.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0"
                    >
                      <div className="w-8 h-8 bg-purple-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                        <p className="text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Costs & Timeline */}
              <section className="bg-[#12161f] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold">{service.name} Costs in NYC</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <div className="text-sm text-slate-500 mb-2 uppercase tracking-wide">Typical Cost Range</div>
                    <div className="text-lg font-semibold text-emerald-400">{service.costRange}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <div className="text-sm text-slate-500 mb-2 uppercase tracking-wide">Timeline</div>
                    <div className="text-lg font-semibold">{service.timeline}</div>
                  </div>
                </div>
                <div className="mt-6 bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-2">NYC-Specific Tip</h4>
                      <p className="text-slate-400 text-sm">
                        Prices can vary significantly by neighborhood and building type. Manhattan tends to be
                        more expensive, while outer boroughs often offer better rates. Always get multiple quotes
                        and ask about any building-specific requirements that might affect pricing.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-[#12161f] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-6">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
                      <h4 className="font-semibold text-lg mb-2">{faq.q}</h4>
                      <p className="text-slate-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Building Health X CTA */}
              <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Moving to NYC?</h2>
                </div>
                <p className="text-slate-300 mb-6">
                  Before you sign a lease, check the building&apos;s history. Building Health X shows violations,
                  complaints, and issues from 55+ official NYC sources—free.
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
            <div className="lg:col-span-1">
              {/* Make the whole sidebar sticky as ONE unit (prevents overlap) */}
              <div className="space-y-6 lg:sticky lg:top-28 self-start">
                {/* CTA Form (NO sticky here) */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                      {getServiceIcon(params.service)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Get {service.name}</h3>
                      <p className="text-sm text-slate-400">Connect with trusted providers</p>
                    </div>
                  </div>
                  <form className="space-y-3">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                    <input
                      type="text"
                      placeholder="NYC Neighborhood"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                    <textarea
                      placeholder="Brief description of your need"
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition resize-none"
                    />
                    <button className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition">
                      Request {service.name}
                    </button>
                  </form>
                  <p className="text-xs text-slate-500 mt-4 text-center">
                    By submitting, you agree to be contacted about your request.
                  </p>
                </div>

                {/* Related Services (Same Category) */}
                {relatedServices.length > 0 && (
                  <div className="bg-[#12161f] border border-white/5 rounded-xl p-5">
                    <h3 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">
                      Related {service.category}
                    </h3>
                    <div className="space-y-2">
                      {relatedServices.map(([slug, svc]) => (
                        <Link
                          key={slug}
                          href={`/services/${slug}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-white transition">
                              {getServiceIcon(slug, 'w-4 h-4')}
                            </div>
                            <span className="text-sm">{svc.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Services */}
                <div className="bg-[#12161f] border border-white/5 rounded-xl p-5">
                  <h3 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">Other Services</h3>
                  <div className="space-y-2">
                    {otherServices.map(([slug, svc]) => (
                      <Link
                        key={slug}
                        href={`/services/${slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-white transition">
                            {getServiceIcon(slug, 'w-4 h-4')}
                          </div>
                          <span className="text-sm">{svc.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                      </Link>
                    ))}
                  </div>
                  <Link href="/services" className="block mt-4 text-center text-sm text-blue-400 hover:text-blue-300 transition">
                    View all services →
                  </Link>
                </div>

                {/* Quick Borough Links (optional — keep or delete) */}
                <div className="bg-[#12161f] border border-white/5 rounded-xl p-5">
                  <h3 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">Jump to Borough</h3>
                  <div className="space-y-2">
                    {boroughOrder.map((borough) => {
                      const count = locationsByBorough[borough]?.length || 0
                      if (count === 0) return null
                      return (
                        <Link
                          key={borough}
                          href={`/services/${params.service}/${borough.toLowerCase().replace(' ', '-')}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition group"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <span className="text-sm">{borough}</span>
                          </div>
                          <span className="text-xs text-slate-500">{count} areas</span>
                        </Link>
                      )
                    })}
                  </div>
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
