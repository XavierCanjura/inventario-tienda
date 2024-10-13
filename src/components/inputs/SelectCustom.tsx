import { SelectProps } from "../../interfaces"

export const SelectCustom = (
    {
        label,
        optionsList,
        placeholder,
        onChange,
        value,
        parentClass,
        inputClass,
    } : SelectProps
) => {
    return (
        <div className={`w-full min-h-max my-1 ${ parentClass }`}>
            {
                label !== undefined && (
                    <p className="font-bold">{ label }</p>
                )
            }
            <select
                className={`w-full min-h-[50px] h-auto pl-3 border rounded-[20px] outline-none bg-white border-black/20 cursor-pointer ${ inputClass }`}
                onChange={ onChange }
                value={ value }
            >
                <option value="" disabled>{ placeholder }</option>
                {
                    optionsList.map( option => (
                        <option 
                            key={ option .value }
                            value={ option.value }
                        >{ option.label }</option>
                    ))
                }
            </select>
        </div>
    )
}
