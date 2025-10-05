import { useLocation } from "react-router-dom"



export default function History(){
    const location = useLocation()
    console.log(location.state)

    const eleHistory = location.state.map((ele, index) => {
        return <li  key={index} 
            className="bg-[#222] p-2 rounded-lg">{ele.action}</li>
    })

    return (
        <div className="py-4">
            <h2 className="text-center text-[30px] capitalize">history</h2>
            <ul className="px-4 py-4 flex flex-col-reverse gap-4">{eleHistory}</ul>
        </div>
    )




}