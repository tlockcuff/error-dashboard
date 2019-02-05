import useragent from 'useragent'
useragent(true)

export const ua = (a) =>  useragent.parse(a);