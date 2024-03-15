import React, { useEffect } from 'react'



const FAQ = () => {

    useEffect(() => {
        const buttons = document.querySelectorAll('[data-accordion-target]');
    
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            const target = button.dataset.accordionTarget;
            const body = document.querySelector(target);
    
            button.setAttribute('aria-expanded', body.classList.contains('hidden'));
            body.classList.toggle('hidden');
          });
        });
    
        // Cleanup event listeners on component unmount
        return () => {
          buttons.forEach(button => {
            button.removeEventListener('click', () => {
              const target = button.dataset.accordionTarget;
              const body = document.querySelector(target);
    
              button.setAttribute('aria-expanded', body.classList.contains('hidden'));
              body.classList.toggle('hidden');
            });
          });
        };
      }, []);

  return (
   <>
       <div class="container mx-auto px-4 py-8 max-w-5xl mt-28">

<h1 class="text-3xl font-varela text-center mb-8">Frequently Asked Questions</h1>

<div id="accordion-collapse" data-accordion="collapse">

    <h2 id="accordion-collapse-heading-1">
        <button type="button"
            class="flex items-center justify-between w-full p-5 font-varela rtl:text-right  border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-1" aria-expanded="true"
            aria-controls="accordion-collapse-body-1">
            <span>How can I create an account on Turning Leaves?</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5 5 1 1 5" />
            </svg>
        </button>
    </h2>
    <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
        <div class="p-5 border border-b-0 border-gray-200 ">
            <p class="mb-2 text-gray-500 dark:text-gray-400">To create an account on Turning Leaves, click
                on the "Sign Up" button on the homepage. Fill in the required information such as your name,
                email address, and password, then click "Create Account". You will receive a verification email
                to activate your account.</p>
        </div>
    </div>

    

    <h2 id="accordion-collapse-heading-2">
        <button type="button"
            class="flex items-center justify-between w-full p-5 font-varela rtl:text-right  border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-2" aria-expanded="false"
            aria-controls="accordion-collapse-body-2">
            <span>How do I sell a book on Turning Leaves?</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5 5 1 1 5" />
            </svg>
        </button>
    </h2>
    <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <p class="mb-2 text-gray-500 dark:text-gray-400">To sell a book on Turning Leaves, first, make
                sure you are logged in to your account. Then, go to the "Sell" section and click on the "List
                Book" button. Fill in the details of the book you want to sell, including title, author,
                condition, and price. Once done, click on "Submit Listing" to make your book available for
                sale.</p>
        </div>
    </div>

    

    <h2 id="accordion-collapse-heading-3">
        <button type="button"
            class="flex items-center justify-between w-full p-5 font-varela rtl:text-right  border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-3" aria-expanded="false"
            aria-controls="accordion-collapse-body-3">
            <span>How do I browse books on Turning Leaves?</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5 5 1 1 5" />
            </svg>
        </button>
    </h2>
    <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <p class="mb-2 text-gray-500 dark:text-gray-400">To browse books on Turning Leaves, simply go to the "Buy" section of the website. You can then use filters such as category, genre, or price range to narrow down your search. Once you find a book you're interested in, you can click on it to view more details and contact the seller.</p>
        </div>
    </div>

    <h2 id="accordion-collapse-heading-4">
        <button type="button"
            class="flex items-center justify-between w-full p-5 font-varela rtl:text-right  border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-4" aria-expanded="false"
            aria-controls="accordion-collapse-body-4">
            <span>Can I negotiate the price with the seller?</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5 5 1 1 5" />
            </svg>
        </button>
    </h2>
    <div id="accordion-collapse-body-4" class="hidden" aria-labelledby="accordion-collapse-heading-4">
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <p class="mb-2 text-gray-500 dark:text-gray-400">
                Yes, you can negotiate the price with the seller directly through the chat feature on Turning Leaves. Once you find a book you're interested in, you can initiate a conversation with the seller to discuss pricing, condition, or any other details.</p>
        </div>
    </div>

    <h2 id="accordion-collapse-heading-5">
        <button type="button"
            class="flex items-center justify-between w-full p-5 font-varela rtl:text-right  border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-5" aria-expanded="false"
            aria-controls="accordion-collapse-body-5">
            <span>Is there a rating system for sellers and buyers?</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5 5 1 1 5" />
            </svg>
        </button>
    </h2>
    <div id="accordion-collapse-body-5" class="hidden" aria-labelledby="accordion-collapse-heading-5">
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <p class="mb-2 text-gray-500 dark:text-gray-400">Currently, we have a system to review the user. This helps build trust within the community and ensures a positive buying and selling experience for everyone.</p>
        </div>
    </div>

    <h2 id="accordion-collapse-heading-6">
        <button type="button"
            class="flex items-center justify-between w-full p-5 font-varela  border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-6" aria-expanded="false"
            aria-controls="accordion-collapse-body-6">
            <span>What payment methods are accepted on Turning Leaves?</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5 5 1 1 5" />
            </svg>
        </button>
    </h2>
    <div id="accordion-collapse-body-6" class="hidden" aria-labelledby="accordion-collapse-heading-6">
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <p class="mb-2 text-gray-500 dark:text-gray-400">Turning Leaves primarily facilitates direct transactions between buyers and sellers. Payment methods accepted may vary depending on the agreement between the parties involved. Sellers may specify their preferred payment methods in their listings, which can include cash, bank transfer, or other electronic payment options. We recommend discussing payment details directly with the seller before making a purchase.</p>
        </div>
    </div>

    <h2 id="accordion-collapse-heading-7">
        <button type="button"
            class="flex items-center justify-between w-full p-5 font-varela border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-7" aria-expanded="false"
            aria-controls="accordion-collapse-body-7">
            <span>Can I return a book if I'm not satisfied with my purchase?</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5 5 1 1 5" />
            </svg>
        </button>
    </h2>
    <div id="accordion-collapse-body-7" class="hidden" aria-labelledby="accordion-collapse-heading-7">
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <p class="mb-2 text-gray-500 dark:text-gray-400">Turning Leaves operates as a platform for connecting buyers and sellers of used books, and the terms of sale are typically negotiated between the parties involved. As such, return policies may vary depending on the seller. We recommend discussing return or refund options with the seller before completing a transaction to ensure a clear understanding of the terms.</p>
        </div>
    </div>



</div>

</div>
   </>
  )
}

export default FAQ ; 