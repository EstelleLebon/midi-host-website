"use client"
import { Get_File_by_performer } from "./Get_Files";
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { FileDlButton } from "./FileDlButton";

interface FilesByPerformerProps {
  performer: string;
  numb: number;
  button:boolean;
}

export const Files_for_Performer: React.FC<FilesByPerformerProps> = ({ performer, numb, button }) => {
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
                <Card className="p-2 bg-gray-400" style={{ width: 'fit-content' }}>               
                <CardTitle className="text-center p-4 bg-gray-200 rounded-lg">
                    {performer.charAt(0).toUpperCase() + performer.slice(1)}s
                </CardTitle>
                <br />
                <CardContent>
                    <table className="min-w-full bg-white rounded-lg">
                        <thead>
                            <tr className="text-left">
                                <th className="py-1 px-1">Artist</th>
                                <th className="py-1">Title</th>
                                <th className="py-1">Editor</th>
                                <th className="py-1">Uploaded At</th>
                                <th className="py-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, index) => (
                                <tr key={index} className="text-left">
                                    <td className="py-1 px-1">{file.artist}</td>
                                    <td className="py-1">{file.title}</td>
                                    <td className="py-1">{file.editor}</td>
                                    <td className="py-1">{new Date(file.createdAt).toLocaleDateString()}</td>
                                    <td className="py-1">
                                        <FileDlButton website_file_path={file.path} classname="p-2 bg-black hover:bg-white text-white hover:text-black transition-colors duration-300"/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
                </Card>
            </div>
      );
    }
}
