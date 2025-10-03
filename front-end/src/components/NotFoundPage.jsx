import { useEffect } from 'react'
import { Link } from 'react-router-dom';


// components


// icons feom react-icons
import { PiSmileySadFill } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function NotFound() {

    const height = window.innerHeight * .90

    useEffect(() => {
        window.scrollTo({top:0, behavior:"auto"});
    },[])


  return (
    <div className="min-h-screen flex flex-col items-center gap-4 justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4"  
            style={{height:`${height}px`}}
      >
        <div className='flex flex-col items-center gap-4 bg-white py-8 px-12 rounded-xl shadow-xl NF_ani overflow-hidden'>
            {/* icon */}
            <div> <PiSmileySadFill className='text-[80px] text-indigo-500 LTTL_ani'/> </div>

            <h2 className='text-4xl text-stone-800 font-bold'>404</h2>

            <p className='text-gray-600 O_ani text-center sm:text-right' style={{animationDelay:".4s"}}
            >Oops! The page you're looking for doesn't exist.</p>

            {/* btns */}
            <div className='flex flex-col sm:flex-row gap-3 O_ani w-full' >
                <Link to={'/'} className='my-1 bg-indigo-600 text-white font-semibold  rounded-lg py-3 px-8 
                                    hover:bg-indigo-700   transition-colors capitalize flex items-center justify-center'>
                    <div className='-translate-x-2 translate-y-[1.5px]'> <FaArrowLeft/> </div> <div> go home</div>
                </Link>

                <Link to='/game' className='my-1 border border-indigo-600 text-indigo-600  font-semibold  rounded-lg py-3 px-8 text-center
                                    hover:bg-indigo-50   transition-colors capitalize flex items-center justify-center'>
                    <div className='-translate-x-2 translate-y-[1.5px]'> <FaSearch /> </div> <div>Start Exploring</div>
                </Link>
            </div>
        </div>

        <div className='text-sm text-gray-300'>
            Still lost? Contact our support team. <Link to='/' className='underline text-gray-400/50'>by clicking here</Link>
        </div>

    </div>
  )
}

export default NotFound