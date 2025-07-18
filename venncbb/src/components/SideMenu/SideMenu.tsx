import type { Team } from "@prisma/client";
import { keys, type State } from "../../helpers";
import Data from "./Data";
import Filter from "./Filter";
import SideMenuReduced from "./Reduced";
import type { OrderBy, SelectedColumn } from "../../App";
import Sort from "./Sort";

export type SideMenuMode = "red" | "filter" | "settings" | "data" | "sort";

const SideMenu = ({
  modeState,
  teams,
  selectedColumnState,
  orderByState,
}: {
  modeState: State<SideMenuMode>;
  teams: Team[];
  selectedColumnState: State<SelectedColumn>;
  orderByState: State<OrderBy[]>;
}) => {
  const [mode, _] = modeState;

  const objKeys = teams.length > 0 ? keys(teams[0]) : [];

  return (
    <div className="flex">
      <SideMenuReduced modeState={modeState} />
      {mode == "filter" && (
        <Filter
          colState={selectedColumnState as State<string | undefined>}
          keys={objKeys}
        />
      )}
      {mode == "sort" && (
        <Sort
          colState={selectedColumnState as State<string | undefined>}
          keys={objKeys}
          orderByState={orderByState}
        />
      )}
      {mode == "data" && (
        <Data teams={teams} colState={selectedColumnState} keys={objKeys} />
      )}
    </div>
  );
};

export default SideMenu;
