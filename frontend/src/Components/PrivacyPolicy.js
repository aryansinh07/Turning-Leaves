import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const PrivacyPolicy = () => {
  return (
    <div>
        <Navbar/>
        <div class="container mx-auto py-8 max-w-4xl  mt-24">
        <h1 class="text-4xl font-varela text-center text-gray-800 mb-4">Privacy Policy</h1>
        <div class="bg-white rounded-lg shadow-md p-8">
            <p class="text-gray-800 mb-4">Thank you for choosing Turning Leaves! At Turning Leaves, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our platform.</p>

            <h2 class="text-2xl font-varela text-gray-800 mb-4">Information We Collect</h2>
            <h3 class="text-xl font-varela text-gray-800 mb-2">Personal Information</h3>
            <p class="text-gray-800 mb-4">When you register an account on Turning Leaves, we may collect personal information such as:</p>
            <ul class="list-disc list-inside text-gray-800 mb-4">
                <li>Your name</li>
                <li>Email address</li>
                <li>Contact information</li>
                <li>Profile picture (optional)</li>
                <li>Payment information (if you choose to buy or sell books)</li>
                <li>Any other information you provide voluntarily</li>
            </ul>

            <h3 class="text-xl font-varela text-gray-800 mb-2">Usage Data</h3>
            <p class="text-gray-800 mb-4">We may also collect usage data, including:</p>
            <ul class="list-disc list-inside text-gray-800 mb-6">
                <li>IP address</li>
                <li>Device information</li>
                <li>Browser type</li>
                <li>Pages visited</li>
                <li>Date and time of visits</li>
                <li>Referring pages</li>
            </ul>

            <h2 class="text-2xl font-varela text-gray-800 mb-4">How We Use Your Information</h2>
            <p class="text-gray-800 mb-4">We use the information we collect for the following purposes:</p>
            <ul class="list-disc list-inside text-gray-800 mb-6">
                <li>To provide and maintain our platform</li>
                <li>To facilitate buying and selling of books between users</li>
                <li>To personalize your experience on Turning Leaves</li>
                <li>To communicate with you regarding your account, transactions, and updates</li>
                <li>To improve our platform and services</li>
                <li>To detect and prevent fraud or abuse</li>
            </ul>

            <h2 class="text-2xl font-varela text-gray-800 mb-4">Sharing Your Information</h2>
            <p class="text-gray-800 mb-4">We may share your information in the following circumstances:</p>
            <ul class="list-disc list-inside text-gray-800 mb-6">
                <li>With other users when you engage in transactions (e.g., chatting with sellers or buyers)</li>
                <li>With third-party service providers who assist us in operating our platform</li>
                <li>In response to legal requests or to comply with applicable laws and regulations</li>
                <li>With your consent or as otherwise disclosed at the time of collection</li>
            </ul>

            <h2 class="text-2xl font-varela text-gray-800 mb-4">Data Security</h2>
            <p class="text-gray-800 mb-6">We take the security of your information seriously and implement appropriate measures to protect it against unauthorized access, alteration, disclosure, or destruction.</p>

            <h2 class="text-2xl font-varela text-gray-800 mb-4">Your Choices</h2>
            <p class="text-gray-800 mb-4">You can update or delete your account information at any time by accessing your account settings. You may also opt out of certain communications from us, such as promotional emails, by following the instructions provided in the communication.</p>

            <h2 class="text-2xl font-varela text-gray-800 mb-4">Changes to This Privacy Policy</h2>
            <p class="text-gray-800">We may update this Privacy Policy from time to time, and any changes will be reflected on this page. We encourage you to review this Privacy Policy periodically for any updates.</p>
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default PrivacyPolicy