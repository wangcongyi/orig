import React, { memo, useState, Suspense, lazy, useEffect, useCallback } from 'react'

import { Menu, SideMenu } from './constant/menu'

const Manage = () => {
  const [navIndex, setNavIndex] = useState(0)
  const [sideIndex, setSideIndex] = useState(0)
  const [page, setPage] = useState('Default')
  const [orgImg, setOrgImg] = useState('')
  const [orgName, setOrgName] = useState('')
  const [menu, setMenu] = useState([])
  const [asideMenu, setAsideMenu] = useState([])

  const Component = useCallback(
    lazy(() => import(`./Pages/${page}`)),
    [page]
  )

  const updateOrgBase = ({ name, faceUrl }) => {
    setOrgName(name)
    setOrgImg(faceUrl)
  }

  const changePage = auth => {
    setNavIndex(auth)
    setSideIndex(0)
    const page = asideMenu.filter(item => item.f === auth)[0]?.components || 'Default'
    setPage(page)
  }

  useEffect(() => {
    if (auth?.length) {
      const asideMenu = SideMenu.filter(item => auth.includes(item.auth))
      const menu = Menu.filter(item => auth.includes(item.auth))
      if (asideMenu.length && menu.length) {
        const firstMenuAuth = menu[0].auth
        setAsideMenu(asideMenu)
        setMenu(menu)

        // 默认打开firstMenuAuth对应的asideMenu中的第一个
        // setPage(asideMenu[0].components)
        setPage(asideMenu.filter(item => item.f === firstMenuAuth)[0]?.components || 'Default')
        setNavIndex(firstMenuAuth)
      }
    }
  }, [auth])

  return (
    <section className="fs-manage-organization">
      <nav>
        <img src={orgImg} alt="" />
        <h4>{orgName}</h4>
        {menu.map(item => (
          <span
            key={item.auth}
            className={navIndex === item.auth ? 'active' : null}
            onClick={() => changePage(item.auth)}
          >
            {item.name}
          </span>
        ))}
      </nav>
      <div className="fs-manage-organization-wrap">
        <ul>
          {asideMenu
            .filter(item => item.f === navIndex)
            .map((item, index) => (
              <li
                key={index}
                className={sideIndex === index ? 'active' : null}
                onClick={() => {
                  setPage(item.components)
                  setSideIndex(index)
                }}
              >
                {item.name}
              </li>
            ))}
        </ul>
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      </div>
    </section>
  )
}

export default memo(Manage)
