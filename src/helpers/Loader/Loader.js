import React from 'react'
import sty from "./Loader.module.css"
function Loader() {
  return ( 
    <div className={sty.overlay}>
        <div class={sty.spinner}></div>

    </div>
  )
}

export default Loader