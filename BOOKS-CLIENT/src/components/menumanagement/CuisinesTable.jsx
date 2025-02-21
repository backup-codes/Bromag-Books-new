import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CuisinesTable = ({ cuisines }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCuisines, setFilteredCuisines] = useState(cuisines);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filtered = cuisines.filter((cuisine) =>
      cuisine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCuisines(filtered);
  }, [searchTerm, cuisines]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const totalPages = Math.ceil(filteredCuisines.length / itemsPerPage);
  const displayedCuisines = filteredCuisines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col gap-10 bg-white rounded-xl p-4">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Search Cuisines</p>
          <div className="flex gap-4 items-center">
            <div className="rounded border flex gap-2 bg-[#F4FAFF] border-[#758D9F] px-3 py-3 h-8 items-center">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name"
                className="border-0 bg-transparent ring-0 h-6 w-64"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button className="bg-landing-secondary font-semibold h-8 px-8">
              Search
            </Button>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p className="">
            Showing <span className="font-bold">{displayedCuisines.length}</span> from{" "}
            <span className="font-bold">{filteredCuisines.length}</span> results
          </p>
          <div className="flex gap-2 items-center text-white">
            <Button
              variant="icon"
              className="bg-[#1F303C] h-6 px-1"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <p className="text-teal-500">
              {currentPage}-{totalPages}
            </p>
            <Button
              variant="icon"
              className="bg-[#1F303C] h-6 px-1"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-lg flex flex-col gap-3 border py-3">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#1F303C] hover:bg-[#1F303C]">
              <TableCell className="text-white  rounded-tl-lg">S.no</TableCell>
              <TableCell className="text-white">Name</TableCell>
              <TableCell className="text-white">Description</TableCell>
              <TableCell className="text-center text-white w-[300px]">
                Sub Cuisines
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#F4FAFF]">
            {displayedCuisines.map((cuisine, index) => (
              <TableRow key={cuisine._id}>
                <TableCell className="font-medium py-3">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell className="py-3">{cuisine.name}</TableCell>
                <TableCell className="py-3">{cuisine.description}</TableCell>
                <TableCell className="py-3 text-center">
                  <div className="flex flex-col gap-2">
                    {cuisine.subCuisines.map((subCuisine) => (
                      <p key={subCuisine}>{subCuisine}</p>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CuisinesTable;
