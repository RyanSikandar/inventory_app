import React, { useState } from 'react'
import './Sidebar.scss'
import { HiMenuAlt3 } from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";
import menu from "../../Data/Sidebar";
import  SidebarItem  from '../Sidebar/SidebarItem';
const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true)
    //Toggle Sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className='layout'>
            <div className='sidebar' style={{
                width: isOpen ? "230px" : "60px"
            }}>
                <div className='top_section'>
                    <div className='logo' style={{
                        display: isOpen ? "block" : "none"
                    }}>
                        <RiProductHuntLine size={35} style={{ cursor: "pointer" }} />

                    </div>
                    <div className='bars' style={{
                        marginLeft: isOpen ? "100px" : "0px"
                    }}>
                        <HiMenuAlt3 onClick={toggleSidebar} />
                    </div>

                </div>
                {menu.map((item, index) => {
                    return (
                       <SidebarItem key={index} items={item} />
                    )
                })}
            </div>
            <main style={{
                paddingLeft: isOpen ? "230px" : "60px", transition:"all 0.5s"
            }}>
                {children}
            </main>
        </div>
    )
}

export default Sidebar