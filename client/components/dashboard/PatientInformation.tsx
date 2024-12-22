import { PatientTableProps } from "@/lib/types";
import { PhoneIcon } from "lucide-react";

const PatientInformation: React.FC<PatientTableProps> = ({ patients }) => {
  return (
    <div className="flex flex-col p-2 gap-y-2">
      {patients.map((patient, index) => (
        <div key={index} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <div className="flex justify-between">
              <div className="font-medium">
                {patient.FirstName} {patient.LastName}
              </div>
              <div className="text-pink-200">รหัสคนไข้</div>
            </div>
            <div className="flex justify-between text-sm text-darkgray">
              <div>ไข้</div>
              <div>{patient.PatientID}</div>
            </div>
          </div>
          <table className="w-full text-sm table-auto">
            <tbody>
              <tr className="font-medium text-darkgray">
                <td>D.O.B</td>
                <td>Sex</td>
                <td className="text-right">Weight</td>
              </tr>
              <tr className="text-lightgray">
                <td>{patient.BirthDate}</td>
                <td>{patient.Gender}</td>
                <td className="text-right">{patient.Weight}</td>
              </tr>
              <tr className="font-medium text-darkgray">
                <td>Last Appointment</td>
                <td>Height</td>
                <td className="text-right">Reg. Date</td>
              </tr>
              <tr className="text-lightgray">
                <td>15 ธันวาคม 2515</td>
                <td>{patient.Height}</td>
                <td className="text-right">{patient.created_at}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-pink-200">ประวัติคนไข้</div>
          <div className="flex px-4 py-2 text-white bg-pink-200 cursor-pointer rounded-xl gap-x-2 w-fit hover:bg-pink-200/95">
            <PhoneIcon fill="#fff" stroke="1" size={24} />
            <a href={`tel:${patient.Phone}`}>{patient.Phone}</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientInformation;
