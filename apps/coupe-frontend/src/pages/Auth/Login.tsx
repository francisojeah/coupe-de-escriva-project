import {
  LoginProps,
  Role,
  UserStateProps,
} from "../../store/interfaces/user.interface";
import { LoginSchema } from "../../utils/Yup";
import { Alert, Checkbox, Label } from "flowbite-react";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import ButtonSpinner from "../../components/ButtonSpinner";
import ConditionalRoute from "../../routes/ConditionalRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  login,
  loginWithGoogle,
  resetRegErrMsg,
  resetRegistered,
  resetUser,
} from "../../store/slices/userSlice";
import { FcGoogle } from "react-icons/fc";
import UserRegisterSuccessModal from "../../components/UserRegisterSuccessModal";
import MetaTags from "../../components/MetaTags";
import {
  useGoogleLogin,
} from "@react-oauth/google";

const Login = () => {
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<any>();

  const userSlice = useSelector<RootState, UserStateProps>(
    (state) => state.user
  );

  const onLogin = useCallback((props: LoginProps) => {
    return dispatch(login(props));
  }, []);

  const onLoginWithGoogle = useCallback((props: any) => {
    return dispatch(loginWithGoogle(props));
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      onLoginWithGoogle({
        accessToken: codeResponse.access_token,
      });
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleClose = useCallback(() => {
    setOpenSignupModal(false);
    dispatch(resetUser());
  }, []);

  useEffect(() => {
    dispatch(resetRegistered());
  }, []);

  useEffect(() => {
    if (userSlice.errMsg && userSlice.errMsg.Id === "LOGIN_ERROR") {
      setTimeout(() => {
        dispatch(resetRegErrMsg());
      }, 5000);
    }

    if (userSlice.user && !userSlice.user?.isVerified) {
      setOpenSignupModal(true);
      setTimeout(() => {
        dispatch(resetUser());
      }, 10000);
    }
  }, [userSlice.user, userSlice.user]);

  return (
    <ConditionalRoute
      redirectTo="/home"
      condition={
        userSlice.user &&
        userSlice.user.isVerified &&
        userSlice.isAuthenticated &&
        (userSlice.user.roles.includes(Role.User) ||
          userSlice.user.roles.includes(Role.Admin))
          ? false
          : true
      }
    >
      <>
        <MetaTags
          title={"Login | Coupe de Escriva"}
          description={"Login to Coupe de Escriva"}
          pageUrl={window.location.href}
        />
        <div className="justify-center items-center h-screen w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full items-center">
            <div className="hidden md:flex p-8 justify-center ">
              <img
                src="/assets/images/login_illustration.svg"
                alt="login illustration"
                className="h-[35rem]"
              ></img>
            </div>
            <div className="flex w-full  justify-center">
              <div className="flex flex-col justify-center w-full lg:w-[72%] gap-8 p-8">
                <div className="flex w-full justify-between items-center">
                  <p className=" text-[2rem] font-bold">Login</p>
                  <Link to={"/home"}>
                    <img
                      className="flex w-[3rem] h-[3rem]"
                      src="/assets/images/coupe-logo.svg"
                      alt="Coupe Logo"
                    />
                  </Link>
                </div>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    loginAlways: false,
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={(values) => {
                    onLogin(values);
                  }}
                >
                  {({ errors, values, setFieldValue }) => (
                    <Form>
                      <div className="flex flex-col gap-5">
                        {userSlice.errMsg &&
                          userSlice.errMsg.Id === "LOGIN_ERROR" && (
                            <Alert color="failure" className="py-3">
                              <span className="font-medium">
                                {userSlice.errMsg.msg}
                              </span>
                            </Alert>
                          )}
                        <div className="flex flex-col gap-2">
                          <p className="text-[#52525C] text-sm">Email</p>
                          <input
                            className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch gap-2 items-center"
                            type="email"
                            onChange={(e) =>
                              setFieldValue("email", e.target.value)
                            }
                            placeholder="Your email address"
                          />
                          {errors && errors.email && (
                            <p className="text-[12px] mt-1 text-custom-danger">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-[#52525C] text-sm">Password</p>
                          <div className="relative">
                            <input
                              className=" flex shadow-none px-4 py-3 bg-white rounded-lg border-2 border-[#D9D9D9] self-stretch w-full gap-2 items-center"
                              type={showPassword ? "text" : "password"}
                              value={values["password"]}
                              placeholder={
                                showPassword
                                  ? "Enter your password"
                                  : "********"
                              }
                              onChange={(e) =>
                                setFieldValue("password", e.target.value)
                              }
                            />
                            <div className="absolute inset-y-0 right-0 p-4 flex items-center">
                              <button
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={
                                  showPassword
                                    ? "Hide Password"
                                    : "Show Password"
                                }
                              >
                                {showPassword ? (
                                  <LiaEyeSlashSolid />
                                ) : (
                                  <LiaEyeSolid />
                                )}
                              </button>
                            </div>
                          </div>
                          {errors && errors.password && (
                            <p className="text-[12px] mt-1 text-custom-danger">
                              {errors.password}
                            </p>
                          )}
                        </div>
                        <div className="flex justify-between w-full">
                          <div className="flex text-sm font-medium items-center gap-2">
                            <Checkbox id="remember-me" />
                            <Label htmlFor="remember-me">Remember Me</Label>
                          </div>
                          <Link to={"/"}>
                            <p className="flex font-bold text-sm justify-end transition-all duration-200 ease-in-out hover:text-custom-primary-1">
                              Forgot Password?{" "}
                            </p>
                          </Link>
                        </div>
                        <button
                          className={`${
                            userSlice?.isLoggin
                              ? "bg-white"
                              : "bg-custom-primary-1"
                          }  ${
                            userSlice?.isLoggin
                              ? "border-custom-primary-1"
                              : "border-white"
                          }  font-bold rounded-[0.3125rem] shadow-md text-white w-full h-[2.5rem] justify-center items-center hover:bg-white hover:border hover:border-custom-primary-1 hover:text-custom-primary-1`}
                          type="submit"
                          disabled={userSlice?.isLoggin}
                        >
                          {userSlice?.isLoggin ? <ButtonSpinner /> : "Login"}
                        </button>
                        <div className="w-full flex flex-col gap-4">
                          <Link to={"/signup"}>
                            <p className="font-medium text-sm flex text-center w-full hover:text-custom-primary-1 cursor-pointer hover:underline">
                              Dont have an account? Sign up
                            </p>
                          </Link>
                          <p className="font-medium text-sm flex text-center w-full justify-center">
                            Or
                          </p>
                          <button
                            onClick={() => googleLogin()}
                            className="flex items-center bg-white border border-gray-300 shadow-md justify-center gap-4 rounded-lg px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 "
                          >
                            <FcGoogle size={20} />
                            <span>Continue with Google</span>
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        {userSlice.user && !userSlice.user.isVerified && (
          <UserRegisterSuccessModal
            openModal={openSignupModal}
            setOpenModal={handleClose}
            email={userSlice.user?.email}
          />
        )}
      </>
    </ConditionalRoute>
  );
};

export default Login;
