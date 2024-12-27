"use client"
import { Get_File_by_performer } from "./Get_Files";
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { FileDlButton } from "./FileDlButton";
import Loading from "./loading";

interface FilesByPerformerProps {
  performer: string;
  numb: number;
}

export const Files_by_Performer: React.FC<FilesByPerformerProps> = ({ performer, numb }) => {
const [files, setFiles] = useState<{ link: string; name: string; path: string; createdAt: string; title: string; artist: string; editor:string; performer:string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Get_File_by_performer(String(performer))
        .then((data: { link: string; artist: string; title: string; performer: string; editor: string; website_file_path: string; createdAt: Date;}[]) => {
            const result: { link: string; name: string; path: string; createdAt: string; title: string; artist: string; editor: string; performer: string }[] = [];
            data.forEach((element: { link: string; artist: string; title: string; performer: string; editor: string; website_file_path:string; createdAt: Date;}) => {
                const elem = {"link": element.link, "name" : `${element.artist}_${element.title}_${element.performer}_${element.editor}.mid`, "path": element.website_file_path, "createdAt": element.createdAt.toISOString(), "title": element.title, "artist": element.artist, "editor": element.editor, "performer": element.performer};
                result.push(elem);
            });
            setTimeout(() => {
                setFiles(result);
                setLoading(false);
            }, 1000);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, [performer]);
    return (
        <div className="p-4">

            <Card className="overflow-hidden p-2 bg-gray-400" style={{ height: 'calc((100vh - 180px) / 2)', minHeight: '200px' }}>               
                {loading && <Loading />}
                {error && <p>Error: {error.message}</p>}
                {files && !loading && (
                    <>
                        <a className="" href={`/${performer}`}>
                            <CardTitle className="text-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                                {performer.charAt(0).toUpperCase() + performer.slice(1)}s
                            </CardTitle>
                        </a>
                        <hr className="my-1 border-t border-gray-400" />
                        <div className="overflow-hidden" style={{ maxHeight: 'calc((100vh - 180px) / 2)' }}>
                            {files.slice(0, numb).map((file, index) => (
                                <a href={file.link} className="" key={index}>
                                    <CardContent className="mb-1 bg-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors duration-300 text-sm truncate overflow-hidden whitespace-nowrap" style={{ height: '5px' }}>
                                        <p className="truncate">{file.name}</p>
                                    </CardContent>
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
}
