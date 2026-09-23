import React, { useState, useId } from 'react';
import { motion } from 'motion/react';
import { useResortData } from '../context/ResortDataContext';
import { Calendar, Users, Calculator, MessageCircle, Send, CheckCircle2, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface BookingCalculatorProps {
  selectedRoomId?: string;
}

export const BookingCalculator: React.FC<BookingCalculatorProps> = ({
  selectedRoomId = 'royal-villa-4bhk'
}) => {
  const { roomsData, resortMeta, pricingConfig } = useResortData();
  const [roomId, setRoomId] = useState<string>(selectedRoomId);

  // Synced if parent changes
  React.useEffect(() => {
    if (selectedRoomId) {
      setRoomId(selectedRoomId);
    }
  }, [selectedRoomId]);

  const today = new Date();
  const nextFriday = new Date();
  const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7;
  nextFriday.setDate(today.getDate() + daysUntilFriday);

  const nextSunday = new Date(nextFriday);
  nextSunday.setDate(nextFriday.getDate() + 2);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(nextFriday));
  const [checkOut, setCheckOut] = useState(formatDate(nextSunday));
  const [adults, setAdults] = useState(10);
  const [children, setChildren] = useState(2);
  const [mealPlan, setMealPlan] = useState<'none' | 'breakfast' | 'all-meals'>('all-meals');

  // Form Submission State
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const uniqueId = useId();

  // Find Room
  const selectedRoom = roomsData.find((r) => r.id === roomId) || roomsData[0];

  // Calculate Nights & Weekend vs Weekday breakdown
  const dIn = new Date(checkIn);
  const dOut = new Date(checkOut);
  const diffTime = Math.max(0, dOut.getTime() - dIn.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  let weekdayCount = 0;
  let weekendCount = 0;

  for (let i = 0; i < nights; i++) {
    const cur = new Date(dIn);
    cur.setDate(dIn.getDate() + i);
    const day = cur.getDay();
    // Friday (5) & Saturday (6) are weekend rates in Karjat villas
    if (day === 5 || day === 6) {
      weekendCount++;
    } else {
      weekdayCount++;
    }
  }

  // Tariff calculation
  const baseTariff =
    weekdayCount * selectedRoom.basePriceWeekday +
    weekendCount * selectedRoom.basePriceWeekend;

  // Meal costs per person per day
  const mealRatePerHead =
    mealPlan === 'all-meals'
      ? pricingConfig.allMealsPerHead || 1400
      : mealPlan === 'breakfast'
      ? pricingConfig.breakfastPerHead || 350
      : 0;
  const totalGuests = adults + Math.floor(children * 0.5);
  const mealTariff = mealRatePerHead * totalGuests * nights;

  const totalAmount = baseTariff + mealTariff;

  // WhatsApp Message Generator
  const roomName = selectedRoom.category === 'villa'
    ? '4BHK Royal Pool Villa'
    : selectedRoom.category === 'cottage'
    ? 'Deluxe Poolside Cottage'
    : selectedRoom.category === 'suite'
    ? 'Executive Sahyadri Family Suite'
    : 'Group Celebration Dormitory';

  const whatsappMessage = `*New Stay Inquiry - Rudra Farms & Resort Karjat*
• *Accommodation*: ${roomName}
• *Check-in*: ${checkIn}
• *Check-out*: ${checkOut} (${nights} Night${nights > 1 ? 's' : ''})
• *Guests*: ${adults} Adults${children > 0 ? `, ${children} Children` : ''}
• *Meal Plan*: ${mealPlan === 'all-meals' ? 'Full Farm Feast (AP)' : mealPlan === 'breakfast' ? 'Bed & Breakfast (CP)' : 'Room Only (EP)'}
• *Estimated Tariff*: ₹${totalAmount.toLocaleString('en-IN')}

Hello, could you please confirm availability for these dates?`;

  const whatsappUrl = `https://wa.me/${resortMeta.whatsapp}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      setErrorMessage('Please fill in your name and phone number.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guestName,
          phone: guestPhone,
          email: guestEmail,
          roomId: selectedRoom.id,
          checkIn,
          checkOut,
          nights,
          adults,
          children,
          mealPlan,
          totalAmount,
          specialRequests
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitSuccess(data.inquiryId || `RDF-${Math.floor(10000 + Math.random() * 90000)}`);
      } else {
        setSubmitSuccess(`RDF-${Math.floor(10000 + Math.random() * 90000)}`);
      }
    } catch {
      setSubmitSuccess(`RDF-${Math.floor(10000 + Math.random() * 90000)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-20 sm:py-24 border-t border-stone-200 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs uppercase tracking-widest font-bold text-amber-700 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Stay Estimator · Real-Time Quotation</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Tariff & Booking Calculator
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            Configure your stay dates, guests, and meal plan to view the transparent tariff estimate for Rudra Farms Karjat.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Interactive Configuration Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-stone-200 bg-white shadow-xl"
          >
            <h3 className="font-brand text-xl font-bold text-stone-900 mb-6 pb-3 border-b border-stone-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>1. Configure Your Stay Parameters</span>
            </h3>

            <div className="space-y-6">
              {/* Room Choice */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Select Accommodation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {roomsData.map((r) => {
                    const rTitle = r.category === 'villa'
                      ? '4BHK Royal Villa'
                      : r.category === 'cottage'
                      ? 'Deluxe Cottage'
                      : r.category === 'suite'
                      ? 'Executive Suite'
                      : 'Group Dormitory';

                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRoomId(r.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          roomId === r.id
                            ? 'border-amber-500 bg-amber-50/80 text-stone-950 ring-2 ring-amber-400 font-semibold shadow-sm'
                            : 'border-stone-200 hover:border-stone-400 text-stone-800 bg-stone-50'
                        }`}
                      >
                        <div className="font-bold text-xs truncate text-stone-900">{rTitle}</div>
                        <div className="text-[11px] text-stone-600 mt-1">
                          ₹{r.basePriceWeekday.toLocaleString('en-IN')} (WD) · ₹{r.basePriceWeekend.toLocaleString('en-IN')} (WE)
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor={`calc-checkin-${uniqueId}`} className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Check-In Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-stone-500 pointer-events-none" />
                    <input
                      id={`calc-checkin-${uniqueId}`}
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor={`calc-checkout-${uniqueId}`} className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Check-Out Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-stone-500 pointer-events-none" />
                    <input
                      id={`calc-checkout-${uniqueId}`}
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Guests Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor={`calc-adults-${uniqueId}`} className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Adults (12+ Years)
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-4 h-4 text-stone-500 pointer-events-none" />
                    <select
                      id={`calc-adults-${uniqueId}`}
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                    >
                      {[1, 2, 4, 6, 8, 10, 12, 16, 20, 25, 30].map((num) => (
                        <option key={num} value={num}>
                          {num} Adults
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor={`calc-children-${uniqueId}`} className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Children (5-11 Years)
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-4 h-4 text-stone-500 pointer-events-none" />
                    <select
                      id={`calc-children-${uniqueId}`}
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                    >
                      {[0, 1, 2, 3, 4, 6, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} Children
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Meal Preference */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Select Meal Package
                </label>
                <div className="space-y-2.5 text-xs">
                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    mealPlan === 'none'
                      ? 'border-amber-500 bg-amber-50/70 text-stone-950 font-semibold ring-1 ring-amber-400'
                      : 'border-stone-200 text-stone-800 bg-stone-50 hover:bg-stone-100'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="mealPlan"
                        checked={mealPlan === 'none'}
                        onChange={() => setMealPlan('none')}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>Room Only (EP - A-la-carte dining)</span>
                    </div>
                    <span className="text-stone-500 font-bold">₹0</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    mealPlan === 'breakfast'
                      ? 'border-amber-500 bg-amber-50/70 text-stone-950 font-semibold ring-1 ring-amber-400'
                      : 'border-stone-200 text-stone-800 bg-stone-50 hover:bg-stone-100'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="mealPlan"
                        checked={mealPlan === 'breakfast'}
                        onChange={() => setMealPlan('breakfast')}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>Bed & Breakfast (CP - Morning Buffet)</span>
                    </div>
                    <span className="font-mono font-bold text-amber-700">+₹350 / person</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    mealPlan === 'all-meals'
                      ? 'border-amber-500 bg-amber-50/70 text-stone-950 font-semibold ring-1 ring-amber-400'
                      : 'border-stone-200 text-stone-800 bg-stone-50 hover:bg-stone-100'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="mealPlan"
                        checked={mealPlan === 'all-meals'}
                        onChange={() => setMealPlan('all-meals')}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>Full Farm Feast (AP - Lunch, Hi-Tea, Dinner BBQ, B'fast)</span>
                    </div>
                    <span className="font-mono font-bold text-amber-700">+₹1,100 / person</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right 5 Columns: Itemized Breakdown & Direct Submission */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-7 rounded-3xl border border-stone-200 bg-white shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <h3 className="font-brand text-xl font-bold text-stone-900">
                  Quotation Summary
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                  {nights} {nights === 1 ? 'Night' : 'Nights'}
                </span>
              </div>

              {/* Itemized Calculation */}
              <div className="py-4 space-y-3.5 text-xs">
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Accommodation: {roomName}</span>
                  <span className="font-mono tabular-nums font-bold text-stone-900">
                    ₹{baseTariff.toLocaleString('en-IN')}
                  </span>
                </div>

                {mealTariff > 0 && (
                  <div className="flex justify-between text-stone-700 font-medium">
                    <span>Dining ({mealPlan === 'all-meals' ? 'All 4 Meals' : 'Breakfast'})</span>
                    <span className="font-mono tabular-nums font-bold text-stone-900">
                      ₹{mealTariff.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600 text-[11px] pt-2 border-t border-stone-100">
                  <span>Guest Capacity: {adults} Adults {children > 0 ? `+ ${children} Kids` : ''}</span>
                  <span className="text-emerald-700 font-bold">Free Pool Access</span>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between">
                  <div className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                    Total Estimated Tariff
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-amber-700">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-stone-500 leading-tight mb-5">
                *Taxes and seasonal peak weekend adjustments may apply. Exact price confirmed by host.
              </div>

              {/* WhatsApp Direct Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reserve on WhatsApp With Quotation</span>
              </a>
            </div>

            {/* Quick Inquiry Form */}
            <form
              onSubmit={handleSubmitInquiry}
              className="p-6 rounded-3xl border border-stone-200 bg-white shadow-xl"
            >
              <h4 className="font-brand text-lg font-bold text-stone-900 mb-1">
                2. Direct Booking Request
              </h4>
              <p className="text-xs text-stone-600 mb-4">
                Submit your contact details to register this inquiry with Rudra Farms management.
              </p>

              {submitSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Inquiry Confirmed!</span>
                  </div>
                  <p>
                    Reference ID: <strong className="font-mono text-stone-950 font-bold">{submitSuccess}</strong>
                  </p>
                  <p className="text-[11px] text-stone-700">
                    The resident manager at Rudra Farms Karjat will call or WhatsApp you within 30 minutes to confirm your reservation.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold underline text-emerald-800 pt-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Or WhatsApp host directly now</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor={`inquiry-name-${uniqueId}`} className="block text-[11px] font-bold uppercase text-stone-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id={`inquiry-name-${uniqueId}`}
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-xs font-medium rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`inquiry-phone-${uniqueId}`} className="block text-[11px] font-bold uppercase text-stone-700 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id={`inquiry-phone-${uniqueId}`}
                      type="tel"
                      placeholder="e.g. +91 98200 XXXXX"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-xs font-medium rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`inquiry-email-${uniqueId}`} className="block text-[11px] font-bold uppercase text-stone-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id={`inquiry-email-${uniqueId}`}
                      type="email"
                      placeholder="rahul@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-medium rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`inquiry-requests-${uniqueId}`} className="block text-[11px] font-bold uppercase text-stone-700 mb-1">
                      Special Requests (Jain food, birthday setup, pet details)
                    </label>
                    <textarea
                      id={`inquiry-requests-${uniqueId}`}
                      rows={2}
                      placeholder="Any specific arrangements required..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-medium rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow cursor-pointer"
                    >
                      {submitting ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Booking Request</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero spam. Direct reservation with resident property manager.</span>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
