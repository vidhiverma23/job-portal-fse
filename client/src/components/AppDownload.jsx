import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <div className="relative bg-gradient-to-r from-violet-50 to-purple-50 p-12 sm:p-24 lg:p-32 rounded-lg overflow-hidden">

        {/* Text + Buttons */}
        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-4xl font-bold mb-8 max-w-md">
            Download Mobile App For Better Experience
          </h1>

          <div className="flex gap-4">
            <a href="#" className="inline-block">
              <img
                src={assets.play_store}
                alt="Play Store"
                className="h-12"
              />
            </a>

            <a href="#" className="inline-block">
              <img
                src={assets.app_store}
                alt="App Store"
                className="h-12"
              />
            </a>
          </div>
        </div>

        {/* App Image */}
        <img
          src={assets.app_main_img}
          alt="App Preview"
          className="hidden lg:block absolute right-20 bottom-0 w-72"
        />

      </div>
    </div>
  )
}

export default AppDownload
