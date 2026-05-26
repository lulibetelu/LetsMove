
interface Props {
    dataList: string[],
    error: Error | null,
    isPending: boolean,
    value: string,
    handleChange: (sport: string) => void

}

export default function Dropdown({dataList, error, isPending, value, handleChange}: Props) {

    return (
        <div className="w-full">

            <select
                value={value || ''}
                onChange={(e) => handleChange((e.target.value))}
                className={`
          w-full px-4 py-3 rounded-lg
          bg-white/5 border border-white/10
          text-white placeholder-white/40
          transition-all duration-200
          font-medium text-sm
          outline-none
          focus:border-[#8A9A5B]/50 focus:bg-white/[0.08]
          focus:ring-1 focus:ring-[#8A9A5B]/30
          hover:border-white/20
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/10
          appearance-none
          bg-no-repeat bg-right
          pr-10
        `}>
                <option value="">
                    Choose sport
                </option>
                {dataList.map((option) => (
                    <option key={dataList.indexOf(option)} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            {isPending && (
                <div id="status-message" className="status-message loading">
                    <div className="spinner"></div>
                    Loading options...
                </div>
            )}

            {error && (
                <p className="text-xs text-red-400/80 mt-2 font-medium">{error.message}</p>
            )}

            {!isPending && dataList.length === 0 && (
                <div className="status-message empty">
                    No options available
                </div>
            )}
        </div>
);
}