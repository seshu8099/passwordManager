import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { usePasswordContext } from "../Context/PasswordContext";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import moment from "moment";
import { checkPasswordStrength } from "../utils/passwordStrength";
import { checkPwnedPassword } from "../utils/pwnedCheck";

const Passworditem = ({ value }) => {
  //  state for toggle view password

  const [viewpwd, setviewpwd] = useState(false);
  // state for handling update password data

  const [updatepwd, setupdatepwd] = useState({
    id: "",
    bol: false,
  });

  // state for updating password
  const [newpwddata, setnewpwddata] = useState({
    title: value?.title,
    username: value?.username,
    password: value?.password,
  });

  const [breachStatus, setBreachStatus] = useState({
    checking: false,
    pwned: null,
  });

  useEffect(() => {
    const checkPassword = async () => {
      if (!newpwddata.password) {
        setBreachStatus({ checking: false, pwned: null });
        return;
      }
      setBreachStatus({ checking: true, pwned: null });
      const isPwned = await checkPwnedPassword(newpwddata.password);
      setBreachStatus({ checking: false, pwned: isPwned });
    };

    const debounceTimeout = setTimeout(() => {
      checkPassword();
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [newpwddata.password]);

  const { Deletepassword, Updatepassword } = usePasswordContext();

  const HanldeDelete = (pwid) => {
    let confrm = confirm("Do you want to delete");
    if (confrm) {
      Deletepassword(pwid);
    }
  };

  const HandleUpdate = (data) => {
    Updatepassword({ prevvalue: data, newpwddata });
    setupdatepwd({
      id: "",
      bol: false,
    });
  };

  const score = checkPasswordStrength(newpwddata.username, newpwddata.password);
  const getStrengthLabel = (score) => {
    if (score < 40) return "Weak";
    if (score < 60) return "Fair";
    return "Strong";
  };

  const getStrengthColor = (score) => {
    if (score < 40) return "red";
    if (score < 60) return "orange";
    return "green";
  };

  return (
    <>
      <div className="flex flex-col gap-3   transition-transform hover:scale-95 duration-150 ease-in bg-white p-5  rounded-md shadow-sm">
        <input
          type="text"
          className="ring-1 ring-gray-500 rounded-md  p-1"
          placeholder="enter your title"
          disabled={updatepwd?.bol ? false : true}
          onChange={(e) =>
            setnewpwddata({ ...newpwddata, title: e.target.value })
          }
          value={newpwddata?.title}
        />
        <input
          type="text"
          className="ring-1 ring-gray-500 rounded-md  p-1"
          placeholder="enter your username"
          disabled={updatepwd?.bol ? false : true}
          onChange={(e) =>
            setnewpwddata({ ...newpwddata, username: e.target.value })
          }
          value={newpwddata?.username}
        />
        <div className="w-full relative">
          <input
            type={viewpwd ? "text" : "password"}
            className="ring-1 ring-gray-500 rounded-md w-full  p-1"
            disabled={updatepwd?.bol ? false : true}
            placeholder="enter your password"
            onChange={(e) =>
              setnewpwddata({ ...newpwddata, password: e.target.value })
            }
            value={newpwddata?.password}
          />
          {viewpwd ? (
            <RemoveRedEyeIcon
              onClick={() => setviewpwd(!viewpwd)}
              fontSize="small"
              className="absolute top-2 right-2 "
            />
          ) : (
            <VisibilityOffIcon
              onClick={() => setviewpwd(!viewpwd)}
              fontSize="small"
              className="absolute top-2 right-2 "
            />
          )}
          <span>Password Strength: </span>
          <span style={{ color: getStrengthColor(score) }}>
            {getStrengthLabel(score)}
          </span
          
          >
          <div>
            {breachStatus.checking && <span>Checking for breaches...</span>}
            {breachStatus.pwned === true && (
              <span style={{ color: "red" }}>Password Breached!</span>
            )}
            {breachStatus.pwned === false && (
              <span style={{ color: "green" }}>Password Safe</span>
            )}
          </div>
        </div>

        {updatepwd?.bol ? (
          <div className="flex items-center justify-end gap-2">
            <button
              className="p-1 bg-gray-300 text-base rounded-md"
              onClick={() =>
                setupdatepwd({
                  id: "",
                  bol: false,
                })
              }
            >
              Cancel
            </button>
            <button
              className="p-1 bg-yellow-300  text-base rounded-md"
              onClick={() => HandleUpdate(value)}
            >
              Update
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-1">
            <h1 className=" flex items-center justify-center gap-2 text-gray-600">
              Date :- <span>{moment(value?.createdAt).fromNow()}</span>
            </h1>
            <button
              onClick={() => {
                setupdatepwd({ bol: !updatepwd?.bol, id: value?._id });
                setnewpwddata({
                  title: value?.title,
                  username: value?.username,
                  password: value?.password,
                });
              }}
              className="text-green-500 transition-colors duration-200 ease-in-out p-2 flex items-center justify-center hover:bg-black rounded-full hover:text-white"
            >
              <EditIcon fontSize="small" />
            </button>
            <button
              onClick={() => HanldeDelete(value?._id)}
              className="text-red-500 transition-colors duration-200 ease-in-out p-2 flex items-center justify-center hover:bg-black rounded-full hover:text-white"
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Passworditem;
