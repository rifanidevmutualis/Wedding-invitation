"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper components for scroll animations
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.25, 0, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.2
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] } }
    }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);

  const slides = [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
  ];

  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoaded(true), 300);

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    // Acara diset besok (19 Juni 2026 pukul 20:00) agar terlihat berjalannya
    const targetDate = new Date("2026-06-19T20:00:00").getTime();
    const countdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
          jam: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          detik: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(slideTimer);
      clearInterval(countdownTimer);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log(err));
      }
    }
  };

  const openInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log(err));
    }
  };

  return (
    <main className={`max-w-md mx-auto bg-stone-50 shadow-2xl relative ${isOpened ? 'min-h-screen' : 'h-[100dvh] overflow-hidden'}`}>
      
      {/* Layar Hitam Transisi Awal */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 bg-black z-[200] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Sampul / Welcome Screen */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-full h-[100dvh] z-[150] bg-stone-900 text-stone-100 flex flex-col items-center justify-center overflow-hidden"
          >
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop')" }}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative z-10 text-center px-6 flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <svg className="w-12 h-12 mb-6 text-stone-300" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </motion.div>

              <p className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-6">Undangan Pernikahan</p>
              <h1 className="font-[family-name:var(--font-great-vibes)] text-6xl mb-16 drop-shadow-xl">Edward & Bella</h1>
              
              <motion.button 
                onClick={openInvitation}
                whileHover={{ scale: 1.05, backgroundColor: "#e7e5e4", color: "#1c1917" }}
                whileTap={{ scale: 0.95 }}
                className="border border-stone-400 text-stone-200 px-10 py-4 rounded-full uppercase tracking-widest text-xs transition-colors duration-300"
              >
                Buka Undangan
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Element */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/lagu.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Button */}
      <AnimatePresence>
        {isOpened && (
          <motion.button 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring" }}
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 bg-stone-900/80 backdrop-blur-md text-white p-4 rounded-full shadow-2xl hover:bg-stone-900 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[100dvh] flex flex-col items-center justify-end pb-32 text-center bg-stone-900 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center grayscale"
            style={{ backgroundImage: `url('${slides[currentSlide]}')` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
        
        {isOpened && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.25, 0, 1] }}
            className="relative z-10 text-white px-6 w-full"
          >
            <p className="text-xs tracking-[0.3em] mb-6 uppercase text-stone-300">13 Agustus 2025</p>
            <h1 className="font-[family-name:var(--font-great-vibes)] text-7xl md:text-8xl mb-8 font-light drop-shadow-2xl text-stone-100">
              Edward & Bella
            </h1>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mt-12 flex justify-center opacity-60"
            >
              <div className="w-[1px] h-16 bg-gradient-to-b from-stone-400 to-transparent"></div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Greeting */}
      <section className="py-28 px-8 text-center bg-white relative overflow-hidden">
        <FadeUp>
          <h2 className="text-2xl font-semibold tracking-widest mb-8 text-stone-800">Dorogie i lyubimye!</h2>
          <p className="text-sm text-stone-600 leading-loose mb-16 max-w-sm mx-auto">
            Dengan penuh rasa syukur dan sukacita, kami mengundang Anda untuk merayakan momen penyatuan cinta kami. Kehadiran Anda adalah kehormatan bagi kami.
          </p>
        </FadeUp>

        {/* Minimalist Calendar Concept */}
        <FadeUp delay={0.2}>
          <div className="flex justify-center items-center space-x-8 py-8 mb-4 relative cursor-default">
            <div className="text-center">
              <p className="text-xs text-stone-400 mb-3 uppercase tracking-wider">Selasa</p>
              <p className="text-2xl font-light text-stone-400">12</p>
            </div>
            <div className="text-center relative group z-10">
              <p className="text-xs text-stone-900 mb-3 font-semibold uppercase tracking-wider">Rabu</p>
              <p className="text-5xl font-bold text-stone-900 relative z-10">13</p>
              {/* Animated Heart SVG */}
              <motion.svg 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                className="absolute -inset-6 w-20 h-20 text-red-800/80 -z-0 rotate-12 drop-shadow-md" 
                fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
              >
                <motion.path 
                  strokeLinecap="round" strokeLinejoin="round" 
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
                />
              </motion.svg>
            </div>
            <div className="text-center">
              <p className="text-xs text-stone-400 mb-3 uppercase tracking-wider">Kamis</p>
              <p className="text-2xl font-light text-stone-400">14</p>
            </div>
          </div>
        </FadeUp>

        {/* Live Countdown Timer */}
        <FadeUp delay={0.4}>
          <div className="grid grid-cols-4 gap-4 max-w-xs mx-auto mb-16 text-center">
            {[
              { label: 'Hari', value: timeLeft.hari },
              { label: 'Jam', value: timeLeft.jam },
              { label: 'Menit', value: timeLeft.menit },
              { label: 'Detik', value: timeLeft.detik }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                className="flex flex-col items-center justify-center py-4 rounded-xl bg-stone-50 border border-stone-200/60 shadow-sm transition-colors duration-300"
              >
                <span className="text-2xl font-bold text-stone-800 tabular-nums">{item.value}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500 mt-2">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        <div className="w-full overflow-hidden border-y border-stone-200 py-4 relative bg-stone-50">
          <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] inline-block">
            <p className="text-[10px] tracking-[0.4em] uppercase inline-block text-stone-500">
              SAVE THE DATE • SAVE THE DATE • SAVE THE DATE • SAVE THE DATE • SAVE THE DATE •
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative py-32 px-6 text-center text-white overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-[2px]"></div>
        </motion.div>
        
        <FadeUp className="relative z-10 bg-white text-stone-900 p-8 shadow-2xl max-w-sm mx-auto">
          <h2 className="text-xl font-bold tracking-[0.3em] mb-6 text-stone-800">LOKASI</h2>
          <p className="text-sm font-semibold mb-2">Grand Ballroom, Banjarmasin</p>
          <p className="text-xs text-stone-500 mb-8 leading-relaxed">Kota Banjarmasin<br/>Kalimantan Selatan</p>
          
          {/* Google Maps */}
          <div className="w-full h-56 mb-8 p-1 border border-stone-200 bg-stone-50">
            <iframe 
              src="https://maps.google.com/maps?q=Banjarmasin,+Kalimantan+Selatan&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              title="Peta Lokasi Banjarmasin"
            ></iframe>
          </div>

          <p className="text-xs italic text-stone-600 mb-8 px-2 leading-relaxed">
            Perayaan akan dilaksanakan secara eksklusif. Mohon hadir 15 menit sebelum acara dimulai.
          </p>
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://maps.google.com/maps?q=Banjarmasin,+Kalimantan+Selatan" 
            target="_blank" 
            rel="noreferrer" 
            className="inline-block w-full bg-stone-900 text-white text-xs uppercase tracking-[0.2em] py-4 rounded-sm hover:bg-stone-800 transition duration-300"
          >
            Buka di Aplikasi Maps
          </motion.a>
        </FadeUp>
      </section>

      {/* Program Section */}
      <section className="py-28 px-8 bg-stone-50">
        <FadeUp>
          <h2 className="text-xl font-bold tracking-[0.3em] mb-16 text-center text-stone-800">RANGKAIAN ACARA</h2>
        </FadeUp>
        
        <StaggerContainer className="space-y-12">
          <StaggerItem>
            <div className="text-center bg-white p-8 shadow-sm border border-stone-100 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-stone-800"></div>
              <p className="text-xl font-semibold tracking-wider text-stone-800">15:00</p>
              <p className="text-sm uppercase tracking-widest text-stone-400 mt-2 mb-4">Welcome Guest</p>
              <p className="text-xs text-stone-500 leading-relaxed">Jangan lupa bawa senyum terbaik Anda untuk sesi foto bersama.</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="text-center bg-white p-8 shadow-sm border border-stone-100 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-stone-800"></div>
              <p className="text-xl font-semibold tracking-wider text-stone-800">15:30</p>
              <p className="text-sm uppercase tracking-widest text-stone-400 mt-2 mb-4">Holy Matrimony</p>
              <p className="text-xs text-stone-500 leading-relaxed">Menyaksikan momen penyatuan suci janji pernikahan kami berdua.</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="text-center bg-white p-8 shadow-sm border border-stone-100 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-stone-800"></div>
              <p className="text-xl font-semibold tracking-wider text-stone-800">18:00</p>
              <p className="text-sm uppercase tracking-widest text-stone-400 mt-2 mb-4">Wedding Banquet</p>
              <p className="text-xs text-stone-500 leading-relaxed">Saatnya makan malam romantis, bersulang minuman, dan berdansa!</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Dress Code */}
      <section className="py-24 bg-white relative">
        <div className="grid grid-cols-2">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="bg-cover bg-center h-56 grayscale origin-right"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546193430-c2d207739ed7?q=80&w=400&auto=format&fit=crop')" }}
          />
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="bg-cover bg-center h-56 grayscale origin-left"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop')" }}
          />
        </div>
        
        <FadeUp className="text-center px-6 mt-16 relative">
          <p className="font-[family-name:var(--font-great-vibes)] text-6xl text-red-900/40 absolute -top-14 left-1/2 -translate-x-1/2 -rotate-6 whitespace-nowrap">Dress Code</p>
          
          <div className="border border-stone-200 p-10 mt-4 relative bg-white shadow-xl">
            <div className="flex justify-center items-center space-x-10 mb-10">
              <div className="w-16 h-24 bg-stone-800 transition-transform duration-500 hover:scale-110" style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 80% 100%, 20% 100%, 0% 20%)" }}></div>
              <div className="w-16 h-24 bg-stone-800 transition-transform duration-500 hover:scale-110" style={{ clipPath: "polygon(30% 0%, 70% 0%, 50% 30%, 80% 100%, 20% 100%, 50% 30%)" }}></div>
            </div>
            
            <h3 className="font-bold text-xl mb-4 tracking-[0.2em] text-stone-800">BLACK TIE</h3>
            <div className="w-8 h-[1px] bg-stone-300 mx-auto mb-6"></div>
            <p className="text-xs text-stone-500 leading-loose">
              <span className="font-semibold text-stone-700">Pria:</span> Jas formal hitam atau tuksedo gelap.<br/>
              <span className="font-semibold text-stone-700">Wanita:</span> Gaun malam panjang atau *cocktail dress* elegan.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Details & Closing */}
      <section className="py-32 px-8 text-center bg-stone-900 text-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale"></div>
        <FadeUp className="relative z-10">
          <h2 className="text-lg font-bold tracking-[0.4em] mb-8 text-stone-300">DETAIL KEHADIRAN</h2>
          <p className="text-xs text-stone-400 mb-12 leading-loose max-w-sm mx-auto">
            Kehadiran Anda merupakan anugerah terindah. Bagi yang ingin memberikan tanda kasih secara digital, Anda dapat memindai QR Code di tempat acara.
          </p>
          
          <div className="w-16 h-[1px] bg-stone-600 mx-auto mb-16"></div>
          
          <p className="font-[family-name:var(--font-great-vibes)] text-6xl mb-6 text-stone-100 drop-shadow-md">Sampai Jumpa!</p>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500 mt-8 leading-loose">
            Dengan cinta,<br/>
            <span className="font-semibold text-stone-200 block mt-2 text-sm tracking-[0.4em]">Edward & Bella</span>
          </p>
        </FadeUp>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </main>
  );
}
