interface TestimonialCardProps {
  testimonial: {
    author: string;
    content: string;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-greydark rounded-lg shadow-lg p-8 mx-4">
      <p className="text-white italic">"{testimonial.content}"</p>
      <p className="text-white font-bold font-serif mt-4 text-right">- {testimonial.author}</p>
    </div>
  );
}
