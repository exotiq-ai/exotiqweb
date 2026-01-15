import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqItems } from '../../data/pricingData';

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-montserrat text-lg text-[#A0A0A0]">
            Everything you need to know about pricing and plans
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-200 hover:border-[#6BB8E5]/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="font-montserrat font-semibold text-base sm:text-lg text-white pr-8">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-[#6BB8E5]" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-[#A0A0A0]" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 pt-0">
                  <p className="font-montserrat text-sm sm:text-base text-[#E0E0E0] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl p-8">
          <h3 className="font-montserrat font-bold text-xl text-white mb-2">
            Still have questions?
          </h3>
          <p className="font-montserrat text-[#A0A0A0] mb-6">
            Our team is here to help. Schedule a demo or reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/hello-exotiq/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC] text-black px-6 py-3 rounded-lg font-montserrat font-semibold hover:shadow-lg hover:shadow-[#6BB8E5]/30 transition-all duration-200"
            >
              Schedule a Demo
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-white/20 border border-white/20 transition-all duration-200"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

