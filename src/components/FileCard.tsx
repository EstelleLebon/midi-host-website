"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Get_File } from "./Get_Files";
import { FileDlButton } from "./FileDlButton";


export function FileCard({ md5 }:any) {
    const [file, setFile] = useState<{ link: string; artist: string; title: string; performer: string; editor: string; sources: string; comments: string; } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        if (md5) {
            setLoading(true);
            setError(null);
            Get_File(md5)
                .then((data: { link: string; artist: string; title: string; performer: string; editor: string; sources: string; comments: string; }[]) => {
                    if (!data || data.length === 0) {
                        throw new Error('File not found');
                    } else {
                        setFile(data[0]);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [md5]);

    return (
        <div className="p-4">
            <Card className="flex flex-col justify-center items-center mx-auto p-4 bg-gray-100" style={{ width: 'fit-content', minWidth: '25%', maxWidth: '90%' }}>
                <CardTitle className="text-center text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 bg-gray-200 rounded-lg p-4">
                    {file && <p>{file.artist} - {file.title}</p>}
                </CardTitle>
                <CardContent className="text-left text-lg text-gray-800 dark:text-gray-200">
                    {loading && <p className="p-2">Loading...</p>}
                    {error && <p className="p-2">Error: {error.message}</p>}
                    {file && <p className="p-2">Artist: {file.artist}</p>}
                    {file && <p className="p-2">Title: {file.title}</p>}
                    {file && <p className="p-2">Performer: {file.performer}</p>}
                    {file && <p className="p-2">Editor: {file.editor}</p>}
                    {file && file.sources != " " && <p className="p-2">Source: {file.sources}</p>}
                    {file && file.comments != " " && <p className="p-2">Comment: {file.comments}</p>}
                    {file && <FileDlButton website_file_path={file.link} />}
                </CardContent>
            </Card>
        </div>
    )
}