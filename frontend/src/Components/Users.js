// import React, { useEffect, useState } from 'react';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import axios from 'axios';
// import { API_URL_USER } from '../utils/apiURL';

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   const userAuthString = localStorage.getItem('userAuth');
//   const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
//   const mylocation = userAuth.userFound.location ; 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const config = {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         };
//         const response = await axios.get(API_URL_USER, config);
//         setUsers(response.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   function haversine(location1, location2) {
//     if(location1==null || location2==null || location1=="" || location2=="") return 0 ; 
//     const [lat1, lon1] = location1.split(' ').map(Number);
//     const [lat2, lon2] = location2.split(' ').map(Number);
    
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);

//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;
//     return distance;
// }

//   function deg2rad(deg) {
//     return deg * (Math.PI / 180);
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="flex justify-center items-center">
//         <div className="mt-32 w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
//           <div className="flex items-center justify-between mb-4">
//             <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
//             <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
//               View all
//             </a>
//           </div>
//           <div className="flow-root">
//             <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
//               {users.map((user, index) => (
//                 <li key={index} className="py-3 sm:py-4">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0">
//                       <img className="w-8 h-8 rounded-full" src={user.profilePicture || "https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133876.jpg?w=360"} alt={`User ${index} image`} />
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                       <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                         {user.name}
//                       </p>
//                       <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                         {user.email}
//                       </p>
//                     </div>
//                     <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
//                       {(haversine(mylocation , user.location)).toFixed(2) + 'km'}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

//export default Users;

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { API_URL_USER } from '../utils/apiURL';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  const userAuthString = localStorage.getItem('userAuth');
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
  const mylocation = userAuth.userFound.location ; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.get(API_URL_USER, config);
        const sortedUsers = response.data.data.sort((a, b) => {
          const distanceA = haversine(mylocation, a.location);
          const distanceB = haversine(mylocation, b.location);
          return distanceA - distanceB;
        });
        setUsers(sortedUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function haversine(location1, location2) {
    if(location1==null || location2==null || location1=="" || location2=="") return 1000000 ; 
    const [lat1, lon1] = location1.split(' ').map(Number);
    const [lat2, lon2] = location2.split(' ').map(Number);
    
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="mt-32 w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Users near you </h5>
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              View all
            </a>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user, index) => (
                <li key={index} className="py-3 sm:py-4">
                 <Link to={`/seller-profile/${user._id}`}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src={user.profilePicture || "https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133876.jpg?w=360"} alt={`User ${index} image`} />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {(haversine(mylocation , user.location)).toFixed(2)==1000000.00 ? 'Not Provided' : (haversine(mylocation , user.location)).toFixed(2) + 'km' }
                    </div>
                  </div>
                  </Link> 
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Users;

