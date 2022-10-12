import { useEffect } from 'react';
import Scroll from 'react-scroll';

import { debounce } from 'lodash';

export default function useScrollMemo(key) {

    const handleScroll = debounce(() => {
      sessionStorage.setItem(key, `${window.scrollY}`);
    }, 300);
  
    const scrollToMemo = () => {
      const memoScroll = sessionStorage.getItem(key);
      if (!memoScroll) return;
  
      const scroll = Scroll.animateScroll;
  
      scroll.scrollTo(+memoScroll);
    };
  
    /** 스크롤 위치 기억 */
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [handleScroll]);
  
    /* 스크롤 위치로 스크롤
    useEffect(() => {
      scrollToMemo();
    }, []);
     */
  }