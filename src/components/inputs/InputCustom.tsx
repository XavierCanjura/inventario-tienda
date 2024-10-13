import { InputProps } from "../../interfaces"

export const InputCustom = (
    { 
        disabled = false,
        label, 
        placeholder, 
        inputClass, 
        parentClass, 
        type = 'text', 
        value, 
        onChange 
    }: InputProps
) => {
    
    return (
        <div className={`w-full min-h-max md:w-[250px] my-1 ${ parentClass }`}>
            {
                label !== undefined && (
                    <p className="font-bold">{ label }</p>
                )
            }
            <input 
                disabled = { disabled }
                type={ type } 
                placeholder={ placeholder }
                className={`w-full min-h-[50px] h-auto border rounded-[20px] px-3 outline-none border-black/20 ${ inputClass }`} 
                value={ value }
                onChange={ (event) => onChange?.(event) }
            />
        </div>
    )
}
