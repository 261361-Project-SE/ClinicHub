import { Bell as BellIcon, MessagesSquare } from "lucide-react";
import Link from "next/link";
// ✅ Import Link จาก next/link
import { memo } from "react";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
  icon: React.ReactNode;
}

const IconButton = memo(({ onClick, ariaLabel, icon }: ButtonProps) => (
  <button
    type="button"
    className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
    aria-label={ariaLabel}
    onClick={onClick}
  >
    {icon}
  </button>
));

const ActionButtons = memo(() => (
  <div className="flex items-center gap-2">
    <Link href="/p/feedback">
      {" "}
      {/* ✅ ใช้ <Link> แทนการใช้ onClick */}
      <IconButton
        ariaLabel="Messages"
        icon={
          <MessagesSquare className="h-6 w-6 text-black transition-transform hover:scale-110" />
        }
      />
    </Link>
  </div>
));

ActionButtons.displayName = "ActionButtons";

const NavbarInPage = () => {
  return (
    <div className="flex justify-end p-4">
      <div className="flex flex-col w-full">
        <div className="flex justify-between w-full">
          <p className="text-white text-base font-bold font-noto md:text-lg lg:text-xl"></p>
        </div>
        <div className="flex justify-end">
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default NavbarInPage;
