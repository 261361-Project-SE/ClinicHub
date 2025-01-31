import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Bell as BellIcon, MessagesSquare } from "lucide-react";
import { memo } from "react";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
  icon: React.ReactNode;
}

interface NotificationButtonProps extends ButtonProps {
  onNotificationClick: () => void;
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

const NotificationButton = memo(
  ({ ariaLabel, icon, onNotificationClick }: NotificationButtonProps) => (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton
          ariaLabel={ariaLabel}
          icon={icon}
          onClick={onNotificationClick}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>Here are your notifications.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
);

const ActionButtons = memo(
  ({
    onMessageClick,
    onNotificationClick,
  }: {
    onMessageClick: () => void;
    onNotificationClick: () => void;
  }) => (
    <div className="flex items-center gap-2">
      <IconButton
        ariaLabel="Messages"
        icon={
          <MessagesSquare className="h-6 w-6 text-black transition-transform hover:scale-110" />
        }
        onClick={onMessageClick}
      />
      <NotificationButton
        ariaLabel="Notifications"
        icon={
          <BellIcon className="h-6 w-6 text-black transition-transform hover:scale-110" />
        }
        onNotificationClick={onNotificationClick}
      />
    </div>
  )
);

ActionButtons.displayName = "ActionButtons";

const NavbarInPage = () => {
  const onMessageClick = () => {
    // Message click handler
  };

  const onNotificationClick = () => {
    // Notification click handler
  };

  return (
    <div className="flex justify-end p-4">
      <div className="flex flex-col w-full">
        <div className="flex justify-between w-full">
          <p className="text-white text-base font-bold font-noto md:text-lg lg:text-xl"></p>
        </div>
        <div className="flex justify-end">
          <ActionButtons
            onMessageClick={onMessageClick}
            onNotificationClick={onNotificationClick}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarInPage;
