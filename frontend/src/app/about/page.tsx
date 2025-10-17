import TeamCard from '../../components/TeamCard';

export default function AboutPage() {
  const team = [
    { name: 'Shaiju Kallungal', role: 'Founder & CEO', imageUrl: '/images/team/boss1.jpg' },
    { name: 'Jane Doe', role: 'Lead Engineer', imageUrl: '/images/team/lead1.jpg' },
    { name: 'John Smith', role: 'Operations Manager', imageUrl: '/images/team/lead2.jpg' },
  ];

  const officeImages = [
    { id: '1', src: '/images/office/office%201.jpg', alt: 'Office Space 1' },
    { id: '2', src: '/images/office/office%202.jpg', alt: 'Office Space 2' },
    { id: '3', src: '/images/office/office%203.jpg', alt: 'Office Space 3' },
  ];

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-serif text-center mb-12">About Crystal Fabs</h1>
        <p className="text-lg text-center max-w-3xl mx-auto">Crystal Fabs is a leading provider of custom steel fabrication services. We are dedicated to delivering high-quality products and exceptional customer service. Our team of experienced professionals is committed to meeting the unique needs of each client.</p>

        <section id="our-team" className="py-20">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        <section id="our-office" className="py-20 bg-background">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Our Office</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {officeImages.map((image) => (
              <div key={image.id} className="rounded-lg overflow-hidden shadow-lg">
                <img src={image.src} alt={image.alt} className="w-full h-64 object-cover" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
