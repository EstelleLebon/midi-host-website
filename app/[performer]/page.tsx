"use client"
import { useParams } from 'next/navigation';
import Header from "@/src/components/Header";
import { Files_by_Performer } from "@/src/components/appperformercomp";
import { notFound } from 'next/navigation';


export default function Page() {
    const params = useParams();
    const performer = Array.isArray(params?.performer) ? params.performer[0] : params?.performer ?? '';
    const performers = ["solo", "duet", "trio", "quartet", "quintet", "sextet", "septet", "octet"];

    if (!performers.includes(performer)) {
      notFound();
    }

  return (
    <div className="">
      <Header />
      <div className="container mx-auto px-4">
          <Files_by_Performer performer={performer.toLowerCase()} numb = {-1} button = {true}/>
      </div>
    </div>
  );
}