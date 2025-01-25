import { ClockIcon, Edit2Icon, EllipsisIcon, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppointmentDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-xl" asChild>
        <Button variant="outline" size="sm">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>จัดการการนัดหมาย</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ClockIcon />
            <span>แก้ไขเวลานัด</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit2Icon />
            <span>แก้ไขสถานะ</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <XCircleIcon className="text-error" />
          <span className="text-error">ยกเลิกนัด</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
