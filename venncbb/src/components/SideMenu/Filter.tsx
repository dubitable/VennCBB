import type { SelectedColumn } from "../../App";

const Filter = ({ selectedColumn }: { selectedColumn?: SelectedColumn }) => {
  return (
    <div className="flex h-screen flex-1 flex-col justify-start border-e border-gray-100 bg-white w-[20rem]">
      <div className="flex flex-row justify-center items-center pt-5 text-medium text-gray-900">
        Filter
      </div>
      <div className="w-full h-3/4 cursor-pointer"></div>
    </div>
  );
};

export default Filter;
