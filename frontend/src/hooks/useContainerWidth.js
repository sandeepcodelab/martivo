import { useEffect, useState } from "react";

export function useContainerWidth(ref) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return width;
}

// import { useLayoutEffect, useState } from "react";

// export function useContainerWidth(ref) {
//   const [width, setWidth] = useState(0);

//   useLayoutEffect(() => {
//     if (!ref.current) return;

//     const element = ref.current;

//     // Set initial width immediately
//     setWidth(element.getBoundingClientRect().width);

//     const observer = new ResizeObserver(([entry]) => {
//       setWidth(entry.contentRect.width);
//     });

//     observer.observe(element);

//     return () => observer.disconnect();
//   }, []);

//   return width;
// }
