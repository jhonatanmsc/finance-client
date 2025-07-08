import { useSelector, useDispatch } from 'react-redux';

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { AppSidebarNav } from './AppSidebarNav';

import { logo } from '@/assets/brand/logo';
import { sygnet } from '@/assets/brand/sygnet';

// sidebar nav config
import navigation from '../_nav';
import {RootState} from "@/store";
import {Link} from "react-router-dom";
import {memo} from "react";
import {cibCashapp} from "@coreui/icons";

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state: RootState) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state: RootState) => state.sidebarShow)
  // cib-cashapp
  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/" className="text-decoration-none">
            {/*<CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />*/}
            <div className="d-flex">
              <CIcon icon={cibCashapp} className="text-warning" size="xxl"/> <h3 className="ms-2 text-warning sidebar-brand-full">Finapp</h3>
            </div>
            {/*<CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />*/}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default memo(AppSidebar)
