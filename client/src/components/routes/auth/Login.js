import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Fade,
} from "reactstrap";
import useAuth from "../../../context/authContext/useAuth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { MainButton } from "../../../components.styled/styledComponents.js";

//isratest@gmail.com
export default function Login({ modalLogin, toggleLogin, closeMenu }) {
  const { logIn, authToggle, setAuthToggle, loginError, resetError } =
    useAuth();
  const [requiredToggle, setRequiredToggle] = useState(false);

  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });

  function changeHandler(e) {
    const element = e.target.name;
    const value = e.target.value;
    setLogInForm((prevState) => {
      return { ...prevState, [element]: value };
    });
  }

  const [passToggle, setPassToggle] = useState({
    showPassword: "",
  });

  function show_hidePassword(e) {
    setPassToggle({
      ...passToggle,
      showPassword: e === passToggle.showPassword ? "" : e,
    });
  }
  useEffect(() => {
    if (authToggle.login) {
      closeMenu();
      toggleLogin();
      setAuthToggle({ signUp: false, login: false });
    }
  }, [authToggle.login]);

  useEffect(() => {
    setRequiredToggle(false);
    resetError();
  }, [modalLogin]);

  useEffect(() => {
    loginError ? setRequiredToggle(true) : setRequiredToggle(false);
  }, [loginError]);

  function submit(e) {
    e.preventDefault();
    //loginError ? setRequiredToggle(true) : setRequiredToggle(false)
    logIn(logInForm);
    resetError();
  }

  return (
    <Modal isOpen={modalLogin}>
      <ModalHeader>
        Login
        <IoCloseOutline
          className="fs-3 position-absolute end-0 me-2"
          onClick={toggleLogin}
          role="button"
        />
      </ModalHeader>
      <ModalBody className=" rounded-bottom secondary">
        <Form onSubmit={(e) => submit(e)}>
          <div onChange={(e) => changeHandler(e)}>
            <FormGroup>
              <Input name="email" placeholder="E-mail" type="email" required />
            </FormGroup>
            <FormGroup className="position-relative">
              <Input
                name="password"
                placeholder="Password"
                type={
                  passToggle.showPassword === "password" ? "text" : "password"
                }
                required
                minLength={6}
                autoComplete=""
              />
              {passToggle.showPassword === "password" ? (
                <AiOutlineEyeInvisible
                  className="position-absolute top-50 end-0 translate-middle"
                  onClick={() => show_hidePassword("password")}
                />
              ) : (
                <AiOutlineEye
                  className="position-absolute top-50 end-0 translate-middle"
                  onClick={() => show_hidePassword("password")}
                />
              )}
            </FormGroup>
            {requiredToggle && (
              <Fade className="my-2 mx-1 darkText">
                Your 
                <span className="danger mx-1">
                  <b>Password</b>
                </span> or <span className="danger mx-1">
                  <b>E-mail</b>
                </span> are not correct!
              </Fade>
            )}
          </div>
          <ModalFooter>
            <MainButton type="submit">Login</MainButton>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
}
