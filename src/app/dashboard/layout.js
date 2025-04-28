import Tickets from "./@tickets/page";
import Shifts from "./@shifts/page";
import Calendar from "./@calendar/page";
import "../globals.css";
import Greet from "./@tickets/greet";

export default function DashboardLayout({ children }) {
  return (
    <div className="w-full flex flex-col gap-2 p-[30px] bg-[--background] dark:bg-gray-800 text-gray-700 dark:text-gray-200 min-h-[100dvh]">
      {/* {children} */}
      <div className="flex gap-1 lg:gap-2 w-full  justify-between md:flex-row flex-col ">
        <div className="flex gap-2 md:flex-col flex-row bg-white ">
          {/* <Calendar />
          <Shifts /> */}
        </div>
        <div className="flex flex-col gap-2 w-full">
          {/* <Greet /> */}
          <Tickets />
        </div>
      </div>
    </div>
  );
}
