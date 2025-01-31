import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppointmentFilterTabProps {
  onFilterChange: (filter: string) => void;
}

export function AppointmentFilterTab({
  onFilterChange,
}: AppointmentFilterTabProps) {
  return (
    <Tabs
      defaultValue="upcoming"
      className="rounded-xl"
      onValueChange={(value) => onFilterChange(value)}
    >
      <TabsList className="h-full grid grid-cols-5 gap-1 rounded-xl text-lightgray bg-lightgray-100">
        <TabsTrigger value="upcoming" className="h-10 rounded-xl">
          กำลังจะมาถึง
        </TabsTrigger>
        {/* TODO: Uncomment this after add WAITING_TO_CONFIRMATION Status */}
        {/* <TabsTrigger value="pending" className="h-10 rounded-xl">
          คำขอนัดหมาย
        </TabsTrigger> */}
        <TabsTrigger value="toConfirm" className="h-10 rounded-xl">
          รอยืนยัน
        </TabsTrigger>
        <TabsTrigger value="all" className="h-10 rounded-xl">
          ทั้งหมด
        </TabsTrigger>
        <TabsTrigger value="history" className="h-10 rounded-xl">
          ประวัติการนัด
        </TabsTrigger>
        <TabsTrigger value="canceled" className="h-10 rounded-xl">
          การนัดหมายที่ยกเลิก
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
