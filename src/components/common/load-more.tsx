import { useEffect } from 'react';
import useObserver from '@/hooks/use-observer';

function LoadMore({ fn = () => { } }) {
  const [observerRef, isVisible] = useObserver()

  useEffect(() => {
    if (isVisible) {
      fn?.()
    }
  }, [isVisible])

  return <button ref={observerRef} className="opacity-0" aria-hidden="true">Load More</button>
}

export default LoadMore