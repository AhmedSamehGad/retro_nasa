// Input.jsx
export default function Input({ type="text", placeholder, name, value, onChange, errors }) {
  
  return (
    <div className="flex-grow">
      <input 
        type={type} 
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-[#353232]/95 p-1 px-2 text-[16px] rounded-lg outline-none"
      />
    </div>
  )
}
