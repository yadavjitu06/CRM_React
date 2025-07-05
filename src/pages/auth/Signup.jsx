import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInputChange(e) {
    // 👇 Ye line input element (like <input name="email" value="jitender" />) se 'name' aur 'value' nikal rahi hai
    // e.target => jis input field mein user likh raha hai uska reference deta hai
    // Destructuring ka use karke usme se 'name' aur 'value' ko directly nikaal rahe hain
    const { name, value } = e.target;

    // 👇 Yahan signupDetails state ko update kar rahe hain
    // e.g. agar name="email" hai, to state me email: value add/update ho jayega
    setSignUpDetails({
      ...signupDetails,
      [name]: value, // dynamic key: input field ka name value ban jaata hai
    });
  }

  const [signupDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
    name: "",
    userType: "",
    userStatus: "",
    clientName: "",
  });

  function handleUserType(e) {
    const userTypeSelected = e.target.textContent;
    console.log(userTypeSelected);
    setSignUpDetails({
      ...signupDetails,
      userType: userTypeSelected,
      userStatus: userTypeSelected === "customer" ? "approved" : "suspended",
    });
    const dropDown = document.getElementById("userTypeDropDown");
    dropDown.open = !dropDown.open;
  }
  function resetSignupState() {
    setSignUpDetails({
      email: "",
      password: "",
      name: "",
      userType: "",
      userStatus: "",
      clientName: "",
    });
  }

  async function onSubmit() {
    if (
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.userStatus ||
      !signupDetails.userType ||
      !signupDetails.clientName ||
      !signupDetails.name
    )
      return;

    const responce = await dispatch(signup(signupDetails));
    console.log(responce);
    if (responce.payload) {
      navigate("/login");
    } else {
      resetSignupState();
    }
  }
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body flex flex-col items-center">
          <div className="w-full flex justify-center">
            <h2 className="card-title text-4xl text-white">Signup</h2>
          </div>
          <div className="w-full">
            <input
              name="email"
              autoComplete="one-time-code"
              type="text"
              placeholder="email ..."
              onChange={handleInputChange}
              value={signupDetails.email}
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="w-full">
            <input
              name="password"
              autoComplete="one-time-code"
              type="password"
              placeholder="password"
              onChange={handleInputChange}
              value={signupDetails.password}
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="w-full">
            <input
              name="name"
              autoComplete="one-time-code"
              type="text"
              placeholder="name"
              onChange={handleInputChange}
              value={signupDetails.name}
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <details className="dropdown mb-4 w-full" id="userTypeDropDown">
            <summary className="btn">
              {!signupDetails.userType ? "User Type" : signupDetails.userType}
            </summary>
            <ul
              onClick={handleUserType}
              className="p-2 shadow menu dropdown-content z-[1] bg-base-100 text-white rounded-box w-52"
            >
              <li>
                <a>customer</a>
              </li>
              <li>
                <a>engineer</a>
              </li>
              <li>
                <a>admin</a>
              </li>
            </ul>
          </details>

          <div className="w-full">
            <input
              name="clientName"
              autoComplete="one-time-code"
              type="text"
              placeholder="client name"
              onChange={handleInputChange}
              value={signupDetails.clientName}
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>

          <div className="w-full card-actions mt-4">
            <button
              onClick={onSubmit}
              className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300"
            >
              Submit
            </button>
          </div>
          <p className="text-l text-white">
            Already have an account ?{" "}
            <Link
              className="text-yellow-200 font-semibold hover:text-white"
              to="/login"
            >
              Login Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
