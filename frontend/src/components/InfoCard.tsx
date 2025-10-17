interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <div className="bg-greydark rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
      <div className="text-white text-4xl mb-4">{icon}</div>
      <h3 className="text-3xl font-bold font-serif text-white">{value}</h3>
      <p className="text-white mt-2">{title}</p>
    </div>
  );
}
