"use server"

const discordbdd = process.env.DISCORD_BDD_IP;

interface WebsiteFile {
    editor_discord_id: string;
    link: string;
    artist: string;
    title: string;
    performer: string;
    editor: string;
    website_file_path: string;
}


interface DataElement {
    website_file: WebsiteFile;
    createdAt: Date;
}

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

        const datatmp = await response.json();
        datatmp.sort((a: { createdAt: string; }, b: { createdAt: string; }) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        return datatmp;
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

export async function Get_File_by_performer(performer: string): Promise<{ link: string; artist: string; title: string; performer: string; editor: string; website_file_path:string; createdAt:Date}[]> {
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

        const datatmp: DataElement[] = await response.json();
        datatmp.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        const data: { link: string; artist: string; title: string; performer: string; editor: string; website_file_path:string; createdAt:Date}[] = [];
        datatmp.forEach((element) => {
            if (element.website_file && element.website_file.performer.toLowerCase() === performer.toLowerCase()) {
                data.push({
                    link: element.website_file.link,
                    artist: element.website_file.artist,
                    title: element.website_file.title,
                    performer: element.website_file.performer,
                    editor: element.website_file.editor,
                    website_file_path: element.website_file.website_file_path,
                    createdAt: new Date(element.createdAt)
                });
            }
        });
        return data;
    } catch (error) {
        console.error('Error getting files per performer:', error);
        throw error;
    }
}

export async function Get_File_by_editor(editor: string): Promise<{ link: string; artist: string; title: string; performer: string; editor: string; editor_discord_id: string; website_file_path:string; createdAt:Date}[]> {
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

        const datatmp: DataElement[] = await response.json();
        datatmp.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        const data: { link: string; artist: string; title: string; performer: string; editor: string; editor_discord_id: string; website_file_path:string; createdAt:Date}[] = [];
        datatmp.forEach((element) => {
            if (element.website_file && element.website_file.editor_discord_id === editor) {
                data.push({
                    link: element.website_file.link,
                    artist: element.website_file.artist,
                    title: element.website_file.title,
                    performer: element.website_file.performer,
                    editor: element.website_file.editor,
                    editor_discord_id: element.website_file.editor_discord_id,
                    website_file_path: element.website_file.website_file_path,
                    createdAt: new Date(element.createdAt)
                });
            }
        });
        return data;
    } catch (error) {
        console.error('Error getting files per editor:', error);
        throw error;
    }
}