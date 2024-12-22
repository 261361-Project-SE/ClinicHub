import { DatePicker } from "@/components/dashboard/DatePicker";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form className="flex items-center gap-x-2">
      <div className="relative">
        <Input
          placeholder="นัดหมาย, ชื่อคนไข้, โทรศัพท์"
          value={searchTerm}
          onChange={handleSearchChange}
          className="py-2 pl-10 pr-4 text-left text-primary bg-lightgray-100 rounded-xl"
        />
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lightgray">
          <SearchIcon size={20} />
        </div>
      </div>
      <DatePicker />
    </form>
  );
};

export default Searchbar;
