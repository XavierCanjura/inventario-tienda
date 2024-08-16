import { InputProps } from "../../interfaces"

export const InputCustom = ({ label, placeholder, inputClass, parentClass, type = 'text', value, onChange }: InputProps) => {
    
    return (
        <div className={`w-full min-h-max md:w-[250px] ${ parentClass }`}>
            {
                label !== undefined && (
                    <p>{ label }</p>
                )
            }
            <input 
                type={ type } 
                placeholder={ placeholder }
                className={`w-full h-[35px] border rounded-[20px] px-3 outline-none border-black/20 ${ inputClass }`} 
                value={ value }
                onChange={ (event) => onChange?.(event) }
            />
        </div>
    )
}
