import { usePathname } from "next/navigation"


export  function useCheckActiveNav() {
  const  pathname  = usePathname()

  const checkActiveNav = (nav: string) => {
    const pathArray = pathname.split('/').filter((item) => item !== '')

    if (nav === '/' && pathArray.length < 1) return true

    return pathArray.includes(nav.replace(/^\//, ''))
  }

  return { checkActiveNav }
}
