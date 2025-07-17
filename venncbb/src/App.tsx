import { useEffect, useState } from "react";
import type { Team } from "@prisma/client";
import "./App.css";
import Table from "./components/Table/Table";
import SideMenu, { type SideMenuMode } from "./components/SideMenu/SideMenu";

const API_URL = "http://localhost:3001";

export type OrderBy = [keyof Team, "asc" | "desc"];

const getTeams = async ([key, dir]: OrderBy) => {
  const url = `${API_URL}/teams?orderBy=${key}&dir=${dir}`;
  const response = await fetch(url);
  const data = (await response.json()) as Team[];

  return data;
};

export const orderByDefault = ["Season", "asc"] as OrderBy;

export type Restriction = { stat: keyof Team; min: number; max: number };

export type SelectedColumn = keyof Team | undefined;

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>(orderByDefault);

  const [sideMenuMode, setSideMenuMode] = useState<SideMenuMode>("data");

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
