import React from 'react'
import PropTypes from 'prop-types'

const Item = ({data, timeTransform, onClick}) => {
    return (
        <div className="item" onClick={() => onClick(data)}>
            <h3>{data.name}</h3>
            <span className="item__degree-time">
                <div>{data.degree}&#xb0;C</div>
                <div>{timeTransform(data.time)} min</div>
            </span>
            <p className="item__recipe">{data.recipe}</p>
        </div>
    )
}

Item.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func
}

export default Item
