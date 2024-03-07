import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

const CustomNavbar = ({ brandText, rightLink1, rightLink2, rightLink3 }) => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">{brandText}</NavbarBrand>
      <Nav className="ml-auto" navbar>
        {rightLink1 && (
          <NavItem>
            <NavLink href={rightLink1.url}>{rightLink1.text}</NavLink>
          </NavItem>
        )}
        {rightLink2 && (
          <NavItem>
            <NavLink href={rightLink2.url}>{rightLink2.text}</NavLink>
          </NavItem>
        )}
        {rightLink3 && (
          <NavItem>
            <NavLink href={rightLink3.url}>{rightLink3.text}</NavLink>
          </NavItem>
        )}
        {/* Example with Button */}
        {/* {rightLink1 && (
          <NavItem>
            <Button color="primary" href={rightLink1.url}>{rightLink1.text}</Button>
          </NavItem>
        )} */}
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
