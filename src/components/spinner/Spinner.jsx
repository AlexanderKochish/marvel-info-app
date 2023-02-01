import React from 'react'
import './spinner.scss'

const Spinner = () => {
  return (
    <div className='spinner'>   
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{'margin': 'auto', 'background': 'rgb(255, 255, 255)', 'display': 'block', 'shapeRendering': 'auto'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#27a386" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
            </circle>
            <circle cx="50" cy="50" r="23" strokeWidth="8" stroke="#b237a9" strokeDasharray="36.12831551628262 36.12831551628262" strokeDashoffset="36.12831551628262" fill="none" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
            </circle>
        </svg>
    </div>
  )
}

export default Spinner