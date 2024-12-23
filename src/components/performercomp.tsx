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

export const Files_by_Performer: React.FC<FilesByPerformerProps> = ({ performer, numb, button }) => {
  const [files, setFiles] = useState<{ link: string; name: string; path:string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Get_File_by_performer(String(performer))
        .then((data: { link: string; artist: string; title: string; performer: string; editor: string; website_file_path: string; }[]) => {
            const result: { link: string; name: string; path:string; }[] = [];
            data.forEach((element: { link: string; artist: string; title: string; performer: string; editor: string; website_file_path:string;}) => {
                const elem = {"link": element.link, "name" : `${element.artist}_${element.title}_${element.performer}_${element.editor}.mid`, "path": element.website_file_path};
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
    if (numb > 0) {
        return (
            <div className="p-4">
    
                <Card className="p-2 bg-gray-400" style={{ height: 'calc((100vh - 180px) / 2)', minHeight: '200px' }}>               
                <a href={`/${performer}`}>
                    <CardTitle className="text-center p-4 bg-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                        {performer}s
                    </CardTitle>
                </a>
                <br />
                <CardContent className="text-center overflow-y-auto" style={{ maxHeight: 'calc((100vh - 180px) / 2 - 100px)' }}>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {button ? (
                        files.map((file, index) => (
                            <p className="flex justify items-center mb-2" key={index}>
                                <FileDlButton website_file_path={file.path} classname="p-4"/>
                                <a href={file.link} className="truncate overflow-hidden whitespace-nowrap p-4"> {file.name} </a>
                            </p>
                        ))
                    ) : (
                        files.map((file, index) => (
                            <p className="flex flex-wrap gap-2" key={index}><a href={file.link} className="truncate overflow-hidden whitespace-nowrap"> {file.name} </a> </p>
                        ))
                    )}
    
                </CardContent>
                </Card>
            </div>
      );
    } else {        return (
            <div className="p-4">
    
                <Card className="p-2 bg-gray-400">               
                <a href={`/${performer}`}>
                    <CardTitle className="text-center p-4 bg-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                        {performer}s
                    </CardTitle>
                </a>
                <br />
                <CardContent className="text-center overflow-y-auto">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {button ? (
                        files.map((file, index) => (
                            <p className="flex justify items-center mb-2" key={index}>
                                <FileDlButton website_file_path={file.path} classname="p-4"/>
                                <a href={file.link} className="truncate overflow-hidden whitespace-nowrap p-4"> {file.name} </a>
                            </p>
                        ))
                    ) : (
                        files.map((file, index) => (
                            <p className="flex flex-wrap gap-2" key={index}><a href={file.link} className="truncate overflow-hidden whitespace-nowrap"> {file.name} </a> </p>
                        ))
                    )}
                </CardContent>
                </Card>
            </div>
      );
    }
}
