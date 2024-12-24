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
    if (numb > 0) {
        return (
            <div className="p-4">
    
                <Card className="overflow-hidden p-2 bg-gray-400" style={{ height: 'calc((100vh - 180px) / 2)', minHeight: '200px' }}>               
                <a href={`/${performer}`}>
                    <CardTitle className="text-center p-4 bg-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                        {performer}s
                    </CardTitle>
                </a>
                <br />
                
                {button ? (
                    <div className="flex flex-col gap-2">
                    {files.slice(0, numb).map((file, index) => (
                        <a href={file.link} className="" key={index}>
                            <CardContent className="mb-1 bg-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors duration-300 truncate overflow-hidden whitespace-nowrap text-sm" style={{ height: '10px' }}>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error: {error.message}</p>}
                                <FileDlButton website_file_path={file.path} classname="p-4"/>
                                {file.name}                                    
                            </CardContent>
                        </a>
                    ))}
                    </div>
                ) : (
                    <div className="overflow-hidden" style={{ maxHeight: 'calc((100vh - 180px) / 2)' }}>
                    {files.slice(0, numb).map((file, index) => (
                        <a href={file.link} className="" key={index} >
                            <CardContent className="mb-1 bg-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors duration-300 text-sm truncate overflow-hidden whitespace-nowrap" style={{ height: '5px' }}>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error: {error.message}</p>}
                                <p className="truncate">{file.name}</p>
                            </CardContent>
                        </a>
                    ))}
                    </div>
                )}
                
                
                </Card>
            </div>
      );
    } else {        
        return (
            <div className="p-4">
    
                <Card className="p-2 bg-gray-400">               
                <a href={`/${performer}`}>
                    <CardTitle className="text-center p-4 bg-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                        {performer}s
                    </CardTitle>
                </a>
                <br />
                <div className="">
                {files.map((file, index) => (
                    <a href={file.link} className="" key={index}>
                        <CardContent className="mb-2 p-1 bg-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors duration-300 flex items-center justify">
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error.message}</p>}
                            <FileDlButton website_file_path={file.path} classname="p-4 bg-black hover:bg-gray-200 text-white hover:text-black "/>
                            <div className="p-4">{new Date(file.createdAt).toLocaleDateString()}</div>
                            <div className="ml-2">
                                {file.name}
                            </div>                   
                        </CardContent>
                    </a>
                ))}
                </div> 
                </Card>
            </div>
      );
    }
}
