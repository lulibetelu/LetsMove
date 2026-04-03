import type {CustomInputProps} from "../types/userTypes.ts";

export default function CustomInput({ label, input} : CustomInputProps) {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type= {input.type}
                placeholder= {input.placeHolder}
                className="input input-bordered"
                value={input.value}
                onChange={input.onChange}
            />
        </div>
    );
}