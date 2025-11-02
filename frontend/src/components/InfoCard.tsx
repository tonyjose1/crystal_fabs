interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <div
      className="bg-black rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105 border-2 border-transparent hover:border-[#3d579f] hover:shadow-lg hover:shadow-[#3d579f]"
    >
      <div className="text-white text-4xl mb-4 mx-auto">{icon}</div>
      <h3 className="text-3xl font-bold font-serif text-white">{value}</h3>
      <p className="text-white mt-2">{title}</p>
    </div>
  );
}
