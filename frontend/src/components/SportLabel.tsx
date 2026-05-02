import {useState} from "react";

interface Props{
    sportName: string
    onChange?: (sport: string, level: string) => void;
}

const levels = [
    {
        label: "",
        style: {
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.5)",
        }
    },
    {
        label: "beginner",
        style: {
            background: "#8A9A5B",
            border: "1px solid #8A9A5B",
            color: "#fff",
        }
    },
    {
        label: "intermediate",
        style: {
            background: "#B8962E",
            border: "1px solid #B8962E",
            color: "#fff",
        }
    },
    {
        label: "expert",
        style: {
            background: "#A0522D",
            border: "1px solid #A0522D",
            color: "#fff",
        }
    }
];

export default function SportLabel(props: Props){
    const [index, setIndex] = useState(0);
    const handleClick = () => {
        const next = index === 3 ? 0 : index + 1;
        setIndex(next);
        props.onChange?.(props.sportName, levels[next].label);
    }
    const current = levels[index];

    return (
        <button
            onClick={handleClick}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-[0.96]"
            style={current.style}
        >
            {props.sportName}
            {current.label && (
                <span className="ml-2 text-xs font-light opacity-80">
                    {current.label}
                </span>
            )}
        </button>

    )
}