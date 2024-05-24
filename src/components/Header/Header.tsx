import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header(): JSX.Element {
  return (
    <div className="flex h-full items-center">
      <div>
        <h2 className="text-xl ml-3">HealthVue</h2>
      </div>
      <div className="flex flex-1">
        <Avatar className="ml-auto mr-4 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
