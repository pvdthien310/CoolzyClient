import React from "react";
import { useState } from "react";

import './style.css'

import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

import { FaTelegramPlane } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephoneFill } from 'react-icons/bs'

const Footer = () => {
    const defaultColor = '#000'
    return (
        <div className="footer-container">
            <div className="footer-container__introduce">
                <img src={logo} alt="Coolzy" className="footer-container__introduce__logo" />
                <div className="footer-container__introduce__name">Coolzy</div>
                <div className="clear"></div>
                <div className="footer-container__introduce__content">
                When you’re with us, you’re part of something bigger: a global community dedicated to bringing out the best in one another, with access to the most effective tools for the job, including Member-exclusive products, Coolzy customisation, and special offers. And it is all free.
                </div>
                <p className="footer-container__introduce__more"><Link to='/about'>More about us</Link></p>
            </div>

            <div className="footer-container__categories">
                <div className="footer-title">CATEGORIES</div>
                <p className="footer-container__categories__item"><Link to='/'>Home Page</Link></p>
                <p className="footer-container__categories__item"><Link to='/product/all'>Products</Link></p>
                <div className="footer-container__categories__item"><Link to='/about'>About</Link></div>
                <div className="footer-container__categories__item"><Link to='/contact'>Contact</Link></div>
            </div>

            <div className="footer-container__contact">
                <div className="footer-title">CONTACT</div>
                <div className="footer-contact-item">
                    <FaTelegramPlane className="footer-contact-item__icon" size={18} color={defaultColor} />
                    <div className="footer-contact-item__content">University of Information Technology, HCMC</div>
                </div>

                <div className="footer-contact-item">
                    <AiOutlineMail className="footer-contact-item__icon" size={18} color={defaultColor} />
                    <div className="footer-contact-item__content">coolzyproject@gmail.com</div>
                </div>

                <div className="footer-contact-item">
                    <BsTelephoneFill className="footer-contact-item__icon" size={18} color={defaultColor} />
                    <div className="footer-contact-item__content">038.3303.061</div>
                </div>
            </div>

        </div>
    )
}

export default Footer