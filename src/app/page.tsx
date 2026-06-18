"use client";

import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);

  const slides = [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
  ];

  useEffect(() => {
    // Animasi fade in saat pertama kali dibuka
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Timer untuk slideshow hero section
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    // Timer Hitung Mundur (Countdown)
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
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error("Audio error: ", err);
          alert("Gagal memutar musik. Pastikan koneksi internet stabil.");
        });
      }
    }
  };

  return (
    <main className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
      {/* Layar Hitam Transisi Awal (Fade from black) */}
      <div 
        className={`fixed inset-0 bg-black z-[100] transition-opacity duration-[1500ms] pointer-events-none ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      ></div>

      {/* Audio Element */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/lagu.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Button */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white p-3 rounded-full shadow-lg opacity-80 hover:opacity-100 transition duration-300"
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>

      {/* Hero Section with Slideshow */}
      <section className="relative h-screen flex flex-col items-center justify-end pb-24 text-center bg-black">
        {slides.map((url, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat grayscale transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${url}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90"></div>
          </div>
        ))}
        <div className="relative z-10 text-white px-6">
          <p className="text-sm tracking-[0.2em] mb-4 uppercase">13 Agustus 2025</p>
          <h1 className="font-[family-name:var(--font-great-vibes)] text-6xl md:text-7xl mb-4 font-light text-stone-100 drop-shadow-lg">
            Edward & Bella
          </h1>
          <p className="text-xs uppercase tracking-widest mt-6 opacity-80 border-t border-white/30 pt-4 w-3/4 mx-auto">
            Scroll untuk melanjutkan
          </p>
        </div>
      </section>

      {/* Greeting & Save the Date */}
      <section className="py-20 px-8 text-center bg-white">
        <h2 className="text-2xl font-semibold tracking-wide mb-6">Dorogie i lyubimye!</h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-12">
          Kami mengundang Anda untuk merayakan cinta dan penyatuan kami. Kami sangat menantikan kehadiran Anda!
        </p>

        {/* Minimalist Calendar Concept */}
        <div className="flex justify-center items-center space-x-6 py-6 mb-4 relative cursor-default">
          <div className="text-center transition-transform duration-500 hover:scale-110 hover:-translate-y-1">
            <p className="text-xs text-stone-400 mb-2 uppercase">Selasa</p>
            <p className="text-2xl font-light text-stone-400">12</p>
          </div>
          <div className="text-center relative transition-transform duration-500 hover:scale-125 group z-10">
            <p className="text-xs text-stone-800 mb-2 font-semibold uppercase group-hover:text-red-700 transition-colors">Rabu</p>
            <p className="text-4xl font-bold text-stone-900 relative z-10 group-hover:text-red-900 transition-colors">13</p>
            {/* Heart SVG with pulsing and scale animation */}
            <svg className="absolute -inset-4 w-16 h-16 text-red-800/80 -z-0 rotate-12 drop-shadow-sm animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <div className="text-center transition-transform duration-500 hover:scale-110 hover:-translate-y-1">
            <p className="text-xs text-stone-400 mb-2 uppercase">Kamis</p>
            <p className="text-2xl font-light text-stone-400">14</p>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto mb-10 text-center">
          {[
            { label: 'Hari', value: timeLeft.hari },
            { label: 'Jam', value: timeLeft.jam },
            { label: 'Menit', value: timeLeft.menit },
            { label: 'Detik', value: timeLeft.detik }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-3 rounded-lg bg-stone-50 border border-stone-200 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md cursor-default">
              <span className="text-2xl font-bold text-stone-800 tabular-nums">{item.value}</span>
              <span className="text-[9px] uppercase tracking-widest text-stone-500 mt-1">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="w-full overflow-hidden border-y border-stone-200 py-3 relative">
          <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] inline-block">
            <p className="text-xs tracking-[0.3em] uppercase inline-block">
              SAVE THE DATE • SAVE THE DATE • SAVE THE DATE • SAVE THE DATE • SAVE THE DATE •
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative py-24 px-6 text-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 bg-white text-stone-900 p-6 shadow-xl max-w-sm mx-auto">
          <h2 className="text-2xl font-bold tracking-widest mb-4">LOKASI</h2>
          <p className="text-sm font-semibold mb-2">Grand Ballroom, Banjarmasin</p>
          <p className="text-xs text-stone-500 mb-6">Kota Banjarmasin, Kalimantan Selatan</p>
          
          {/* Peta Google Maps Tersemat (Iframe) */}
          <div className="w-full h-48 mb-6 border border-stone-200 p-1">
            <iframe 
              src="https://maps.google.com/maps?q=Banjarmasin,+Kalimantan+Selatan&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              title="Peta Lokasi Banjarmasin"
            ></iframe>
          </div>

          <p className="text-xs italic text-stone-600 mb-6 px-4">
            Perayaan akan dilaksanakan secara eksklusif. Mohon hadir 15 menit sebelum acara dimulai.
          </p>
          <a href="https://maps.google.com/maps?q=Banjarmasin,+Kalimantan+Selatan" target="_blank" rel="noreferrer" className="inline-block bg-stone-900 text-white text-xs uppercase tracking-widest py-3 px-6 rounded-sm hover:bg-stone-700 transition duration-300">
            Buka di Aplikasi Maps
          </a>
        </div>
      </section>

      {/* Program Section */}
      <section className="py-20 px-8 bg-stone-50">
        <h2 className="text-xl font-bold tracking-widest mb-12 text-center uppercase">Program Hari Ini</h2>
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-lg font-semibold tracking-wide">15:00 - WELCOME</p>
            <p className="text-sm text-stone-500 mt-2">Jangan lupa bawa senyum terbaik Anda.</p>
          </div>
          <div className="w-12 h-px bg-stone-300 mx-auto"></div>
          <div className="text-center">
            <p className="text-lg font-semibold tracking-wide">15:30 - CEREMONY</p>
            <p className="text-sm text-stone-500 mt-2">Menyaksikan momen penyatuan suci kami berdua.</p>
          </div>
          <div className="w-12 h-px bg-stone-300 mx-auto"></div>
          <div className="text-center">
            <p className="text-lg font-semibold tracking-wide">16:00 - BANQUET</p>
            <p className="text-sm text-stone-500 mt-2">Saatnya makan, minum, dan berdansa bersama!</p>
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section className="py-16 bg-white relative">
        <div className="grid grid-cols-2">
          <div 
            className="bg-cover bg-center h-48 grayscale"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546193430-c2d207739ed7?q=80&w=400&auto=format&fit=crop')" }}
          ></div>
          <div 
            className="bg-cover bg-center h-48 grayscale"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop')" }}
          ></div>
        </div>
        
        <div className="text-center px-6 mt-12 relative">
          <p className="font-[family-name:var(--font-great-vibes)] text-5xl text-red-800/60 absolute -top-10 left-1/2 -translate-x-1/2 -rotate-6">Dress Code</p>
          
          <div className="border border-stone-200 p-8 mt-4 relative bg-white shadow-sm">
            <div className="flex justify-center items-center space-x-6 mb-8">
              {/* Suit Silhouette */}
              <div className="w-16 h-20 bg-stone-900" style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 80% 100%, 20% 100%, 0% 20%)" }}></div>
              {/* Dress Silhouette */}
              <div className="w-16 h-20 bg-stone-900" style={{ clipPath: "polygon(30% 0%, 70% 0%, 50% 30%, 80% 100%, 20% 100%, 50% 30%)" }}></div>
            </div>
            
            <h3 className="font-bold text-lg mb-4 tracking-widest">BLACK TIE</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Pria: Jas formal berwarna gelap atau tuksedo.<br/>
              Wanita: Gaun malam panjang atau *cocktail dress* elegan.
            </p>
          </div>
        </div>
      </section>

      {/* Details & Closing */}
      <section className="py-20 px-8 text-center bg-stone-50">
        <h2 className="text-xl font-bold tracking-widest mb-6">DETAIL</h2>
        <p className="text-sm text-stone-600 mb-8 leading-relaxed">
          Kehadiran Anda adalah kado terindah bagi kami. Namun jika Anda ingin memberikan hadiah, Anda dapat memindai QR Code di tempat acara atau melalui amplop yang tersedia.
        </p>
        <div className="flex justify-center space-x-4 mb-12">
          {/* Wine Bottle / Glasses Icon placeholder */}
          <div className="w-8 h-12 bg-stone-300 rounded-sm"></div>
          <div className="w-8 h-12 bg-stone-300 rounded-sm"></div>
        </div>
        <p className="font-[family-name:var(--font-great-vibes)] text-5xl mb-4 text-stone-800">Sampai Jumpa!</p>
        <p className="text-sm uppercase tracking-widest text-stone-500 mt-6 leading-loose">
          Dengan cinta,<br/>
          <span className="font-semibold text-stone-800">Edward & Bella</span>
        </p>
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
