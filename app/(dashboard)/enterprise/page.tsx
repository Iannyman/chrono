import { Download, Search } from "lucide-react";


const AttendancesPage = () => {

  const columns = [
    "ID",
    "Employee Name",
    "Date",
    "Time In",
    "Time Out",
    "Working Hours",
    "Working Place",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-6 w-full">
      <div className="flex flex-row items-center gap-2">
        {/* <HistoryIcon className="h-5 w-5 text-gray-400" /> */}
        <h1 className="text-2xl font-bold my-3">
          Attendance Information
        </h1>
      </div>


      <div className="mt-5">
        <div className="mx-1">
          {/* <div id="queryStatusResults" className="mt-3 text-center text-gray-400">
            No data loaded yet.
          </div> */}


          <div className="flex flex-row justify-between ">

            <button
              id="exportButton"
              className="flex gap-2 bg-[#E4F2EA] hover:bg-[#B2D6FC] text-gray-800 px-4 py-2 rounded-lg mb-3 mt-3"
            >
              <Download className="h-5 w-5 text-gray-400" />
              Export results to Excel
            </button>

            <div className="flex items-center border border-gray-300 rounded-md p-2 my-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                className="flex-1 outline-none border-none px-2"
              />
            </div>
          </div>


          <div className="overflow-x-auto">
            <table
              id="resultsTable"
              className="w-full border border-gray-700 rounded-lg overflow-hidden"
            >
              <thead id="tableHeader" className="bg-gray-800">
                <tr>
                  {columns.map((column) => (
                    <th key={column} className="px-4 py-3 border-b border-gray-700 text-left">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Backend data */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancesPage;