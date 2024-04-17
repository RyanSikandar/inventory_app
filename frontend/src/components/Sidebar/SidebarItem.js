import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const activeSublink = ({ isActive }) => (
    isActive ? 'active' : 'link'
)

const activeLink = ({ isActive }) => (
    isActive ? 'active' : 'link'


)
const SidebarItem = ({ items, isOpen }) => {

    const [expandMenu, setExpandMenu] = React.useState(false)
    if (items.children) {
        return (

            <div className={expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent "}>
                <div className='sidebar-title'>
                    <span>
                        {items.icon &&
                            <div className='icon'>
                                {items.icon}
                            </div>}
                        {
                            isOpen && items.title
                        }
                    </span>
                    <MdKeyboardArrowRight onClick={() => setExpandMenu(!expandMenu)} className='arrow-icon' />

                </div>
                <div className='sidebar-content'>
                    {items.children.map((child, index) => {
                        return (
                            <div className='s-child' key={index}>
                                <NavLink to={child.path} className={activeSublink}>
                                    <div className='sidebar-item'>
                                        <div className='sidebar-title'>
                                            {child.icon && <div className='icon'>{child.icon}</div>}
                                            {isOpen && child.title}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })}

                </div>

            </div>
        )
    }
    else {
        return (
            <NavLink to={items.path} className={activeLink}>
                <div className='sidebar-item s-parent'>
                    <div className='sidebar-title'>
                        <span>
                        {items.icon && <div className='icon'>{items.icon}</div>}
                        {isOpen && items.title}
                        </span>
                        
                    </div>
                </div>
            </NavLink>
        )
    }
}

export default SidebarItem