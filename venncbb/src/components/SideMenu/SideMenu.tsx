import type { Team } from "@prisma/client";
import type { State } from "../../helpers";
import Data from "./Data";
import Filter from "./Filter";
import SideMenuReduced from "./Reduced";
import type { SelectedColumn } from "../../App";
import Sort from "./Sort";

export type SideMenuMode = "red" | "filter" | "settings" | "data" | "sort";

const SideMenu = ({
  modeState,
  teams,
  selectedColumnState,
}: {
  modeState: State<SideMenuMode>;
  teams: Team[];
  selectedColumnState: State<SelectedColumn>;
}) => {
  const [mode, setMode] = modeState;

  const [selectedColumn, setSelectedColumn] = selectedColumnState;

  return (
    <div className="flex">
      <SideMenuReduced modeState={modeState} />
      {mode == "filter" && <Filter selectedColumn={selectedColumn} />}
      {mode == "sort" && <Sort selectedColumn={selectedColumn} />}
      {mode == "data" && <Data teams={teams} selectedColumn={selectedColumn} />}
    </div>
  );
};

export default SideMenu;
