import React from "react";
import { useSearchParams } from "react-router-dom";

const SortSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    if (e.target.value === "") {
      searchParams.delete("sort");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ sort: e.target.value });
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <p>Sort by</p>
      <select
        defaultValue={searchParams.get("sort")}
        className="border rounded-md"
        onChange={(e) => {
          handleChange(e);
        }}
      >
        <option value={""}>None</option>
        <option value={"title"}>Title</option>
        <option value={"eventDate"}>Event date</option>
        <option value={"organizer"}>Organizer</option>
      </select>
    </div>
  );
};

export default SortSelect;
