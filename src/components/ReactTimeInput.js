import React, { useState } from 'react';

const ReactTimeInput = React.forwardRef((props, ref) => {
    // console.log('🚀 ~ WInputStopwatch ~ props', props)

    const [value, setValue] = useState(props.value || '')

    const onKeyDown = (event) => {
        const charCode = event.keyCode || event.which;
        if ((charCode < 48 || charCode > 57) && charCode !== 8) {
            event.preventDefault();
        }
    }

    const onChange = (event) => {
        let newValue = event.target.value

        if (newValue.length < value.length) {
            if (newValue[newValue.length - 1] === ':')
                newValue = newValue.substring(0, newValue.length - 1)
            setValue(newValue)
            return;
        }

        if (newValue.length === 3) {
            newValue = newValue.substring(0, 2) + ':' + newValue.substring(2)
        }

        if (newValue.length === 5) {
            const minutes = newValue.split(':')[1]
            if (minutes[0] > '5') {
                newValue = newValue.substring(0, 3) + '0' + newValue.substring(3)
            }
        }

        if (newValue.length === 6) {
            newValue = newValue.substring(0, 5) + ':' + newValue.substring(5)
        }

        if (newValue.length === 8) {
            const seconds = newValue.split(':')[2]
            if (seconds[0] > '5') {
                newValue = newValue.substring(0, 6) + '0' + newValue.substring(6)
                newValue = newValue.substring(0, 8)
            }
        }
        setValue(newValue)

        event.target.value = newValue
        props.onChange && props.onChange(event)
    }


    return (
        <input
            ref={ref}
            placeholder={'hh:mm:ss'}
            onFocus={(e) => e.target.select()}
            {...props}
            maxLength={8}
            onKeyDown={onKeyDown}
            value={value}
            onChange={onChange}
        />
    );
})
export default ReactTimeInput;