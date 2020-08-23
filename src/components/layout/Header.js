import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import ModalRegister from "../modal/ModalRegister";
import ModalLogin from "../modal/ModalLogin";
import { checkLogin } from "../../containers/checkLogin";

function Header({ userName }) {
  // state toggle display modal (register and login)
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);

  // state saved name of user
  const [nameUser, setNameUser] = useState("");

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <div style={{ color: "white" }}>Hồ Công Hậu | Front-end Developer</div>
        <Navbar.Brand href="" className="m-auto">
          <h3>
            <b>FINSO TEST</b>
          </h3>
        </Navbar.Brand>
        <Nav className="ml-auto">
          {checkLogin() || nameUser ? (
            <div>
              <b className="mr-2" style={{ color: "white" }}>
                Hi, {checkLogin() || nameUser}
              </b>
              <img src="avt.png" width="30" height="30" alt="logo" />
            </div>
          ) : (
            <>
              <Button
                onClick={() => setShowModalRegister(true)}
                className="mr-2"
              >
                Register
              </Button>
              <Button onClick={() => setShowModalLogin(true)}>Login</Button>
            </>
          )}
        </Nav>
      </Navbar>
      <ModalRegister
        show={showModalRegister}
        handleClose={() => setShowModalRegister(false)}
      />
      <ModalLogin
        show={showModalLogin}
        handleClose={() => setShowModalLogin(false)}
        loginSuccess={(name) => {
          setNameUser(name);
          setShowModalLogin(false);
          userName(name);
        }}
      />
    </>
  );
}

export default Header;
