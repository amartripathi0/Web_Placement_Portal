import React from 'react'
import { img } from "../Constants"
import { Link ,NavLink} from 'react-router-dom';
function Header() {
    return (
        <>
            <div className='flex justify-between  items-center h-20 pl-14 pr-14 bg-slate-600  ' >
                <img src={img} alt="logo" className='h-14 rounded-md ' />
                <div className='ml-36 flex gap-4 text-xl text-white font-semibold'>
                    <NavLink to="/" className={({isActive}) => isActive ? "text-decoration-line: underline text-pink-500" : "" } >
                        <div className='pl-4 pr-4 hover:text-cyan-500 '>Home</div>
                    </NavLink>
                    <NavLink to="/about" className={({isActive}) => isActive ? "text-decoration-line: underline text-pink-500" : "" } >
                        <div className='pl-4 pr-4 hover:text-cyan-500'>About </div>
                    </NavLink>
                    <NavLink to="/page" className={({isActive}) => isActive ? "text-decoration-line: underline text-pink-500" : "" } >
                        <div className='pl-4 pr-4 hover:text-cyan-500'>Page</div>
                    </NavLink>
                    <NavLink to="/contact" className={({isActive}) => isActive ? "text-decoration-line: underline text-pink-500" : "" } >
                        <div className='pl-4 pr-4 hover:text-cyan-500'>Contact</div>
                    </NavLink>
                    <NavLink to="/support" className={({isActive}) => isActive ? "text-decoration-line: underline text-pink-500" : "" } >

                        <div className='pl-4 pr-4 hover:text-cyan-500'>Support</div>
                    </NavLink>

                </div>
                <div className='flex gap-5 font-semibold text-xl'>
                    <NavLink to="/signin">
                    <button className=' w-30 text-white bg-cyan-500 hover:bg-cyan-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center'>Login</button>
                    </NavLink>

                    <NavLink to= "/signup">
                    <button className='w-30 text-white bg-pink-500 hover:bg-pink-600 p-3 pl-6 pr-6 rounded-lg flex items-center justify-center'>Sign Up</button>
                    </NavLink>
                    </div>
            </div >
        </>

    )
}

export default Header;