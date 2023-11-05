import React from 'react'
import { useState,CSSProperties } from "react";
import PacmanLoader from "react-spinners/PacmanLoader"


const Contract = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#36d7b7");
    const override=CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };

  return (
    <div className=" h-screen w-full overflow-x-hidden" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "saturate(100%) blur(2px) " }}>
      <PacmanLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Contract