import QuoteForm from '../../components/QuoteForm';

export default function ContactPage() {
  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <QuoteForm />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <div className="aspect-w-16 aspect-h-9">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.7085076476365!2d76.55874537530995!3d10.122928889988874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07e48f69d0530f%3A0xe845ffd5330b478c!2sSt%20Antony&#39;s%20Parish%20Hall!5e0!3m2!1sen!2sin!4v1761076179716!5m2!1sen!2sin" width="600" height="450" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}