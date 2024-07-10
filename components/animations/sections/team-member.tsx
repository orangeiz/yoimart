import { GlareCard } from "@/components/ui/glare-card";
const teamMembers = [
  {
    name: "Lisa",
    title: "CEO",
    quote: "Our store provides best services!",
    profilePic: "/images/team-members/p1.png",
  },
  {
    name: "Justin",
    title: "Manager",
    quote: "We got everything you need",
    profilePic: "/images/team-members/p2.jpg",
  },
];

export function GlareCardDemo() {
  return (
    <div className=" p-2 m-2 grid grid-cols-1 md:grid-cols-2 mx-2 px-2 lg:grid-cols-3 gap-6">
      {teamMembers.map((member, index) => (
        <GlareCard key={index} className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg">
          <img
            src={member.profilePic}
            alt={`${member.name}'s profile`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <p className="text-white font-bold text-xl mt-4">{member.name}</p>
          <p className="text-white font-medium text-md">{member.title}</p>
          <p className="text-white text-center mt-2">{member.quote}</p>
        </GlareCard>
      ))}
    </div>
  );
}
