import { Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { validateUsername } from "../utils/ValidateUsername";
import toast from "react-hot-toast";

export const UserModal = ({ loggedInUser, user, showModal, setShowModal }) => {
  const { addUser, updateUser, setLoggedInUser } = useUser();
  const [userValue, setUserValue] = useState({
    name: loggedInUser?.name ? loggedInUser?.name : "",
    email: loggedInUser?.email ? loggedInUser?.email : user?.email,
    username: loggedInUser?.username ? loggedInUser?.username : "",
    profilePicture: loggedInUser?.profilePicture
      ? loggedInUser?.profilePicture
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWo3luud5KPZknLR5zdUUwzvYBztWgTxrkbA&usqp=CAU",
    contact: loggedInUser?.contact ? loggedInUser?.contact : "",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValue((userValue) => ({ ...userValue, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateUsername(userValue.username)) {
      setLoggedInUser(userValue);
      if (loggedInUser?.email) {
        updateUser(userValue);
      } else {
        addUser(userValue);
      }
    } else {
      toast.error(
        "Username should not contain special characters or end or start with a number."
      );
    }
    setShowModal(false);
  };

  return (
    <>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="bg-white z-40 p-[20px] rounded-lg">
          <h1 className="font-bold mb-[15px]">EDIT PROFILE</h1>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <label>
              <p className="cursor-pointer my-[6px] p-[7px] border border-primary-color rounded-lg text-primary-color hover:bg-primary-color hover:text-white">
                Upload From Photos
              </p>
              <input
                className="hidden"
                type="file"
                accept="/image*"
                onChange={(e) => {
                  setUserValue({
                    ...userValue,
                    profilePicture: URL.createObjectURL(e.target.files[0]),
                  });
                }}
              />
            </label>
            <TextField
              name="name"
              label="Name"
              variant="standard"
              className="border-2 border-white"
              type="text"
              required
              size="small"
              value={userValue.name}
              onChange={handleChange}
            />

            <TextField
              name="email"
              label="Email"
              variant="standard"
              className="border-2 border-white"
              type="text"
              required
              size="small"
              value={userValue.email}
              onChange={handleChange}
            />

            <TextField
              name="username"
              label="Username"
              variant="standard"
              className="border-2 border-white"
              type="text"
              required
              size="small"
              value={userValue.username}
              onChange={handleChange}
            />

            <TextField
              name="contact"
              label="Contact"
              variant="standard"
              className="border-2 border-white"
              type="number"
              required
              size="small"
              value={userValue.contact}
              onChange={handleChange}
            />
            <div className="mt-[15px]">
              <input
                className="mr-[10px] bg-primary-color text-white px-[15px] py-[5px] rounded-md border border-primary-color cursor-pointer hover:bg-primary-dark hover:border-primary-dark"
                value="Save"
                type="submit"
              />
              <button
                className="px-[15px] py-[5px] border border-primary-color rounded-md text-primary-color hover:bg-primary-color hover:text-white"
                onClick={() => setShowModal(false)}
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
