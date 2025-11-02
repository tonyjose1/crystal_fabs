interface TestimonialCardProps {
  testimonial: {
    author: string;
    content: string;
    company: string;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-black p-8 rounded-lg relative border-2 border-[#3d579f]">
      <div className="text-right mb-8">
        <p className="text-white font-bold font-serif text-xl">{testimonial.author}</p>
        <p className="text-gray-400 text-base">{testimonial.company}</p>
      </div>
      <div className="relative text-center">
        <span className="absolute -top-8 left-0 text-8xl text-[#3d579f] opacity-25 font-serif">“</span>
        <p className="text-white text-xl italic leading-relaxed">{testimonial.content}</p>
        <span className="absolute -bottom-8 right-0 text-8xl text-[#3d579f] opacity-25 font-serif">”</span>
      </div>
    </div>
  );
}
