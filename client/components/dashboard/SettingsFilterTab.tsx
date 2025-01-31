import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsFilterTabProps {
  onFilterChange: (filter: string) => void;
}

const SettingsFilterTab = ({ onFilterChange }: SettingsFilterTabProps) => {
  return (
    <Tabs
      defaultValue="booking"
      className="rounded-xl"
      onValueChange={(value) => onFilterChange(value)}
    >
      <TabsList className="h-full grid grid-cols-5 gap-1 rounded-xl text-lightgray bg-lightgray-100">
        <TabsTrigger value="booking" className="h-10 rounded-xl">
          การเปิดจอง
        </TabsTrigger>
        <TabsTrigger value="workingHours" className="h-10 rounded-xl">
          เวลาเปิด-ปิด
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SettingsFilterTab;
