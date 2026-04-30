import { Search, UsersIcon, Download } from "lucide-react";
import Calendar from "@/components/ui/calendar";
import HoursChart from "@/components/ui/chart";

const EmployeesPage = () => {
  return (

    <div className="flex flex-col min-h-screen items-start bg-gray-900 w-full">
      <div className="flex flex-row justify-between w-full">

        <h1 className=" flex text-2xl font-bold mb-6 text-white mx-10 mt-4 justify-start">
          Welcome, Admin!
        </h1>


        {/* info cards */}
        <div className="flex flex-row justify-end w-full mx-10">
          <div className="flex mx-10 my-4 bg-gray-800 rounded-xl shadow-md p-8  ">
            <UsersIcon className="h-6 w-6 mr-2 text-gray-400" />
            <h1 className="text-center text-xl font-bold mb-6 text-white">
              Total Employees
            </h1>

            {/* <div className="flex items-center border border-gray-300 rounded-md p-2 my-4"></div> */}
          </div>

          <div className="flex my-4 bg-gray-800 rounded-xl shadow-md p-8">
            <UsersIcon className="h-6 w-6 mr-2 text-gray-400" />
            <h1 className="text-center text-xl font-bold mb-6 text-white">
              Active Employees
            </h1>
          </div>
        </div>
      </div>

      {/* search employee */}

      {/* COL 3 → Chart */}
      <div className="flex flex-row mx-8 items-start">
        <HoursChart />
      </div>

      <div className="grid grid-cols-3 gap-6 mx-8 my-6">

        {/* COL 1 → Employee + Production */}
        <div className="flex flex-col">
          <div className="bg-gray-800 rounded-xl shadow-md p-8 mb-4 w-full">
            <h1 className="text-center text-2xl font-bold mb-6 text-white">
              Employee List
            </h1>

            <div className="flex items-center border border-gray-300 rounded-md p-2 my-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                className="flex-1 outline-none border-none px-2"
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-md p-8 w-full">
            <h1 className="text-center text-2xl font-bold mb-6 text-white">
              Production Line
            </h1>

            <div className="flex items-center border border-gray-300 rounded-md p-2 my-4 bg-gray-800">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                list="production-lines"
                placeholder="Choose production line"
                className="flex-1 outline-none border-none px-2 bg-transparent text-white"
              />

              <datalist id="production-lines">
                <option value="Linia A" />
                <option value="Linia B" />
                <option value="Linia C" />
                <option value="Linia D" />
                <option value="Linia E" />
              </datalist>
            </div>
          </div>
        </div>

        {/* COL 2 → Calendar */}
        <div className="flex justify-center items-start">
          <Calendar />
        </div>





      </div>

      <button
        id="exportButton"
        className="flex gap-2 bg-[#E4F2EA] hover:bg-[#B2D6FC] text-gray-800 px-4 py-2 rounded-lg mb-3 mt-3"
      >
        <Download className="h-5 w-5 text-gray-400" />
        Search results
      </button>

    </div>

  );
};

export default EmployeesPage;