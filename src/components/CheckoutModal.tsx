/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Lock, 
  CreditCard, 
  Copy, 
  Check, 
  Smartphone, 
  Mail, 
  Download, 
  AlertCircle, 
  Clock, 
  Gift, 
  CheckCircle2, 
  HeartHandshake,
  Loader2
} from 'lucide-react';
import { PlanOption } from '../types.ts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanOption;
}

export default function CheckoutModal({ isOpen, onClose, selectedPlan }: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [step, setStep] = useState<'details' | 'processing' | 'pay_pix' | 'success'>('details');
  const [error, setError] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isOpen) return null;

  // Simple validations
  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || email.length < 5) {
      setError('Por favor, informe um endereço de e-mail válido.');
      return;
    }
    if (phone.length < 9) {
      setError('Por favor, informe seu WhatsApp para receber o acesso instantâneo.');
      return;
    }
    setError('');

    // If card payment, require card details
    if (paymentMethod === 'card') {
      if (!cardName || cardNumber.length < 12 || !cardExpiry || !cardCvv) {
        setError('Por favor, preencha todos os dados do cartão de crédito.');
        return;
      }
    }

    setStep('processing');
    setTimeout(() => {
      if (paymentMethod === 'pix') {
        setStep('pay_pix');
      } else {
        setStep('success');
      }
    }, 2200);
  };

  const handleSimulatePixPaid = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText('00020126580014BR.GOV.BCB.PIX0114onewavetw@gmail.com520400005303986540527.905802BR5917PackAulaMagica6009SaoPaulo62070503***6304ED2F');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 font-sans text-slate-800"
      >
        {/* Header decoration */}
        <div className="bg-brand-teal px-6 py-4 flex items-center justify-between text-white border-b border-brand-teal/10">
          <div className="flex items-center gap-2">
            <span className="p-1 bgColor bg-white/10 rounded">
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
            </span>
            <span className="text-xs font-mono font-medium tracking-wide">WIAPY PAGAMENTOS SEGUROS</span>
          </div>
          <button 
            id="close-checkout-modal"
            onClick={onClose} 
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 md:p-8 space-y-6">
          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                {/* Product Summary Mini Card */}
                <div className="bg-brand-sage/40 p-4 rounded-2xl border border-brand-sage flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-brand-teal text-white font-bold tracking-widest px-2 py-0.5 rounded-full uppercase">
                      PLANO SELECIONADO
                    </span>
                    <h4 className="text-sm font-bold font-display text-brand-dark">
                      {selectedPlan.name} — Pack Aula Mágica
                    </h4>
                    <p className="text-[11px] text-[#1a4d43]/85">
                      Acesso imediato no WhatsApp e e-mail
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through block leading-none">
                      {selectedPlan.originalPrice ? `R$ ${selectedPlan.originalPrice.toFixed(2)}` : ''}
                    </span>
                    <span className="text-lg font-black text-brand-teal">
                      R$ {selectedPlan.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Form flow */}
                <form id="checkout-form" onSubmit={handleProceed} className="space-y-4">
                  {/* Step label */}
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">
                    Passo 1: Seus dados de entrega
                  </span>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Seu melhor e-mail (onde enviamos o PDF):
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          id="checkout-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="exemplo@email.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:bg-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Seu WhatsApp com DDD (envio instantâneo):
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          id="checkout-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:bg-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment selection */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Selecione a forma de pagamento:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        id="pay-pix-tab"
                        type="button"
                        onClick={() => setPaymentMethod('pix')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-semibold duration-150 ${
                          paymentMethod === 'pix'
                            ? 'bg-brand-sage/80 border-brand-teal text-brand-dark shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                        Pix Instantâneo
                      </button>

                      <button
                        id="pay-card-tab"
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-semibold duration-150 ${
                          paymentMethod === 'card'
                            ? 'bg-brand-coral-light border-brand-coral text-brand-coral block font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        Cartão de Crédito
                      </button>
                    </div>
                  </div>

                  {/* Credit Card Inputs iff Card Selected */}
                  {paymentMethod === 'card' && (
                    <motion.div
                      id="card-details-section"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 pt-3 border-t border-dashed border-slate-200"
                    >
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Nome escrito no cartão:</label>
                        <input
                          id="card-name"
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Ex: AMANDA R SOUZA"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:bg-white text-slate-850"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Número do Cartão:</label>
                        <input
                          id="card-number"
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4444 5555 6666 7777"
                          maxLength={19}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:bg-white text-slate-850"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-slate-500 uppercase">Validade:</label>
                          <input
                            id="card-expiry"
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/AA"
                            maxLength={5}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:bg-white text-slate-850"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-slate-500 uppercase">CVV (Código):</label>
                          <input
                            id="card-cvv"
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:bg-white text-slate-850"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-2xl border border-red-150 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      id="submit-payment-btn"
                      type="submit"
                      className="w-full bg-brand-coral hover:bg-brand-coral/90 text-white font-semibold text-sm py-4 rounded-2xl transition-all duration-150 flex items-center justify-center gap-2 shadow-lg glow-on-hover active:scale-98"
                    >
                      <Lock className="w-4 h-4" /> 
                      {paymentMethod === 'pix' 
                        ? 'Gerar QR Code Pix de R$ ' + selectedPlan.price.toFixed(2)
                        : 'Pagar R$ ' + selectedPlan.price.toFixed(2) + ' e Baixar Instantaneamente'
                      }
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                      🔒 Pagamento 100% criptografado e certificado pela Wiapy LTDA.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-brand-teal animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-brand-gold" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">Processando Pagamento Seguro...</h4>
                  <p className="text-xs text-slate-400 max-w-xs block">
                    Estamos estabelecendo uma transação criptografada de alta segurança. Por favor, não feche esta página.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'pay_pix' && (
              <motion.div
                key="pay_pix"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5 text-center"
              >
                <div className="bg-brand-gold/10 text-brand-teal px-4 py-2.5 rounded-2xl border border-brand-gold/30 flex items-center justify-center gap-2 text-xs font-semibold">
                  <Clock className="w-4 h-4 text-[#ffbe2b] animate-pulse" />
                  <span>Seu Pix Expira em 10 minutos</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 leading-tight">Escaneie ou copie o código Pix</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Abra o app do seu banco, escolha "Pagar com Pix" e escaneie o código QR abaixo:
                  </p>
                </div>

                {/* QR Code Illustration Frame */}
                <div className="w-44 h-44 mx-auto bg-slate-100 p-2.5 rounded-2xl border-2 border-brand-teal flex items-center justify-center relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=200&auto=format&fit=crop&q=80" 
                    alt="QR Code Simulado" 
                    className="w-full h-full object-contain mix-blend-multiply opacity-90 rounded"
                    referrerPolicy="no-referrer"
                  />
                  {/* Decorative corner indicators to make it look highly stylized */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-brand-coral"></div>
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-brand-coral"></div>
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-brand-coral"></div>
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-brand-coral"></div>
                </div>

                <h5 className="text-xl font-black text-brand-teal">
                  R$ {selectedPlan.price.toFixed(2)}
                </h5>

                {/* Actions */}
                <div className="space-y-3 max-w-sm mx-auto">
                  <button
                    id="copy-pix-btn"
                    onClick={copyPixCode}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-2 duration-150"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        Código Copiado com Sucesso!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        Copiar Código Pix (Copia e Cola)
                      </>
                    )}
                  </button>

                  <button
                    id="simulate-paid-pix-btn"
                    onClick={handleSimulatePixPaid}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 duration-150 shadow shadow-emerald-200"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Simular Pagamento Confirmado
                  </button>
                  <p className="text-[10px] text-slate-400">
                    O sistema identifica a liberação instantaneamente após o pagamento.
                  </p>
                </div>
              </motion.div>
            )}

            {isOpen && step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-6"
              >
                {/* Beautiful checkout final screen */}
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-black font-display text-slate-900">Parabéns! Seu Acesso foi Liberado 🎉</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Seu pagamento eletrônico foi processado e aprovado com sucesso pela Wiapy.
                  </p>
                </div>

                <div className="bg-brand-sage border border-brand-teal/20 p-4 rounded-2xl max-w-sm mx-auto text-left space-y-3">
                  <div className="flex items-center gap-2 border-b border-brand-teal/10 pb-2">
                    <Gift className="w-4 h-4 text-brand-coral" />
                    <span className="text-xs font-bold text-brand-dark font-display">Materiais de Entrega Imediata</span>
                  </div>

                  <ul className="space-y-2 text-[11px] text-brand-dark/90">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-coral"></span>
                      Acesso enviado para o e-mail: <strong className="font-mono text-xs text-brand-teal">{email || 'professor@escola.com'}</strong>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-coral"></span>
                      Notificação instantânea enviada para: <strong className="font-mono text-xs text-brand-teal">{phone || '(11) 99999-9999'}</strong>
                    </li>
                  </ul>
                </div>

                {/* REAL ACTION: letting them simulate downloading the files immediately! */}
                <div className="space-y-3 max-w-sm mx-auto">
                  <a
                    id="download-materials-link"
                    href="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1600&auto=format&fit=crop&q=80"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs py-4 rounded-2xl flex items-center justify-center gap-2 duration-150 shadow-lg glow-teal"
                  >
                    <Download className="w-4 h-4 animate-bounce" /> Baixar Seu Pack Aula Mágica em PDF agora
                  </a>

                  <button
                    id="finish-checkout-flow"
                    onClick={onClose}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-600 underline"
                  >
                    Voltar para o site principal
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 max-w-xs mx-auto">
                  <HeartHandshake className="w-4 h-4 text-brand-coral" />
                  <span className="text-[10px] text-slate-400 font-medium">Equipe Pack Aula Mágica te deseja excelentes aulas!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
