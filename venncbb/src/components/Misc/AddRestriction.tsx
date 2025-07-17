import type { Team } from "@prisma/client";
import Slider from "./Slider";
import { useState } from "react";
import type { Restriction } from "../App";

type AddRestrictionProps = {
  teams: Team[];
  addRes: (val: Restriction) => void;
};

const AddRestriction = ({ teams, addRes }: AddRestrictionProps) => {
  const [stat, setStat] = useState<keyof Team | undefined>();

  const [min, setMin] = useState(Number.MAX_VALUE);
  const [max, setMax] = useState(Number.MIN_VALUE);

  return (
    <div className="flex flex-row gap-2">
      <div>
        <select
          name="Stat"
          value={stat ?? ""}
          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          onChange={(e) => {
            const chosenStat = e.currentTarget.value as keyof Team;
            setStat(chosenStat);

            const red = teams.map((elem) => elem[chosenStat]) as any[];

            setMin(Math.min(...red));
            setMax(Math.max(...red));
          }}
        >
          <option value="">Select</option>
          {teams.length > 0 &&
            Object.keys(teams[0]).map((key, index) => (
              <option key={index} value={key}>
                {key.replaceAll("_", " ")}
              </option>
            ))}
        </select>
      </div>

      {stat && <Slider minState={[min, setMin]} maxState={[max, setMax]} />}
      {stat && (
        <div>
          {
            teams.filter(
              (elem) =>
                min <= (elem[stat] as unknown as number) &&
                max >= (elem[stat] as unknown as number)
            ).length
          }
          / {teams.length}
        </div>
      )}
      {stat && (
        <button
          className="bg-green-400 px-3 py rounded"
          onClick={() => {
            addRes({ max, min, stat });
            setStat(undefined);
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

export default AddRestriction;
