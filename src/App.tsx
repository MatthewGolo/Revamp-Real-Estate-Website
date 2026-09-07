import { useState, useEffect, useRef } from "react";
import heroImage from "./imports/image14.webp"
import Marci from "./imports/image8.webp"
import image1 from "./imports/image10.webp"
import image2 from "./imports/image12.webp"
import image3 from "./imports/image11.webp"
import image4 from "./imports/image13.webp"
import image5 from "./imports/image7.webp"
import image6 from "./imports/image9.webp"

const LISTING_IMAGES = [image1, image2, image3, image4, image5, image6];

const NAV_LINKS = ["Home", "Listings", "Services", "About", "Contact"];

const STATS = [
  { value: "30", suffix: "+", label: "Years Experience" },
  { value: "90", suffix: "+", label: "Clients Served in 2021" },
  { value: "$28.5M", suffix: "", label: "Closed in Sales (2021)" },
  { value: "100", suffix: "%", label: "Dedicated to You" },
];

const SERVICES = [
  {
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
      </svg>
    ),
    title: "Sell Your Home",
    desc: "We exhaust every avenue to ensure your listing reaches every possible buyer — from digital marketing to personal outreach. Get it SOLD.",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
      </svg>
    ),
    title: "Find Your Home",
    desc: "Comprehensive market analysis, curated property tours, upgrade lists, and trusted contractor referrals to help you make the right move.",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m0 0l-3-3m3 3l-3 3M3 17l4-4 3 3 4-4 4 4" />
      </svg>
    ),
    title: "Investment Properties",
    desc: "From commercial spaces to fixer-uppers and luxury residences, we match investors with opportunities that deliver lasting value.",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
    title: "Lending & Credit",
    desc: "Connections to trusted lending and credit professionals to simplify your financing and put your best offer forward with confidence.",
  },
];

const PROPERTY_TYPES = ["Luxury Homes", "Condominiums", "Commercial", "Fixer-Uppers", "Residential", "Investment"];

const NV_LOCATIONS = [
  "Any", "Alamo", "Alton", "Amargosa Valley", "Beatty", "Beryl", "Blue Diamond",
  "Boulder City", "Brian Head", "Cal Nev Ari", "Caliente", "Cold Creek", "Crystal",
  "Duck Creek Village", "Dyer", "Elko", "Ely", "Goldfield", "Goodsprings", "Hatch",
  "Henderson", "Indian Springs", "Jean", "Las Vegas", "Laughlin", "Logandale",
  "Mesquite", "Moapa", "Nelson", "Nipton", "North Las Vegas", "Overton",
  "Pahrump", "Primm", "Searchlight", "Sloan", "Summerlin", "Tonopah", "Winslow",
];

const LISTING_TYPES = ["Any", "Land", "Residential Lease", "High Rise", "Residential", "Luxury Home", "Condominium", "Commercial", "Fixer-Upper"];

const SORT_OPTIONS = [
  "Newest", "Oldest",
  "Least Expensive to Most", "Most Expensive to Least",
  "Bedrooms (Low to High)", "Bedrooms (High to Low)",
  "Bathrooms (Low to High)", "Bathrooms (High to Low)",
];

const NUMBER_OPTIONS = ["Any Number", "1", "2", "3", "4", "5+"];

