'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────
   BANKINGSIM — Homepage v2
   Desktop: Full editorial redesign with sticky nav, split hero,
            icon-tab product rail, alternating feature sections,
            5-col footer.
   Mobile:  Unchanged from original (all mobile classes preserved).
───────────────────────────────────────────────────────────────── */

const navLinks = [
  { label: 'Credit Cards',     href: '#credit-cards' },
  { label: 'Banking',          href: '#checking' },
  { label: 'Lending',          href: '#loans' },
  { label: 'Investing',        href: '#investing' },
  { label: 'Wealth Management',href: '#wealth' },
  { label: 'Open an Account',  href: '#open', highlight: true },
]

const productCategories = [
  { label: 'Credit Cards',      icon: CreditCardIcon,  href: '#credit-cards' },
  { label: 'Checking Accounts', icon: BankIcon,        href: '#checking' },
  { label: 'Mortgage',          icon: HomeIcon,        href: '#mortgage' },
  { label: 'Personal Loans',    icon: CashIcon,        href: '#loans' },
  { label: 'Investing Options', icon: ChartIcon,       href: '#investing' },
  { label: 'Small Business',    icon: BriefcaseIcon,   href: '#business' },
]

const productCards = [
  {
    eyebrow:     'BANKINGSIM® CHECKING ACCOUNTS',
    title:       'Simplified Banking',
    description: 'BankingSim mobile banking lets you manage your money, pay friends, and track spending — all on the go. Member FDIC.',
    cta:         'Learn More',
    id:          'checking',
    gradientFrom:'#dbeafe',
    gradientTo:  '#bfdbfe',
    imageBg:     'from-blue-100 to-blue-200',
    dark:        false,
  },
  {
    eyebrow:     'BANKINGSIM® SAVINGS ACCOUNTS',
    title:       'Save More, Earn More',
    description: 'Start saving with ease and grow with confidence. High-yield rates, zero fees, and the security of Member FDIC.',
    cta:         'Learn More',
    id:          'savings',
    gradientFrom:'#d1fae5',
    gradientTo:  '#a7f3d0',
    imageBg:     'from-emerald-100 to-emerald-200',
    dark:        false,
  },
  {
    eyebrow:     'BANKINGSIM® / AAADVANTAGE® CREDIT CARDS',
    title:       'Explore BankingSim / AAAdvantage® cards',
    description: 'Travel to over 1,000 destinations worldwide with BankingSim bonus miles. Redeem for upgrades, car rentals, hotel stays and more.',
    cta:         'Learn More',
    id:          'credit-cards',
    gradientFrom:'#1e3a5f',
    gradientTo:  '#0f172a',
    imageBg:     'from-slate-700 to-slate-900',
    dark:        true,
  },
]

const featureSections = [
  {
    eyebrow:     'STRATA™ CREDIT CARDS',
    title:       'Find your Strata card',
    description: 'Get rewarded for everyday essentials, extraordinary travel experiences and more.',
    cta:         'Learn More',
    bg:          'bg-sky-50',
    imageBg:     'from-slate-800 to-slate-950',
    imageRight:  false,
  },
  {
    eyebrow:     'CHECKING ACCOUNTS',
    title:       'Unlock checking that grows with you',
    description: 'The higher your balances, the more benefits and services you can enjoy from BankingSim Relationship Tiers.',
    cta:         'Learn More',
    bg:          'bg-blue-50',
    imageBg:     'from-blue-100 to-blue-300',
    imageRight:  true,
  },
]

const footerCols = [
  {
    heading: 'Why BankingSim',
    links: ['Our Story', 'Careers', 'Benefits and Services', 'Rewards', 'Special Offers'],
  },
  {
    heading: 'Wealth Management',
    links: ['Private Client', 'Citigold', 'Priority', 'Private Bank'],
  },
  {
    heading: 'Business Banking',
    links: ['Small Business Accounts', 'Commercial Accounts'],
  },
  {
    heading: 'Rates',
    links: ['Personal Banking', 'Credit Cards', 'Mortgage', 'Home Equity', 'Personal Loans'],
  },
  {
    heading: 'Help & Support',
    links: ['Contact Us', 'Security Center', 'FAQs', 'Accessibility'],
  },
]

