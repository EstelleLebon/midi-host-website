"use client"
import { Get_File } from "@/src/components/Get_Files"
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Header from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";

export default function Page() {
    const params = useParams();
    const [file, setFile] = useState<{website_file:any} | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const md5 = Array.isArray(params?.md5) ? params.md5[0] : params?.md5;
    const [buttonLoading, setButtonLoading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    useEffect(() => {
        if (md5) {
            setLoading(true);
            setError(null);
            Get_File(md5)
                .then((data: { website_file:any }) => {
                    if (!data) {
                        throw new Error('File not found');
                    } else {
                        setFile(data);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [md5]);

    const handleButtonClick = () => {
        setDownloaded(true);
    };

    return (
        <div>
            <Header/>
            <Card className="flex flex-col justify-center items-center w-1/4 mx-auto p-4">
                <CardTitle className="text-center text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 ">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {file && <p>{file.website_file.artist} - {file.website_file.title}</p>}
                </CardTitle>
                <CardContent className="text-left text-lg text-gray-800 dark:text-gray-200 ">
                    {file && <p>Artist: {file.website_file.artist}</p>}
                    {file && <p>Title: {file.website_file.title}</p>}
                    {file && <p>Performer: {file.website_file.performer}</p>}
                    {file && <p>Editor: {file.website_file.editor}</p>}
                    {file && file.website_file.sources != " " && <p>Source: {file.website_file.sources}</p>}
                    {file && file.website_file.comments != " " && <p>Comment: {file.website_file.comments}</p>}
                    {file && <Button onClick={() => {
                        setButtonLoading(true);
                        setTimeout(() => {
                            setButtonLoading(false);
                            handleButtonClick();
                            window.location.href = file.website_file.website_file_path;
                        }, 3000); // Adjust the timeout duration as needed
                    }} variant="default" className="mt-4">
                        {downloaded ? 'Download started' : 'Download'}
                    </Button>}
                </CardContent>
            </Card>
        </div>
    );
}