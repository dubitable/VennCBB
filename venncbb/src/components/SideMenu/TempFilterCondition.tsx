import { type State } from "../../helpers";
import { Tooltip } from "react-tooltip";
import Stat from "../Misc/Stat";
import { useEffect, useState } from "react";
import type { Team } from "@prisma/client";
import type { Filter } from "../../App";

const TempFilterCondition = ({
  colState,
  teams,
  addFilter,
}: {
  colState: State<string | undefined>;
  teams: Team[];
  addFilter: (val: Filter) => void;
}) => {
  const [selectedColumn, setSelectedColumn] = colState;

  if (!selectedColumn) return <div></div>;

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    const mapped = teams
      .map((elem) => elem[selectedColumn as keyof Team])
      .filter((elem) => elem != null) as number[];

    if (typeof mapped[0] == "string") return;
    if (mapped.length == 0) return;

    setMin(Math.min(...mapped).toFixed(0));
    setMax(Math.max(...mapped).toFixed(0));
  }, [teams, selectedColumn]);

  return (
    <div className="flex flex-row bg-gray-600 rounded p-3 justify-between items-center my-2 w-full">
      <Tooltip anchorSelect={`.${selectedColumn}`} place="top">
        {selectedColumn.replaceAll("_", " ")}
      </Tooltip>
      <div className="text-nowrap overflow-clip w-[4rem] flex flex-row">
        <Stat name={selectedColumn} />
      </div>
      <input
        value={min}
        className="w-[3rem]"
        onChange={(e) => setMin(e.currentTarget.value)}
      />
      <input
        value={max}
        className="w-[3rem]"
        onChange={(e) => setMax(e.currentTarget.value)}
      ></input>
      <div
        className="size-7 text-green-300 cursor-pointer"
        onClick={() => {
          addFilter({
            column: selectedColumn,
            min: Number(min),
            max: Number(max),
            apply: function (team) {
              const value = team[selectedColumn as keyof Team] as number;
              return Number(min) <= value && Number(max) >= value;
            },
          });
          setSelectedColumn(undefined);
        }}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 48C141.125 48 48 141.125 48 256s93.125 208 208 208 208-93.125 208-208S370.875 48 256 48zm107 229h-86v86h-42v-86h-86v-42h86v-86h42v86h86v42z"></path>
        </svg>
      </div>
    </div>
  );
};

export default TempFilterCondition;
