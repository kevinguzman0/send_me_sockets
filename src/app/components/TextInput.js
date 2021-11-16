import React from 'react';
import { useField } from "formik"

const TextInput = ({ ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div>
            <input {...field} {...props}/>
            {/* {meta.touched && meta.error ? <div>{meta.error}</div> : null} */}
        </div>
    )

}

export default TextInput