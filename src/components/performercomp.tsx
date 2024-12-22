"use client"
import { Get_File_by_performer } from "./Get_Files";
import { useState, useEffect } from "react";

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
                const elem = {"link" : element.link, "name" : `${element.artist}_${element.title}_${element.performer}_${element.editor}.mid`};
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
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul>
                {files.map((file, index) => (
                    <li key={index}><a href = {file.link}> {file.name} </a> </li>
                ))}
            </ul>
        </div>
  );
}
