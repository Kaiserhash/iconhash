import React, { useRef, useEffect } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import externalCss from  "@fancyapps/ui/dist/fancybox/fancybox.css";
import {Global,css} from "frontity";

function Fancybox({children,delegate = "[data-fancybox]",options = {},...props}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        NativeFancybox.bind(container, delegate, options);

        return () => {
            NativeFancybox.unbind(container);
            NativeFancybox.close();
        };
    });

    return (
        <>
            <Global styles={css(externalCss)} />
            <div  ref={containerRef} {...props}>{children}</div>
          </>
    );
}

export default Fancybox;