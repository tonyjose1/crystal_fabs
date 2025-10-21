import Image from 'next/image';

interface TeamCardProps {
  member: {
    name: string;
    role: string;
    imageUrl: string;
  };
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="text-center">
      <Image src={member.imageUrl} alt={member.name} width={192} height={192} className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg" />
      <h3 className="text-xl font-bold font-serif mt-4">{member.name}</h3>
      <p className="text-secondary">{member.role}</p>
    </div>
  );
}
