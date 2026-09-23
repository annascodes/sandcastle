import React, { Fragment } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "../theme-toggle";
import Link from "next/link";

const Navbar = () => {
    const btnsList = [
        { name: "Home", href: "/" },
        { name: "About", href: "/" },
        { name: "Contact", href: "/" },
        { name: "Pricing", href: "/" },
    ];

    return (
        <div className="flex items-center justify-between border-b p-2 dark:border-neutral-700">
            <Button variant="ghost">
                SandCastle
            </Button>

            <div className="md:flex items-center justify-center hidden ">
                {btnsList.map((btn, index) => (
                    <Fragment key={btn.name}>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="font-normal"
                        >
                            <Link href={btn.href}>
                                {btn.name}
                            </Link>
                        </Button>

                        {index < btnsList.length - 1 && (
                            <Separator orientation="vertical" className="h-5" />
                        )}
                    </Fragment>
                ))}
            </div>

            <div className="flex items-center gap-2 font-normal">
                <Button size="xs" variant="outline">
                   <Link href={'/register'}>
                    Register
                   </Link>
                </Button>

                <Button size="xs" variant="outline">
                   <Link href={'/login'}>
                    login
                   </Link>
                </Button>

                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;