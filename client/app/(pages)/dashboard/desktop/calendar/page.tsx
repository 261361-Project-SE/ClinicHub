import DesktopDashboardLayout from "@/components/dashboard/DesktopDashboardLayout";

const CanlendarPage = () => {
  return (
    <DesktopDashboardLayout>
      <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-shadow-bg">
        <iframe
          loading="eager"
          title="appointment-calendar"
          src={`${process.env.NEXT_PUBLIC_BASE_URL_CANLENDAR}`}
          className="w-full h-full border-0 rounded-xl"
        ></iframe>
      </div>
    </DesktopDashboardLayout>
  );
};

export default CanlendarPage;
