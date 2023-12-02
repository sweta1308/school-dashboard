import { useState } from "react";
import { useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";
import { TextField } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export const Signup = () => {
  const { signUpUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [userSignup, setUserSignup] = useState({
    email: "",
    password: "",
    confirmPswd: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserSignup({ ...userSignup, [name]: value });
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userSignup.email)) {
      toast.error("Invalid email");
    } else if (userSignup.password !== userSignup.confirmPswd) {
      toast.error("Passwords donot match");
    } else {
      signUpUser(userSignup.email, userSignup.password);
    }
  };

  return (
    <>
      <div className="border w-[300px] px-[40px] m-auto mt-[100px] py-[50px]">
        <h2 className="text-center font-bold text-[24px] mb-[20px]">
          Hello there!
        </h2>
        <form className="flex flex-col justify-center items-center gap-5">
          <TextField
            name="email"
            label="Email"
            variant="standard"
            className="border-2 border-white"
            type="text"
            required
            size="small"
            value={userSignup.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            variant="standard"
            className="border-2 border-white"
            type="password"
            required
            size="small"
            value={userSignup.password}
            onChange={handleChange}
          />
          <TextField
            name="confirmPswd"
            label="Confirm Password"
            variant="standard"
            className="border-2 border-white"
            type="password"
            size="small"
            required
            value={userSignup.confirmPswd}
            onChange={handleChange}
          />

          <button
            onClick={signUpHandler}
            disabled={isAuthLoading}
            className="cursor-pointer bg-primary-color text-white w-full py-[5px] mt-[8px] rounded hover:bg-primary-dark"
          >
            {isAuthLoading && (
              <span className="mr-[10px] mt-[10px]">
                <ClipLoader color={`#fff`} size={20} />
              </span>
            )}
            Sign Up
          </button>
        </form>
        <p className="text-[12px] mt-[8px] text-center">
          Already have an account?{" "}
          <span
            className="text-primary-color hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </>
  );
};
