interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <div
      className="bg-background rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105 border-2 border-border hover:border-[#3d579f] hover:shadow-lg hover:shadow-[#3d579f]"
    >
      <div className="text-text-primary text-4xl mb-4 mx-auto">{icon}</div>
      <h3 className="text-3xl font-bold font-serif text-primary">{value}</h3>
      <p className="text-text-primary mt-2">{title}</p>
    </div>
  );
}
