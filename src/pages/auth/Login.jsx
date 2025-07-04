import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInputChange(e) {
    // 👇 Ye line input element (like <input name="email" value="jitender" />) se 'name' aur 'value' nikal rahi hai
    // e.target => jis input field mein user likh raha hai uska reference deta hai
    // Destructuring ka use karke usme se 'name' aur 'value' ko directly nikaal rahe hain
    const { name, value } = e.target;

    // 👇 Yahan loginDetails state ko update kar rahe hain
    // e.g. agar name="email" hai, to state me email: value add/update ho jayega
    setLoginDetails({
      ...loginDetails,
      [name]: value, // dynamic key: input field ka name value ban jaata hai
    });
  }

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  function resetLoginState() {
    setLoginDetails({
      email: "",
      password: "",
    });
  }

  async function onSubmit() {
    if (!loginDetails.email || !loginDetails.password) return;
    console.log(loginDetails);
    const responce = await dispatch(login(loginDetails));
    if (responce.payload) {
      navigate("/");
    } else {
      resetLoginState();
    }
  }

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body flex flex-col items-center">
          <div className="w-full flex justify-center">
            <h2 className="card-title text-4xl text-white">Login</h2>
          </div>
          <div className="w-full">
            <input
              name="email"
              value={loginDetails.email}
              autoComplete="one-time-code"
              type="text"
              placeholder="email ..."
              onChange={handleInputChange}
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="w-full">
            <input
              name="password"
              value={loginDetails.password}
              autoComplete="one-time-code"
              type="password"
              placeholder="password"
              onChange={handleInputChange}
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
        </div>
      </div>
    </div>
  );
}
export default Login;