const bottomTabs = [
  { icon: CreditCardIcon, label: 'Credit Cards' },
  { icon: BankIcon,       label: 'Checking',    active: true },
  { icon: HomeIcon,       label: 'Mortgage' },
  { icon: CashIcon,       label: 'Loans' },
]

/* ── SVG ICON COMPONENTS ── */
function CreditCardIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  )
}
function BankIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 10h18M3 10V20h18V10M3 10L12 3l9 7"/>
    </svg>
  )
}
function HomeIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function CashIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  )
}
function ChartIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}
function BriefcaseIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  )
}

/* ── CARD VISUAL (reused across hero and product sections) ── */
function CardStack({ dark = false }: { dark?: boolean }) {
  const cards = [
    { bg: 'from-slate-700 to-slate-900', rot: '-rotate-6', z: 'z-10', scale: 'scale-95' },
    { bg: 'from-primary-700 to-primary-900', rot: 'rotate-0', z: 'z-20', scale: 'scale-100' },
    { bg: 'from-slate-800 to-black', rot: 'rotate-6', z: 'z-10', scale: 'scale-95' },
  ]
  return (
    <div className="relative flex items-center justify-center h-full w-full">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`
            absolute w-36 h-24 lg:w-44 lg:h-28 rounded-2xl shadow-2xl
            bg-gradient-to-br ${c.bg} ${c.rot} ${c.z} ${c.scale}
            border border-white/10 flex flex-col justify-between p-3
            transition-transform duration-500
          `}
          style={{ left: `${20 + i * 28}%` }}
        >
          <div className="w-6 h-4 bg-yellow-300/80 rounded-sm"/>
          <div>
            <div className="text-white/50 text-[8px] tracking-widest">•••• ••••</div>
            <div className="text-white/30 text-[7px] mt-0.5">LINDA WALKER</div>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-white/40 text-[8px] font-bold">B</span>
            <div className="flex gap-[-4px]">
              <div className="w-4 h-4 rounded-full bg-red-400/60"/>
              <div className="w-4 h-4 rounded-full bg-yellow-400/60 -ml-2"/>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── SIGN-ON WIDGET ── */
function SignOnWidget() {
  const [showPw, setShowPw] = useState(false)
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 w-full max-w-[320px]">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">User ID</label>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              className="w-full border border-gray-200 rounded-lg px-3 pr-9 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              autoComplete="current-password"
            />
            <button
              onClick={() => setShowPw(!showPw)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {showPw
                  ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 mb-4 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"/>
        <span className="text-xs text-gray-600">Remember User ID</span>
      </label>

      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors mb-3">
        Sign On
      </button>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-gray-500">
          <a href="#" className="text-primary-600 hover:underline font-medium">Register</a>
          <span className="text-gray-300">/</span>
          <a href="#" className="text-primary-600 hover:underline font-medium">Activate</a>
        </div>
        <div className="text-gray-500">
          Forgot{' '}
          <a href="#" className="text-primary-600 hover:underline">User ID</a>
          {' '}or{' '}
          <a href="#" className="text-primary-600 hover:underline">Password</a>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-primary-600 font-medium">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/>
        </svg>
        Passwordless Sign On
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCat, setActiveCat] = useState(0)

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FDIC TOP BAR
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-2 flex items-center justify-between gap-3">
          {/* Left: FDIC badge + text */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="bg-primary-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm leading-tight tracking-wider">
                FDIC
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-gray-700 leading-snug">
                <span className="font-semibold">FDIC-Insured</span>
                {' – '}Backed by the full faith and credit of the U.S. Government
              </p>
              <p className="text-[11px] text-gray-400">Citibank, N.A.</p>
            </div>
          </div>
          {/* Right: ATM + Lang — desktop only */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-gray-500">
            <a href="#" className="flex flex-col items-center gap-1 hover:text-primary-600 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              ATM / Branch
            </a>
            <a href="#" className="flex flex-col items-center gap-1 hover:text-primary-600 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Español
            </a>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          NAVBAR
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 h-14 flex items-center gap-3">

          {/* Mobile: hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-gray-700 lg:hidden"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>

          {/* Desktop: Logo */}
          <div className="hidden lg:flex items-center gap-2.5 mr-6 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm">B</span>
            </div>
            <span className="font-black text-gray-900 text-[17px] tracking-tight">BankingSim</span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`
                  text-[13px] font-semibold px-3.5 py-2 rounded-md transition-colors whitespace-nowrap
                  ${link.highlight
                    ? 'text-primary-600 border border-primary-200 hover:bg-primary-50 ml-2'
                    : 'text-primary-600 hover:text-primary-800 hover:bg-gray-50'}
                `}
              >
                {link.label}
                {link.highlight && (
                  <svg className="inline ml-1 mb-0.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                )}
              </a>
            ))}
          </div>

          {/* Mobile: search pill */}
          <button className="flex-1 flex items-center gap-2.5 bg-gray-100 rounded-full px-4 h-9 text-gray-700 text-[13px] font-medium min-w-0 lg:hidden">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <span className="truncate">How can we help?</span>
          </button>

          {/* Desktop: Help link */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            <a href="#" className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700 hover:text-primary-600 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              How can we help?
            </a>
          </div>

          {/* Mobile: Sign On */}
          <Link href="/login" className="flex-shrink-0 text-[13px] font-semibold text-primary-600 whitespace-nowrap lg:hidden">
            Sign On
          </Link>
        </div>

        {/* Desktop bottom nav line */}
        <div className="hidden lg:block max-w-7xl mx-auto px-10">
          <div className="h-px bg-gray-100"/>
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)}/>
          <div className="absolute top-0 left-0 h-full w-72 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-base">BankingSim</span>
              <button onClick={() => setMenuOpen(false)} className="text-gray-500 p-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {productCategories.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-[14px] text-gray-800 font-medium border-b border-gray-50 active:bg-gray-50"
                >
                  <cat.icon className="w-5 h-5 text-primary-500"/>
                  {cat.label}
                </a>
              ))}
            </nav>
            <div className="p-5 border-t border-gray-100">
              <Link href="/login" className="block w-full text-center bg-primary-600 text-white font-semibold py-3 rounded text-sm">
                Sign On
              </Link>
              <Link href="/register" className="block w-full text-center text-primary-600 font-semibold py-3 text-sm mt-1">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ANNOUNCEMENT BANNER — desktop only
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-10 py-2.5 flex items-center gap-3">
          <svg className="text-gray-400 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
          </svg>
          <p className="text-[12px] text-gray-600 flex-1">
            Welcome to BankingSim — a portfolio demonstration. No real accounts are created.{' '}
            <a href="#" className="text-primary-600 font-semibold hover:underline">Learn More</a>
          </p>
          <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Mobile: stacked | Desktop: split grid
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white">

        {/* ── MOBILE HERO (unchanged from original) ── */}
        <div className="lg:hidden pb-8">
          <div className="w-full bg-gradient-to-br from-gray-100 via-gray-50 to-white px-6 pt-6 pb-4">
            <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
              {[
                { name: 'Double Cash', bg: 'from-slate-700 to-slate-900', accent: 'bg-blue-500' },
                { name: 'Business',    bg: 'from-gray-600 to-gray-800',   accent: 'bg-red-500'  },
                { name: 'Custom Cash', bg: 'from-blue-700 to-blue-900',   accent: 'bg-yellow-400' },
                { name: 'AAdvantage',  bg: 'from-slate-800 to-black',     accent: 'bg-slate-400' },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${card.bg} rounded-xl h-[88px] p-3 flex flex-col justify-between relative overflow-hidden shadow-md`}
                >
                  <div className="w-5 h-3.5 bg-yellow-300 rounded-sm opacity-80"/>
                  <div className="flex gap-1 items-center">
                    <span className="text-white/60 text-[8px] tracking-widest">•••• ••••</span>
                  </div>
                  <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full ${card.accent} opacity-70`}/>
                  <div className="absolute top-2 right-2 text-white text-[9px] font-bold opacity-60">B</div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 pt-5 text-center">
            <p className="text-[11px] font-bold tracking-widest text-gray-600 uppercase mb-2">
              BankingSim<sup className="text-[8px]">®</sup> Credit Cards
            </p>
            <h1 className="text-[28px] font-bold text-gray-900 leading-tight mb-3">
              Choose the right BankingSim<sup className="text-base">®</sup> credit card for you
            </h1>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-6 max-w-sm mx-auto">
              Whether you want Cash Back, a Low Intro Rate, Rewards for Costco Members, or Great Airline Miles, the choice is all yours.
            </p>
            <a
              href="#"
              className="block w-full max-w-sm mx-auto bg-primary-600 text-white font-semibold text-[15px] py-3.5 rounded-md hover:bg-primary-700 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* ── DESKTOP HERO ── */}
        <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 min-h-[480px]">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(90deg, #1e3a5f 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-10 py-16 grid grid-cols-[1fr_auto_340px] gap-12 items-center">

            {/* Left: Hero copy */}
            <div className="max-w-xl">
              <p className="text-[11px] font-bold tracking-[0.18em] text-primary-500 uppercase mb-4">
                BankingSim<sup>®</sup> Credit Cards
              </p>
              <h1 className="text-[42px] xl:text-[48px] font-black text-gray-900 leading-[1.04] tracking-tight mb-5">
                Choose the right{' '}
                <span className="text-primary-600">BankingSim<sup className="text-2xl">®</sup></span>
                {' '}credit card for you
              </h1>
              <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-md">
                Whether you want Cash Back, a Low Intro Rate, Rewards for Costco Members, or Great Airline Miles — the choice is all yours.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-[14px] px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </a>
              <a href="#" className="block mt-3 text-sm text-primary-600 font-semibold hover:underline">
                Passwordless Sign On →
              </a>
            </div>

            {/* Center: Card visual */}
            <div className="relative w-[320px] xl:w-[380px] h-[280px] flex-shrink-0">
              {/* Glowing background blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-blue-100 rounded-3xl opacity-60"/>
              <div className="relative h-full">
                {/* 2×2 card grid — matches Citi reference */}
                <div className="absolute inset-6 grid grid-cols-2 gap-3">
                  {[
                    { bg: 'from-slate-600 to-slate-900', accent: 'bg-blue-400',   name: 'Double Cash' },
                    { bg: 'from-gray-700 to-gray-900',   accent: 'bg-orange-400', name: 'Diamond' },
                    { bg: 'from-primary-700 to-primary-900', accent: 'bg-yellow-300', name: 'Custom Cash' },
                    { bg: 'from-slate-800 to-black',     accent: 'bg-slate-400',  name: 'AAdvantage' },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className={`
                        bg-gradient-to-br ${card.bg} rounded-2xl shadow-xl
                        flex flex-col justify-between p-3.5
                        border border-white/10
                        hover:scale-[1.03] transition-transform duration-300 cursor-default
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-6 h-4 bg-yellow-300/80 rounded-sm"/>
                        <span className="text-white/40 text-[9px] font-bold">B</span>
                      </div>
                      <div>
                        <div className="text-white/50 text-[8px] tracking-widest">•••• ••••</div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-white/30 text-[7px]">LINDA WALKER</span>
                          <div className="flex">
                            <div className={`w-4 h-4 rounded-full ${card.accent} opacity-70`}/>
                            <div className={`w-4 h-4 rounded-full ${card.accent} opacity-50 -ml-2`}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sign On widget */}
            <div className="flex-shrink-0">
              <SignOnWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CATEGORY TAB STRIP
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-y border-gray-100 bg-white sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 overflow-x-auto scrollbar-none">
          <div className="flex gap-0 min-w-max lg:justify-center">
            {productCategories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveCat(i)}
                className={`
                  flex flex-col items-center gap-1.5 px-4 lg:px-7 py-3 min-w-[80px] text-center
                  border-b-2 transition-all duration-200
                  ${activeCat === i
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'}
                `}
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-200
                  ${activeCat === i ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500'}
                `}>
                  <cat.icon className="w-5 h-5"/>
                </div>
                <span className="text-[11px] font-semibold leading-tight whitespace-pre-wrap w-[70px]">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRODUCT CARDS
          Mobile: stacked | Desktop: 3-col grid
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <main className="pb-24 lg:pb-0">

        {/* Mobile: stacked cards */}
        <div className="lg:hidden">
          {productCards.map((card) => (
            <article
              key={card.id}
              id={card.id}
              className="mx-4 my-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className={`w-full h-52 bg-gradient-to-br ${card.imageBg} relative flex items-center justify-center`}>
                {card.dark ? (
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {[1,2,3,4].map(n => (
                      <div key={n} className="bg-white/10 rounded-lg h-14 w-[100px] border border-white/20 flex items-center justify-center">
                        <span className="text-white/40 text-[10px] font-bold">B Card</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
                      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </div>
                )}
                <div className="absolute inset-4 border-2 border-white/30 rounded-lg pointer-events-none"/>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">{card.eyebrow}</p>
                <h2 className="text-[18px] font-bold text-gray-900 mb-2 leading-snug">{card.title}</h2>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-4">{card.description}</p>
                <a href="#" className="block w-full text-center bg-primary-600 text-white font-semibold text-[14px] py-3.5 rounded-md hover:bg-primary-700 transition-colors">
                  {card.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: 3-col grid */}
        <section className="hidden lg:block max-w-7xl mx-auto px-10 py-12">
          <div className="grid grid-cols-3 gap-6">
            {productCards.map((card) => (
              <article
                key={card.id}
                id={card.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                           hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image area */}
                <div
                  className={`
                    w-full h-48 bg-gradient-to-br ${card.imageBg}
                    relative flex items-center justify-center overflow-hidden
                  `}
                >
                  {card.dark ? (
                    <div className="grid grid-cols-2 gap-2.5 p-5">
                      {[1,2,3,4].map(n => (
                        <div
                          key={n}
                          className="bg-white/10 rounded-xl h-14 w-[96px] border border-white/15
                                     flex flex-col justify-between p-2.5
                                     group-hover:bg-white/15 transition-colors"
                        >
                          <div className="w-4 h-3 bg-yellow-300/70 rounded-sm"/>
                          <div className="text-white/30 text-[8px]">•••• ••••</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="opacity-30">
                        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={card.dark ? 'white' : '#1e40af'} strokeWidth="0.8">
                          <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {/* White frame — Citi signature */}
                  <div className="absolute inset-3 border border-white/25 rounded-xl pointer-events-none"/>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-[10px] font-bold tracking-[0.12em] text-gray-400 uppercase mb-2.5">
                    {card.eyebrow}
                  </p>
                  <h2 className="text-[17px] font-bold text-gray-900 mb-2.5 leading-snug">
                    {card.title}
                  </h2>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
                    {card.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700
                               text-white font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-colors"
                  >
                    {card.cta}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            FEATURE SECTIONS
            Mobile: stacked | Desktop: split 50/50
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* Mobile: unchanged */}
        <div className="lg:hidden">
          {featureSections.map((section, i) => (
            <section key={i} className="my-4">
              <div className={`w-full h-56 bg-gradient-to-br ${section.imageBg} relative flex items-center justify-center overflow-hidden`}>
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 220" fill="none" preserveAspectRatio="xMidYMid slice">
                  {[0,1,2,3,4,5].map(n => (
                    <ellipse key={n} cx="150" cy="280" rx={80+n*35} ry={80+n*35} stroke="white" strokeWidth="0.8"/>
                  ))}
                </svg>
                <div className="relative z-10 flex gap-3">
                  {[1,2,3].map(n => (
                    <div key={n} className={`rounded-xl border border-white/20 shadow-xl ${n===2?'w-24 h-[60px] -mt-3':'w-20 h-[52px]'} bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center`}>
                      <span className="text-white/30 text-[9px] font-bold">CARD</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${section.bg} px-5 py-7 text-center`}>
                <p className="text-[11px] font-bold tracking-widest text-gray-600 uppercase mb-2">{section.eyebrow}</p>
                <h2 className="text-[24px] font-bold text-gray-900 leading-tight mb-3">{section.title}</h2>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5 max-w-xs mx-auto">{section.description}</p>
                <a href="#" className="inline-block px-8 py-3 rounded-md font-semibold text-[14px] transition-colors bg-primary-600 text-white hover:bg-primary-700">
                  {section.cta}
                </a>
              </div>
            </section>
          ))}
        </div>

        {/* Desktop: alternating split layout */}
        <div className="hidden lg:block">
          {featureSections.map((section, i) => (
            <section key={i} className={`${section.bg}`}>
              <div className="max-w-7xl mx-auto">
                <div className={`flex ${section.imageRight ? 'flex-row-reverse' : 'flex-row'} items-stretch min-h-[340px]`}>

                  {/* Image side */}
                  <div className={`flex-1 bg-gradient-to-br ${section.imageBg} relative overflow-hidden`}>
                    {/* Animated arc lines — Citi's signature */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-15"
                      viewBox="0 0 600 340"
                      fill="none"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      {[0,1,2,3,4,5,6,7].map(n => (
                        <ellipse
                          key={n}
                          cx="300" cy="600"
                          rx={100 + n * 55}
                          ry={100 + n * 55}
                          stroke="white" strokeWidth="0.7"
                        />
                      ))}
                    </svg>

                    {/* Card display */}
                    <div className="relative z-10 h-full flex items-center justify-center py-12">
                      <div className="relative flex items-end gap-3">
                        {[
                          { w: 'w-36 h-24', rot: '-rotate-12', mt: 'mt-8', opacity: 'opacity-70' },
                          { w: 'w-44 h-28', rot: 'rotate-0',  mt: '',      opacity: 'opacity-100' },
                          { w: 'w-36 h-24', rot: 'rotate-12', mt: 'mt-8',  opacity: 'opacity-70' },
                        ].map((c, ci) => (
                          <div
                            key={ci}
                            className={`
                              ${c.w} ${c.rot} ${c.mt} ${c.opacity}
                              bg-gradient-to-br from-white/15 to-white/5
                              rounded-2xl border border-white/20 shadow-2xl
                              flex flex-col justify-between p-3.5
                              hover:scale-105 transition-transform duration-300
                            `}
                          >
                            <div className="flex justify-between items-start">
                              <div className="w-6 h-4 bg-yellow-300/70 rounded-sm"/>
                              <span className="text-white/40 text-[9px] font-bold">B</span>
                            </div>
                            <div>
                              <div className="text-white/40 text-[8px] tracking-widest">•••• ••••</div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-white/25 text-[7px]">L. WALKER</span>
                                <div className="flex">
                                  <div className="w-4 h-4 rounded-full bg-red-400/50"/>
                                  <div className="w-4 h-4 rounded-full bg-yellow-400/50 -ml-2"/>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Text side */}
                  <div className="flex-1 flex items-center px-16 py-14">
                    <div className="max-w-md">
                      <p className="text-[11px] font-bold tracking-[0.16em] text-primary-400 uppercase mb-4">
                        {section.eyebrow}
                      </p>
                      <h2 className="text-[32px] xl:text-[36px] font-black text-gray-900 leading-tight tracking-tight mb-4">
                        {section.title}
                      </h2>
                      <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
                        {section.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700
                                   text-white font-bold text-[14px] px-7 py-3.5 rounded-xl
                                   transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                      >
                        {section.cta}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M13 6l6 6-6 6"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            GOALS / LIFE & MONEY SECTION
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* Mobile */}
        <section className="lg:hidden my-4">
          <div className="w-full h-56 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-center opacity-40">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
            </div>
          </div>
          <div className="bg-white px-5 py-7 text-center border-t border-gray-100">
            <p className="text-[11px] font-bold tracking-widest text-gray-600 uppercase mb-2">LIFE AND MONEY BY BANKINGSIM</p>
            <h2 className="text-[24px] font-bold text-gray-900 leading-tight mb-3">Need Help Hitting Your Money Goals?</h2>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-5">Here are smart tips for successful saving.</p>
            <a href="#" className="inline-block px-8 py-3 bg-primary-600 text-white font-semibold rounded-md text-[14px] hover:bg-primary-700 transition-colors">
              Learn More
            </a>
          </div>
        </section>

        {/* Desktop */}
        <section className="hidden lg:block bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-10 py-16">
            <div className="flex items-center gap-16">
              {/* Left: photo placeholder */}
              <div className="flex-shrink-0 w-80 xl:w-96 h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="0.8">
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                    <svg className="mx-auto -mt-4" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="0.8">
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </div>
                </div>
                {/* Decorative frame overlay — Citi style */}
                <div className="absolute inset-4 border-2 border-blue-200/60 rounded-2xl pointer-events-none"/>
              </div>

              {/* Right: copy */}
              <div className="flex-1 max-w-lg">
                <p className="text-[11px] font-bold tracking-[0.16em] text-primary-400 uppercase mb-4">
                  Life and Money by BankingSim
                </p>
                <h2 className="text-[36px] xl:text-[40px] font-black text-gray-900 leading-tight tracking-tight mb-4">
                  Need Help Hitting Your Money Goals?
                </h2>
                <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
                  Here are smart tips for successful saving. Discover how to build wealth, reduce debt, and invest for a better financial future.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700
                             text-white font-bold text-[14px] px-7 py-3.5 rounded-xl
                             transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BOTTOM TAB BAR (mobile sticky)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
        <div className="grid grid-cols-4">
          {bottomTabs.map((tab) => (
            <button
              key={tab.label}
              className={`
                flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors
                ${tab.active ? 'text-primary-600' : 'text-gray-500'}
              `}
            >
              <tab.icon className={`w-5 h-5 ${tab.active ? 'text-primary-600' : 'text-gray-400'}`}/>
              <span className="leading-tight">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="h-safe bg-white"/>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER
          Mobile: 2-col | Desktop: 5-col + apps
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="bg-gray-900 text-white">

        {/* Desktop footer links */}
        <div className="hidden lg:block border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-10 py-12">
            <div className="grid grid-cols-5 gap-8">
              {footerCols.map((col) => (
                <div key={col.heading}>
                  <h4 className="font-bold text-white text-[13px] mb-4 tracking-tight">{col.heading}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-[12px] text-gray-400 hover:text-white transition-colors leading-snug block">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: app stores + social */}
        <div className="hidden lg:block border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-10 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Google Play */}
              <a href="#" className="flex items-center gap-2 bg-black border border-gray-700 hover:border-gray-500 rounded-lg px-4 py-2 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3.5L14.5 12 3 20.5V3.5Z" fill="#34A853"/>
                  <path d="M3 3.5L14.5 12l-4 4L3 20.5V3.5Z" fill="#FBBC04"/>
                  <path d="M14.5 12L20 15.5l-5.5-3.5Z" fill="#EA4335"/>
                  <path d="M14.5 12L20 8.5 14.5 12Z" fill="#4285F4"/>
                </svg>
                <div>
                  <div className="text-gray-400 text-[9px] leading-none">GET IT ON</div>
                  <div className="text-white text-[12px] font-semibold leading-tight">Google Play</div>
                </div>
              </a>
              {/* App Store */}
              <a href="#" className="flex items-center gap-2 bg-black border border-gray-700 hover:border-gray-500 rounded-lg px-4 py-2 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-gray-400 text-[9px] leading-none">Download on the</div>
                  <div className="text-white text-[12px] font-semibold leading-tight">App Store</div>
                </div>
              </a>
            </div>
            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { label: 'X / Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d={social.path}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile footer links */}
        <div className="lg:hidden px-4 py-10 pb-32">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">B</span>
            </div>
            <span className="font-bold text-white text-base">BankingSim</span>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Credit Cards</a></li>
                <li><a href="#" className="hover:text-white">Checking</a></li>
                <li><a href="#" className="hover:text-white">Savings</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-xs text-gray-400 mb-4">© {new Date().getFullYear()} BankingSim. All rights reserved.</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              BankingSim is a software simulation for portfolio demonstration only. Not a real bank.
            </p>
          </div>
        </div>

        {/* Bottom legal bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 lg:px-10 py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
            <p className="text-[11px] text-gray-500">
              © {new Date().getFullYear()} BankingSim Inc.&nbsp;&nbsp;
              <a href="#" className="hover:text-gray-300 transition-colors">Terms &amp; Conditions</a>&nbsp;&nbsp;·&nbsp;&nbsp;
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>&nbsp;&nbsp;·&nbsp;&nbsp;
              <a href="#" className="hover:text-gray-300 transition-colors">Accessibility</a>&nbsp;&nbsp;·&nbsp;&nbsp;
              <a href="#" className="hover:text-gray-300 transition-colors">Do Not Sell My Personal Information</a>
            </p>
            {/* FDIC Equal Housing Icon */}
            <div className="flex items-center gap-2 text-gray-500 text-[10px]">
              <div className="w-6 h-6 border border-gray-600 rounded flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
              </div>
              Equal Housing Lender
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 lg:px-10 pb-6 hidden lg:block">
            <p className="text-[11px] text-gray-600 leading-relaxed font-semibold mb-1">Important Legal Disclosures &amp; Information</p>
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-5xl">
              BankingSim is a software simulation built for portfolio demonstration and educational purposes only. It is not a bank, is not affiliated with any financial institution, and is not FDIC insured. No real accounts are opened, no real funds are held or transferred. All data shown is fictional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}