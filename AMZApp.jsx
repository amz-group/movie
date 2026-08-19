import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Globe, ArrowRight, Sparkles, Crown, Target, Medal, ArrowUpRight, GraduationCap, Calculator, CloudSun, Wifi, QrCode, Gamepad2, Bird, UtensilsCrossed, ShoppingBag, Lock, Mail, Send, Github } from 'lucide-react';

/* ============================================================
   SITE CONFIG
============================================================ */
const siteConfig = {
  logo: '', // set an image URL to replace the "AMZ" text mark
  brandName: 'AMZ',
};

/* ============================================================
   TRANSLATIONS
============================================================ */
const translations = {
  en: {
    nav: { home: "Home", about: "About Us", project: "Our Project", service: "Our Service", contact: "Contact Us" },
    tag: "Welcome to",
    homeTitle: "AMZ GROUP for general development",
    homeDesc: "AMZ Group is a professional team in the development of websites, software, applications and games. We provide modern and innovative solutions with high quality and international standards. It's a place to build your ideas of growth and innovation.",
    contactBtn: "Contact Us",
    projectBtn: "View our projects",
    aboutTeam: "About Team",
    aboutHeading: "AMZ GROUP",
    aboutDesc: "This team consists of Mohammed Barzan, Zhalla Karwan, Anas Mohsen. We are a team working to create websites, software, applications, and solutions in an advanced and world-class standard.",
    moreinfo: "More Info",
    skill: "Skills & Interests",
    skill2: "The goals of the team",
    skillDesc: "• New Technologies\n• Innovation and Update\n• Digital system development\n• Continuous learning\n• Creating large projects and professional work.",
    aboutDev: "About Developer",
    devinfo: "Information About the Team",
    founder: "Founder & Leader",
    teamManager: "Team Manager",
    mohammedName: "Mohammed Barzan",
    zhallaName: "Zhalla Karwan",
    anasName: "Anas Mohsin",
    Mabout: "Founder and Team Leader, Mohammad Barzan is a student in the IT department and a project initiator who is an expert in the field of website building, design, and programming, in a fully advanced and standardized manner.",
    Zabout: "The team manager, Zhalla Karwan, a student of the IT department, the recipient and initiator, and the organization and conceptualization of projects before they start, has extensive experience in programming and website management.",
    Aabout: "The Team Project Manager, Anas Mohsen, a student in the IT department, is the one who brainstorms the projects and leads the team when any problem arises and is ready to solve it in a professional manner, and supports the team.",
    lfuTitle: "Lebanese French University",
    lfu: "Our team is proudly supported, supervised by the Lebanese French University, and our team is a student of the Lebanese French University in the Department of Information Technology, the Lebanese French University we are committed to building this team in a dedicated and professional way.",
    mathSolverTitle: "MATHEMATICS SOLVER",
    mathSolver: "This project solves mathematical equations quickly and accurately, providing clear step-by-step solutions to help students understand and learn better.",
    weatherTitle: "WEATHER KRD",
    weather: "Kurdistan Weather is a website that shows the weather conditions of cities in Kurdistan. Users can easily check information such as temperature, weather status, and other related details. The website is designed in Kurdish language with a simple and fast interface to make it easy for everyone to use.",
    wifiTitle: "SPEED WIFI",
    wifi: "A smart WiFi speed testing website designed to measure download speed, upload speed, and ping in real-time, helping users monitor their internet performance easily.",
    qrTitle: "QRCODE PRO",
    qr: "Modern QR Code Generator & Scanner Web App with Camera Support, Image Scan, Download Option, Multi-Language, Login System, QR History & PWA Installable Design.",
    snakeTitle: "AMZ SNAKE",
    snake: "Snake is a classic arcade game where players control a growing snake that eats apples to increase its length. The challenge is to avoid hitting the walls or the snake's own body as it moves faster over time.",
    flappyTitle: "AMZ FLAPPY BIRD",
    flappy: "Flappy Bird is a highly addictive arcade game where players tap to guide a bird through endless obstacles, testing their timing and precision in a simple yet challenging experience.",
    openProject: "Open Project",
    restmenuTitle: "RESTAURANT MENU",
    restmenu: "This website is designed to display restaurant menus in a simple and attractive way. Users can easily browse food items, check prices, and view detailed information about each dish. The design is modern and fully responsive, making it suitable for both mobile and desktop use. The goal of this website is to improve customer experience and make food selection faster and more convenient.",
    shoppingwebTitle: "SHOPPING WEBSITE",
    shoppingweb: "This website is an online platform designed to help sellers showcase and sell their products easily and professionally. Sellers can add products, set prices, upload images, and manage customer orders efficiently. The website features a modern, fast, and fully responsive design that works smoothly on both mobile devices and desktops. Its main goal is to increase sales and improve the overall buying and selling experience.",
    privateProject: "🔒 Private Project",
    contactKicker: "Contact",
    contactTitle: "Contact us",
    conAbout: "If you would like more information or to contact us, please select one of the options below.",
    email: "Email",
    telegram: "Telegram",
    github: "GitHub",
    rights: "AMZ Group. All rights reserved.",
    projectsKicker: "Our Work",
    projectsTitle: "Selected Projects",
    projectsSub: "A growing collection of tools, apps and games crafted by the team.",
    servicesKicker: "What We Build",
    servicesTitle: "Our Services",
    servicesSub: "Custom platforms designed and developed end-to-end.",
    aboutKicker: "The Team",
    aboutSub: "Three minds, one mission — building the future of the web.",
  },
  ku: {
    nav: { home: "سەرەتا", about: "دەربارەی ئێمە", project: "پرۆژەکانمان", service: "خزمەتگوزاریەکانمان", contact: "پەیوەندی" },
    tag: "بەخێرهاتن بۆ",
    homeTitle: "AMZ GROUP بۆ گەشەپێدانی گشتی",
    homeDesc: "AMZ Group تیمێکی پرۆفیشناڵە لە پەرەپێدانی وێبسایت،سۆفتوێر، بەرنامە و یاریەکان. ئێمە ئامەدەین بۆ چارەسەر کردنی هەموو کێشەکان بە شێوەیەکی مۆدێرن و داهێنەرانە بە کوالیتی بەرز و ستانداردی نێودەوڵەتی دابین دەکەین. ئیرە شوێنێکە بۆ بنیاتنانی بیرۆکەکانت و داهێنان.",
    contactBtn: "بۆ پەیوەندی کردن",
    projectBtn: "پرۆژەکانمان",
    aboutTeam: "دەربارەی تیم",
    aboutHeading: "AMZ GROUP",
    aboutDesc: "ئەم تیمە پێکهاتوە لەلایەن محمد بارزان،ژاڵە کاروان،ئەنەس موحسین. ئێمە تیمێکین کاردەکەین بۆ دروستکردنی وێبسایت،سۆفتوێر،بەرنامە، وەهەروەها چارەسەر کردنیان بە شێوەیەکی پێشکەوتو و ستانداردی جیهانی.",
    moreinfo: "زانیاری زیاتر",
    skill: "شارەزایی و بەرژەوەندی",
    skill2: "ئامانجەکانی تیم",
    skillDesc: "• تەکنەلۆژیای نوێ\n• داهێنان و نوێکردنەوە\n• پەرەپێدانی سیستەمی دیجیتاڵ\n• فێربوونی بەردەوام\n• دروستکردنی پڕۆژەی گەورە و کاری پیشەیی.",
    aboutDev: "دەربارەی گەشەپێدەر",
    devinfo: "زانیاری دەربارەی تیم",
    founder: "دامەزێنەر و سەرۆک",
    teamManager: "بەڕێوەبەری تیم",
    mohammedName: "محمد بارزان",
    zhallaName: "ژاڵە کاروان",
    anasName: "ئەنەس موحسین",
    Mabout: "دامەزێنەر و سەرۆکی تیم، محمد بارزان قوتابی بەشی IT سەرپەرشتی و دەستپێکەری پرۆژەکانە، شارەزا لە بواری دروست کردنی وێبسایت،دیزاین،پرۆگرامینگ، بەشێوەیەکی تەواو پێشکەوتو و ستانداردانە.",
    Zabout: "بەرێوبەری کار و باری تیم، ژاڵە کاروان قوتابی بەشی IT،وەرگر و دەسپێکەر و رێک خستن و دانانی بیرۆکەی پرۆژەکان بەر لە دەستپێکردنیان، شارەزای تەواوی هەیە لە پرۆگرامینگ و بەرێوبردنی وێبسایت.",
    Aabout: "بەرێوبەری تیم و پرۆژەکان، ئەنەس موحسین قوتابی بەشی IT،ئەو دانانی بیرۆکەکانی پرۆژەکانە و سەرپەریشتیاری تیمەکەیە لە کاتی بونی هەر کێشەیەک ئامەدە دەبێت بە چارەسەرکردنی بە شێوەیەکی تەواو پرۆفیشناڵانە، پشتگیری تیمەکەیە.",
    lfuTitle: "زانکۆی لوبنانی فەرەنسی",
    lfu: "بە شانازیەوە تیمەکەمان لەلایەن زانکۆی لوبنانی فەرەنسی ەوە پشتگیری و چاودێری و سەرپەرەشتی دەکرێت تیمەکەمان قوتابی زانکۆی لوبنانی فەرەنسین لە بەشی تەکنەلۆژیای زانیاریی،زانکۆی لوبنانی فەرەنسی تیمەکەی پێکهێناوە بەشێوەیەکی دڵسۆزانە و پرۆفیشناڵانە.",
    mathSolverTitle: "چارەسەری بیرکاری",
    mathSolver: "ئەم پرۆژەیە ئامەدە کراوە بۆ قوتابیان، پێکهاتوا لە چەند بابەتێکی شیکارکردنی وانەکانی بیرکاری بە شێوەیەکی زۆر خێرا و وردەکاری.",
    weatherTitle: "کەشوهەوای کوردستان",
    weather: "ویبسایتی Kurdistan Weather ویبسایتێکە بۆ پیشاندانی کەش و هەوای شارەکانی کوردستان. لەم ویبسایتەدا بەکارهێنەر دەتوانێت زانیاری وەک پلەی گەرمی، دۆخی کەش و هەوا و زانیارییەکانی تر ببینێت. ویبسایتەکە بە زمانی کوردی دروستکراوە و دیزاینێکی سادە و خێرا هەیە بۆ ئەوەی بەکارهێنانی بۆ هەموو کەس ئاسان بێت.",
    wifiTitle: "تاقیکردنەوەی وایفای",
    wifi: "ئەم پرۆژەیە داندراوە بۆ خزمەت گوزاری سود وەرگرتن لە تێست کردنی تۆری وایفای بە شێوەیەکی پێشکەوتو.",
    qrTitle: "QRCODE PRO",
    qr: "ئەم پرۆژەیە دروست کراوە بۆ خزمەتگوزاری QR Code & Scann، بەرهەمەکە پێکهاتوە لە دروستکردنی QR Code, دانانی وێنە و دانانی text, وەScann کردنن.",
    snakeTitle: "ماری AMZ",
    snake: "یارییەکی کلاسیکیە تیایدا یاریزانان کۆنتڕۆڵی مارێکی گەورە دەکەن کە سێو دەخوات بۆ زیادکردنی درێژی. بەرەنگارییەکە ئەوەیە کە خۆت لە بەرکەوتن بە دیوارەکان یان لەشی مارەکە دوور بخەیتەوە کاتێک بە تێپەڕبوونی کات خێراتر دەجوڵێت.",
    flappyTitle: "باڵندەی AMZ",
    flappy: "Flappy bird یاریەکی ئاڵودەکەرە کە یاریزانان کلیک دەکەن بۆ فراندنی باڵندەکە بە شێوەیەکی بێکۆتای زۆر سەخت کەبەتێپەربونی کات خێرای و سەختی زیاد دەکات.",
    openProject: "کردنەوەی پرۆژە",
    restmenuTitle: "مێنیوی چێشتخانە",
    restmenu: "ئەم ویبسایتە بۆ پیشاندانی مێنیوی خواردنگەکان بە شێوەیەکی ئاسان و جوان دروستکراوە. بەکارهێنەران دەتوانن بە ئاسانی خواردنەکان ببینن، نرخەکان بزانن و زانیاری زیاتر دەربارەی هەر خواردنێک وەرگرن. دیزاینەکە مۆدێرن و گونجاوە بۆ بەکارهێنان لەسەر مۆبایل و کۆمپیوتەر. ئامانجی ئەم ویبسایتە باشترکردنی ئەزموونی کڕیار و خێراترکردنی هەڵبژاردنی خواردنە.",
    shoppingwebTitle: "ویبسایتی فرۆشتن",
    shoppingweb: "ئەم ویبسایتە پلاتفۆرمێکی ئۆنلاینە بۆ یارمەتیدانی فرۆشیارەکان بۆ پیشاندانی بەرهەمەکان و فرۆشتنیان بە شێوەیەکی ئاسان و پرۆفیشنال. فرۆشیارەکان دەتوانن بەرهەمەکان زیاد بکەن، نرخ و وێنە دابنێن و داواکاریی کڕیاران بەڕێوە ببرن. دیزاینەکە مۆدێرن و خێراکارە و گونجاوە بۆ مۆبایل و کۆمپیوتەر. ئامانجی ئەم ویبسایتە زیادکردنی فرۆش و باشترکردنی ئەزموونی کڕین و فرۆشتنە.",
    privateProject: "🔒 پرۆژەی تایبەت",
    contactKicker: "پەیوەندی",
    contactTitle: "پەیوەندیمان پێوە بکە",
    conAbout: "گەر دەتەوێت زانیاری زیاتر یاخود پەیوەندیمان پێوە بکەیت ئەوە تکایە یەکێکلە هەڵبژاردەکانی خوارەوە هەڵبژێرە.",
    email: "ئیمەیڵ",
    telegram: "تێلێگرام",
    github: "گیت هەب",
    rights: "AMZ Group. هەموو مافەکان پارێزراون.",
    projectsKicker: "کارەکانمان",
    projectsTitle: "پرۆژە هەڵبژێردراوەکان",
    projectsSub: "کۆمەڵێک ئامراز، بەرنامە و یاری داهێنراوی تیم.",
    servicesKicker: "ئەوەی دروستی دەکەین",
    servicesTitle: "خزمەتگوزاریەکانمان",
    servicesSub: "پلاتفۆرمی تایبەت بە دیزاین و گەشەپێدانی تەواو.",
    aboutKicker: "تیم",
    aboutSub: "سێ مێشک، یەک ئامانج — بنیاتنانی داهاتووی وێب.",
  }
};

