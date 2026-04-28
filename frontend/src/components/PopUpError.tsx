import {TriangleAlert} from "lucide-react";

interface Props{
    message: string
}

export default function PopUpError({ message }: Props) {
    return (
        <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
            <TriangleAlert size={16} />
            <span>{message}</span>
        </div>
    );
}