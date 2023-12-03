import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { UserModal } from "../components/UserModal";

export const Account = () => {
  const { loggedInUser } = useUser();
  const { userState } = useAuth();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <UserModal
          loggedInUser={loggedInUser}
          user={userState.user}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <div style={{ filter: showModal ? "blur(8px)" : "" }}>
        <Sidebar />
        <div className="relative left-[20%] w-[80%] pt-[40px] rounded-xl lg:left-[30%] lg:w-[65%] md:left-0 md:w-full md">
          <div className="flex flex-col gap-4 w-[300px] md:text-xs md:mx-auto">
            <h1 className="font-bold text-[30px] md:text-center text-primary-color underline">
              Profile
            </h1>
            {loggedInUser?.profilePicture ? (
              <img
                src={loggedInUser?.profilePicture}
                alt="profile"
                className="w-[150px] rounded-full md:w-[100px]"
              />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWo3luud5KPZknLR5zdUUwzvYBztWgTxrkbA&usqp=CAU"
                alt="profile"
                className="w-[150px] rounded-full"
              />
            )}
            <p>
              <strong>Name: </strong>{" "}
              {loggedInUser?.name ? loggedInUser?.name : "-"}
            </p>
            <p>
              <strong>Email: </strong>
              {loggedInUser?.email ? loggedInUser.email : userState.user.email}
            </p>
            <p>
              <strong>Username: </strong>{" "}
              {loggedInUser?.username ? loggedInUser?.username : "-"}
            </p>
            <p>
              <strong>Contact Number: </strong>{" "}
              {loggedInUser?.contact ? loggedInUser?.contact : "-"}
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="bg-primary-color text-white py-[10px] rounded hover:bg-primary-dark"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
