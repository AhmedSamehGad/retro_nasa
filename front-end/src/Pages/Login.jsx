// Register.jsx
import { useState } from "react";
import Input from "../components/Input";

export default function Register() {
  const [formData, setFormData] = useState({ email: "", password: "", });

  const [errors, setErrors] = useState({ email: "", password: "", })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 

    let errors = {}
    const {email, password} = formData


    if(!email) errors.email = "email is required";
    else if(! (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) errors.email = "Invalid email address";

    
    else if(password.length < 8) errors.password = "password must be at least 8 letters"

    if(errors || errors.length > 0){
        console.log(errors)
        return setErrors(errors)
    }

    



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
          <h1>Hello ! Sign In here</h1>

          <form className="space-y-4 w-full " onSubmit={handleSubmit}>


            <Input 
              placeholder="Email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
            />

              <Input 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
              />

            <button className="bg-[#91B354] text-[18px] w-[90%] block mt-3 m-auto p-[4px] rounded-lg">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

