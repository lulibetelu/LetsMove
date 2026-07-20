import type {CustomInputProps} from "../../types/CustomInputTypes.ts";

export default function CustomInput({ label, input} : CustomInputProps) {
    return (
        <div className="form-control">
            <label className="text-xs font-semibold tracking-widest uppercase text-[#8A9A5B]">
                {label}
            </label>
            <input
                type= {input.type}
                placeholder= {input.placeHolder}
                className="input input-bordered bg-white/5"
                value={input.value}
                onChange={input.onChange}
                readOnly={input.readOnly}
            />
        </div>
    );
}