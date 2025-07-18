import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ArrowIcon from "../../icons/ArrowIcon";

const SortCondition = ({ dir, id }: { dir: "asc" | "desc"; id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex flex-row bg-gray-500 rounded p-3 justify-between"
    >
      <div {...listeners} className="bg-gray-400 rounded h-full w-8"></div>

      <div>{id.replaceAll("_", " ")} </div>
      <div
        className="size-5 z-[1000] relative pointer-events-auto cursor-pointer"
        onClick={(e) => {
          console.log("clicked");
        }}
      >
        <ArrowIcon orientation={dir} />
      </div>
    </div>
  );
};

export default SortCondition;
