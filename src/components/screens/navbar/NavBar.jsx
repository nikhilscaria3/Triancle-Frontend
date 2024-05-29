import React, { useState } from "react";
import styled from "styled-components";
import "../../../assets/css/style.css";
import { THEME_COLORS as theme } from "../../../ThemeConfig";
import { Link, useNavigate , useLocation } from "react-router-dom";

//image imports
import logo from "../../../assets/icons/logo.svg";
import dashicon from "../../../assets/icons/dashboard.svg";
import project from "../../../assets/icons/projects.svg";
import management from "../../../assets/icons/user-management.svg";
import checklist from "../../../assets/icons/check-list.svg";
import wallet from "../../../assets/icons/wallet_navbar.svg";
import settings from "../../../assets/icons/settings.svg";
import invoice from "../../../assets/icons/invoice.svg";
import banner from "../../../assets/icons/edit-banner.svg";
import hr from "../../../assets/icons/hr.svg";
import documents from "../../../assets/icons/documents.svg";
import upload from "../../../assets/icons/file upload.svg";
import schedule from "../../../assets/icons/add-chedule.svg";
import logout from "../../../assets/icons/logout.svg";
import reports from "../../../assets/icons/reports.svg";
import inventory from "../../../assets/icons/inventory.svg";
import tasks from "../../../assets/icons/assign-tasks.svg";
import materials from "../../../assets/icons/materials.svg";
import logo2 from "../../../assets/images/lyntell-secondary.png";

const navItems = [
  { icon: dashicon, label: "Dashboard", route: "/dashboard" },
  { icon: project, label: "Projects", route: "/projects" },
  { icon: management, label: "User Management", route: "/users" },
  // { icon: settings, label: "Work Settings", route: "/workSettings" },
  // { icon: checklist, label: "Checklist", route: "/checklist" },
  { icon: wallet, label: "Finance", route: "/finance" },
  // { icon: schedule, label: "Add Schedule", route: "/addSchedule" },
  { icon: invoice, label: "Invoice", route: "/invoice" },
  { icon: banner, label: "Banner", route: "/editBanner" },
  // { icon: hr, label: "HR", route: "/hr" },
  { icon: documents, label: "Documents", route: "/documents" },
  // { icon: upload, label: "File Upload", route: "/fileUpload" },
  // { icon: reports, label: "Reports", route: "/reports" },
  // { icon: tasks, label: "Assign tasks", route: "/assignTask" },
  { icon: materials, label: "Materials & Inventory", route: "/materials" },
  // { icon: inventory, label: "Inventory", route: "/inventory" },
  { icon: settings, label: "Settings", route: "/settings" },
  // { icon: logout, label: "Logout", route: "/logout" },
];

export default function NavBar({ showIconsOnly }) {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    // Find the index of the active route
    const activeIndex = navItems.findIndex((item) => item.route === location.pathname);
    setActiveNavItem(activeIndex);
  }, [location]);

  const handleLogout = () => {
    // Perform logout actions (clear authentication tokens, reset state, etc.)
    // Remove the token from local storage
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    // Redirect the user to the login page
    navigate("/login");
  };

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  return (
    <>
      <MainContainer showiconsonly={showIconsOnly}>
        <LogoContainer showiconsonly={showIconsOnly}>
          <Link>
            <Logo>
              {showIconsOnly ? (
                <Img src={logo} alt="Logo" />
              ) : (
                <Img className="alternate-logo" src={logo2} alt="anotherLogo" />
              )}
            </Logo>
          </Link>
        </LogoContainer>
        <NavContainer>
          {navItems.map((item, index) => {
            return (
              <Link to={item.route} style={{ color: theme.primary }}  key={index}>
                <NavItem
                 
                  className={activeNavItem === index ? "active" : ""}
                  onClick={() => handleNavItemClick(index)}
                  showiconsonly={showIconsOnly}
                >
                  <NavIcon src={item.icon} alt="Logo" />
                  {showIconsOnly && <NavLink>{item.label}</NavLink>}
                </NavItem>
              </Link>
            );
          })}
          <NavItem onClick={handleLogout}>
            <NavIcon src={logout} alt="Logout" />
            {showIconsOnly && <NavLink>Logout</NavLink>}
          </NavItem>
        </NavContainer>
        
        {/* <ToggleButton onClick={toggleIconsOnly}>
                    Toggle Icons Only
                </ToggleButton> */}
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid grey;
  width: ${(props) => (props.showiconsonly ? "15%" : "4%")};
  transition: all 0.3s ease-in-out;
`;

const LogoContainer = styled.div`
  padding: 12px;
  /* border-bottom: 4px solid #f1f1f1; */
`;
const Logo = styled.div``;
const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover
`;

const NavContainer = styled.div`
  overflow-y: auto;
  height: 100vh;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.showiconsonly ? "" : "start")};
  padding: 10px;
  width: 95%;
  margin: 2px 0 0 auto;
  cursor: pointer;
  border-radius: 12px 0 0 12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #f0f0f0;
  }
  &.active {
    background-color: ${theme.primary_btn};
    color: #ffff;
  }
`;

const NavIcon = styled.img`
  width: 30px;
  margin-right: 10px;

  ${NavItem}.active & {
    filter: invert(100%) brightness(150%);
  }
`;

const NavLink = styled.a`
  display: ${(props) => (props.showiconsonly ? "none" : "block")};
`;
