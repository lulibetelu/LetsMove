interface Props{
    handleClick: () => void
    content: string
}

export default function CustomButton(props: Props) {
    return (
        <button onClick={props.handleClick} className="flex items-center gap-2 px-4 py-2 ml-5 rounded-full bg-[#96a55a] hover:bg-[#a8b96a] text-black font-semibold transition-colors duration-200 cursor-pointer">
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
            </svg>
            {props.content}
        </button>
    );
}