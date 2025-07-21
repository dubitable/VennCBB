import type { Team } from "@prisma/client";
import { keys, type State } from "../../helpers";
import Data from "./Data";
import SideMenuReduced from "./Reduced";
import type { OrderBy, SelectedColumn, Filter as DataFilter } from "../../App";
import Sort from "./Sort";
import Filter from "./Filter";
import Settings from "./Settings";

export type SideMenuMode = "filter" | "settings" | "data" | "sort" | "red";

const SideMenu = ({
  modeState,
  teams,
  selectedColumnState,
  orderByState,
  filtersState,
}: {
  modeState: State<SideMenuMode>;
  teams: Team[];
  selectedColumnState: State<SelectedColumn>;
  orderByState: State<OrderBy[]>;
  filtersState: State<DataFilter[]>;
}) => {
  const [mode, _] = modeState;

  const objKeys = teams.length > 0 ? keys(teams[0]) : [];

  return (
    <div className="flex">
      <SideMenuReduced modeState={modeState} />
      {mode == "settings" && <Settings />}
      {mode == "filter" && (
        <Filter
          colState={selectedColumnState as State<string | undefined>}
          keys={objKeys}
          filtersState={filtersState}
          teams={teams}
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
