import React from "react";
import { 
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarMenu,
    CDBSidebarMenuItem
} from 'cdbreact';

function Sidebar(props) {    
    
    function handleClick(e) {
        props.onTagClick(e.target.innerHTML);
    }
    function handleWidthChange(e) {
        props.onWidthChange(e);
    }

    return (
        <div className="sidebarClass" style={{ float:"left", display: 'inline', height: '100vh', overflow: 'scroll initial', width: '0%' }} >            

            <CDBSidebar textColor="#000" backgroundColor="#fff">
                <CDBSidebarHeader prefix={<i onClick={handleWidthChange} className="fa fa-bars fa-large"></i>}>
                
                    <a
                        href="/"
                        className="text-decoration-none"
                        style={{ color: 'inherit' }}
                        
                    >
                        Dashboard
                    </a>
                    
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <CDBSidebarMenuItem onClick={handleClick} icon="columns">Home</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem onClick={handleClick} icon="columns">Datasets List</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem onClick={handleClick} icon="columns">Upload Dataset</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem onClick={handleClick} icon="columns">Trained Models List</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem onClick={handleClick} icon="columns">Train Model</CDBSidebarMenuItem>
                        

                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        style={{
                        padding: '20px 5px',
                        }}
                    >
                        Sidebar Footer
                    </div>
                    </CDBSidebarFooter>
            </CDBSidebar>

        </div>
    )
};  

export default Sidebar;