import { AccountCircle, AddBox, GridView, Logout } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

export const Sidebar = () => {
  const { logoutUser } = useAuth();
  const { loggedInUser } = useUser();
  const getStyles = ({ isActive }) => ({
    backgroundColor: isActive ? "rgb(55, 125, 255)" : "",
    color: isActive ? "white" : "",
  });
  return (
    <>
      <div className="bg-white w-[15%] min-h-screen fixed flex flex-col gap-7 px-[20px] pt-[50px] text-primary-dark xl:text-[14px] lg:px-2 lg:text-[16px] md:flex-row md:justify-evenly md:w-full md:min-h-0 md:bottom-0 md:z-30 md:pt-2.5 md:py-1 md:pb-3.5 md:text-center md:text-sm md:shadow-md">
        <div className="flex items-center md:hidden">
          {loggedInUser?.profilePicture ? (
            <img
              src={loggedInUser?.profilePicture}
              alt="profile"
              className="w-[50px] rounded-full md:w-[40px]"
            />
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWo3luud5KPZknLR5zdUUwzvYBztWgTxrkbA&usqp=CAU"
              alt="profile"
              className="w-[50px] rounded-full md:w-[40px]"
            />
          )}
          <span className="ml-[10px]">
            <strong>{loggedInUser?.name ? loggedInUser.name : "-----"}</strong>
          </span>
        </div>
        <NavLink
          style={getStyles}
          to="/"
          className="py-[10px] pl-[8px] flex items-center gap-1 rounded-lg md:flex-col md:px-5 md:py-2 md:text-xs xs:px-2 hover:bg-primary-color hover:text-white"
        >
          <GridView sx={{ fontSize: "20px" }} /> <span>Dashboard</span>
        </NavLink>
        <NavLink
          style={getStyles}
          to="/syllabus"
          className="py-[10px] pl-[8px] flex items-center gap-1 rounded-lg md:flex-col md:px-5 md:py-2 md:text-xs xs:px-2 hover:bg-primary-color hover:text-white"
        >
          <AddBox sx={{ fontSize: "20px" }} /> <span>Syllabus</span>
        </NavLink>
        <NavLink
          style={getStyles}
          to="/account"
          className="py-[10px] pl-[8px] flex items-center gap-1 rounded-lg md:flex-col md:px-5 md:py-2 md:text-xs xs:px-2 hover:bg-primary-color hover:text-white"
        >
          <AccountCircle sx={{ fontSize: "20px" }} /> <span>Account</span>
        </NavLink>
        <p
          onClick={() => logoutUser()}
          className="cursor-pointer py-[10px] pl-[8px] flex items-center gap-1 rounded-lg md:flex-col md:px-5 md:py-2 md:text-xs xs:px-2 hover:bg-primary-color hover:text-white"
        >
          <Logout sx={{ fontSize: "20px" }} /> <span>Log Out</span>
        </p>
      </div>
    </>
  );
};
