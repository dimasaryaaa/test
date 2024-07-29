import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h2 className="text-2xl font-bold mb-2">BLOCKCHAIN</h2>
            <p className="text-gray-400">Solusi penyaluran bantuan sosial yang efisien dan andal.</p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Hubungi Kami</h3>
            <p className="text-gray-400">123 ethereum St.<br />Jakarta, Tanah Abang No.21 Block A1 </p>
            <p className="text-gray-400 mt-2">Email: info@blockchain.com</p>
            <p className="text-gray-400">Phone: (123) +62 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Penyaluran Bantuan Sosial. Tugas Akhir.
        </div>
      </div>
    </footer>
  )
}

export default Footer