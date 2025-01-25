import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppointmentFilterTabProps {
  onFilterChange: (filter: string) => void;
}

export function AppointmentFilterTab({
  onFilterChange,
}: AppointmentFilterTabProps) {
  return (
    <Tabs defaultValue="upcoming" className="rounded-xl">
      <TabsList className="h-full grid grid-cols-5 gap-1 rounded-xl text-lightgray bg-lightgray-100">
        <TabsTrigger
          value="upcoming"
          onClick={() => onFilterChange("upcoming")}
          className="h-10 rounded-xl"
        >
          กำลังจะมาถึง
        </TabsTrigger>
        <TabsTrigger
          value="pending"
          onClick={() => onFilterChange("pending")}
          className="h-10 rounded-xl"
        >
          คำขอนัดหมาย
        </TabsTrigger>
        <TabsTrigger
          value="toConfirm"
          onClick={() => onFilterChange("toConfirm")}
          className="h-10 rounded-xl"
        >
          รอยืนยัน
        </TabsTrigger>
        <TabsTrigger
          value="history"
          onClick={() => onFilterChange("history")}
          className="h-10 rounded-xl"
        >
          ประวัติการนัด
        </TabsTrigger>
        <TabsTrigger
          value="canceled"
          onClick={() => onFilterChange("canceled")}
          className="h-10 rounded-xl"
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
      <TabsContent value="canceled">
        {/* Content for canceled Tab (if needed) */}
      </TabsContent>
    </Tabs>
  );
}
