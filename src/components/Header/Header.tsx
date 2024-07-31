import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import LeftNav from "../LeftNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { copyTextToClipboard } from "@/lib/utils";
import { toast } from "sonner";
import { useGlobalState } from "@/context/GlobalStateProvider";

const baseURL = import.meta.env.BASE_URL;

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState<undefined | boolean>(false);
  const navigate = useNavigate();
  const { state } = useGlobalState();

  const orgId = state.user?.org_id;

  const copyInviteLink = () => {
    const inviteLink = `${location.protocol}//${location.hostname}${baseURL}/auth/signup/?org_id=${orgId}`;
    copyTextToClipboard(inviteLink).then(() => {
      toast.success("Invite Link Copied");
    });
  };

  const logout = async () => {
    await api.logout();
    navigate("/auth/login", { replace: true });
    window.location.reload();
  };

  return (
    <div className="flex h-full items-center">
      <div className="sm:hidden mt-1 ml-3">
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        <RxHamburgerMenu size={"24px"} onClick={() => setIsOpen(true)} />
      </div>
      <div>
        <h2 className="text-xl ml-3">HealthVue</h2>
      </div>
      <div className="flex flex-1 justify-end gap-6">
        <ThemeSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className=" mr-4 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className=" w-52">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={copyInviteLink}>
              Copy Invite Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function MobileMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: undefined | boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}): JSX.Element {
  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(undefined)}>
      <SheetContent
        side={"left"}
        className="w-[72px] p-0 pt-4 mobile-menu"
        onClick={() => setIsOpen(false)}
      >
        <LeftNav />
      </SheetContent>
    </Sheet>
  );
}
