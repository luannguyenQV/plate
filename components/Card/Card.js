import PropTypes from 'prop-types'
import React from 'react'

const Card = ({ children, style }) => {
  return (
    <div className="card custom-card" style={style}>
      {children}
      <style jsx>{`
        .custom-card {
          border-radius: 6px;
          padding: 10px;
          text-align: center;
          box-shadow: 0 6px 4px -4px black;
          width: 100%;
        }
        `}</style>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export default Card
