import type { Team } from "@prisma/client";
import { keys, type State, applyFilters } from "../../helpers";
import Data from "./Data";
import SideMenuReduced from "./Reduced";
import type {
  OrderBy,
  SelectedColumn,
  Filter as DataFilter,
  DataMode,
} from "../../App";
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
  dataModeState,
}: {
  modeState: State<SideMenuMode>;
  teams: Team[];
  selectedColumnState: State<SelectedColumn>;
  orderByState: State<OrderBy[]>;
  filtersState: State<DataFilter[]>;
  dataModeState: State<DataMode>;
}) => {
  const [mode, _] = modeState;
  const [filters, setFilters] = filtersState;

  const objKeys = teams.length > 0 ? keys(teams[0]) : [];

  return (
    <div className="flex">
      <SideMenuReduced modeState={modeState} />
      {mode == "settings" && <Settings dataModeState={dataModeState} />}
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
        <Data
          teams={applyFilters(teams, filters)}
          colState={selectedColumnState}
          keys={objKeys}
        />
      )}
    </div>
  );
};

export default SideMenu;
