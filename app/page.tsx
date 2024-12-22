import Header from "@/src/components/Header";
import { Files_by_Performer } from "@/src/components/performercomp";


export default async function Home() {
  const performers = ["solo", "duet", "trio", "quartet", "quintet", "sextet", "septet", "octet"];
  return (
    <div className="">
      <Header />
      {performers.map((performer, index) => (
        <Files_by_Performer key={index} performer={performer} />
      ))}
    </div>
  );
}