import { useEffect, useState } from "react";
import type { Team } from "@prisma/client";
import "./App.css";
import Table from "./components/Table/Table";
import SideMenu, { type SideMenuMode } from "./components/SideMenu/SideMenu";
import { applyFilters } from "./helpers";
import { DATASELECT } from "./maps";
import { useSettings } from "./hooks";

const API_URL = "http://localhost:3001";

export type OrderBy = { id: keyof Team; dir: "asc" | "desc" };
export type DataMode = "red" | "full";

const getTeams = async (orderBys: OrderBy[], dataMode: DataMode) => {
  const url = `${API_URL}/teams`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderBys,
      select: dataMode == "red" ? DATASELECT.REDUCED : DATASELECT.FULL,
    }),
  });
  const data = (await response.json()) as Team[];

  return data;
};

export const orderByDefault = { id: "Net_Rating", dir: "desc" } as OrderBy;

export type Restriction = { stat: keyof Team; min: number; max: number };
export type SelectedColumn = keyof Team | undefined;

export type NumFilter = {
  apply: (team: Team) => boolean;
  min: number;
  max: number;
  column: string;
};

export type Filter = NumFilter;

function App() {
  const [teams, setTeams] = useState<Team[]>([]);

  const [orderBy, setOrderBy] = useState<OrderBy[]>([orderByDefault]);
  const [filters, setFilters] = useState<Filter[]>([]);

  const [sideMenuMode, setSideMenuMode] = useState<SideMenuMode>("red");

  const SETTINGS = useSettings({ datamode: "full", scrollto: "auto" });

  const [selectedColumn, setSelectedColumn] = useState<SelectedColumn>();

  useEffect(() => {
    getTeams(orderBy, SETTINGS.dataMode).then((res) => {
      setTeams(res);
    });
  }, [orderBy, SETTINGS.dataMode]);

  return (
    <div className="w-screen h-screen flex flex-row justify-between">
      <SideMenu
        modeState={[sideMenuMode, setSideMenuMode]}
        teams={teams}
        selectedColumnState={[selectedColumn, setSelectedColumn]}
        orderByState={[orderBy, setOrderBy]}
        filtersState={[filters, setFilters]}
        SETTINGS={SETTINGS}
      />

      <div className="">
        <Table
          teams={applyFilters(teams, filters)}
          orderByState={[orderBy, setOrderBy]}
          selectedColumnState={[selectedColumn, setSelectedColumn]}
          SETTINGS={SETTINGS}
        />
      </div>
      <div></div>
    </div>
  );
}

export default App;
