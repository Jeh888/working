import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MapPin, CheckCircle2, Clock, DollarSign, Building2, Lightbulb, HelpCircle, Truck, Package, Archive, Trash2, Sparkles, Scale, Home, ClipboardCheck, Shield, Wifi, Key, Wrench, PaintBucket, Bug, Thermometer, Droplets, Zap, AlertOctagon } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { services } from '@/lib/services-data'
import { locations } from '@/lib/locations-data'

// Helper to get icon component
const getServiceIcon = (service: string) => {
  const icons: Record<string, React.ReactNode> = {
    'moving-companies': <Truck className="w-6 h-6" />,
    'packing-services': <Package className="w-6 h-6" />,
    'storage-facilities': <Archive className="w-6 h-6" />,
    'junk-removal': <Trash2 className="w-6 h-6" />,
    'cleaning-services': <Sparkles className="w-6 h-6" />,
    'tenant-lawyers': <Scale className="w-6 h-6" />,
    'real-estate-agents': <Home className="w-6 h-6" />,
    'building-inspectors': <ClipboardCheck className="w-6 h-6" />,
    'renters-insurance': <Shield className="w-6 h-6" />,
    'internet-providers': <Wifi className="w-6 h-6" />,
    'locksmith': <Key className="w-6 h-6" />,
    'furniture-assembly': <Wrench className="w-6 h-6" />,
    'painters': <PaintBucket className="w-6 h-6" />,
    'pest-control': <Bug className="w-6 h-6" />,
    'hvac-repair': <Thermometer className="w-6 h-6" />,
    'plumbers': <Droplets className="w-6 h-6" />,
    'electricians': <Zap className="w-6 h-6" />,
    'mold-remediation': <AlertOctagon className="w-6 h-6" />,
  }
  return icons[service] || <Wrench className="w-6 h-6" />
}

type Props = { params: { service: string; location: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services[params.service]
  const location = locations[params.location]
  if (!service || !location) return {}
  return {
    title: `${service.name} in ${location.name}, ${location.borough} | Building Health X`,
    description: `Find trusted ${service.name.toLowerCase()} in ${location.name}. ${service.description}. Tips, costs, and what to look for when hiring in ${location.borough}.`,
  }
}

export async function generateStaticParams() {
  const params: { service: string; location: string }[] = []
  for (const serviceSlug of Object.keys(services)) {
    for (const locationSlug of Object.keys(locations)) {
      params.push({ service: serviceSlug, location: locationSlug })
    }
  }
  return params
}

export default function ServiceLocationPage({ params }: Props) {
  const service = services[params.service]
  const location = locations[params.location]
  if (!service || !location) return notFound()

  const relatedLocations = Object.entries(locations).filter(([slug, loc]) => loc.borough === location.borough && slug !== params.location).slice(0, 8)
  const allServices = Object.entries(services).filter(([slug]) => slug !== params.service).slice(0, 8)

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/services/${params.service}`} className="hover:text-white transition">{service.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{location.name}</span>
          </nav>

          {/* HERO */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-emerald-500/10 text-emerald-400">{service.category}</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-blue-500/10 text-blue-400">{location.name}</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-purple-500/10 text-purple-400">{location.borough}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                {service.name} in <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">{location.name}</span>, {location.borough}
              </h1>
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">{service.intro}</p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-400" /></div>
                  <div><div className="font-semibold">Vetted Providers</div><div className="text-sm text-slate-500">Licensed & insured</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center"><Clock className="w-5 h-5 text-blue-400" /></div>
                  <div><div className="font-semibold">{service.timeline.split(';')[0]}</div><div className="text-sm text-slate-500">Typical timeline</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center"><DollarSign className="w-5 h-5 text-purple-400" /></div>
                  <div><div className="font-semibold">{service.costRange.split(',')[0].split(' ')[0]}</div><div className="text-sm text-slate-500">Starting cost</div></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href="#about" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition">About {location.name}</a>
                <a href="#why-need" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition">Why You Need This</a>
                <a href="#what-to-look-for" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition">What to Look For</a>
                <a href="#costs" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition">Costs</a>
                <a href="#faq" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition">FAQ</a>
              </div>
            </div>

            {/* CTA FORM */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 sticky top-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">{getServiceIcon(params.service)}</div>
                  <div><h3 className="font-semibold text-lg">Get Help in {location.name}</h3><p className="text-sm text-slate-400">Connect with trusted providers</p></div>
                </div>
                <form className="space-y-3">
                  <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition" />
                  <input type="tel" placeholder="Phone" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition" />
                  <input type="text" placeholder="Address (optional)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition" />
                  <textarea placeholder="Brief description of your need" rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition resize-none" />
                  <button className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition">Request {service.name}</button>
                </form>
                <p className="text-xs text-slate-500 mt-4 text-center">By submitting, you agree to be contacted about your request.</p>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* About the Neighborhood */}
              <section id="about" className="bg-[#12161f] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center"><MapPin className="w-6 h-6 text-cyan-400" /></div>
                  <h2 className="text-2xl font-bold">About {location.name}: What to Know</h2>
                </div>
                <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
                  <p>{location.description}</p>
                  <p>When hiring {service.name.toLowerCase()} in {location.name}, understanding the neighborhood helps set expectations. {location.character}. {location.challenges}.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                  <div className="bg-white/5 rounded-xl p-4"><div className="text-sm text-slate-500 mb-1">Building Types</div><div className="font-semibold text-sm">{location.buildingTypes}</div></div>
                  <div className="bg-white/5 rounded-xl p-4"><div className="text-sm text-slate-500 mb-1">Transit Options</div><div className="font-semibold text-sm">{location.transit}</div></div>
                </div>
              </section>

              {/* Why You Need This */}
              <section id="why-need" className="bg-[#12161f] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">{getServiceIcon(params.service)}</div>
                  <h2 className="text-2xl font-bold">Why {location.name} Residents Need {service.name}</h2>
                </div>
                <ul className="space-y-4">
                  {service.whyNeed.map((reason, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-emerald-500/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /></div>
                      <span className="text-slate-300">{reason}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* What to Look For */}
              <section id="what-to-look-for" className="bg-[#12161f] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center"><ClipboardCheck className="w-6 h-6 text-purple-400" /></div>
                  <h2 className="text-2xl font-bold">What to Look For in {service.name}</h2>
                </div>
                <div className="space-y-6">
                  {service.whatToLookFor.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="w-8 h-8 bg-purple-500/15 rounded-lg flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-5 h-5 text-purple-400" /></div>
                      <div><h4 className="font-semibold text-lg mb-1">{item.title}</h4><p className="text-slate-400">{item.desc}</p></div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Costs & Timeline */}
              <section id="costs" className="bg-[#12161f] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center"><DollarSign className="w-6 h-6 text-green-400" /></div>
                  <h2 className="text-2xl font-bold">{service.name} Costs in {location.name}</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6"><div className="text-sm text-slate-500 mb-2 uppercase tracking-wide">Typical Cost Range</div><div className="text-lg font-semibold text-emerald-400">{service.costRange}</div></div>
                  <div className="bg-white/5 rounded-xl p-6"><div className="text-sm text-slate-500 mb-2 uppercase tracking-wide">Timeline</div><div className="text-lg font-semibold">{service.timeline}</div></div>
                </div>
                <div className="mt-6 bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-2">Pro Tip for {location.name}</h4>
                      <p className="text-slate-400 text-sm">
                        {location.borough === 'Manhattan' 
                          ? `Manhattan buildings often have strict requirements. Confirm your provider can meet COI and scheduling requirements before booking.`
                          : location.borough === 'Brooklyn'
                          ? `Many ${location.name} buildings are walk-ups or brownstones. Confirm your provider has experience with stairs and tight spaces.`
                          : `${location.name} may have longer travel times from Manhattan-based providers. Consider Queens/Brooklyn-based companies for better availability.`}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" className="bg-[#12161f] border border-white/5 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center"><HelpCircle className="w-6 h-6 text-blue-400" /></div>
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
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center"><Building2 className="w-6 h-6 text-blue-400" /></div>
                  <h2 className="text-2xl font-bold">Moving to {location.name}?</h2>
                </div>
                <p className="text-slate-300 mb-6">Before you sign a lease, check the building's history. Building Health X shows violations, complaints, and issues from 55+ official NYC sources—free.</p>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition">Search Any NYC Address<ChevronRight className="w-5 h-5" /></Link>
              </section>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#12161f] border border-white/5 rounded-xl p-5 sticky top-28">
                <h3 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">On This Page</h3>
                <nav className="space-y-1">
                  <a href="#about" className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition">About {location.name}</a>
                  <a href="#why-need" className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition">Why You Need This</a>
                  <a href="#what-to-look-for" className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition">What to Look For</a>
                  <a href="#costs" className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition">Costs & Timeline</a>
                  <a href="#faq" className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition">FAQ</a>
                </nav>
              </div>

              {relatedLocations.length > 0 && (
                <div className="bg-[#12161f] border border-white/5 rounded-xl p-5">
                  <h3 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">{service.name} Nearby</h3>
                  <div className="space-y-2">
                    {relatedLocations.map(([slug, loc]) => (
                      <Link key={slug} href={`/services/${params.service}/${slug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition group">
                        <div><div className="font-medium text-sm">{loc.name}</div><div className="text-xs text-slate-500">{loc.borough}</div></div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#12161f] border border-white/5 rounded-xl p-5">
                <h3 className="font-semibold mb-4 text-sm text-slate-400 uppercase tracking-wider">Other Services in {location.name}</h3>
                <div className="space-y-2">
                  {allServices.map(([slug, svc]) => (
                    <Link key={slug} href={`/services/${slug}/${params.location}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition group">
                      <span className="text-sm">{svc.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                    </Link>
                  ))}
                </div>
                <Link href="/services" className="block mt-4 text-center text-sm text-blue-400 hover:text-blue-300 transition">View all services →</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
