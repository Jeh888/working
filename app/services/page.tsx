import Link from 'next/link'
import { Metadata } from 'next'
import { 
  Search, Truck, Home, Settings, ChevronRight,
  Scale, Shield, ClipboardCheck, Building2,
  Package, Warehouse, Trash2, Sparkles, Wrench,
  Wifi, Zap, Key, Sofa, Paintbrush, Blinds,
  Bug, Wind, Droplets, Plug, ThermometerSun, FlaskConical,
  CreditCard, Landmark, FileText
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'NYC Renter Services | Building Health X',
  description: 'Find trusted services for NYC renters: tenant lawyers, moving companies, pest control, HVAC repair, and more. Connect with vetted local professionals.',
  keywords: ['NYC renter services', 'tenant lawyer NYC', 'moving company NYC', 'pest control NYC', 'HVAC repair NYC', 'locksmith NYC', 'renters insurance NYC'],
}

const serviceCategories = [
  {
    id: 'pre-lease',
    title: 'Pre-Lease Research',
    description: 'Make informed decisions before signing your lease',
    icon: Search,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    services: [
      { name: 'Real Estate Agents', description: 'Tenant-focused brokers who work for you', icon: Building2 },
      { name: 'Tenant Lawyers', description: 'Legal review of your lease agreement', icon: Scale },
      { name: 'Building Inspectors', description: 'Professional pre-move inspections', icon: ClipboardCheck },
      { name: 'Renters Insurance', description: 'Compare quotes and get covered', icon: Shield },
    ]
  },
  {
    id: 'moving',
    title: 'Moving Services',
    description: 'Everything you need for a smooth move',
    icon: Truck,
    color: 'emerald',
    gradient: 'from-emerald-500 to-emerald-600',
    services: [
      { name: 'Moving Companies', description: 'Licensed and insured NYC movers', icon: Truck },
      { name: 'Packing Services', description: 'Professional packing and unpacking', icon: Package },
      { name: 'Storage Facilities', description: 'Short and long-term storage options', icon: Warehouse },
      { name: 'Junk Removal', description: 'Get rid of unwanted items', icon: Trash2 },
      { name: 'Move-Out Cleaning', description: 'Deep cleaning for your old place', icon: Sparkles },
      { name: 'Handyman Services', description: 'Repairs before you move out', icon: Wrench },
    ]
  },
  {
    id: 'settling-in',
    title: 'Settling In',
    description: 'Get your new place set up quickly',
    icon: Home,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    services: [
      { name: 'Internet Providers', description: 'Compare speeds and prices', icon: Wifi },
      { name: 'Utility Setup', description: 'Electric, gas, and water connections', icon: Zap },
      { name: 'Locksmith Services', description: 'Change locks for security', icon: Key },
      { name: 'Furniture Assembly', description: 'IKEA and flat-pack assembly', icon: Sofa },
      { name: 'Painters', description: 'Refresh your new space', icon: Paintbrush },
      { name: 'Window Treatments', description: 'Blinds, shades, and curtains', icon: Blinds },
    ]
  },
  {
    id: 'ongoing',
    title: 'Ongoing Tenant Needs',
    description: 'Services for when issues arise',
    icon: Settings,
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600',
    services: [
      { name: 'Tenant Lawyers', description: 'Dispute resolution and rights', icon: Scale },
      { name: 'Pest Control', description: 'Bed bugs, roaches, rodents', icon: Bug },
      { name: 'HVAC Repair', description: 'Heating and cooling issues', icon: ThermometerSun },
      { name: 'Plumbers', description: 'Leaks, clogs, and repairs', icon: Droplets },
      { name: 'Electricians', description: 'Wiring and electrical issues', icon: Plug },
      { name: 'Mold Remediation', description: 'Testing and removal services', icon: Wind },
      { name: 'Air Quality Testing', description: 'Indoor air quality assessment', icon: FlaskConical },
    ]
  },
  {
    id: 'financial',
    title: 'Insurance & Financial',
    description: 'Protect yourself and your finances',
    icon: CreditCard,
    color: 'cyan',
    gradient: 'from-cyan-500 to-cyan-600',
    services: [
      { name: 'Renters Insurance', description: 'Protect your belongings', icon: Shield },
      { name: 'Security Deposit Alternatives', description: 'Rhino, Jetty, and more', icon: Landmark },
      { name: 'Rent Reporting', description: 'Build credit by paying rent', icon: FileText },
      { name: 'Guarantor Services', description: 'Insurent, The Guarantors', icon: Scale },
    ]
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', hover: 'hover:border-blue-500/40' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/40' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', hover: 'hover:border-purple-500/40' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', hover: 'hover:border-orange-500/40' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', hover: 'hover:border-cyan-500/40' },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 text-sm font-semibold rounded-full mb-4 uppercase tracking-wider">
              NYC Renter Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Everything You Need,<br />
              <span className="gradient-text">From Lease to Living</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              We connect NYC renters with trusted local professionals — from pre-lease research to ongoing maintenance. All vetted, all local, all for you.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-8 bg-[var(--bg-secondary)] border-y border-[var(--border-primary)] sticky top-[73px] z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {serviceCategories.map((cat) => {
              const colors = colorMap[cat.color]
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${colors.bg} ${colors.border} ${colors.hover} transition`}
                >
                  <cat.icon className={`w-4 h-4 ${colors.text}`} />
                  <span className="text-sm font-medium">{cat.title}</span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <main className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-20 sm:space-y-28">
          {serviceCategories.map((category) => {
            const colors = colorMap[category.color]
            return (
              <section key={category.id} id={category.id} className="scroll-mt-40">
                {/* Category Header */}
                <div className="flex items-start gap-4 mb-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">{category.title}</h2>
                    <p className="text-[var(--text-secondary)]">{category.description}</p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service) => (
                    <div
                      key={service.name}
                      className={`group bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-5 hover:border-[var(--border-secondary)] transition cursor-pointer card-lift`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <service.icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1 group-hover:text-[var(--text-primary)] transition">{service.name}</h3>
                          <p className="text-sm text-[var(--text-muted)]">{service.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] group-hover:translate-x-1 transition flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
            We're constantly adding new services. Let us know what you're looking for and we'll help connect you with the right professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition">
              <Building2 className="w-5 h-5" />
              Research a Building
            </Link>
            <Link href="/blog" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--bg-hover)] hover:bg-[var(--bg-card)] border border-[var(--border-primary)] font-semibold rounded-xl transition">
              Read Our Blog
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
