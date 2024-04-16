"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function YourComponent() {
  let [machines, setMachines] = useState([]);
  let [machinesData, setMachinesData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/machine", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      machines = data;
      setMachines(machines);
      setMachinesData(machines);
      console.log("***", machines);
    }

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filterData = (searchText, category) => {
    let newData = machinesData;

    if (searchText) {
      const lowercaseSearchText = searchText.toLowerCase();
      newData = newData.filter(
        (item) =>
          item.machine_name.toLowerCase().includes(lowercaseSearchText)
      );
    }
    if (category) {
      newData = newData.filter((item) => item.category === category);
    }

    return newData;
  };

  useEffect(() => {
    const results = filterData(searchText, selectedCategory);
    setSearchResults(results);
  }, [searchText, selectedCategory, machinesData]);

  const flattenSubparts = (subparts) => subparts.flatMap((subpart) => subpart);

  return (
    <>
    <div className="mb-2 mt-4">
    <input
      type="text"
      placeholder="Search By Machine name"
      value={searchText}
      onChange={handleSearchChange}
      className="w-80 px-4 py-2 ml-5  border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
    />
     <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="ml-4 px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Category</option>
                    <option value="electronicStudio">
                      Electronic Studio Design
                    </option>
                    <option value="mechanicalStudio">Mechanical Studio</option>
                    <option value="fabricationStudio">
                      Precision Fabrication
                    </option>
                    <option value="manufacturingStudio">
                      Advanced Manufacturing Studio
                    </option>
                    <option value="robotics&Drone">
                      Robotics and Drone Studio
                    </option>
        </select>
  </div>
    <div className="overflow-hidden h-screen rounded-lg border border-gray-200 shadow-md m-5 mt-2">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Component Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Description
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Total Quantity
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Available Quantity
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {searchResults.length>0 ?
            searchResults.map((machine) => (
              <tr
                className="hover:bg-gray-50"
                rowSpan={flattenSubparts(machine.subparts).length}
              >
                <td
                  className="px-6 py-4 font-medium text-gray-900"
                  // rowSpan={flattenSubparts(machine.subparts).length}
                >
                  {machine.machine_name}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {machine.description}
                </td>
                <td
                  className="px-6 py-4 font-medium text-gray-900"
                  // rowSpan={flattenSubparts(machine.subparts).length}
                >
                  {machine.total_quantity}
                </td>
                <td
                  className="px-6 py-4 font-medium text-gray-900"
                  // rowSpan={flattenSubparts(machine.subparts).length}
                >
                   <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                      machine.available_quantity / machine.total_quantity >
                      0.5
                        ? "bg-green-50 text-green-600"
                        : machine.available_quantity /
                            machine.total_quantity >
                          0.2
                        ? "bg-yellow-50 text-yellow-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {machine.available_quantity}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {" "}
                  <div className="flex justify-start gap-4">
                    <Link href={`/updateMachine/${machine._id}`}>
                      <EditIcon></EditIcon>
                    </Link>
                    <Link href={`/updateMachine/${machine._id}`}>
                      <DeleteIcon></DeleteIcon>
                    </Link>
                    <Link href={`/orders/${machine._id}`}>
                      <ShoppingCartIcon></ShoppingCartIcon>
                    </Link>
                  </div>
                </td>
              </tr>
            )): <tr>
            <td colSpan="4" className="py-4">
              <div className="flex justify-center items-center h-full mt-8 ml-48 text-lg">
                No Result Found
              </div>
            </td>
          </tr>}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default YourComponent;
