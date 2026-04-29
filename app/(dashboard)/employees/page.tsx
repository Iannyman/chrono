import { Search, UsersIcon } from "lucide-react";

const EmployeesPage = () => {
  return (

      <div className="flex flex-col min-h-screen items-start bg-gray-900 w-full">

        {/* info cards */}
        <div className="flex flex-row">
          <div className="flex mx-10 my-4 bg-gray-800 rounded-xl shadow-md p-8">
            <UsersIcon className="h-6 w-6 mr-2 text-gray-400" />
            <h1 className="text-center text-xl font-bold mb-6 text-white">
              Total Employee
            </h1>

            {/* <div className="flex items-center border border-gray-300 rounded-md p-2 my-4"></div> */}
          </div>

          <div className="flex my-4 bg-gray-800 rounded-xl shadow-md p-8">
            <UsersIcon className="h-6 w-6 mr-2 text-gray-400" />
            <h1 className="text-center text-xl font-bold mb-6 text-white">
              Active Employee
            </h1>
          </div>
        </div>

        {/* search employee */}
        <div className="flex flex-row">
          <div className="mx-10 my-4 bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-center text-2xl font-bold mb-6 text-white">
              Employee List
            </h1>

            <div className="flex items-center border border-gray-300 rounded-md p-2 my-4">
              <Search className="h-5 w-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                className="flex-1 outline-none border-none px-2"
              />
            </div>
          </div>

          <div className=" my-4 bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-center text-2xl font-bold mb-6 text-white">
              Production Line
            </h1>

            <div className="flex items-center border border-gray-300 rounded-md p-2 my-4">
              <Search className="h-5 w-3 text-gray-400" />
              <input
                type="text"
                placeholder="Choose production line"
                className="flex-1 outline-none border-none px-2"
              />
            </div>
          </div>
        </div>
      </div>

  );
};

export default EmployeesPage;