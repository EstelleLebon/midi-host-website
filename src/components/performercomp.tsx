"use client"
import { Get_File_by_performer } from "./Get_Files";
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";

interface FilesByPerformerProps {
  performer: string;
}

export function Files_by_Performer({ performer }: FilesByPerformerProps) {
  const [files, setFiles] = useState<{ link: string; name: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Get_File_by_performer(performer)
        .then((data: { link: string; artist: string; title: string; performer: string; editor: string; }[]) => {
            const result: { link: string; name: string; }[] = [];
            data.forEach((element: { link: string; artist: string; title: string; performer: string; editor: string; }) => {
                const elem = {"link": element.link, "name" : `${element.artist}_${element.title}_${element.performer}_${element.editor}.mid`};
                result.push(elem);
            });
            setFiles(result);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
     }, [performer]);

    return (
        <div className="p-4">

            <Card className="p-2 bg-gray-400" style={{ height: 'calc((100vh - 180px) / 2)', minHeight: '200px' }}>               
            <CardTitle className="text-center p-4 bg-gray-200 rounded-lg">{performer}s</CardTitle>
            <br />
            <CardContent className="text-center">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {files.map((file, index) => (
                    <p className="flex flex-wrap gap-2" key={index}><a href = {file.link} className="truncate overflow-hidden whitespace-nowrap"> {file.name} </a> </p>
                ))}

            </CardContent>
            </Card>
        </div>
  );
}