// Searchable dropdown component
function SearchableDropdown({
  label, options, value, onChange,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-semibold text-[#4a4540] tracking-[0.08em] uppercase mb-2">{label}</label>
      <button
        type="button"
        onClick={() => { setOpen(!open); setQuery(""); }}
        className="w-full border border-[#c8c2b8] bg-white px-4 py-3 text-sm text-[#2d2d2d] flex items-center justify-between hover:border-[#b8903a] transition-colors"
      >
        <span className={value === "Any" || value === "" ? "text-[#9a9188]" : "text-[#2d2d2d]"}>{value || "Any"}</span>
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={`transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 bg-white border border-[#c8c2b8] shadow-lg mt-0.5">
          <div className="p-2 border-b border-[#ede7dc]">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to filter..."
              className="w-full px-3 py-2 text-sm border border-[#c8c2b8] text-[#2d2d2d] placeholder-[#9a9188] focus:border-[#b8903a] outline-none"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); setQuery(""); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  opt === value
                    ? "bg-[#1a5fb4] text-white font-medium"
                    : "text-[#2d2d2d] hover:bg-[#f0ece6]"
                }`}
              >
                {opt}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-3 text-sm text-[#9a9188] italic">No results</div>
            )}
          </div>
          {value && value !== "Any" && (
            <div className="border-t border-[#ede7dc] px-4 py-2 text-xs text-[#7a7265] bg-[#f7f3ee]">
              Selected: <span className="font-semibold text-[#1a2740]">{value}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Simple select dropdown styled to match
function SelectDropdown({
  label, options, value, onChange, placeholder,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#4a4540] tracking-[0.08em] uppercase mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-[#c8c2b8] bg-white px-4 py-3 text-sm text-[#2d2d2d] appearance-none hover:border-[#b8903a] transition-colors cursor-pointer focus:border-[#b8903a] outline-none"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7a7265]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

const LISTINGS = [
  { beds: 4, baths: 3, sqft: "2,840", price: "$485,000", type: "Luxury Home", address: "Pahrump, NV" },
  { beds: 3, baths: 2, sqft: "1,920", price: "$318,500", type: "Residential", address: "Pahrump, NV" },
  { beds: 2, baths: 2, sqft: "1,250", price: "$229,000", type: "Condominium", address: "Pahrump, NV" },
  { beds: 5, baths: 4, sqft: "3,600", price: "$625,000", type: "Luxury Home", address: "Pahrump, NV" },
  { beds: 3, baths: 2, sqft: "1,740", price: "$274,900", type: "Fixer-Upper", address: "Pahrump, NV" },
  { beds: 0, baths: 2, sqft: "3,200", price: "$520,000", type: "Commercial", address: "Pahrump, NV" },
];

const TESTIMONIALS = [
  {
    quote: "Marci made our home buying experience seamless. Her knowledge of the Pahrump market is unmatched and she truly went above and beyond for our family.",
    name: "Sarah & Tom K.",
    detail: "Home Buyers",
  },
  {
    quote: "She sold our property in under two weeks — above asking price. Marci's marketing strategy and negotiation skills are exceptional.",
    name: "David R.",
    detail: "Home Seller",
  },
  {
    quote: "As a first-time buyer I was nervous, but Marci guided me every step of the way. Her network of lenders and contractors made everything simple.",
    name: "Jessica M.",
    detail: "First-Time Buyer",
  },
];

function HouseIcon() {
  return (
    <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
    </svg>
  );
}

function ListingThumbnail({ index }: { index: number }) {
  const image = LISTING_IMAGES[index % LISTING_IMAGES.length];

  return (
    <div className="w-full aspect-[4/3] overflow-hidden">
      <img
        src={image}
        alt={`Property listing ${index + 1}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function SearchListings() {
  const [location, setLocation] = useState("Any");
  const [type, setType] = useState("Any");
  const [beds, setBeds] = useState("Any Number");
  const [baths, setBaths] = useState("Any Number");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  return (
    <section id="search" className="relative py-0">
      {/* Dark navy band with the heading */}
      <div className="bg-[#1a2740] px-6 pt-14 pb-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end gap-4 justify-between">
          <div>
            <p className="text-[#b8903a] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Find Your Property</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#f7f3ee]">
              Search Listings
            </h2>
          </div>
          <p className="text-[#6a7a8a] text-sm font-light max-w-xs leading-relaxed">
            Filter by location, property type, size, and price to find the home that fits your life.
          </p>
        </div>
      </div>

      {/* Floating white card overlapping the navy */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 pb-16">
        <div className="bg-white shadow-xl border-t-4 border-[#b8903a]">
          {/* Row 1 — Location / Type / Sort By */}
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#ede7dc]">
            <div className="p-6">
              <SearchableDropdown label="Location" options={NV_LOCATIONS} value={location} onChange={setLocation} />
            </div>
            <div className="p-6">
              <SelectDropdown label="Type" options={LISTING_TYPES} value={type} onChange={setType} />
            </div>
            <div className="p-6">
              <SelectDropdown label="Sort By" options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} placeholder="— Select —" />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#ede7dc]" />

          {/* Row 2 — Beds / Baths / Min / Max / Button */}
          <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#ede7dc] items-stretch">
            <div className="p-6">
              <SelectDropdown label="Bedrooms" options={NUMBER_OPTIONS} value={beds} onChange={setBeds} />
            </div>
            <div className="p-6">
              <SelectDropdown label="Baths" options={NUMBER_OPTIONS} value={baths} onChange={setBaths} />
            </div>
            <div className="p-6">
              <label className="block text-xs font-semibold text-[#7a7265] tracking-[0.12em] uppercase mb-2">Min Price</label>
              <input
                type="text"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="$ 0"
                className="w-full border-b-2 border-[#c8c2b8] bg-transparent pb-2 text-sm text-[#2d2d2d] placeholder-[#b8b0a8] focus:border-[#b8903a] outline-none transition-colors"
              />
            </div>
            <div className="p-6">
              <label className="block text-xs font-semibold text-[#7a7265] tracking-[0.12em] uppercase mb-2">Max Price</label>
              <input
                type="text"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="No Limit"
                className="w-full border-b-2 border-[#c8c2b8] bg-transparent pb-2 text-sm text-[#2d2d2d] placeholder-[#b8b0a8] focus:border-[#b8903a] outline-none transition-colors"
              />
            </div>
            <div className="p-6 flex items-end">
              <button
                type="button"
                className="w-full bg-[#1a2740] hover:bg-[#b8903a] text-[#f7f3ee] font-semibold text-xs tracking-[0.18em] uppercase py-4 transition-colors duration-200 flex items-center justify-center gap-2 group"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="group-hover:scale-110 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
                Search Now
              </button>
            </div>
          </div>

          {/* Active filters hint */}
          {(location !== "Any" || type !== "Any" || beds !== "Any Number" || baths !== "Any Number" || minPrice || maxPrice) && (
            <div className="px-6 py-3 bg-[#f7f3ee] border-t border-[#ede7dc] flex flex-wrap items-center gap-2">
              <span className="text-[#7a7265] text-xs tracking-wide uppercase font-semibold">Active filters:</span>
              {location !== "Any" && <FilterTag label={location} onRemove={() => setLocation("Any")} />}
              {type !== "Any" && <FilterTag label={type} onRemove={() => setType("Any")} />}
              {beds !== "Any Number" && <FilterTag label={`${beds} beds`} onRemove={() => setBeds("Any Number")} />}
              {baths !== "Any Number" && <FilterTag label={`${baths} baths`} onRemove={() => setBaths("Any Number")} />}
              {minPrice && <FilterTag label={`Min $${minPrice}`} onRemove={() => setMinPrice("")} />}
              {maxPrice && <FilterTag label={`Max $${maxPrice}`} onRemove={() => setMaxPrice("")} />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 bg-[#1a2740] text-[#f7f3ee] text-xs px-3 py-1 font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-[#b8903a] transition-colors leading-none">
        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", interest: "Buying" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Marci will be in touch shortly.");
  };

  return (
    <div className="min-h-full bg-[#f7f3ee]">
      {/* ─── NAV ──────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#f7f3ee] shadow-sm py-3" : "bg-transparent py-5"
        } ${scrolled ? "nav-scrolled" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex flex-col leading-none text-left">
            <span className={`font-display text-xl font-semibold tracking-tight ${scrolled ? "text-[#1a2740]" : "text-[#f7f3ee]"}`}>
              Marci Metzger
            </span>
            <span className={`text-[0.65rem] tracking-[0.18em] uppercase font-medium mt-0.5 ${scrolled ? "text-[#b8903a]" : "text-[#d4a84b]"}`}>
              The Ridge Realty Group
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase())} className="nav-link">
                {link}
              </button>
            ))}
          </div>

          <a
            href="tel:2069196886"
            className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors ${
              scrolled ? "text-[#1a2740] hover:text-[#b8903a]" : "text-[#f7f3ee] hover:text-[#d4a84b]"
            }`}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (206) 919-6886
          </a>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={scrolled ? "#1a2740" : "#f7f3ee"} strokeWidth={2}>
              {mobileOpen
                ? <><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></>
                : <><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></>}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#1a2740] px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase())} className="nav-link text-left">
                {link}
              </button>
            ))}
            <a href="tel:2069196886" className="text-[#d4a84b] text-sm font-medium mt-2">(206) 919-6886</a>
          </div>
        )}
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
        {/* Hero background — thumbnail placeholder */}
        <div className="absolute inset-0 thumbnail-placeholder">
          <img
            src={heroImage}
            alt="Beautiful Pahrump Nevada home"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1826] via-[#1a2740]/60 to-[#1a2740]/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
          <div className="max-w-2xl">
            <p className="text-[#b8903a] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Nevada's Trusted Realtor
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-[#f7f3ee] leading-[1.05] mb-6">
              Your Dream Home<br />
              <em className="font-normal not-italic text-[#d4a84b]">Starts Here.</em>
            </h1>
            <p className="text-[#c8c0b4] text-lg font-light leading-relaxed mb-10 max-w-lg">
              Nearly 30 years of experience guiding buyers and sellers across Pahrump, Nevada. Personalized service, proven results.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("listings")} className="btn-primary">
                Browse Listings
              </button>
              <button onClick={() => scrollTo("contact")} className="btn-outline text-[#f7f3ee] border-[#f7f3ee]/50 hover:border-[#b8903a]">
                Let&apos;s Talk
              </button>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        {/* <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#b8903a]" />
          <span className="text-[#b8903a] text-[0.6rem] tracking-[0.2em] uppercase rotate-90 origin-center translate-y-4">Scroll</span>
        </div> */}
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────── */}
      <section className="bg-[#1a2740] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="stat-number text-3xl md:text-4xl font-bold text-[#d4a84b]">
                {s.value}<span className="text-[#b8903a]">{s.suffix}</span>
              </div>
              <div className="text-[#c8c0b4] text-xs tracking-[0.12em] uppercase mt-2 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Image column */}
          <div className="relative">
            <div className="aspect-[3/4] thumbnail-placeholder rounded-sm overflow-hidden max-w-sm mx-auto md:mx-0">
               <img
                  src={Marci}
                  alt="Beautiful Pahrump Nevada home"
                  className="w-full h-full object-cover z-10"
                />
            </div>
            {/* Accent frame */}
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border border-[#b8903a]/30 rounded-sm pointer-events-none hidden md:block" />
          </div>

          {/* Text column */}
          <div>
            <p className="text-[#b8903a] text-xs tracking-[0.25em] uppercase font-semibold mb-3">About Marci</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#1a2740] leading-tight mb-6">
              Nearly Three Decades<br />of Nevada Real Estate
            </h2>
            <div className="divider-gold" />
            <p className="text-[#4a4540] leading-relaxed mt-4 mb-4 font-light">
              With nearly 30 years of experience in Nevada real estate, Marci Metzger has built a reputation on honesty, dedication, and results. As a licensed Realtor with The Ridge Realty Group, she has guided hundreds of buyers and sellers through every stage of the real estate journey.
            </p>
            <p className="text-[#4a4540] leading-relaxed mb-8 font-light">
              Whether you're a first-time buyer, seasoned investor, or looking to sell at the highest price, Marci brings market expertise, a vast professional network, and genuine care to every transaction. In 2021 alone, she assisted roughly 90 clients, closing approximately $28.5 million in sales.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {["Residential Sales", "Luxury Homes", "Commercial Properties", "Investment Properties", "Condominiums", "Fixer-Uppers"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#4a4540]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8903a] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <a href="tel:2069196886" className="btn-primary">
              Call (206) 919-6886
            </a>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-[#ede7dc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#b8903a] text-xs tracking-[0.25em] uppercase font-semibold mb-3">What We Do</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#1a2740]">Full-Service Real Estate</h2>
            <div className="divider-gold mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc) => (
              <div key={svc.title} className="service-card bg-[#f7f3ee] p-8 cursor-default">
                <div className="service-icon text-[#b8903a] mb-5">{svc.icon}</div>
                <h3 className="service-title font-display text-xl font-semibold text-[#1a2740] mb-3">{svc.title}</h3>
                <p className="text-sm leading-relaxed text-[#5a5550] font-light">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LISTINGS ─────────────────────────────────────────── */}
      <section id="listings" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[#b8903a] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Properties</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#1a2740]">Featured Listings</h2>
              <div className="divider-gold mt-4" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", ...PROPERTY_TYPES].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 text-xs tracking-[0.1em] uppercase font-semibold transition-colors ${
                    activeFilter === f
                      ? "bg-[#1a2740] text-[#f7f3ee]"
                      : "bg-[#ede7dc] text-[#5a5550] hover:bg-[#1a2740] hover:text-[#f7f3ee]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {LISTINGS.map((listing, i) => (
              <div key={i} className="listing-card bg-white overflow-hidden shadow-sm">
                <ListingThumbnail index={i} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#b8903a] text-xs tracking-[0.12em] uppercase font-semibold">{listing.type}</span>
                    <span className="font-display text-xl font-semibold text-[#1a2740]">{listing.price}</span>
                  </div>
                  <p className="text-[#5a5550] text-sm mb-4 flex items-center gap-1.5">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {listing.address}
                  </p>
                  <div className="flex gap-5 text-xs text-[#7a7265] font-medium border-t border-[#ede7dc] pt-4">
                    {listing.beds > 0 && (
                      <span className="flex items-center gap-1">
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10M21 7v10M3 12h18M5 7h14a1 1 0 011 1v9H4V8a1 1 0 011-1z" />
                        </svg>
                        {listing.beds} Beds
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M4 12V8a4 4 0 014-4h8a4 4 0 014 4v4M4 12v4a2 2 0 002 2h12a2 2 0 002-2v-4" />
                      </svg>
                      {listing.baths} Baths
                    </span>
                    <span>{listing.sqft} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => scrollTo("contact")} className="btn-outline text-[#1a2740] border-[#1a2740] hover:bg-[#1a2740] hover:text-[#f7f3ee]">
              Inquire About Listings
            </button>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24 bg-[#1a2740]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#b8903a] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Client Stories</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#f7f3ee] mb-16">
            What Clients Say
          </h2>

          <div className="relative min-h-[180px]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 absolute inset-0 ${i === activeTestimonial ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
              >
                <p className="testimonial-quote font-display text-xl md:text-2xl font-normal italic text-[#ede7dc] leading-relaxed mb-8">
                  {t.quote}
                </p>
                <div>
                  <div className="font-semibold text-[#d4a84b] font-display">{t.name}</div>
                  <div className="text-[#7a8a9a] text-xs tracking-[0.15em] uppercase mt-1">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-16">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`transition-all duration-200 rounded-full ${
                  i === activeTestimonial ? "bg-[#b8903a] w-6 h-2" : "bg-[#3a4a5a] w-2 h-2 hover:bg-[#b8903a]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEARCH TOOL ──────────────────────────────────────── */}
      <SearchListings />

      {/* ─── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-[#b8903a] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Get In Touch</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#1a2740] leading-tight mb-6">
              Let&apos;s Make<br />Your Move.
            </h2>
            <div className="divider-gold" />
            <p className="text-[#4a4540] font-light leading-relaxed mt-4 mb-10">
              Whether you&apos;re buying, selling, or simply exploring your options, Marci is ready to listen and help. Reach out today for a no-pressure conversation.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                  label: "Phone",
                  value: "(206) 919-6886",
                  href: "tel:2069196886",
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
                  label: "Office",
                  value: "3190 HW-160, Suite F, Pahrump, NV 89048",
                  href: undefined,
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                  label: "Hours",
                  value: "Daily 8:00 am – 7:00 pm · After-hours by appointment",
                  href: undefined,
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#ede7dc] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#b8903a" strokeWidth={1.8}>
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[#b8903a] tracking-[0.12em] uppercase font-semibold mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-[#2d2d2d] hover:text-[#b8903a] transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-[#4a4540] font-light">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-10">
              {["Facebook", "Instagram", "LinkedIn", "Yelp"].map((s) => (
                <button key={s} title={s} className="w-9 h-9 border border-[#d4cdc3] flex items-center justify-center text-[#7a7265] hover:border-[#b8903a] hover:text-[#b8903a] transition-colors text-xs font-semibold">
                  {s[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#ede7dc] p-8 md:p-10">
            <h3 className="font-display text-2xl font-semibold text-[#1a2740] mb-6">Send a Message</h3>
            <form onSubmit={handleForm} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  className="border border-[#c8c2b8] bg-white px-4 py-3 text-sm text-[#2d2d2d] placeholder-[#9a9188] w-full"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  required
                  className="border border-[#c8c2b8] bg-white px-4 py-3 text-sm text-[#2d2d2d] placeholder-[#9a9188] w-full"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <input
                className="border border-[#c8c2b8] bg-white px-4 py-3 text-sm text-[#2d2d2d] placeholder-[#9a9188] w-full"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <select
                className="border border-[#c8c2b8] bg-white px-4 py-3 text-sm text-[#2d2d2d] w-full"
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              >
                <option>Buying</option>
                <option>Selling</option>
                <option>Investment</option>
                <option>General Inquiry</option>
              </select>
              <textarea
                rows={4}
                required
                className="border border-[#c8c2b8] bg-white px-4 py-3 text-sm text-[#2d2d2d] placeholder-[#9a9188] w-full resize-none"
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button type="submit" className="btn-primary w-full text-center">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── MAP ──────────────────────────────────────────────── */}
      <section className="h-80 md:h-96 w-full relative">
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3258.0!2d-115.9847!3d36.2083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8e0a1a1a1a1a1%3A0x0!2s3190+NV-160%2C+Pahrump%2C+NV+89048!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
        {/* Address overlay pin */}
        <div className="absolute bottom-6 left-6 bg-[#0d1826]/90 backdrop-blur-sm px-5 py-4 flex items-center gap-3 pointer-events-none">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#b8903a" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <div className="text-[#f7f3ee] text-sm font-medium">The Ridge Realty Group</div>
            <div className="text-[#6a7a8a] text-xs mt-0.5">3190 HW-160, Suite F · Pahrump, NV 89048</div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-[#0d1826] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10 pb-10 border-b border-[#1e2e42]">
            <div>
              <div className="font-display text-2xl font-semibold text-[#f7f3ee] mb-1">Marci Metzger</div>
              <div className="text-[#b8903a] text-xs tracking-[0.18em] uppercase font-medium mb-4">The Ridge Realty Group</div>
              <p className="text-[#6a7a8a] text-sm font-light leading-relaxed mb-6">
                Nearly 30 years guiding buyers and sellers across Nevada's most desirable communities.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="w-9 h-9 border border-[#1e2e42] flex items-center justify-center text-[#6a7a8a] hover:border-[#b8903a] hover:text-[#b8903a] transition-colors">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="w-9 h-9 border border-[#1e2e42] flex items-center justify-center text-[#6a7a8a] hover:border-[#b8903a] hover:text-[#b8903a] transition-colors">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 border border-[#1e2e42] flex items-center justify-center text-[#6a7a8a] hover:border-[#b8903a] hover:text-[#b8903a] transition-colors">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <div className="text-[#f7f3ee] text-xs tracking-[0.2em] uppercase font-semibold mb-4">Quick Links</div>
              <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <button key={link} onClick={() => scrollTo(link.toLowerCase())} className="block text-[#6a7a8a] text-sm hover:text-[#b8903a] transition-colors">
                    {link}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[#f7f3ee] text-xs tracking-[0.2em] uppercase font-semibold mb-4">Contact</div>
              <div className="space-y-2 text-[#6a7a8a] text-sm font-light">
                <div>(206) 919-6886</div>
                <div>3190 HW-160, Suite F</div>
                <div>Pahrump, Nevada 89048</div>
                <div className="pt-1">Daily 8:00 am – 7:00 pm</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#3a4a5a] text-xs">
              © {new Date().getFullYear()} Marci Metzger · The Ridge Realty Group · All rights reserved.
            </p>
            <p className="text-[#3a4a5a] text-xs">
              Licensed Realtor · Nevada
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
