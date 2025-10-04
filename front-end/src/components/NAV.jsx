import React from 'react'

 function NAV() {
  return (


<div className='border-b border-white/70 3xl flex justify-between justify-items-center fixed z-30 w-full  '>
<div className='right-nav flex    '>
    <ul className=' flex justify-start gap-4  '>
        <li>Home</li>
        <li>Resourses</li>
        <li>Profile</li>
        <li>How It All Begin</li>
    </ul>

</div>

<div>

     <ul className=' flex justify- justify-end gap-3 mb-2 '>
        <li>login</li>
        <li>Register</li> 
        <button className="bg-[#C7E099] text-black rounded-[30px] border border-black px-6 py-2 inline-block text-center hover:bg-[#b5d480] transition-all hover:bg-transparent">Contact Us</button>
    </ul>
</div>
</div>

  )
}

export default NAV
















