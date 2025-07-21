import { DataMode } from "../../App";
import { State } from "../../helpers";

const Settings = ({ dataModeState }: { dataModeState: State<DataMode> }) => {
  const [dataMode, setDataMode] = dataModeState;

  return (
    <div className="flex h-screen flex-1 flex-col justify-start border-e border-gray-100 bg-white w-[20rem] gap-5">
      <div className="flex flex-row justify-center items-center mt-5 text-medium text-gray-900 border-b-2 pb-2 border-gray-100">
        Settings
      </div>

      <div className="w-full h-3/4 flex flex-col justify-start items-center">
        <div className="flex flex-row gap-5">
          <div className="text-gray-800 w-[10rem]"> Data Mode </div>
          <select
            name="Mode"
            id="Mode"
            value={dataMode}
            onChange={(e) => setDataMode(e.currentTarget.value as DataMode)}
            className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm text-gray-800"
          >
            <option value="red">Reduced</option>
            <option value="full">Full</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
