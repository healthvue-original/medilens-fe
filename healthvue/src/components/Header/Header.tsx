import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeSwitcher } from "../ThemeSwitcher";
// import { ThemeSwitcher } from "../ThemeSwitcher";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import LeftNav from "../LeftNav";

export default function Header(): JSX.Element {
  // const [isOpen, setIsOpen] = useState<undefined | boolean>(false);

  return (
    <div className="flex h-full items-center">
      {/* <div className="sm:hidden mt-1 ml-3">
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        <RxHamburgerMenu size={"24px"} onClick={() => setIsOpen(true)} />
      </div> */}
      <div>
        <h2 className="text-xl ml-3">HealthVue</h2>
      </div>
      <div className="flex flex-1 justify-end gap-6">
        <ThemeSwitcher />
        {/* <Avatar className=" mr-4 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
      </div>
    </div>
  );
}

// export function MobileMenu({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: undefined | boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
// }): JSX.Element {
//   return (
//     <Sheet open={isOpen} onOpenChange={() => setIsOpen(undefined)}>
//       <SheetContent
//         side={"left"}
//         className="w-[72px] p-0 pt-4 mobile-menu"
//         onClick={() => setIsOpen(false)}
//       >
//         <LeftNav />
//       </SheetContent>
//     </Sheet>
//   );
// }
