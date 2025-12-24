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
        <p className="text-center text-[#b71c1c] text-sm uppercase tracking-widest mb-2">
          CHIA SẺ CỦA KHÁCH HÀNG
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#b71c1c] mb-12 font-[family-name:var(--font-playfair)]">
          Khách hàng nói gì về Shopquatetvivu.com?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {testimonial.content}
              </p>

              {/* Name */}
              <p className="font-semibold text-[#b71c1c]">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
