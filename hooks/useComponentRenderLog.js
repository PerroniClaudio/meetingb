import React from "react";

export const useComponentRenderLog = (name = '') => {
    const renderCount = React.useRef(0);

    console.log(name, renderCount.current)
    renderCount.current++

    return renderCount.current
}