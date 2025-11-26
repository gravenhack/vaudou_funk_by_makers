import React, { useState, useEffect } from 'react';
import { Play, Music, Download, Users, ArrowRight, ChevronLeft, ChevronRight, Zap, Radio } from 'lucide-react';

export const LandingPage = ({ onGetStarted }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Effet pour la navbar au scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Music,
      title: "Rythmes Vaudoun-Funk",
      description: "Une bibliothèque exclusive de percussions et basses inspirées du Bénin et fusionnées avec le funk moderne."
    },
    {
      icon: Radio,
      title: "Studio Cloud",
      description: "Synchronisation instantanée. Commencez un beat sur votre téléphone à Cotonou, finissez-le sur PC à Paris."
    },
    {
      icon: Download,
      title: "Export MIDI & WAV",
      description: "Propriété totale de vos créations. Exportez en haute qualité pour vos mixages professionnels."
    }
  ];

  const testimonials = [
    {
      name: "Damon Russell",
      role: "Musicien Créatif",
      text: "Enfin une plateforme qui comprend la complexité des rythmes afro. C'est intuitif et le son est cristallin.",
    },
    {
      name: "Sena Joy",
      role: "Productrice",
      text: "Le mélange entre tradition et IA est parfait. Ça ne remplace pas l'artiste, ça lui donne des super-pouvoirs.",
    },
    {
      name: "Marc H.",
      role: "DJ Professionnel",
      text: "J'utilise les boucles Vaudoun-Funk dans mes sets house, le public devient fou à chaque fois.",
    }
  ];

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Navbar Flottante */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
              <Music size={18} />
            </div>
            Soundbox
          </div>
          <button onClick={onGetStarted} className="hidden md:flex px-6 py-2.5 bg-slate-900 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors text-sm">
            Connexion
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        {/* Background Blobs - Subtils et aux couleurs demandées */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Nouveau moteur audio V2.0 disponible
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Le Rythme <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Ancestral</span>
              <br />
              Rencontre le Futur.
            </h1>

            <p className="text-xl text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Le premier compositeur IA dédié aux sonorités Vaudoun-Funk. Créez, mixez et exportez des rythmes uniques qui ont une âme.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                <Play fill="currentColor" size={20} />
                Essayer le Studio
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-2">
                Voir la démo
              </button>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-400">
              <div className="text-sm font-semibold uppercase tracking-wider">Utilisé par</div>
              <div className="flex gap-6 grayscale opacity-60">
                {/* Placeholder logos - Simples cercles ou texte pour l'exemple */}
                <span className="font-bold">Spotify</span>
                <span className="font-bold">Ableton</span>
                <span className="font-bold">SoundCloud</span>
              </div>
            </div>
          </div>

          {/* Right Content - Abstract Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-[2.5rem] p-4 shadow-2xl shadow-blue-900/10 border border-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white overflow-hidden relative min-h-[400px] flex flex-col justify-between">
                {/* Decorative gradients inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h3 className="text-2xl font-bold">Groove #229</h3>
                    <p className="text-emerald-400 text-sm">Afro-Beat / Funk</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg">
                    <Zap className="text-yellow-400" size={24} />
                  </div>
                </div>

                {/* Animated Bars */}
                <div className="flex items-end justify-between gap-1 h-32 my-8">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full bg-gradient-to-t from-emerald-400 to-blue-400 rounded-t-sm"
                      style={{
                        height: `${30 + Math.random() * 70}%`,
                        opacity: i % 2 === 0 ? 0.8 : 0.4
                      }}
                    ></div>
                  ))}
                </div>

                {/* Player Controls */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 border border-white/5">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:scale-105 transition-transform">
                    <Play fill="currentColor" className="ml-1" />
                  </button>
                  <div className="flex-1">
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-xs font-mono">01:24</span>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-50 animate-bounce delay-700">
              <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                <Users size={20} />
              </div>
              <div>
                <div className="font-bold text-slate-900">24k+</div>
                <div className="text-xs text-slate-500">Artistes actifs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Pourquoi Soundbox ?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Une technologie de pointe enveloppée dans une interface conçue pour les musiciens, pas les ingénieurs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-emerald-600">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Modern Card Style) */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-r from-blue-50 via-emerald-50 to-blue-50 -skew-y-3"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">La communauté parle</h2>
              <p className="text-slate-600">Découvrez comment les artistes réinventent la musique béninoise avec nos outils.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-200 text-slate-600 hover:text-emerald-600 flex items-center justify-center transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-200 text-slate-600 hover:text-emerald-600 flex items-center justify-center transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-8 md:p-12 relative">
             <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl font-serif">
               "
             </div>
             
             <div className="grid md:grid-cols-[1fr,2fr] gap-8 items-center">
               <div className="h-48 w-full md:h-full bg-slate-100 rounded-2xl overflow-hidden relative">
                  {/* Avatar Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-400">
                    <Users size={48} />
                  </div>
               </div>
               
               <div className="space-y-6">
                 <div className="flex gap-1 text-yellow-400">
                   {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                 </div>
                 <blockquote className="text-2xl font-medium text-slate-900 leading-relaxed">
                   {testimonials[currentTestimonial].text}
                 </blockquote>
                 <div>
                   <div className="font-bold text-slate-900">{testimonials[currentTestimonial].name}</div>
                   <div className="text-emerald-600">{testimonials[currentTestimonial].role}</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Prêt à créer votre propre son ?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Rejoignez Soundbox aujourd'hui. Pas de carte de crédit requise pour commencer à explorer les rythmes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-emerald-400 hover:text-white transition-colors">
                Télécharger pour Mac
              </button>
              <button className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                Ouvrir dans le navigateur
              </button>
            </div>
            <p className="text-slate-500 text-sm mt-8">Compatible avec Windows, Mac & iOS</p>
          </div>
        </div>
      </section>

      {/* Footer Minimaliste */}
      <footer className="py-12 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-6 h-6 bg-emerald-500 rounded-md"></div>
            Soundbox
          </div>
          <div className="text-slate-500 text-sm">
            © 2024 Soundbox Inc. Fait avec ❤️ au Bénin.
          </div>
          <div className="flex gap-6 text-slate-500">
            <a href="#" className="hover:text-emerald-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;