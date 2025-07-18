import { useEffect, useState } from "react";
import type { Team } from "@prisma/client";
import "./App.css";
import Table from "./components/Table/Table";
import SideMenu, { type SideMenuMode } from "./components/SideMenu/SideMenu";

const API_URL = "http://localhost:3001";

export type OrderBy = { id: keyof Team; dir: "asc" | "desc" };

const getTeams = async (orderBys: OrderBy[]) => {
  const url = `${API_URL}/teams`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ orderBys }),
  });
  const data = (await response.json()) as Team[];

  return data;
};

export const orderByDefault = { id: "Season", dir: "desc" } as OrderBy;

export type Restriction = { stat: keyof Team; min: number; max: number };

export type SelectedColumn = keyof Team | undefined;

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy[]>([orderByDefault]);

  const [sideMenuMode, setSideMenuMode] = useState<SideMenuMode>("sort");

  const [selectedColumn, setSelectedColumn] = useState<SelectedColumn>();

  useEffect(() => {
    getTeams(orderBy).then((res) => {
      setTeams(res);
    });
  }, [orderBy]);

  return (
    <div className="w-screen h-screen flex flex-row justify-between">
      <SideMenu
        modeState={[sideMenuMode, setSideMenuMode]}
        teams={teams}
        selectedColumnState={[selectedColumn, setSelectedColumn]}
        orderByState={[orderBy, setOrderBy]}
      />

      <div className="">
        <Table
          teams={teams}
          orderByState={[orderBy, setOrderBy]}
          selectedColumnState={[selectedColumn, setSelectedColumn]}
        />
      </div>
      <div></div>
    </div>
  );
}

export default App;
