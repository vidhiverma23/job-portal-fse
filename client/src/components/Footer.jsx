import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-6 mt-20">

      {/* Logo */}
      <img width={160} src={assets.logo} alt="logo" />

      {/* Separator + Copyright */}
      <p className="flex-1 border-l border-gray-300 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright © VidhiVerma.dev | All rights reserved.
      </p>

      {/* Social Icons */}
      <div className='flex gap-2.5'>
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
        <img width={38} src={assets.instagram_icon} alt="" />
        </div>
        </div>
    )
}
export default Footer
