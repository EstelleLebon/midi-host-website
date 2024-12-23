"use server"

import { json } from "stream/consumers";

const discordbdd = process.env.DISCORD_BDD_IP;

export async function Get_Files() {
    try {
        const response = await fetch(`${discordbdd}/files/website`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting all files:', error);
        throw error;
    }
}

export async function Get_File(md5: string): Promise<{ link: string; artist: string; title: string; performer: string; editor: string; sources:string; comments:string; }[]> {
    try {
        const response = await fetch(`${discordbdd}/files/md5/${md5}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const datatmp = await response.json();
        const data: { link: string; artist: string; title: string; performer: string; editor: string; sources:string; comments:string; }[] = [];
        data.push({
            link: datatmp.website_file.website_file_path,
            artist: datatmp.website_file.artist,
            title: datatmp.website_file.title,
            performer: datatmp.website_file.performer,
            editor: datatmp.website_file.editor,
            sources: datatmp.website_file.sources,
            comments: datatmp.website_file.comments
        });
        return data;
    } catch (error) {
        console.error('Error getting file:', error);
        throw error;
    }
  }

export async function Get_File_by_performer(performer: string): Promise<{ link: string; artist: string; title: string; performer: string; editor: string; }[]> {
    try {
        const response = await fetch(`${discordbdd}/files/website`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const datatmp = await response.json();

        const data: { link: string; artist: string; title: string; performer: string; editor: string; }[] = [];
        datatmp.forEach((element: { website_file: any; }) => {
            if (element.website_file && element.website_file.performer === performer) {
                data.push({
                    link: element.website_file.link,
                    artist: element.website_file.artist,
                    title: element.website_file.title,
                    performer: element.website_file.performer,
                    editor: element.website_file.editor
                });
            }
        });
        return data;
    } catch (error) {
        console.error('Error getting files per performer:', error);
        throw error;
    }
}