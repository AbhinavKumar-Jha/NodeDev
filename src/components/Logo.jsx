import React from "react";

function Logo({width = "50px", height = "50px"}){
    return <div>
        <img src="/blogging.png" 
        alt="new logo"
        style={{width: width, height: height}}
        />
        </div>;
}

export default Logo;