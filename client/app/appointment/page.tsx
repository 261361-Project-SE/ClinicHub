import { getRequest } from "@/service/api";

const Page = async () => {
  const appointments = await getRequest("/appointment");
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Test message
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment: any) => (
            <tr
              key={appointment.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {appointment.test}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
