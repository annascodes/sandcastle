import React, { Fragment } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "../theme-toggle";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { LogoutButton } from "../logout-btn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Navbar = async () => {
    const user = await getCurrentUser()
    const btnsList = [
        { name: "Home", href: "/" },
        { name: "About", href: "/" },
        { name: "Contact", href: "/" },
        { name: "Pricing", href: "/" },
    ];

    return (
        <div className="flex items-center justify-between border-b p-2 dark:border-neutral-700 sticky top-0 dark:bg-black bg-white z-50">
            {/* <pre className="text-xs tracking-wider">
                {JSON.stringify(user, null, 10)}
            </pre> */}
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

                        {/* {index < btnsList.length - 1 && (
                            <Separator orientation="vertical" className="h-5" />
                        )} */}
                    </Fragment>
                ))}
            </div>

            <div className="flex items-center gap-2 font-normal">
                {
                    user
                        ? <>
                            {/* <LogoutButton /> */}
                            <DropdownMenu>
                                <DropdownMenuTrigger render={<Button size={'xs'} variant="outline" />}>
                                    {user.name}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href={'/dashboard'}>
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                             <LogoutButton />
                                        </DropdownMenuItem>

                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </>
                        : <>
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

                        </>

                }


                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;