interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="testimonial-section py-16 relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="section-header">
          <p className="text-[#c41e3a] text-sm uppercase tracking-widest mb-2 font-medium">
            ⭐ CHIA SẺ CỦA KHÁCH HÀNG ⭐
          </p>
          <h2 className="section-title">Khách hàng nói gì về Shopquatet?</h2>
          <div className="section-divider"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              {/* Quote Icon */}
              <div className="text-4xl text-[#ffd700] mb-4 opacity-50">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#ffd700]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-[#c41e3a] to-[#8b0000] rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#c41e3a]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-400">Khách hàng</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
