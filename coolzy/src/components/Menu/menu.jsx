import React from "react";
import './menu.css'
import { Link } from 'react-router-dom'

import { AiOutlineUser } from 'react-icons/ai'
import { VscHistory } from 'react-icons/vsc'
import { IoIosInformationCircleOutline, IoIosLogOut } from 'react-icons/io'
import { BiCommentDetail } from 'react-icons/bi'
import { BsHddStack } from 'react-icons/bs'

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { accountSlice } from "../../redux/slices/accountSlices";

const defaultColor = '#fff'

const CustomMenu = ({ accountToggleHandle }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const user = useSelector(state => state.account.user)

    const logoutHandle = () => {
        accountToggleHandle()
        localStorage.setItem('logged', false)
        dispatch(accountSlice.actions.update(''))
        navigate('/login')
    }

    return (
        <div className='menu' >
            <div className='menu__item'>
                <p onClick={() => { navigate('/manageProfile') }}>Profile</p>
                {/* <p onClick={() => { navigate('/ordersManagement') }}>Profile</p> */}
                <AiOutlineUser className='menu__item__icon' color={defaultColor} size={25} />
            </div>

            {/* {
                user.role == "Customer"
                &&
                <div className='menu__item'>
                    <p onClick={() => { accountToggleHandle(); navigate('/manager') }}>Movies review</p>
                    <BiCommentDetail className='menu__item__icon' color={defaultColor} size={25} />
                </div>
            } */}

            {
                user.role == "Customer"
                &&
                <div className='menu__item'>
                    <p onClick={() => { accountToggleHandle(); navigate('/history') }}>Transaction history</p>
                    <VscHistory className='menu__item__icon' color={defaultColor} size={23} />
                </div>
            }

            {
                (user.role == "Staff" || user.role == "Admin")
                &&
                <div className='menu__item'>
                    <p onClick={() => { accountToggleHandle(); navigate('/manager') }}>Manager</p>
                    <BsHddStack className='menu__item__icon' color={defaultColor} size={23} />
                </div>
            }

            {
                user.role == "Censor"
                &&
                <div className='menu__item'>
                    <p onClick={() => { accountToggleHandle(); navigate('/manager') }}>Censor</p>
                    <IoIosInformationCircleOutline className='menu__item__icon' color={defaultColor} size={25} />
                </div>
            }


            <div className="menu__line" />

            <div className='menu__item'>
                <p onClick={logoutHandle}>Log out</p>
                <IoIosLogOut className='menu__item__icon' color={defaultColor} size={23} />
            </div>

        </div>
    )
}

export default CustomMenu
