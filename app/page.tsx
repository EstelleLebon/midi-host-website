import Header from "@/src/components/Header";
import { Files_by_Performer } from "@/src/components/performercomp";


export default async function Home() {
  const performers = ["solo", "duet", "trio", "quartet", "quintet", "sextet", "septet", "octet"];
  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {performers.map((performer, index) => (
          <Files_by_Performer key={index} performer={performer} />
        ))}
      </div>
    </div>
  );
}