export default function CheckboxField({ label, name, onChange, value }) {
    return (
        <div className="relative flex items-center mt-3">
            <div className="flex items-center h-5">
                <input
                    id={name}
                    aria-describedby="comments-description"
                    name={name}
                    type="checkbox"
                    className={` h-5 w-5 focus:ring-0 rounded-md border-0 ${value? ' bg-primary':'bg-mischka'}`}
                    onChange={onChange}
                    checked={value}
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor={name} className={`font-medium text-sm ${value? ' text-mineShaft font-semibold':'text-regentGray'}`}>
                    {label}
                </label>

            </div>
        </div>

    )
}
