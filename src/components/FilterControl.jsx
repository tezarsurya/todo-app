import React from "react";
import { useRecoilState } from "recoil";
import { filterState } from "../lib/recoil/atoms";

function FilterControl() {
  const [filter, setFilter] = useRecoilState(filterState);
  function handleClick(e) {
    setFilter(e.target.value);
  }

  return (
    <div className="flex items-center justify-between space-x-4 text-lg font-bold text-[#AEADB5] dark:text-[#6E6881] md:text-sm">
      <button
        type="button"
        value="All"
        onClick={handleClick}
        className={`transition-colors duration-300 ease-in-out focus:outline-none active:outline-none ${
          filter === "All"
            ? "text-[#3a7bfd] hover:text-[#3a7bfd]"
            : "hover:text-[#181824] dark:hover:text-[#fafafa]"
        }`}
      >
        All
      </button>
      <button
        type="button"
        value="Active"
        onClick={handleClick}
        className={`transition-colors duration-300 ease-in-out focus:outline-none active:outline-none ${
          filter === "Active"
            ? "text-[#3a7bfd] hover:text-[#3a7bfd]"
            : "hover:text-[#181824] dark:hover:text-[#fafafa]"
        }`}
      >
        Active
      </button>
      <button
        type="button"
        value="Completed"
        onClick={handleClick}
        className={`transition-colors duration-300 ease-in-out focus:outline-none active:outline-none ${
          filter === "Completed"
            ? "text-[#3a7bfd] hover:text-[#3a7bfd]"
            : "hover:text-[#181824] dark:hover:text-[#fafafa]"
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterControl;
