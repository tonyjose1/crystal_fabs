interface FeatureListProps {
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

export default function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-black rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105 border-2 border-transparent hover:border-[#3d579f] hover:shadow-lg hover:shadow-[#3d579f]"
        >
          <div className="text-white text-4xl mb-4 mx-auto">{feature.icon}</div>
          <h3 className="text-xl font-bold font-serif text-white">{feature.title}</h3>
          <p className="text-white mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
