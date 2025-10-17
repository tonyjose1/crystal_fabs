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
        <div key={index} className="text-center">
          <div className="text-white text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-bold font-serif text-white">{feature.title}</h3>
          <p className="text-white mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
