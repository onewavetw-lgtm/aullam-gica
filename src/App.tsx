/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Download,
  Check,
  X,
  ChevronDown,
  HelpCircle,
  Heart,
  Percent,
  Clock,
  Smartphone,
  Mail,
  FileText,
  CheckCircle,
  Calendar,
  Award,
  AlertCircle,
  Gift,
  Palette,
  BookOpen,
  ArrowRight,
  Printer,
  Flame,
  ShieldCheck,
  ThumbsUp,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Gem,
  MessageCircle
} from 'lucide-react';

import { MATERIALS_LIST, TESTIMONIALS_LIST, FAQS_LIST, PLANS_LIST } from './data.ts';
import { MaterialItem, PlanOption, Testimonial } from './types.ts';
import CheckoutModal from './components/CheckoutModal.tsx';

export default function App() {
  // States
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');
  const [testimonialLikes, setTestimonialLikes] = useState<Record<string, number>>({});
  const [helpfulTestimonials, setHelpfulTestimonials] = useState<Record<string, boolean>>({});

  // Carousel States
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);

  // Checkout Modal Control
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanOption>(PLANS_LIST[1]); // Defaults to premium

  // Sales urgency ticker state
  const [tickerIndex, setTickerIndex] = useState(0);
  const [showTicker, setShowTicker] = useState(false);

  // Time remaining countdown (simulating urgency)
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 42 });

  // Filter categories
  const categories = ['Todos', 'Vocabulário', 'Gestão', 'Atividades', 'Decoração', 'Lembrança'];

  // Filter materials based on selectedCategory
  const filteredMaterials = selectedCategory === 'Todos'
    ? MATERIALS_LIST
    : MATERIALS_LIST.filter(item => item.category === selectedCategory);

  // Carousel Autoplay interval
  useEffect(() => {
    if (!isCarouselPlaying) return;
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % MATERIALS_LIST.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isCarouselPlaying]);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Reset just to keep the loop going for the preview
          return { minutes: 15, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live Purchase Notification ticker simulation
  const mockPurchases = [
    { name: 'Teacher Gisele Araújo', city: 'Belo Horizonte - MG', plan: 'Plano Premium' },
    { name: 'Professora Ana Clara', city: 'Santarém - PA', plan: 'Plano Premium' },
    { name: 'Teacher Letícia', city: 'Porto Alegre - RS', plan: 'Plano Premium' },
    { name: 'Prof. Sandra Medeiros', city: 'Campinas - SP', plan: 'Plano Básico' },
    { name: 'Teacher Priscila R.', city: 'Rio de Janeiro - RJ', plan: 'Plano Premium' }
  ];

  useEffect(() => {
    // Show first ticker after 8 seconds (não atrapalha leitura inicial)
    const initialTimeout = setTimeout(() => {
      setShowTicker(true);
      // Auto-hide após 6 segundos
      setTimeout(() => setShowTicker(false), 6000);
    }, 8000);

    // Periodicamente exibe nova notificação a cada 30s
    const interval = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % mockPurchases.length);
      setShowTicker(true);
      // Auto-hide após 6 segundos
      setTimeout(() => setShowTicker(false), 6000);
    }, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const CHECKOUT_URLS = {
    basic: 'https://pay.wiapy.com/dD0i_JzytQ',
    premium: 'https://pay.wiapy.com/rNN0R2OvEL',
  };

  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const triggerCheckout = (planId: 'basic' | 'premium') => {
    window.open(CHECKOUT_URLS[planId], '_blank');
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(prev => prev === id ? null : id);
  };

  const handleLikeTestimonial = (id: string) => {
    if (helpfulTestimonials[id]) return; // Already liked
    setTestimonialLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    setHelpfulTestimonials(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark font-sans selection:bg-brand-gold-light selection:text-brand-dark pb-12 overflow-x-hidden">

      {/* Dynamic Urgent Header Bar */}
      <div className="bg-brand-teal text-white py-2 px-3 text-center text-[10.5px] sm:text-xs font-mono font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 relative z-50 border-b border-brand-teal/20 shadow-md">
        <div className="flex items-center gap-1 justify-center flex-wrap">
          <Flame className="w-3.5 h-3.5 text-brand-gold fill-brand-gold animate-pulse" />
          <span><strong>85% DE DESCONTO:</strong> Oferta especial por tempo limitado!</span>
        </div>
        <span className="hidden sm:inline text-white/40">|</span>
        <div className="bg-white/10 px-2 py-0.5 rounded-full text-[9px] sm:text-[10.5px] flex items-center gap-1 justify-center">
          <span>O desconto expira em:</span>
          <strong className="text-brand-gold">
            {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
          </strong>
        </div>
      </div>

      {/* BLOCO 1 — VENDA IMEDIATA / HERO */}
      <header className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Playful background decor stars / blobs */}
        <div className="absolute top-10 left-[5%] w-16 h-16 bg-brand-gold/10 rounded-full filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-16 right-[5%] w-32 h-32 bg-brand-coral/10 rounded-full filter blur-2xl"></div>

        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto relative z-10">
          {/* Top Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-sage border border-brand-teal/20 px-4 py-1.5 rounded-full text-xs font-bold text-brand-teal uppercase tracking-wider inline-block"
          >
            <Palette className="w-3.5 h-3.5 inline" />
            <span>Para professoras de inglês</span>
          </motion.div>

          {/* Principal Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-brand-dark leading-[1.08] drop-shadow-2xs max-w-3xl"
          >
            Sua sala de inglês mais <span className="text-brand-coral relative">
              bonita
              {/* Underline loop shape graphic in CSS */}
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-brand-gold/80 rounded-full -rotate-1"></span>
            </span> e organizada <span className="text-brand-teal">— sem criar nada do zero</span>
          </motion.h1>

          {/* Centered Hero Digital Mockup — logo abaixo do título */}
          <div className="flex justify-center w-full max-w-[480px] mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full"
            >
              <img src="/Plano Premium.png" alt="Plano Premium Mockup" className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-[#25423d] max-w-2xl leading-relaxed mx-auto"
          >
            Materiais pedagógicos e decorativos em PDF, prontos para baixar, imprimir e usar. Desenvolvido para poupar tempo e encantar seus alunos do maternal ao fundamental.
          </motion.p>

          {/* CTA Box Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 pt-2 w-full flex flex-col items-center"
          >
            <button
              id="hero-buy-btn"
              onClick={scrollToPlans}
              className="w-full sm:w-auto px-8 py-5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all duration-150 flex items-center justify-center gap-2.5 shadow-xl shadow-green-500/20 active:scale-98 cursor-pointer border-b-4 border-[#15803d]"
            >
              QUERO MEU PACK AULA MÁGICA AGORA <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-brand-teal/90">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 font-extrabold" />
                Sua sala transformada ainda hoje.
              </span>
              <span className="hidden sm:inline text-brand-teal/30">•</span>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <span>Você recebe tudo na hora, direto no seu</span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 font-bold">
                  <MessageCircle className="w-3 h-3 text-emerald-600 fill-emerald-600" /> WhatsApp
                </span>
                <span>e no seu</span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-red-500/10 text-red-700 border border-red-500/20 font-bold">
                  <Mail className="w-3 h-3 text-red-650" /> e-mail
                </span>
              </div>
            </div>
          </motion.div>

          {/* Educational Icons / Badges */}
          <div className="pt-6 border-t border-brand-teal/10 flex flex-wrap gap-6 items-center justify-center w-full">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#30534d]">
              <Printer className="w-4 h-4 text-brand-coral" />
              <span>PDF Pronto para Imprimir</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#30534d]">
              <FileText className="w-4 h-4 text-brand-gold" />
              <span>Alta Definição (Cores Vivas)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#30534d]">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <span>Compra Protegida Wiapy</span>
            </div>
          </div>
        </div>
      </header>

      {/* BLOCO 2 — DEMONSTRATIVO / MATERIAL EM AÇÃO */}
      <section className="bg-[#111827] text-white py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-0.5 border-t-2 border-dashed border-white/10"></div>

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] bg-brand-coral-light text-[#ff6f61] font-mono tracking-widest px-4 py-1.5 rounded-full uppercase font-extrabold inline-block">
              ✦ MATERIAL EM AÇÃO ✦
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-none">
              Veja um dos materiais que você vai receber na prática
            </h2>
          </div>

          {/* Infinite auto-scroll carousel — track 1 */}
          <div className="overflow-hidden w-full">
            <style>{`
              @keyframes scrollLeft { 0%{transform:translate3d(0,0,0)} 100%{transform:translate3d(-50%,0,0)} }
              @keyframes scrollRight { 0%{transform:translate3d(-50%,0,0)} 100%{transform:translate3d(0,0,0)} }
              .track-left { animation: scrollLeft 30s linear infinite; display:flex; width:max-content; will-change: transform; }
              .track-right { animation: scrollRight 30s linear infinite; display:flex; width:max-content; will-change: transform; }
              .track-left:hover, .track-right:hover { animation-play-state: paused; }
            `}</style>
            <div className="track-left gap-5 flex" style={{ backfaceVisibility: 'hidden', perspective: 1000 }}>
              {[
                '/vc vai receber 22 (1).webp',
                '/vc vai receber 22 (2).webp',
                '/vc vai receber 22 (3).webp',
                '/vc vai receber 22 (4).webp',
                '/vc vai receber 22 (5).webp',
                '/vc vai receber 22 (6).webp',
                '/vc vai receber 22 (7).webp',
                '/vc vai receber 22 (1).webp',
                '/vc vai receber 22 (2).webp',
                '/vc vai receber 22 (3).webp',
                '/vc vai receber 22 (4).webp',
                '/vc vai receber 22 (5).webp',
                '/vc vai receber 22 (6).webp',
                '/vc vai receber 22 (7).webp',
              ].map((src, i) => (
                <div key={i} className="shrink-0 w-56 sm:w-72 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl">
                  <img src={src} loading="lazy" alt="Material" className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Track 2 — vai receber images scrolling opposite direction */}
          <div className="overflow-hidden w-full">
            <div className="track-right gap-5 flex" style={{ backfaceVisibility: 'hidden', perspective: 1000 }}>
              {[
                '/vai receber.webp',
                '/vai receber (1).webp',
                '/vai receber (2).webp',
                '/vai receber (3).webp',
                '/vai receber (4).webp',
                '/vai receber (5).webp',
                '/vai receber.webp',
                '/vai receber (1).webp',
                '/vai receber (2).webp',
                '/vai receber (3).webp',
                '/vai receber (4).webp',
                '/vai receber (5).webp',
              ].map((src, i) => (
                <div key={i} className="shrink-0 w-56 sm:w-72 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl">
                  <img src={src} loading="lazy" alt="Material em ação" className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              id="slider-quick-buy-btn"
              onClick={scrollToPlans}
              className="px-8 py-5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all duration-150 inline-flex items-center gap-2 shadow-xl shadow-green-500/20 cursor-pointer"
            >
              QUERO MEU PACK AULA MÁGICA AGORA <ArrowRight className="w-4.5 h-4.5 text-white" />
            </button>
          </div>
        </div>
      </section>


      {/* BLOCO 3 — IDENTIFICAÇÃO COM A DOR: ANTES & DEPOIS */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-10"
      >
        {/* Title Centered */}
        <div className="text-center space-y-2">
          <span className="text-[10px] bg-brand-coral-light text-[#ff6f61] font-mono tracking-widest px-4 py-1.5 rounded-full uppercase font-black inline-block shadow-sm">
            🛡️ COMPARAÇÃO IMPRESSIONANTE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-brand-dark leading-tight">
            Veja seu <span className="text-[#ff6f61] italic font-extrabold underline decoration-brand-gold decoration-4">Antes e Depois</span> com esse produto
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Descubra como o Pack Aula Mágica elimina o estresse do trabalho manual do Canva e transforma sua sala em um verdadeiro polo bilíngue decorado na hora.
          </p>
        </div>

        {/* Dynamic Elementor-style container flex grid */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-4xl mx-auto">

          {/* Column 1: ANTES (Soft Red background) */}
          <div className="flex-1 bg-[#FFE7E7] border border-red-200/80 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              {/* Badge/Header block */}
              <div className="flex items-center gap-2">
                <span className="p-1 px-2.5 bg-red-500/10 text-red-600 rounded-full text-xs font-black tracking-widest font-mono border border-red-500/20">
                  ANTES
                </span>
              </div>

              {/* Tired Teacher visual representation space */}
              <div className="relative aspect-[16/10] bg-white rounded-2xl overflow-hidden border border-red-200 shadow-inner group">
                <img
                  src="/ANTES.png"
                  alt="Professora cansada e exausta criando materiais na madrugada"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-103 duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute bottom-2.5 left-3 text-[9px] bg-red-650 text-white font-mono font-bold px-2 py-0.5 rounded shadow">
                  🕒 Madrugada desperdiçada
                </div>
              </div>

              {/* Struggles points list */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-slate-800 font-display">A rotina frustrante no Canva:</h4>
                <ul className="space-y-3 text-xs font-semibold text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                    <span className="leading-snug">Horas infinitas perdidas tentando desenhar cartazes e frases do zero sem ferramentas prontas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                    <span className="leading-snug">Visual poluído, imagens pixeladas e em baixa resolução que perdem toda a cor na hora de imprimir.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                    <span className="leading-snug">Alunos dispersos, barulhentos ou desinteressados pela falta de uma identidade visual bilíngue acolhedora.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                    <span className="leading-snug">Sobrecarga diária de trabalho manual, exaustão mental e sacrifício total do descanso e dos finais de semana.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-red-200 flex items-center justify-between text-[11px] font-mono text-red-750 font-bold">
              <span>ESTADO ANTERIOR DA SALA</span>
              <span>⚠️ ESTRESSE DIÁRIO</span>
            </div>
          </div>

          {/* Column 2: DEPOIS (Premium Dark theme adapted to page colors, deep purple #19012C style) */}
          <div className="flex-1 bg-[#19012C] border-2 border-emerald-500 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              {/* Badge/Header block */}
              <div className="flex items-center gap-2">
                <span className="p-1 px-3 bg-[#00FF41]/10 text-[#00FF41] rounded-full text-xs font-black tracking-widest font-mono border border-[#00FF41]/30">
                  DEPOIS
                </span>
                <span className="text-[10px] text-yellow-400 font-black animate-pulse flex items-center gap-0.5 font-mono">
                  ✨ INSTANTÂNEO!
                </span>
              </div>

              {/* Happy Teacher visual representation space */}
              <div className="relative aspect-[16/10] bg-[#140024] rounded-2xl overflow-hidden border border-purple-900 shadow-inner group">
                <img
                  src="/Depois.png"
                  alt="Professora fofinha realizada, feliz e descansada com sua sala linda"
                  className="w-full h-full object-cover opacity-100 group-hover:scale-103 duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-emerald-950/15 pointer-events-none"></div>
                <div className="absolute bottom-2.5 left-3 text-[9px] bg-emerald-600 text-white font-mono font-bold px-2 py-0.5 rounded shadow">
                  ✅ Finais de semana livres!
                </div>
              </div>

              {/* Wins point list */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-white font-display">A plenitude com o Pack Aula Mágica:</h4>
                <ul className="space-y-3 text-xs font-semibold text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-[#00FF41] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                    <span className="leading-snug">Pronto em 5 minutos! É só baixar, abrir e imprimir na impressora comum os arquivos prontos de alta qualidade.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-[#00FF41] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                    <span className="leading-snug">Sua sala de aula bilíngue padronizada, decorativa, viva e harmoniosa do começo ao fim do ano letivo.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-[#00FF41] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                    <span className="leading-snug">Foco, atração genuína e interesse total das crianças estimulado por rotinas organizadas e painéis de atividades lúdicas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-[#00FF41] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                    <span className="leading-snug">Economize mais de 40 horas de cansaço. Curta momentos de lazer perfeitos com sua família e ganhe merecidos descansos.</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={scrollToPlans}
              className="mt-6 w-full py-4 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black text-xs sm:text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 shadow-lg cursor-pointer border-b-2 border-green-800"
            >
              EXPERIMENTAR A TRANSFORMAÇÃO AGORA <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      </motion.section>


      {/* BLOCO 4 — O PRODUTO */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-white py-20 px-4 md:px-8 border-y border-slate-200/60 shadow-xs"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Mockup Premium na seção O que vem no Pack */}
          <div className="lg:col-span-6 flex items-center justify-center p-6">
            <img src="/Plano Premium.png" alt="O Que Vem no Pack" className="w-full h-auto max-w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl" />
          </div>

          {/* Copy description section (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] text-brand-coral font-bold font-mono tracking-widest uppercase">
                O PRODUTO
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-brand-dark">
                O que vem no Pack Aula Mágica?
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Um pack digital extraordinário e completo com tudo que qualifica as melhores salas de aula bilíngues do país. Cada material foi projetado especificamente em formato de alta resolução para você ter uma experiência imersiva de aprendizado sem esforços semanais de criação.
            </p>

            <div className="space-y-3 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-teal">
                <span className="w-5 h-5 rounded-full bg-brand-sage flex items-center justify-center text-xs">✓</span>
                <span>Cartazes e molduras com ilustrações exclusivas</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-teal">
                <span className="w-5 h-5 rounded-full bg-brand-sage flex items-center justify-center text-xs">✓</span>
                <span>Formatação pronta em PDF tamanho padrão A4</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-teal">
                <span className="w-5 h-5 rounded-full bg-brand-sage flex items-center justify-center text-xs">✓</span>
                <span>Economia garantida de mais de 40 horas no Canva</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={scrollToPlans}
                className="w-full sm:w-auto px-8 py-4 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black text-sm sm:text-base rounded-2xl transition-all duration-150 flex items-center justify-center gap-2 shadow-xl shadow-green-500/20 border-b-4 border-[#15803d]"
              >
                QUERO BAIXAR AGORA <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-slate-400 font-mono">
                Receba imediatamente após a confirmação.
              </span>
            </div>
          </div>

        </div>
      </motion.section>


      {/* BLOCO 5 — PROVA SOCIAL / TESTIMONIALS */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 md:px-8 max-w-5xl mx-auto space-y-12"
      >
        <div className="text-center space-y-3">
          <span className="text-[9px] bg-brand-gold-light text-[#8a5d00] font-mono tracking-widest px-3 py-1 rounded-full uppercase font-bold">
            DEPOIMENTOS REAIS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-brand-dark">
            O que outras professoras estão dizendo
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Mais de 450 salas de aula já foram transformadas no Brasil. Leia relatos sinceros de quem já baixou, carimbou e aprovou!
          </p>
        </div>

        {/* Depoimentos — somente fotos reais (prints) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.div
              key={n}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white"
            >
              <img
                src={`/depoimentos (${n}).png`}
                alt={`Depoimento real ${n}`}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* BLOCO EXTRA — BÔNUS HOJE EXCLUSIVOS */}
      <section className="bg-[#0f172a] py-20 px-4 md:px-8 relative overflow-hidden">
        {/* Ambient backing light */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto space-y-12 relative z-10">

          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] bg-[#d9f99d] text-emerald-950 font-mono tracking-widest px-4 py-1.5 rounded-full uppercase font-black inline-block shadow-lg">
              🎁 BÔNUS LIBERADOS HOJE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
              E NÃO PARA POR AÍ... TEM MAIS!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Você também vai receber materiais extras valiosos para deixar suas aulas ainda mais práticas. <strong className="text-brand-gold font-bold">Ganhe 100% de desconto</strong> nesses itens garantindo o plano hoje!
            </p>
          </div>

          {/* Cards Grid — novo estilo limpo com mockup em destaque */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
            {[
              { num: 1, src: '/bonus 1.png', title: 'Livro de Colorir Inglês e Espanhol', desc: 'Apostila bilíngue com ilustrações para pintar e memorizar vocabulário brincando.' },
              { num: 2, src: '/bonus 2.png', title: 'Traçado de Letras (Alphabet Tracing)', desc: 'Guia pedagógico de caligrafia com pontilhado divertido das letras em inglês.' },
              { num: 3, src: '/bonus 3.png', title: 'Cartões de Horário Visual (Visual Schedule)', desc: 'Kit de cartões ilustrativos para estruturar a agenda do dia de forma lúdica.' },
              { num: 4, src: '/bonus 4.png', title: 'Bilhetes de Agradecimento e Feedback', desc: 'Elogios em inglês prontos para aproximar pais, alunos e escola.' },
              { num: 5, src: '/bonus 5.png', title: 'Sequenciamento de Palavras (Sentence Cards)', desc: 'Fichas dinâmicas para associar fotos a palavras e montar as primeiras frases.' },
              { num: 6, src: '/bonus 6.png', title: '50 Cartazes de Alergias para Sala de Aula', desc: 'Painéis essenciais para destacar restrições alimentares com clareza e segurança.' },
            ].map(({ num, src, title, desc }) => (
              <motion.div
                key={num}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-white/10 flex flex-col group"
              >
                {/* Imagem do Mockup — área principal, sem overlay pesado */}
                <div className="bg-slate-100 overflow-hidden">
                  <img
                    src={src}
                    loading="lazy"
                    alt={title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Conteúdo limpo abaixo */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  {/* Badge numeração */}
                  <span className="inline-flex items-center gap-1.5 bg-brand-gold/15 text-brand-dark font-black text-[9px] font-mono tracking-wider px-2.5 py-1 rounded-full w-fit border border-brand-gold/30">
                    🎁 #{num} — BÔNUS HOJE!
                  </span>

                  <h4 className="text-sm font-black text-slate-900 font-display leading-tight">{title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed flex-1">{desc}</p>

                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100">
                    <span className="text-[10px] font-mono font-black text-emerald-600">PREÇO HOJE: GRÁTIS</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-700 font-black px-2 py-0.5 rounded-full border border-emerald-200">100% LIBERADO</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stacking pile indicator visual */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-xs text-slate-300 max-w-lg mx-auto font-mono font-semibold">
            🎁 KIT BÔNUS ATIVADO AUTOMATICAMENTE NO PRODUTO FINAL
          </div>

        </div>
      </section>


      {/* BLOCO 6 — OFERTA E PLANOS */}
      <motion.section
        id="planos"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-brand-cream py-20 px-4 md:px-8 border-t border-brand-teal/10"
      >
        <div className="max-w-5xl mx-auto space-y-12">

          <div className="text-center space-y-3">
            <span className="text-[10px] bg-brand-teal text-white font-mono tracking-widest px-3 py-1 rounded-full uppercase font-bold">
              ESCOLHA O SEU PLUGPedagógico
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-brand-dark">
              Escolha a melhor opção para você!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto font-semibold">
              Opções simplificadas e com valor extremamente acessível para facilitar o orçamento escolar de qualquer educadora!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-10 max-w-5xl mx-auto pt-6">

            {/* PLANO BÁSICO CARD */}
            <div className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Cabeçalho do plano */}
              <div className="bg-slate-50 border-b border-slate-100 px-6 pt-6 pb-4 text-center space-y-2">
                <span className="inline-block text-[9px] bg-slate-200 text-slate-600 font-black font-mono tracking-widest px-3 py-1 rounded-full uppercase">
                  PAREDE ACOLHEDORA 🧸
                </span>
                <div className="flex items-center justify-center gap-2">
                  <Gem className="w-5 h-5 text-slate-500" />
                  <h4 className="text-xl font-black font-display text-slate-800">PLANO BÁSICO</h4>
                </div>
                <p className="text-[11px] text-slate-400">Excelente para começar a organizar sua sala.</p>
              </div>

              {/* Imagem do produto — destaque total */}
              <div className="bg-slate-100 overflow-hidden">
                <img
                  src={PLANS_LIST[0].image}
                  loading="lazy"
                  alt="Plano Básico"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Lista e preço */}
              <div className="p-6 flex flex-col gap-5 flex-1">
                <div className="space-y-2.5">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block font-bold">Estão inclusos:</span>
                  <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
                    {PLANS_LIST[0].includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
                  <div>
                    <span className="text-xs text-red-400 line-through block font-mono">de R$ 47,00 por:</span>
                    <span className="text-3xl font-black font-mono text-[#22c55e]">R$ 17,90</span>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{PLANS_LIST[0].installmentsText}</p>
                  </div>
                  <button
                    id="checkout-basic-btn"
                    onClick={() => triggerCheckout('basic')}
                    className="w-full py-4 rounded-xl font-extrabold text-sm bg-[#22c55e] hover:bg-[#16a34a] text-white duration-150 flex items-center justify-center gap-1.5 cursor-pointer border-b-2 border-[#15803d]"
                  >
                    Quero o Plano Básico <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* PLANO PREMIUM / MAIS VENDIDO CARD */}
            <motion.div
              id="featured-premium-card"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="w-full max-w-md bg-white border-2 border-brand-teal rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* Badge Mais Vendido no topo */}
              <div className="bg-brand-teal text-white text-center py-2.5 px-4 flex items-center justify-center gap-2">
                <Crown className="w-4 h-4 fill-brand-gold text-brand-gold" />
                <span className="text-[11px] font-black uppercase tracking-wider">⭐ O MAIS VENDIDO — TODOS OS BÔNUS INCLUSO ⭐</span>
              </div>

              {/* Cabeçalho */}
              <div className="bg-brand-sage/30 border-b border-brand-teal/10 px-6 pt-4 pb-4 text-center space-y-1">
                <span className="inline-block text-[9px] bg-brand-coral text-white font-black font-mono tracking-widest px-3 py-1 rounded-full uppercase shadow-sm">
                  COLEÇÃO PEDAGÓGICA INTEGRAL 📝
                </span>
                <h4 className="text-2xl font-black font-display text-brand-dark">PLANO PREMIUM</h4>
                <p className="text-[11px] text-brand-teal font-extrabold">Todos os {MATERIALS_LIST.length} materiais inclusos em PDF pronto.</p>
              </div>

              {/* Imagem do produto — destaque total */}
              <div className="bg-brand-sage/20 overflow-hidden">
                <img
                  src={PLANS_LIST[1].image}
                  alt="Plano Premium"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Lista e preço */}
              <div className="p-6 flex flex-col gap-5 flex-1">
                <div className="space-y-2.5">
                  <span className="text-[10px] text-brand-teal font-mono uppercase tracking-wider block font-black">O Pacote Completo Inclui:</span>
                  <ul className="space-y-2.5 text-xs font-semibold text-brand-dark max-h-52 overflow-y-auto pr-1 no-scrollbar">
                    {PLANS_LIST[1].includes.map((inc, i) => {
                      const isBoosterLabel = inc.includes('LIVRO DE COLORIR') || inc.includes('Livro de Memórias');
                      return (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isBoosterLabel ? 'bg-brand-coral/15 text-brand-coral' : 'bg-brand-gold/15 text-brand-teal'}`}>
                            {isBoosterLabel ? <Crown className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />}
                          </span>
                          <span className={`leading-tight ${isBoosterLabel ? 'font-black text-brand-coral' : ''}`}>{inc}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="bg-brand-coral/10 p-3 rounded-xl border border-brand-coral/20 text-center">
                  <p className="text-[10px] font-black text-brand-dark">
                    🔥 <span className="text-brand-coral">SUPER DESCONTO:</span> Você economiza R$169,10 hoje!
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-teal/10 space-y-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs text-red-400 line-through block font-mono">de R$ 197,00 por:</span>
                      <span className="text-3xl font-black font-mono text-[#22c55e]">R$ 27,90</span>
                      <p className="text-[10px] text-emerald-600 font-mono mt-0.5 font-bold">{PLANS_LIST[1].installmentsText}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-white bg-brand-coral px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1 mb-1">
                      <Flame className="w-3 h-3 fill-white" /> Salve 85%
                    </span>
                  </div>
                  <button
                    id="checkout-premium-btn"
                    onClick={() => triggerCheckout('premium')}
                    className="w-full py-4 rounded-2xl font-extrabold text-sm bg-[#22c55e] hover:bg-[#16a34a] text-white duration-150 shadow-xl shadow-green-500/20 flex items-center justify-center gap-2 cursor-pointer border-b-4 border-[#15803d]"
                  >
                    <Gift className="w-4 h-4 animate-bounce" /> Quero o Acesso Premium Completo <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>


      {/* BLOCO 9 — URGÊNCIA */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-brand-teal text-white py-16 px-4 md:px-8 relative overflow-hidden"
      >
        {/* Glow orbs in background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffe8e8]/5 rounded-full filter blur-3xl"></div>

        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1 bg-white/10 text-brand-gold text-xs font-mono font-bold px-3 py-1 rounded-full uppercase">
            ⚠️ ÚLTIMO LEMBRETE ANTES DA ALTERAÇÃO DO PREÇO
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight">
            APROVEITE AGORA: Você não vai encontrar esse preço depois!
          </h2>

          <h3 className="text-base sm:text-lg text-brand-gold font-bold">
            Promoção especial válida apenas para os downloads de hoje.
          </h3>

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            As vagas com desconto de 85% são estritamente limitadas para garantir o suporte dedicado via WhatsApp que oferecemos de ponta a ponta. Garanta seu Pack Aula Mágica — um material definitivo que você carimba e utiliza nas suas salas de aula para sempre!
          </p>

          <div className="pt-2">
            <button
              id="urgency-cta-btn"
              onClick={scrollToPlans}
              className="px-8 py-5 bg-brand-coral hover:bg-brand-coral/95 text-white font-extrabold text-sm sm:text-base rounded-2xl transition-all duration-150 inline-flex items-center gap-2 shadow-2xl scale-100 hover:scale-103 active:scale-98 cursor-pointer"
            >
              Garantir Meu Acesso com Desconto Extra <ArrowRight className="w-4.5 h-4.5 text-white" />
            </button>
          </div>
        </div>
      </motion.section>


      {/* BLOCO 10 — GARANTIA */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 md:px-8 max-w-4xl mx-auto"
      >
        <div className="bg-white border-2 border-brand-teal/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xs flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Badge decorative card layout cutout */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-[100px]"></div>

          <div className="w-24 h-24 rounded-full bg-brand-sage border-2 border-brand-teal text-brand-teal flex items-center justify-center text-4xl shrink-0 shadow-sm">
            🛡️
          </div>

          <div className="space-y-4">
            <span className="text-[10px] text-brand-coral font-bold font-mono tracking-widest uppercase">
              RISCO ZERO GARANTIDO
            </span>
            <h3 className="text-2xl font-extrabold font-display text-brand-dark leading-tight">
              7 dias de garantia total e incondicional
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              O investimento é minúsculo, mas o compromisso é absoluto. Baixe todos os PDFs do Pack Aula Mágica, imprima seus cartões e decore sua sala hoje mesmo. Se você ou seus alunos não ficarem satisfeitos, basta nos solicitar o reembolso de 100% do valor pago.
            </p>
            <p className="text-xs font-bold text-brand-teal font-sans">
              Sem perguntas, sem burocracia, sem ressentimento. O risco é inteiramente nosso.
            </p>
          </div>
        </div>
      </motion.section>


      {/* BLOCO 11 — PERGUNTAS FREQUENTES */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-white py-20 px-4 md:px-8 border-y border-slate-200/60"
      >
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="text-center space-y-2">
            <span className="text-[9px] bg-brand-sage text-brand-teal font-mono tracking-widest px-3 py-1 rounded-full uppercase font-bold">
              FAQ CENTRAL
            </span>
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-brand-dark">
              Perguntas frequentes
            </h2>
            <p className="text-xs text-slate-400">
              Caso sua dúvida não esteja respondida abaixo, fale conosco pelo suporte pós-venda.
            </p>
          </div>

          {/* Accordion drawers */}
          <div className="space-y-4">
            {FAQS_LIST.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  id={`faq-item-${faq.id}`}
                  key={faq.id}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-brand-cream/20 hover:bg-brand-cream/35 transition-colors"
                >
                  <button
                    id={`faq-trigger-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-brand-dark outline-none cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-brand-coral shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-100/80 bg-white">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </motion.section>


      {/* BLOCO 12 — RODAPÉ */}
      <footer className="pt-16 pb-12 px-4 md:px-8 max-w-5xl mx-auto space-y-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-brand-teal/10 pb-8">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-extrabold font-display text-brand-dark">
              Pack Aula Mágica 🌟
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Materiais pedagógicos de excelência inspiradora para professoras de inglês.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold text-brand-teal">
            <span className="flex items-center gap-1">
              🛡️ Pagamento Seguro
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              ⚡ Acesso Wiapy
            </span>
          </div>
        </div>

        {/* Legal Disclaimer copy provided */}
        <div className="space-y-4 text-[10px] text-slate-400 leading-relaxed">
          <p className="text-center md:text-justify uppercase font-mono font-semibold tracking-wider">
            Produto digital • Pagamento seguro via Wiapy • Acesso imediato após confirmação
          </p>

          <p className="text-center md:text-justify text-[9px] border-t border-[#e8f1ee] pt-4">
            Todos os direitos sobre a obra “Pack Aula Mágica” são reservados ao Pack Aula Mágica, nos termos da Lei nº 9.610/98 — Lei de Direitos Autorais. A reprodução não autorizada desta publicação, no todo ou em parte, por quaisquer meios, constitui violação dos direitos autorais, sujeitando os infratores às sanções civis e criminais previstas na legislação aplicável.
          </p>
        </div>

        <div className="text-center text-[10px] text-slate-400 font-mono pt-4">
          © {new Date().getFullYear()} Pack Aula Mágica. Todos os direitos reservados.
        </div>
      </footer>


      {/* LIGHTBOX MODAL FOR DETAILED MATERIALS PREVIEW (BLOCK 2 INTEGRATION) */}
      <AnimatePresence>
        {activeMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl border border-slate-100 text-slate-800"
            >
              {/* Modal header details */}
              <div className="bg-brand-cream/80 px-6 py-4 flex items-center justify-between border-b border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-[9px] bg-brand-coral text-white font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                    PREVIEW DO PDF
                  </span>
                  <h4 className="text-sm font-bold font-display text-brand-dark block">
                    {activeMaterial.name}
                  </h4>
                </div>
                <button
                  id="close-lightbox"
                  onClick={() => setActiveMaterial(null)}
                  className="text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100 duration-150"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid content preview */}
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-7 bg-brand-dark p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
                  {/* Outer physical paper card mockup visualizer */}
                  <div className="relative aspect-[3/4] w-full max-w-[260px] bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-200">
                    <img
                      src={activeMaterial.image}
                      alt={activeMaterial.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded shadow-inner"
                    />
                    {/* Simulated cut here indicators as visual guides */}
                    <div className="absolute top-1 left-1.5 text-[8px] font-mono text-slate-400 select-none">✂ A4 PAGE CUT</div>
                  </div>
                </div>

                <div className="md:col-span-5 p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] text-brand-teal font-mono uppercase tracking-wider font-bold">Categoria: {activeMaterial.category}</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {activeMaterial.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[9px] text-slate-400 uppercase font-mono tracking-widest block font-bold">Ficha Técnica</span>
                      <ul className="space-y-1 text-[10px] font-mono text-slate-500">
                        <li>• Formato das Páginas: PDF</li>
                        <li>• Recomendação Padrão: Imprimir em A4</li>
                        <li>• Peso do Arquivo: ~8MB</li>
                        <li>• Ideal: Papel Couchê ou Sulfite 120g</li>
                      </ul>
                    </div>
                  </div>

                  <button
                    id="submit-lightbox-action"
                    onClick={() => {
                      setActiveMaterial(null);
                      scrollToPlans();
                    }}
                    className="w-full bg-brand-coral hover:bg-brand-coral/90 text-white font-bold text-xs py-3 rounded-xl transition-all duration-150 flex items-center justify-center gap-1 animate-pulse"
                  >
                    Garantir Todos no Pack Completo <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* SECURE POPUP MODAL FOR WIAPY SECURE GATEWAY WORKFLOW (BLOCKS 6, 8, 9 CTA INTEGRATION) */}
      <AnimatePresence>
        {checkoutOpen && (
          <CheckoutModal
            isOpen={checkoutOpen}
            selectedPlan={selectedPlanForCheckout}
            onClose={() => setCheckoutOpen(false)}
          />
        )}
      </AnimatePresence>


      {/* LIVE FLOATING SALES TICKER POPUP IN BOTTOM CORNER FOR MAXIMUM SOCIAL PROOF AND CONVERSION */}
      <AnimatePresence>
        {showTicker && (
          <motion.div
            id="floating-social-proof"
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 30, x: 10 }}
            className="fixed bottom-4 right-4 z-40 bg-white border border-brand-teal/15 rounded-2xl shadow-xl px-4 py-3 max-w-[290px] text-xs font-sans flex items-start gap-2.5 justify-between border-l-4 border-l-brand-gold"
          >
            <div className="space-y-0.5">
              <span className="text-[9px] bg-brand-gold-light text-[#8a5d00] font-sans font-bold px-1.5 py-0.2 rounded-full uppercase">
                COMPRA VERIFICADA
              </span>
              <p className="text-[11px] text-brand-dark font-semibold leading-relaxed">
                <strong>{mockPurchases[tickerIndex].name}</strong> do município de <em>{mockPurchases[tickerIndex].city}</em> acaba de adquirir o <span className="text-[#ff6f61] font-bold">{mockPurchases[tickerIndex].plan}</span>!
              </p>
              <span className="text-[9px] text-slate-400 font-mono flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Acesso liberado no WhatsApp
              </span>
            </div>

            <button
              id="dismiss-ticker-btn"
              onClick={() => setShowTicker(false)}
              className="text-slate-300 hover:text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

