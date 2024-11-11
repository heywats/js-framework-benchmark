import React from 'react'

const Button = ({ id, cb, title }) => (
    <div className="col-sm-6 smallpad">
        <button
            type="button"
            className="btn btn-primary btn-block"
            id={id}
            onClick={cb}
        >
            {title}
        </button>
    </div>
)

export default Button;