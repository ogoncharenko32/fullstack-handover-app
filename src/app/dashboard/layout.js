import Tickets from "./@tickets/page";
import Shifts from "./@shifts/page";
import Calendar from "./@calendar/page";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 min-h-screen">
      {/* {children} */}
      <div className="flex gap-1 lg:gap-2 w-full justify-between md:flex-row flex-col ">
        <div className="flex gap-2 md:flex-col flex-row">
          <Calendar />
          <Shifts />
        </div>
        <Tickets />
      </div>
    </div>
  );
}
