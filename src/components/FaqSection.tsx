import React, { useState } from 'react';
import { FAQS_DATA } from '../data/resortData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqAnswers: Record<string, { q: string; a: string }> = {
    'faq-1': {
      q: 'What are the check-in and check-out timings at Rudra Farms Karjat?',
      a: 'Standard check-in time is 1:00 PM and check-out time is 11:00 AM. Early check-in or late check-out is subject to prior villa availability and can be arranged upon request with the property host.'
    },
    'faq-2': {
      q: 'Is Rudra Farms completely pet-friendly?',
      a: 'Yes, absolutely! Rudra Farms is 100% pet-friendly. We welcome dogs and pets of all sizes with open arms across our fully secured 4-acre estate grounds.'
    },
    'faq-3': {
      q: 'Can we book the entire 4BHK villa exclusively for sole privacy?',
      a: 'Yes! You can reserve the entire 4BHK villa along with private swimming pool access, garden lounge, and grounds solely for your group. No other outside guests will share the property during your stay.'
    },
    'faq-4': {
      q: 'What dining arrangements are available at the resort?',
      a: 'We offer authentic wood-fired clay chulha cuisine, freshly prepared by our resident culinary staff. Both vegetarian and non-vegetarian (chicken/mutton) meals are freshly prepared. We also cater to Jain food on advance request.'
    },
    'faq-5': {
      q: 'Is there swimming pool access, music rules, and power backup?',
      a: 'The crystal swimming pool is accessible throughout the day. We have 100% diesel generator power backup running all ACs and appliances. Mild music is permitted by the poolside during daytime; outdoor music shifts indoors after 10:00 PM as per local green-zone quiet hour guidelines.'
    }
  };

  return (
    <section className="py-20 sm:py-24 border-t border-stone-200 bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs uppercase tracking-widest font-bold text-amber-700 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Essential Policies & Guidelines</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-stone-600">
            Everything you need to know before arriving at Rudra Farms and Resort.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            const item = faqAnswers[faq.id] || { q: faq.questionKey, a: faq.answerKey };

            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/50 transition-colors"
                >
                  <span className="font-brand text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-100">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
