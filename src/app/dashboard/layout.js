import Tickets from "./@tickets/page";
import Shifts from "./@shifts/page";
import Calendar from "./@calendar/page";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 min-h-screen">
      {/* {children} */}
      <div className="flex gap-1 lg:gap-4 w-full justify-between md:flex-row flex-col ">
        <div className="flex gap-4 md:flex-col flex-row">
          <Calendar />
          <Shifts />
        </div>
        <Tickets />
      </div>
    </div>
  );
}
