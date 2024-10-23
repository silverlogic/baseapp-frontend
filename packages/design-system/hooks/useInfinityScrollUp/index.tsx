// import { useEffect, useRef, RefObject } from 'react'

// export interface IUseInfiniteScrollUpProps {
//   callback: () => void
//   targetRef: RefObject<Element>
//   isLoading: boolean | undefined
//   hasNextPage: boolean | undefined
// }

// const useInfiniteScrollUp = ({
//   callback,
//   targetRef,
//   isLoading,
//   hasNextPage,
// }: IUseInfiniteScrollUpProps) => {
//   const observer = useRef<IntersectionObserver | null>(null)

//   useEffect(() => {
//     if (!callback || typeof callback !== 'function') {
//       return
//     }

//     if (observer.current) {
//       observer.current.disconnect()
//     }

//     const options = {
//       root: null,
//       rootMargin: '50px',
//       threshold: 0.01,
//     }

//     observer.current = new IntersectionObserver(([entry]) => {
//       if (entry?.isIntersecting && !isLoading && hasNextPage) {
//         callback()
//       }
//     }, options)

//     if (targetRef.current) {
//       observer.current.observe(targetRef.current)
//     }

//     return () => {
//       if (observer.current) {
//         observer.current.disconnect()
//       }
//     }
//   }, [callback, targetRef, isLoading, hasNextPage])
// }

// export default useInfiniteScrollUp
