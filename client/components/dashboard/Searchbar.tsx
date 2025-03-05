import { Input } from "@/components/ui/input";
import { appointmentsData } from "@/helper/SampleData";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const executeSearch = () => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const searchResults = appointmentsData.filter((appointment) => {
      const { firstname, lastname, phone_number } = appointment;

      return (
        (firstname && firstname.toLowerCase().includes(lowerSearchTerm)) ||
        (lastname && lastname.toLowerCase().includes(lowerSearchTerm)) ||
        (phone_number && phone_number.toLowerCase().includes(lowerSearchTerm))
      );
    });
  };

  return (
    <form
      className="relative flex items-center gap-x-2"
      onSubmit={(e) => {
        e.preventDefault();
        executeSearch();
      }}
    >
      <div className="relative w-full">
        <Input
          placeholder="ชื่อ หรือ เบอร์โทรศัพท์"
          value={searchTerm}
          onChange={handleSearchChange}
          className="py-2 pl-10 pr-4 text-left border-none placeholder-lightgray-100 text-primary bg-[#F0F0F0] rounded-xl placeholder:text-lightgray"
        />
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lightgray">
          <SearchIcon size={20} />
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
