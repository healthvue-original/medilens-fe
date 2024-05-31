import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import LeftNav from "../LeftNav";
import { useState } from "react";

export default function Header(): JSX.Element {
  return (
    <div className="flex h-full items-center">
      <div className="sm:hidden mt-1 ml-3">
        <MobileMenu trigger={<RxHamburgerMenu size={"24px"}/>} />
      </div>
      <div>
        <h2 className="text-xl ml-3">HealthVue</h2>
      </div>
      <div className="flex flex-1 justify-end gap-6">
        <ThemeSwitcher />
        <Avatar className=" mr-4 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export function MobileMenu({ trigger }: { trigger: JSX.Element }): JSX.Element {
  const [open, isOpen] = useState(true);

  return (
    <Sheet open={open} onOpenChange={() => isOpen(undefined)}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-[72px] p-0 pt-4 mobile-menu"
        onClick={() => isOpen(false)}
      >
        <LeftNav />
      </SheetContent>
    </Sheet>
  );
}
