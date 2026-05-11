import {Pencil} from "lucide-react";

interface Props {
    handleClick : () => void;
}
export default function EditButton(props: Props){
    return (
        <button
            className="
        flex items-center gap-2

        px-4 py-2
        rounded-xl

        bg-base-200
        hover:bg-[#96a55a]

        text-base-content/70
        hover:text-white

        border border-base-content/10
        hover:border-[#96a55a]

        text-sm font-semibold

        transition-all duration-200

        hover:scale-105
        active:scale-95

        shadow-sm hover:shadow-md
        hover:shadow-[#96a55a]/20
        justify-center

        flex-1
    "
            onClick={props.handleClick}
        >
            <Pencil size={16} strokeWidth={2} />
            Edit
        </button>
    )
}