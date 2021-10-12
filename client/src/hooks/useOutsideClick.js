// hook created by to Kevin FeliSilda
// https://medium.com/@kevinfelisilda/click-outside-element-event-using-react-hooks-2c540814b661
// This hook helps to define processing when we click away from (outside of) an element
import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;