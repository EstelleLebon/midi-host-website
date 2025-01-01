"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Files_for_Editor } from "@/src/components/client/editorcomp";
import { forbidden  } from "next/navigation";
import Loading from "@/src/components/client/loading";
import { isUserAdmin } from "@/src/components/server/isAdmin";


export default function Page() {
    const { data: session, status } = useSession();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAdminStatus = async () => {
            const adminStatus = await isUserAdmin(session); 
            setIsAdmin(adminStatus);
        };

        checkAdminStatus();
    }, []);

    if (status === "loading") {
        return <Loading />;
    }

    if (!session) {
        return forbidden();
    }

    if (isAdmin === null) {
        return <Loading />;
    }

    if (isAdmin === true) {
        return (
            <>
                <div>[Admin]</div>
                <Files_for_Editor 
                    editor={session.user.id ?? ''} 
                    editor_tag={session.user.name ?? ''} 
                />
            </>
        );
    }

    if (isAdmin === false) {
        return <Files_for_Editor 
            editor={session.user.id ?? ''} 
            editor_tag={session.user.name ?? ''} 
        />;
    }
}