/* ============================================================
   LANGUAGE CONTEXT
============================================================ */
const LanguageContext = createContext();
const useLanguage = () => useContext(LanguageContext);

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem('amz_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('amz_lang', lang);
    const html = document.documentElement;
    if (lang === 'ku') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ku');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    }
  }, [lang]);

  const t = useCallback((key) => {
    const dict = translations[lang] || translations.en;
    return dict[key] ?? translations.en[key] ?? key;
  }, [lang]);

  const value = { lang, setLang, t, dir: lang === 'ku' ? 'rtl' : 'ltr' };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/* ============================================================
   BRAND MARK
============================================================ */
function BrandMark({ size = 44, className = '', logo }) {
  const src = logo || siteConfig.logo;
  return (
    <div
      className={`relative grid place-items-center rounded-2xl overflow-hidden ${className}`}
      style={{ width: size, height: size, background: 'linear-gradient(135deg, #ffcc00, #ffb300 55%, #2d8cff)', boxShadow: '0 8px 24px -6px rgba(255,204,0,0.55)', padding: 2 }}
    >
      <div className="w-full h-full rounded-[14px] grid place-items-center overflow-hidden" style={{ background: '#0a0a0f' }}>
        {src ? (
          <img src={src} alt="AMZ Group logo" className="w-full h-full object-cover" style={{ borderRadius: 12 }} />
        ) : (
          <span className="font-display font-bold tracking-tight leading-none"
            style={{ fontSize: size * 0.3, background: 'linear-gradient(135deg, #ffcc00, #2d8cff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            {siteConfig.brandName}
          </span>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   REVEAL
============================================================ */
function Reveal({ children, delay = 0, y = 28, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.96, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   SNOWFALL (constellation network)
============================================================ */
function Snowfall() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];
    let w = 0, h = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -9999, y: -9999 };
    const LINK_DIST = 150;
    const MOUSE_DIST = 190;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(64, Math.max(20, Math.floor((w * h) / 32000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6, hue: Math.random() > 0.5 ? 'y' : 'b',
        tw: Math.random() * Math.PI * 2,
      }));
    }
    function nodeColor(p, alpha) {
      return p.hue === 'y' ? `rgba(255, 204, 0, ${alpha})` : `rgba(45, 140, 255, ${alpha})`;
    }
    function drawStatic() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = nodeColor(p, 0.5); ctx.fill(); }
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.tw += 0.03;
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
      }
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(120, 180, 255, ${(1 - d / LINK_DIST) * 0.22})`;
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE_DIST) {
          ctx.strokeStyle = `rgba(255, 204, 0, ${(1 - md / MOUSE_DIST) * 0.4})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      for (const p of particles) {
        const twinkle = 0.5 + Math.sin(p.tw) * 0.25;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor(p, twinkle); ctx.shadowBlur = 8; ctx.shadowColor = nodeColor(p, 0.9);
        ctx.fill(); ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(tick);
    }
    function onMove(e) { mouse.x = e.clientX; mouse.y = e.clientY; }
    function onLeave() { mouse.x = -9999; mouse.y = -9999; }
    resize();
    if (reduce) drawStatic(); else tick();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" />;
}

/* ============================================================
   NAVBAR
============================================================ */
function Navbar({ active, setActive }) {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'home', label: t('nav').home },
    { id: 'about', label: t('nav').about },
    { id: 'project', label: t('nav').project },
    { id: 'service', label: t('nav').service },
    { id: 'contact', label: t('nav').contact },
  ];

  const go = (id) => { setActive(id); setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleLang = () => setLang(lang === 'en' ? 'ku' : 'en');

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl bg-[hsl(240_25%_4%/0.72)] border-b border-white/10' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <nav className="flex items-center justify-between h-[68px]">
          <button onClick={() => go('home')} className="flex items-center gap-3 group">
            <BrandMark size={38} className="group-hover:scale-105 transition-transform" />
            <span className="font-display font-bold text-[15px] tracking-wide">AMZ GROUP</span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <button key={it.id} onClick={() => go(it.id)}
                className={`px-4 py-2 rounded-full text-[13.5px] font-medium transition-all duration-300 ${active === it.id ? 'text-white bg-white/8 shadow-[inset_0_0_0_1px_rgba(232,93,4,0.4)]' : 'text-white/55 hover:text-white hover:bg-white/5'}`}>
                {it.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleLang} className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] font-semibold border border-white/12 bg-white/5 hover:bg-white/10 hover:border-white/22 transition-all">
              <Globe size={14} style={{ color: '#f59e0b' }} />
              {lang === 'en' ? 'کوردی' : 'EN'}
            </button>
            <button onClick={() => setOpen((v) => !v)} className="md:hidden grid place-items-center w-10 h-10 rounded-full border border-white/12 bg-white/5" aria-label="Menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>
      {open && (
        <div className="md:hidden px-5 pb-5">
          <div className="glass rounded-2xl p-3 flex flex-col gap-1 shadow-2xl">
            {items.map((it) => (
              <button key={it.id} onClick={() => go(it.id)}
                className={`text-start px-4 py-3 rounded-xl text-[14.5px] font-medium transition-all ${active === it.id ? 'text-white bg-white/10' : 'text-white/65 hover:bg-white/5'}`}>
                {it.label}
              </button>
            ))}
            <button onClick={toggleLang} className="text-start px-4 py-3 rounded-xl text-[14.5px] font-medium text-white/65 hover:bg-white/5 flex items-center gap-2">
              <Globe size={15} style={{ color: '#f59e0b' }} />
              {lang === 'en' ? 'کوردی' : 'English'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   FOOTER
============================================================ */
function Footer({ setActive }) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-10 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button onClick={() => setActive('home')} className="flex items-center gap-3 group">
          <BrandMark size={34} className="group-hover:scale-105 transition-transform" />
          <div className="text-start">
            <div className="font-display font-bold text-[14px]">AMZ GROUP</div>
            <div className="text-[11px] text-white/40">Build for the Future</div>
          </div>
        </button>
        <div className="text-[13px] text-white/45 text-center order-first sm:order-none">© {year} {t('rights')}</div>
        <div className="flex gap-2">
          <a href="mailto:amz.group.development@gmail.com" className="px-4 py-2 rounded-full border border-white/12 bg-white/5 hover:bg-white/10 hover:border-white/22 transition-all text-[12.5px] text-white/70">Email</a>
          <a href="https://t.me/amzgroup_xyz" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full border border-white/12 bg-white/5 hover:bg-white/10 hover:border-white/22 transition-all text-[12.5px] text-white/70">Telegram</a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   HERO SECTION
============================================================ */
function HeroSection({ setActive }) {
  const { t } = useLanguage();
  const goals = t('skillDesc').split('\n').filter(Boolean);
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-10 items-center pt-6 pb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/12 bg-white/5 text-[12.5px] font-semibold tracking-wide text-white/70">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'linear-gradient(135deg,#ffcc00,#2d8cff)', boxShadow: '0 0 10px #ffcc00' }} />
              {t('tag')}
            </span>
            <h1 className="mt-6 font-display font-bold leading-[1.04] tracking-tight text-gradient" style={{ fontSize: 'clamp(34px, 5.4vw, 60px)' }}>{t('homeTitle')}</h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-white/65 max-w-xl">{t('homeDesc')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setActive('contact')} className="btn-saffron inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[14.5px]">{t('contactBtn')}<ArrowRight size={17} /></button>
              <button onClick={() => setActive('project')} className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[14.5px] text-white">{t('projectBtn')}</button>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] animate-spin-slow" style={{ background: 'conic-gradient(from 200deg, rgba(255,204,0,0.55), rgba(45,140,255,0.5), rgba(255,204,0,0.55))', filter: 'blur(2px)' }} />
              <div className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] rounded-[2rem] p-[3px]">
                <div className="w-full h-full rounded-[1.9rem] grid place-items-center overflow-hidden" style={{ background: '#0a0a0f' }}>
                  <div className="text-center px-6">
                    <BrandMark size={96} className="mx-auto" />
                    <div className="mt-6 font-display font-bold text-2xl text-gradient">AMZ</div>
                    <div className="mt-1 text-[11px] tracking-[0.25em] text-white/45 uppercase">Group</div>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-white/55">
                      <Sparkles size={12} style={{ color: '#ffcc00' }} />Build for the Future
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-6 pb-10">
          <Reveal delay={0.05}>
            <div className="glass glass-hover rounded-3xl p-8 h-full">
              <div className="kicker">{t('aboutTeam')}</div>
              <h2 className="mt-2 font-display font-bold text-2xl">{t('aboutHeading')}</h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-white/60">{t('aboutDesc')}</p>
              <button onClick={() => setActive('about')} className="mt-6 btn-saffron inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-[13.5px]">{t('moreinfo')}<ArrowRight size={15} /></button>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glass glass-hover rounded-3xl p-8 h-full">
              <div className="kicker">{t('skill')}</div>
              <h2 className="mt-2 font-display font-bold text-2xl flex items-center gap-2"><Target size={20} style={{ color: '#2d8cff' }} />{t('skill2')}</h2>
              <div className="mt-5 flex flex-col gap-3">
                {goals.map((g, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full flex-none animate-pulse" style={{ background: 'linear-gradient(135deg,#ffcc00,#2d8cff)', boxShadow: '0 0 8px rgba(255,204,0,0.6)' }} />
                    <span className="text-[14.5px] text-white/70 leading-relaxed">{g.replace('• ', '').trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT SECTION
============================================================ */
function AboutSection() {
  const { t } = useLanguage();
  const members = [
    { name: t('mohammedName'), role: t('founder'), about: t('Mabout'), link: 'https://mba.amzgroup.xyz', icon: Crown, accent: '#f59e0b', num: '01', img: '' },
    { name: t('zhallaName'), role: t('teamManager'), about: t('Zabout'), link: 'https://zhalla.amzgroup.xyz', icon: Medal, accent: '#2dd4bf', num: '02', img: '' },
    { name: t('anasName'), role: t('teamManager'), about: t('Aabout'), link: null, icon: Medal, accent: '#8b7bff', num: '03', img: '' },
  ];
  return (
    <section className="relative">
      <div className="ambient-blob w-[400px] h-[400px] top-0 right-1/4" style={{ background: 'rgba(139,123,255,0.16)' }} />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
        <Reveal>
          <div className="kicker">{t('aboutKicker')}</div>
          <h2 className="mt-2 font-display font-bold tracking-tight text-gradient" style={{ fontSize: 'clamp(30px, 4.4vw, 48px)' }}>{t('devinfo')}</h2>
          <p className="mt-4 text-[16px] text-white/60 max-w-2xl">{t('aboutSub')}</p>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {members.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.num} delay={i * 0.08}>
                <div className="glass glass-hover rounded-3xl overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-square w-full grid place-items-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${m.accent}, #2dd4bf)` }}>
                    {m.img ? (
                      <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display font-bold leading-none text-black/80" style={{ fontSize: 'clamp(56px, 9vw, 96px)' }}>{m.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
                    )}
                    <span className="absolute bottom-3 end-4 font-display font-bold text-5xl text-black/20 leading-none select-none">{m.num}</span>
                    <span className="absolute top-3 start-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide text-black/85 bg-black/15 backdrop-blur-sm"><Icon size={13} />{m.role}</span>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-xl">{m.name}</h3>
                    <p className="mt-3 text-[14.5px] leading-[1.7] text-white/60 flex-1">{m.about}</p>
                    {m.link && (
                      <a href={m.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white/80 hover:text-white transition-colors group">{t('moreinfo')}<ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-6 glass glass-hover rounded-3xl p-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl grid place-items-center flex-none" style={{ background: 'linear-gradient(135deg, rgba(45,212,191,0.22), rgba(232,93,4,0.16))' }}>
              <GraduationCap size={28} style={{ color: '#2dd4bf' }} />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl">{t('lfuTitle')}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-white/60">{t('lfu')}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   PROJECTS SECTION
============================================================ */
function ProjectsSection() {
  const { t } = useLanguage();
  const projects = [
    { title: t('mathSolverTitle'), desc: t('mathSolver'), url: 'https://math.amzgroup.xyz', icon: Calculator, from: '#f59e0b', to: '#ff7a45', img: '' },
    { title: t('weatherTitle'), desc: t('weather'), url: 'https://weather.amzgroup.xyz', icon: CloudSun, from: '#2dd4bf', to: '#38bdf8', img: '' },
    { title: t('wifiTitle'), desc: t('wifi'), url: 'https://amz-group.github.io/Speed-wifi/', icon: Wifi, from: '#8b7bff', to: '#2dd4bf', img: '' },
    { title: t('qrTitle'), desc: t('qr'), url: 'https://amz-group.github.io/QRcode-pro/', icon: QrCode, from: '#f59e0b', to: '#2dd4bf', img: '' },
    { title: t('snakeTitle'), desc: t('snake'), url: 'https://amz-group.github.io/snakegame/', icon: Gamepad2, from: '#34d399', to: '#2dd4bf', img: '' },
    { title: t('flappyTitle'), desc: t('flappy'), url: 'https://amz-group.github.io/flappy-bird/', icon: Bird, from: '#f59e0b', to: '#e85d04', img: '' },
  ];
  return (
    <section className="relative">
      <div className="ambient-blob w-[420px] h-[420px] top-10 left-0" style={{ background: 'rgba(255,204,0,0.14)' }} />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
        <Reveal>
          <div className="kicker">{t('projectsKicker')}</div>
          <h2 className="mt-2 font-display font-bold tracking-tight text-gradient" style={{ fontSize: 'clamp(30px, 4.4vw, 48px)' }}>{t('projectsTitle')}</h2>
          <p className="mt-4 text-[16px] text-white/60 max-w-2xl">{t('projectsSub')}</p>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <a href={p.url} target="_blank" rel="noreferrer" className="glass glass-hover rounded-3xl overflow-hidden block h-full flex flex-col group">
                  <div className="relative h-44 grid place-items-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}>
                    {p.img ? (
                      <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6) 0, transparent 40%)' }} />
                        <Icon size={64} className="text-black/85 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                      </>
                    )}
                    <span className="absolute bottom-3 end-3 font-display font-bold text-5xl text-black/15 leading-none drop-shadow">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-lg leading-tight">{p.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-[1.65] text-white/55 flex-1">{p.desc}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/85">{t('openProject')}<ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES SECTION
============================================================ */
function ServicesSection() {
  const { t } = useLanguage();
  const services = [
    { title: t('restmenuTitle'), desc: t('restmenu'), icon: UtensilsCrossed, from: '#f59e0b', to: '#e85d04', img: '', url: '' },
    { title: t('shoppingwebTitle'), desc: t('shoppingweb'), icon: ShoppingBag, from: '#2dd4bf', to: '#38bdf8', img: '', url: '' },
  ];
  return (
    <section className="relative">
      <div className="ambient-blob w-[400px] h-[400px] top-0 right-0" style={{ background: 'rgba(45,140,255,0.14)' }} />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
        <Reveal>
          <div className="kicker">{t('servicesKicker')}</div>
          <h2 className="mt-2 font-display font-bold tracking-tight text-gradient" style={{ fontSize: 'clamp(30px, 4.4vw, 48px)' }}>{t('servicesTitle')}</h2>
          <p className="mt-4 text-[16px] text-white/60 max-w-2xl">{t('servicesSub')}</p>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <a href={s.url || undefined} target={s.url ? '_blank' : undefined} rel={s.url ? 'noreferrer' : undefined} className={`glass glass-hover rounded-3xl overflow-hidden h-full flex flex-col ${s.url ? 'block group' : 'block cursor-default'}`}>
                  <div className="relative h-52 grid place-items-center overflow-hidden" style={s.img ? undefined : { background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
                    {s.img ? (
                      <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.7) 0, transparent 45%)' }} />
                        <Icon size={72} className="text-black/85" strokeWidth={1.5} />
                      </>
                    )}
                    <span className="absolute bottom-4 end-4 font-display font-bold text-5xl text-black/15 leading-none drop-shadow">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-xl">{s.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-[1.7] text-white/60 flex-1">{s.desc}</p>
                    {s.url ? (
                      <div className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13.5px] font-semibold border border-white/15 bg-white/5 text-white/85 w-fit group-hover:border-white/30 transition-colors">{t('openProject')}<ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></div>
                    ) : (
                      <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-semibold border border-white/15 bg-white/5 text-white/70 w-fit"><Lock size={14} />{t('privateProject')}</div>
                    )}
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT SECTION
============================================================ */
function ContactSection() {
  const { t } = useLanguage();
  const channels = [
    { label: t('email'), href: 'mailto:amz.group.development@gmail.com', icon: Mail, primary: true },
    { label: t('telegram'), href: 'https://t.me/amzgroup_xyz', icon: Send, primary: false },
    { label: t('github'), href: 'https://github.com/amz-group', icon: Github, primary: false },
  ];
  return (
    <section className="relative">
      <div className="ambient-blob w-[460px] h-[460px] top-0 left-1/3" style={{ background: 'rgba(232,93,4,0.16)' }} />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative">
        <Reveal>
          <div className="glass rounded-[2rem] p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,93,4,0.6), transparent)' }} />
            <div className="kicker">{t('contactKicker')}</div>
            <h2 className="mt-3 font-display font-bold tracking-tight text-gradient" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>{t('contactTitle')}</h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-white/60 max-w-xl mx-auto">{t('conAbout')}</p>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-[14.5px] transition-all group ${c.primary ? 'btn-saffron' : 'btn-ghost text-white'}`}>
                    <Icon size={17} />{c.label}
                    {!c.primary && <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   HOME (default export)
============================================================ */
function HomeContent() {
  const [active, setActive] = useState('home');
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Snowfall />
      <Navbar active={active} setActive={setActive} />
      <main className="relative z-10 pt-[88px] pb-10">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            {active === 'home' && <HeroSection setActive={setActive} />}
            {active === 'about' && <AboutSection />}
            {active === 'project' && <ProjectsSection />}
            {active === 'service' && <ServicesSection />}
            {active === 'contact' && <ContactSection />}
          </motion.div>
        </AnimatePresence>
      </main>
      <div className="relative z-10"><Footer setActive={setActive} /></div>
    </div>
  );
}

export default function Home() {
  return <LanguageProvider><HomeContent /></LanguageProvider>;
}
