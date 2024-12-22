import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppointmentFilterTabProps {
  onFilterChange: (filter: string) => void;
}

export function AppointmentFilterTab({
  onFilterChange,
}: AppointmentFilterTabProps) {
  return (
    <Tabs defaultValue="upcoming" className="w-full rounded-xl">
      <TabsList className="w-full grid grid-cols-5 rounded-xl text-lightgray bg-lightgray-100">
        <TabsTrigger
          value="upcoming"
          onClick={() => onFilterChange("upcoming")}
          className="rounded-xl"
        >
          กำลังจะมาถึง
        </TabsTrigger>
        <TabsTrigger
          value="pending"
          onClick={() => onFilterChange("pending")}
          className="rounded-xl"
        >
          คำขอนัดหมาย
        </TabsTrigger>
        <TabsTrigger
          value="toConfirm"
          onClick={() => onFilterChange("toConfirm")}
          className="rounded-xl"
        >
          รอยืนยัน
        </TabsTrigger>
        <TabsTrigger
          value="history"
          onClick={() => onFilterChange("history")}
          className="rounded-xl"
        >
          ประวัติการนัด
        </TabsTrigger>
        <TabsTrigger
          value="cancelled"
          onClick={() => onFilterChange("cancelled")}
          className="rounded-xl"
        >
          การนัดหมายที่ยกเลิก
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        {/* Content for All Tab (if needed) */}
      </TabsContent>
      <TabsContent value="upcoming">
        {/* Content for Upcoming Tab (if needed) */}
      </TabsContent>
      <TabsContent value="cancelled">
        {/* Content for Cancelled Tab (if needed) */}
      </TabsContent>
    </Tabs>
  );
}
