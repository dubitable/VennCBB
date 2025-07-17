import type { Team } from "@prisma/client";
import Boxplot from "../Chart/Boxplot";
import type { SelectedColumn } from "../../App";

const access = (team: Team, selectedColumn: keyof Team) => {
  const value = team[selectedColumn];

  if (typeof value == "number") return value;
  else return null;
};

const filter = (values: { group: string; value: number | null }[]) => {
  return values.filter((elem) => elem.value != null) as {
    group: keyof Team;
    value: number;
  }[];
};

const Data = ({
  teams,
  selectedColumn,
}: {
  teams: Team[];
  selectedColumn?: SelectedColumn;
}) => {
  const plot = selectedColumn ? (
    <Boxplot
      data={filter(
        teams.map((team) => {
          return {
            group: selectedColumn.replaceAll("_", " "),
            value: access(team, selectedColumn),
          };
        })
      )}
    />
  ) : (
    <div></div>
  );

  return (
    <div className="flex h-screen flex-1 flex-col justify-start border-e border-gray-100 bg-white w-[20rem]">
      <div className="flex flex-row justify-center items-center pt-5 text-medium text-gray-900">
        Visualization
      </div>
      <div className="w-full h-3/4 cursor-pointer">{plot}</div>
    </div>
  );
};

export default Data;
