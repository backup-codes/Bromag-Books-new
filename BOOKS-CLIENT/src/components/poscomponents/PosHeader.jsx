import Wrapper from "../../assets/wrappers/poswrappers/PosHeader";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsJustify } from "react-icons/bs";
import { posDashboard, updateProfileImage } from "../../config/routeApi/pos";

import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../helpers/helpers";
import toast from "react-hot-toast";
import { RestaurantAdminApi } from "../../config/global";


const PosHeader = ({ openSidebar }) => {
  const [restaurant, setRestaurant] = useState({});
  const [manager, setManager] = useState({});

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    document.getElementById('fileInput').click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const response = await updateProfileImage(file)

    if (response.data.success) {

      const updatedManager = { ...manager, [profileImage]: response.data.profileImage };

      setManager(updatedManager);



      toastSuccess(response.data.message)


    } else {
      toastError(response.data.message)


    }




  };

  useEffect(() => {
    const handleRestaurantData = async () => {
      try {
        const response = await posDashboard();
        if (response.data.success) {
          setRestaurant(response.data.RestaurantData);
          let transformedManagerData = response.data.ManagerData;
          transformedManagerData.profileImage = RestaurantAdminApi.slice(0, RestaurantAdminApi.length-1)+transformedManagerData.profileImage
          console.log(transformedManagerData);
          setManager(transformedManagerData);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleRestaurantData();
  }, []);

  return (
    <Wrapper className="pos-header">
      <div className='menu-icon'>
        <BsJustify className='menu-icon' onClick={openSidebar} />
      </div>

      <div>
        <h3>{restaurant.username || "Restaurant"}</h3>
      </div>

      <div className="header-content">
        {/* <div className="notification-div">
          <IoIosNotificationsOutline className="notification-icon" />
          <div className="notification-count">
            <p>0</p>
          </div>
        </div> */}

        <div className="profile">
          <div className="profile-div" onClick={handleImageClick}>
            <img src={manager?.profileImage && manager?.profileImage} alt="aassd" />
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </div>



    </Wrapper>

  );
};
export default PosHeader;
