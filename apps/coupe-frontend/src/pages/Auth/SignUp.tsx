import {
  LoginProps,
  Role,
  UserStateProps,
} from "../../store/interfaces/user.interface";
import { LoginSchema } from "../../utils/Yup";
import { Alert } from "flowbite-react";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { useLoginMutation } from "../../store/slices/appSlice";
import ButtonSpinner from "../../components/ButtonSpinner";
import ConditionalRoute from "../../routes/ConditionalRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { loadUser } from "../../store/slices/authSlice";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const dispatch = useDispatch<any>();
  // const { data: loadUserData } = useLoadUserQuery();
  const authSlice = useSelector<RootState, UserStateProps>(
    (state) => state.auth.user
  );
  const [login, { error: loginError, isError: loginIsError }]: any =
    useLoginMutation();

  const handleLogin = useCallback(
    async (props: LoginProps) => {
      try {
        setIsLoginLoading(true);
        const response = await login(props);
        if (response?.data?.access_token) {
          localStorage.setItem("token", response.data.access_token);
          dispatch(loadUser());
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoginLoading(false);
    },
    [dispatch, login]
  );

  return (
    <ConditionalRoute
      redirectTo="/admin-dashboard"
      condition={
        authSlice && authSlice?.auth?.role === Role.Admin ? false : true
      }
    >
      <ConditionalRoute
        redirectTo="/lecturer-dashboard"
        condition={
          authSlice && authSlice?.auth?.role === Role.Lecturer ? false : true
        }
      >
        <ConditionalRoute
          redirectTo="/student-dashboard"
          condition={
            authSlice && authSlice?.auth?.role === Role.Student ? false : true
          }
        >
          <div className="justify-center items-center h-screen w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full items-center">
              <div className="hidden md:flex p-8 justify-center ">
                <img
                  src="/assets/images/signup_illustration.svg"
                  alt="login illustration"
                  className="h-[35rem]  "
                ></img>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex flex-col rounded-2xl shadow-xl justify-center w-full lg:w-[72%] gap-8 p-8">
                  <div className="flex w-full justify-between items-center">
                    <p className=" text-[2rem] font-bold">Sign Up</p>
                    <Link to={"/home"}>
                      <img
                        className="flex w-[3.5rem] h-[3.5rem]"
                        src="/assets/images/coupe-logo.svg"
                        alt="Coupe Logo"
                      />
                    </Link>
                  </div>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                      handleLogin(values);
                    }}
                  >
                    {({ errors, values, setFieldValue }) => (
                      <Form>
                        <div className="flex flex-col gap-5">
                          {loginIsError && (
                            <Alert color="failure" className="py-3">
                              <span className="font-medium">
                                {loginError && loginError?.data?.error?.message}
                              </span>
                            </Alert>
                          )}
                          <div className="flex flex-col gap-2">
                            <p className="text-[#52525C] text-lg">Email</p>
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
                            <p className="text-[#52525C] text-lg">Password</p>
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

                          <div className="flex flex-col gap-2">
                            <p className="text-[#52525C] text-lg">
                              Confirm Password
                            </p>
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

                          <button
                            className={`${
                              isLoginLoading
                                ? "bg-white"
                                : "bg-custom-primary-1"
                            }  ${
                              isLoginLoading
                                ? "border-custom-primary-1"
                                : "border-white"
                            }  font-bold rounded-[0.3125rem] shadow-md text-white w-full h-[2.5rem] justify-center items-center hover:bg-white hover:border hover:border-custom-primary-1 hover:text-custom-primary-1`}
                            type="submit"
                            disabled={isLoginLoading}
                          >
                            {isLoginLoading ? <ButtonSpinner /> : "Sign up"}
                          </button>
                          <Link to={"/login"}>
                            <p className="font-medium flex text-center w-full hover:text-custom-primary-1 cursor-pointer hover:underline">
                              Already have an account? Login
                            </p>
                          </Link>
                          <p className="font-medium flex text-center w-full justify-center">
                            Or
                          </p>
                          <button className="flex items-center bg-white border border-gray-300 shadow-md justify-center gap-4 rounded-lg px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ">
                            <FcGoogle size={20} />
                            <span>Continue with Google</span>
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </ConditionalRoute>
      </ConditionalRoute>
    </ConditionalRoute>
  );
};

export default SignUp;
