import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { WavingHand } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser, userState } = useAuth();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    loginUser(userLogin.email, userLogin.password);
  };

  return (
    <>
      <div className="border w-[300px] px-[40px] m-auto mt-[100px] py-[50px]">
        <h2 className="text-center font-bold text-[24px] mb-[20px]">
          Welcome Back! <WavingHand sx={{ color: "rgb(55, 125, 255)" }} />
        </h2>
        <form className="flex flex-col justify-center items-center gap-5">
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="standard"
            className="border-2 border-white"
            type="text"
            required
            value={userLogin.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            variant="standard"
            className="border-2 border-white"
            type="password"
            required
            value={userLogin.password}
            onChange={handleChange}
          />

          <button
            onClick={loginHandler}
            disabled={userState.isAuthLoading}
            className="cursor-pointer bg-primary-color text-white w-full py-[5px] mt-[8px] rounded hover:bg-primary-dark"
          >
            {userState.isAuthLoading && (
              <span className="mr-[10px] mt-[10px]">
                <ClipLoader color={`#fff`} size={20} />
              </span>
            )}
            Login
          </button>
        </form>
        <p className="text-[12px] mt-[8px] text-center">
          Don't have an account?{" "}
          <span
            className="text-primary-color hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </>
  );
};
