import React, { useEffect } from "react";

const useOutSideClick = (elementRefs: any, cb: () => void) => {
  useEffect(() => {
    function checkOutSideClick(e: any) {
      let isOutSide = true;
      elementRefs?.forEach((ref: any) => {
        if (ref.current && ref.current.contains(e.target)) {
          isOutSide = false;
        }
      });

      if (isOutSide) cb();
    }

    document.addEventListener("click", checkOutSideClick);

    return () => {
      document.removeEventListener("click", checkOutSideClick);
    };
  }, []);
};

export default useOutSideClick;
