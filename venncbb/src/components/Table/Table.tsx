import type { Team } from "@prisma/client";
import { Tooltip } from "react-tooltip";
import { orderByDefault, type SelectedColumn, type OrderBy } from "../../App";
import { entries, keys, type State } from "../../helpers";
import ArrowIcon from "../../icons/ArrowIcon";
import type { JSX } from "react";

const SKIP_COLS = 3;

const nameMap = {
  Short_Conference_Name: "Conf.",
  Full_Team_Name: "Team",
  Net_Rating: "NTG",
  Adjusted_Offensive_Efficiency: "AdjOE",
  Adjusted_Defensive_Efficiency: "AdjDE",
  Raw_Offensive_Efficiency: "OE",
  Raw_Defensive_Efficiency: "DE",
  Adjusted_Tempo: "AdjT",
};

const Selectable = ({
  children,
  selected,
}: {
  children: JSX.Element;
  selected: boolean;
}) => {
  if (selected)
    return (
      <div className="px-3 py-2 whitespace-nowrap cursor-pointer bg-gray-800">
        {children}
      </div>
    );

  return (
    <div className="px-3 py-2 whitespace-nowrap cursor-pointer hover:bg-gray-800">
      {children}
    </div>
  );
};

const Table = ({
  teams,
  orderByState,
  selectedColumnState,
}: {
  teams: Team[];
  orderByState: State<OrderBy>;
  selectedColumnState: State<SelectedColumn>;
}) => {
  if (teams.length <= 0) return <div></div>;

  const [orderBy, setOrderBy] = orderByState;
  const [selectedColumn, setSelectedColumn] = selectedColumnState;

  const updateOrderBy = (key: keyof Team) => {
    if (orderBy[0] == key) {
      if (orderBy[1] == "asc") {
        setOrderBy([key, "desc"]);
      } else {
        setOrderBy(orderByDefault);
      }
    } else {
      setOrderBy([key, "asc"]);
    }
  };

  return (
    <div className="flex w-full h-screen py-[3rem] justify-center">
      {keys(teams[0]).map((key, index) => (
        <Tooltip anchorSelect={`.${key}`} place="top" key={index}>
          {key.replaceAll("_", " ")}
        </Tooltip>
      ))}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
          <thead className="sticky top-0 bg-white ltr:text-left rtl:text-right dark:bg-gray-900">
            <tr className="*:font-medium *:text-gray-900 dark:*:text-white">
              <th className="px-3 py-2 whitespace-nowrap noselect">Logo</th>
              {keys(teams[0])
                .slice(SKIP_COLS)
                .map((key, index) => (
                  <th
                    key={index}
                    onClick={() => {
                      setSelectedColumn(key);
                    }}
                  >
                    <Selectable selected={key == selectedColumn}>
                      <div className="flex flex-row justify-center items-center gap-1">
                        <span>
                          {key in nameMap ? (
                            <div className={`${key} noselect`}>
                              {nameMap[key as keyof typeof nameMap]}
                            </div>
                          ) : (
                            <div className="noselect">
                              {key.replaceAll("_", " ")}
                            </div>
                          )}
                        </span>
                        <div className="w-2">
                          {orderBy[0] == key && (
                            <ArrowIcon orientation={orderBy[1]} />
                          )}
                        </div>
                      </div>
                    </Selectable>
                  </th>
                ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {teams.slice(0, 20).map((team, teamIndex) => (
              <tr
                className="*:text-gray-900 *:first:font-medium dark:*:text-white"
                key={teamIndex}
              >
                <td className="px-3 py-2 whitespace-nowrap">
                  {team.logos && <img className="size-8" src={team.logos} />}
                </td>
                {entries(team)
                  .slice(SKIP_COLS)
                  .map(([key, value], keyIndex) =>
                    key == "Full_Team_Name" ? (
                      <td
                        className="px-3 py-2 whitespace-nowrap"
                        key={keyIndex}
                      >
                        <div className="w-[15rem] overflow-clip">{value}</div>
                      </td>
                    ) : (
                      <td
                        className="px-3 py-2 whitespace-nowrap"
                        key={keyIndex}
                      >
                        {typeof value == "number" && value.toFixed(0)}
                        {typeof value == "string" && value}
                      </td>
                    )
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
