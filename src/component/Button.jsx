import React from 'react'
import PropTypes from 'prop-types'

const Button = ({content, disabled, onClick}) => {
    return (
        <button className="btn" onClick={onClick} disabled={disabled}>
            {content}
        </button>
    )
}

Button.propTypes = {
    content: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default Button
