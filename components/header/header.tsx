"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Activity, Joystick, LoaderPinwheel, Menu, Swords } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function GampFitnessHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/", icon: Activity, label: "Fitness Challenge" },
    { href: "/gampers", icon: Joystick, label: "All Gampers" },
    { href: "/leaderboard", icon: Swords, label: "Leaderboard" },
    {
      href: "/weekly-progress",
      icon: LoaderPinwheel,
      label: "Weekly Progress",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-3 xxs:container flex h-20 items-center justify-between">
        <div className="flex items-center space-x-2 xxs:space-x-4">
          <Activity className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-lg xxs:text-2xl font-bold text-primary">
              GampFit Challenge
            </h1>
            <p className="text-xs xxs:text-sm text-muted-foreground">
              Level Up Your Fitness Game!
            </p>
          </div>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex items-center space-x-4 mb-8">
              <Activity className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-xl font-bold text-primary">
                  GampFit Challenge
                </h2>
                <p className="text-sm text-muted-foreground">
                  Level Up Your Fitness Game!
                </p>
              </div>
            </div>
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default GampFitnessHeader;
