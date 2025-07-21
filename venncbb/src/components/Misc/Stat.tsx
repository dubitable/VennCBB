import { nameMap } from "../../helpers";

const Stat = ({ name }: { name: string }) => {
  if (name in nameMap) {
    return (
      <div className={`${name} noselect`}>
        {nameMap[name as keyof typeof nameMap]}
      </div>
    );
  }
  return <div className="noselect">{name.replaceAll("_", " ")}</div>;
};

export default Stat;
