import React, { useState } from 'react';
import { ShoppingCart, Paintbrush, ShieldCheck, Clock, Menu, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
const Landing: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Paintbrush className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">KIWI ENTERPRISE</span>
            </div>
            
            <div className="hidden md:flex space-x-8 font-medium text-slate-600">
              <a href="#brands" className="hover:text-indigo-600 transition">Brands</a>
              <a href="#services" className="hover:text-indigo-600 transition">Book a Painter</a>
              <a href="#how-it-works" className="hover:text-indigo-600 transition">How it Works</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 text-slate-600 font-semibold"
              onClick={()=> navigate("/signup")}>Sign In</button>
              <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                Get Started
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Now serving 15+ premium paint brands
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-linear-to-r from-slate-900 via-slate-800 to-indigo-900 bg-clip-text text-transparent">
            Premium Paint, <br />
            Professional Hands.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one platform to buy world-class paints and book certified professionals to apply them. Transforming spaces has never been this seamless.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition-all transform hover:scale-105">
              Browse Catalog <ShoppingCart size={20} />
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
              Book a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck />
              </div>
              <h3 className="text-xl font-bold mb-3">Vetted Professionals</h3>
              <p className="text-slate-600 leading-relaxed">Every worker undergoes a rigorous 20-point background check and skill assessment.</p>
            </div>
            
            <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Scheduling</h3>
              <p className="text-slate-600 leading-relaxed">Pick a date and time that works for you. Our automated system syncs with local crews instantly.</p>
            </div>

            <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingCart />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Brand Inventory</h3>
              <p className="text-slate-600 leading-relaxed">From Sherwin-Williams to Dulux, get all your supplies in one cart with wholesale pricing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section / Brands */}
      <section id="brands" className="py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-8">Authorized Retailer For</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {/* Replace these with actual brand logos */}
            <span className="text-2xl font-black italic">SHERWIN-WILLIAMS</span>
            <span className="text-2xl font-black uppercase">Benjamin Moore</span>
            <span className="text-2xl font-black">BEHR</span>
            <span className="text-2xl font-black uppercase">Valspar</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to refresh your space?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">Join 5,000+ homeowners who trust HueMaster for quality paint and professional finish.</p>
          <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-colors inline-flex items-center gap-2">
            Start Your Project <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          © 2024 HueMaster SaaS. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing