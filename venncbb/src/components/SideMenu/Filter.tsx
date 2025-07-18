import type { State } from "../../helpers";
import Search from "./Search";

const Filter = ({
  colState,
  keys,
}: {
  colState: State<string | undefined>;
  keys: string[];
}) => {
  return (
    <div className="flex h-screen flex-1 flex-col justify-start border-e border-gray-100 bg-white w-[20rem] gap-5">
      <div className="flex flex-row justify-center items-center mt-5 text-medium text-gray-900 border-b-2 pb-2 border-gray-100">
        Filter
      </div>

      <Search valueState={colState} keys={keys} />

      <div className="w-full h-3/4 cursor-pointer"></div>
    </div>
  );
};

export default Filter;
