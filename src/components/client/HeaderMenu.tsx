"use client"
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function HeaderMenu() {
    const { data: session } = useSession();

    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
            <ul className="py-1">
                {!session ? (
                    <li>
                        <button
                            onClick={() => signIn("discord")}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        >
                            Login with Discord
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    Dashboard
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => signOut()}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}