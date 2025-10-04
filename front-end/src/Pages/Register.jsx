
import Input from '../components/MainInput'
import "../css/Register.css";

 function Register() {
  return (
    <div className="relative min-h-screen px-2 sm:px-4 lg:px-2">
      {/* video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-[80%_10%] z-0"
      >
        <source src="/videos/back.mp4" type="video/mp4" />
      </video>

      {/* content */}
      <div className="relative z-10 text-white text-3xl flex justify-center items-center min-h-screen">
        <Input /> {/* ✅ الكومبوننت شغال هنا */}
      </div>
    </div>
  );
}
export default Register
