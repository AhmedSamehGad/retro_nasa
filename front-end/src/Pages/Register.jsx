// Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age:""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); 

    let errors = {}
    const {firstName, lastName, age, address, phoneNumber, email, password, confirmPassword, gender} = formData


    if(!email) errors.email = "email is required";
    else if(! (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) errors.email = "Invalid email address";

    // first name
    if(!firstName) errors.firstName = "first name is required"
    else if(! (/[a-zA-Z]/.test(firstName))) errors.firstName = "invalid name"

    
    // last name
    if(!lastName) errors.lastName = "last name is required"
    else if(! (/[a-zA-Z]/.test(lastName))) errors.lastName = "invalid name"

     // age
    if(!age) errors.age = "age is required"
    else if(! (/[0-9]/.test(age))) errors.age = "only numbers"
    else if(Number(age) <= 10) errors.age = "user must be +10"

        // phone numver
    if(!phoneNumber) errors.phoneNumber = "Phone number is required"
    else if(! (/^(01[0-2,5][0-9]{8}|\+201[0-2,5][0-9]{8})$/.test(phoneNumber))) errors.phoneNumber = "Invalid phone number"
    
     // address
    if(!address) errors.address = "address is required"
    else if(!/^[a-zA-Z]/.test(address)) errors.address = "adress must start with a letter"
    
    // check password
    if(!(/[a-zA-Z]/.test(password))) errors.password = "password must conyain a letter"
    else if(password.length < 8) errors.password = "password must be at least 8 letters"

       
    else if(! (/[0-9]/.test(password))) errors.password = "password must contain a number"
    else if(! (/[^a-zA-Z0-9]/.test(password))) errors.password = "password must contain a special character"

      // confirmPassword
    if(!confirmPassword) errors.confirmPassword = "confirm Password is required"
    else if(confirmPassword !== password) errors.confirmPassword = "confirm Password does not match with password"

    if (!gender) errors.gender = "gender is required";
    else if(gender != 'Male' && gender != 'Female') errors.gender = "check gender"



    if (Object.keys(errors).length > 0) {
  setErrors(errors);
  return;
}

    const registerUser = async () => {
  try {
    const res = await fetch("http://localhost:7170/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        firstName,
        lastName,
        age,
        address,
        phoneNumber,
        email,
        password,
        confirmPassword,
        gender
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setServerError(data.message || "Register failed");
      throw new Error(data.message || "Register failed");
    }

    navigate("/profile", { state: data.user });
    return data;

  } catch (error) {
    return { message: error.message };
  }
};

await registerUser();




  };
// validateData

  return (
    <div className="relative min-h-screen px-2 sm:px-4 lg:px-2">
      {/* video background */}
      <video autoPlay loop muted playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-[80%_10%] z-0"
      >
        <source src="/videos/back.mp4" type="video/mp4" />
      </video>

      {/* content */}
      <div className="relative z-10 text-white text-3xl flex justify-center items-center min-h-screen">
        <div className=" scale-90 translate-y-10 w-full max-w-[650px] bg-[#2B2828]/80 py-4 px-8 flex flex-col gap-4 items-center rounded-3xl shadow-2xl">
          <h1>Hello ! Register here</h1>

          <form className="space-y-4 w-full " onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <Input 
                placeholder="First Name" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
              />
              <Input 
                placeholder="Last Name" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
              />
            </div>

            <Input 
              placeholder="Email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
            />
            <div className="flex gap-3">
                <Input 
                  placeholder="Phone Number" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleChange} 
                />
                <Input 
                  placeholder="Age" 
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange} 
                />
            </div>
            
            <div className="flex gap-3">
              <Input 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
              />
              <Input 
                type="password" 
                placeholder="Confirm Password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
              />
            </div>

            <div className="flex gap-3">
              <Input 
                placeholder="Address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
              />

              <div className="mb-4">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-[#353232]/95 py-[10px] px-3 text-[16px] rounded-lg outline-none "
                >
                  <option value="">Select Gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <button className="bg-[#91B354] text-[18px] w-[90%] block m-auto p-[4px] rounded-lg">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
