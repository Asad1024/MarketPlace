import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { DarkModeContext } from "../App";
import { useContext } from "react";
import { getAuth } from "firebase/auth";
export default function ListingItem({ listing, id, onEdit, onDelete }) {
  const darkMode = useContext(DarkModeContext);
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
  } else {
  }
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>
        {user ? (
    <>
       <div
          className={`w-full p-[10px] ${
            darkMode
              ? "text-indigo-100 bg-gray-800"
              : "text-indigo-900 bg-indigo-100"
          }`}
        >
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>
          <p className="text-indigo-500 mt-2 font-semibold">
            Rs{" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
    </>
  ) : (
    <div className="w-full text-center bg-white p-6 rounded-lg shadow-lg">
    <p className="text-xl font-semibold mb-3">
      To view details, please log in.
    </p>
    <Link
      to="/sign-in"
      className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 focus:bg-blue-700 transition duration-150 ease-in-out"
    >
      Sign In
    </Link>
  </div>
  
  )}

      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer "
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
}
