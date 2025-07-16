import { useEffect, useState } from "react";
import type { Team } from "@prisma/client";
import "./App.css";
import AddRestriction from "./components/AddRestriction";
import VennDiagram from "./components/VennDiagram";

const URL = "http://localhost:3001";

const getTeams = async () => {
  const response = await fetch(URL + "/teams");
  const data = (await response.json()) as Team[];

  return data;
};

export type Restriction = { stat: keyof Team; min: number; max: number };

function App() {
  const [teams, setTeams] = useState<Team[]>([]);

  const [restrictions, setRestrictions] = useState<Restriction[]>([]);

  const addRes = (res: Restriction) => {
    setRestrictions([...restrictions, res]);
  };

  useEffect(() => {
    getTeams().then((res) => setTeams(res));
  }, []);

  return (
    <div className="w-screen h-full flex flex-col align-middle">
      <div className="flex flex-row">
        <AddRestriction teams={teams} addRes={addRes} />
      </div>

      <div className="flex w-full">
        <VennDiagram teams={teams} restrictions={restrictions} />
      </div>
    </div>
  );
}

export default App;
