import React, {useId} from 'react'   

export const Input = React.forwardRef( function Input({
    label,
    type = 'text',
    className = "",
    ...props
}, ref) {
    // useId is used to generate a unique id for the input element
    const id = useId()
    
    return (
        <div className='w-full'>
            {
                // htmlFor is used for optimization purpose, if do not use it is totally fine. 
                label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                    {label}
                </label>
            }
            {/* ref is used to access the input element in the parent component */}
            <input 
            type={type}
             className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-300 ${className}`} 
             ref={ref}
             {...props}
             id={id}  
            />
        </div>
    )
})

export default Input
// TODO
