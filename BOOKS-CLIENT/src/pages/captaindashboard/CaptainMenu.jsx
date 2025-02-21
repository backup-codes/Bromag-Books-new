import Wrapper from "../../assets/wrappers/poswrappers/PosMenu";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
//component imports
import TableOrderSummeryModal from "../../components/captaincomponents/TableOrderSummeryModal";
import TableKotSummaryModal from "../../components/captaincomponents/TableKotSummaryModal";
//backend imports

//icon imports
import { FaPrint } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GetMenuDataAtCap,
  HoldItems,
  OrderedDataAtCap,
  getAllRegisteredPosCap,
} from "../../config/routeApi/cap";
import AddToCartCapMenu from "../../components/Menu/AddToCartCapMenu";
import { IoMdPrint } from "react-icons/io";
// import Uploading from "../../components/loaders/Uploading";
import { toastError, toastSuccess } from "../../helpers/helpers";
// import {

//   getAllSalesReport,
//   TodaysPassbookData,
// } from "../../config/routeApi/owner";

const CaptainMenu = () => {
  const [registeredPosManager, setRegisteredPosManagers] = useState([]);
  const [selectedPOSManager, setSelectedPosManager] = useState("");
  // const [todaysData, setTodaysData] = useState([]);
  const [modalKot, setModalKot] = useState(false);
  const [modalHold, setModalHold] = useState(false);
  const [modalPrintBill, setModalPrintBill] = useState(false);
  // const [kotId, setKotId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuCategories, setMenuCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isKot, setIsKot] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [ordered, setOrderedData] = useState([]);

  const [clearMenuSignal, setClearMenuSignal] = useState(0);
  const sendClearMenuSignal = ()=> setClearMenuSignal(prev=> prev+1);
  // console.log(clearMenuSignal);

  const navigate = useNavigate();

  // data coming from captain dashboard
  const location = useLocation();
  const data = location.state ? location.state.data : null;

  const handleTotalPrice = (total) => {
    setTotalPrice(total);
  };

  const clearItems = ()=> {
    console.log("Clear items called");
    setSelectedItems([]);}
  // console.log(clearItems);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectedItemsChange = (items) => {
    setSelectedItems(items);
  };

  // const handleKotIdChange = (newKotId) => {
  //   setKotId(newKotId);
  // };

  const handleModalKotOpen = () => {
    if (totalPrice == 0) {
      toastError("Please select the item from menu!");
    } else if (selectedItems.length == 0) {
      toastError("Already send to KOT");
    } else {
      setModalKot(true);
    }
  };

  const handleModalHoldOpen = () => {
    if (totalPrice == 0) {
      toastError("Please select the item from menu!");
    } else {
      setModalHold(true);
    }
  };

  useEffect(() => {
    const fetchOrderedData = async () => {
      try {
        const response = await OrderedDataAtCap(data._id);

        const newOrderData = response.data.orderedData;
        console.log("i am response", newOrderData);
        const NeworderedData = newOrderData?.map((item) => ({
          ...item,
          posManagerId: selectedPOSManager,
        }));
        setOrderedData(NeworderedData);
      } catch (error) {
        console.log(error);
      }
    };
    if (!modalKot) {
      fetchOrderedData();
    }
  }, [modalKot]);

  // console.log("newordered", ordered);

  const handleHoldSubmit = async () => {
    try {
      setUploading(true);

      const dataToPass = {
        orderData: data,
        TotalPrice: totalPrice,
        kotData: selectedItems,
        // orderId,
      };
      if (totalPrice == 0) {
        toastError("Please order an item using KOT!");
      } else {
        const response = await HoldItems(dataToPass);
        setUploading(false);

        if (response.data.success) {
          navigate("/captain-dashboard");

          toastSuccess(response.data.message);
        } else {
          toastError(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendToPos = () => {
    if (ordered[0].KotItems.length == 0) {
      toastError("Your virtual plate is empty.");
    }
    else if (selectedPOSManager === '') {
      toastError("Kindly select a POS");
    }
    else {
      setModalPrintBill(true);
    }
  };

  const handleSortChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMenuData = async () => {
    try {
      const response = await GetMenuDataAtCap();
      if (response.data.success) {
        setMenuCategories(response.data.Categories);
        setIsKot(response.data.isKotExist);
      } else {
        // Display error toast

        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (event) => {
    const newSelectedCategory = event.target.value;
    setSelectedCategory(newSelectedCategory);
  };

  useEffect(() => {
    handleMenuData();
    handleCategoryChange({ target: { value: "all" } });
  }, [searchTerm]);

  // Display the employee

  // useEffect(() => {
  //   const handlePassbookData = async () => {
  //     try {
  //       // const { data } = await PassBookData();

  //       const {data} = await TodaysPassbookData(selectedPOSManager)
  //       if (data.success) {
  //         setTodaysData(data.TodaysData);
  //       } else {
  //         toastError(data.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   handlePassbookData();

  //   const GetAllSalesReport = async () => {
  //     const response = await getAllSalesReport(selectedPOSManager,null);

  //     if (response.data.success) {
  //       console.log(response.data," heeey dataata");
  //       setPassBookData(response.data.data);
  //     } else {
  //       toastError(response.data.message);
  //     }
  //   };
  //   GetAllSalesReport();

  // }, [selectedPOSManager]);

  useEffect(() => {
    const GetAllRegisteredPos = async () => {
      try {
        const { data } = await getAllRegisteredPosCap();

        if (data.success) {
          console.log("first", data);
          setRegisteredPosManagers(data.RegisteredPosManagers);
        } else {
          toastError(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    GetAllRegisteredPos();
  }, []);

  // console.log("registeredPosManager", registeredPosManager);

  // async function handleView(data) {
  //   console.log(data);
  //       setSeletedviewdata(data);
  //       setModalShow(true);
  //     }

  // useEffect(() => {
  //   const fetchPOSOrderedData = async () => {
  //     try {
  //       const response = await getAllRegisteredPos(data);
  //       console.log(response, "POS User");
  //       setPOSUser(response.data.orderedData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchPOSOrderedData;
  // }, [POSUser, data]);

  return (
    <>
      {/* {isUploading ? <Uploading isUploading={isUploading} /> : null} */}

      <Wrapper className="page">
        <div className="page-content">
          <h2 className="title">Menu</h2>

          <div className="top-content">
            <div className="input-div">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="input-div">
              <Form.Select
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option key="default" disabled value="">
                  Filter by category
                </option>
                {menuCategories.map(({ _id, category }) => (
                  <option key={_id} value={category}>
                    {category}
                  </option>
                ))}

                <option value="all">All categories</option>
              </Form.Select>
            </div>

            <div className="input-div">
              <Form.Select
                value={selectedOption}
                onChange={handleSortChange}
                className="select-input"
              >
                <option disabled value="">
                  Sort by price
                </option>

                <option value="low to high">Low to high</option>
                <option value="high to low">High to low</option>
              </Form.Select>
            </div>
          </div>

          <div className="bottom-content">
            <h5 className="sub-title">Your Order</h5>

            <div className="menu-cards">
              <AddToCartCapMenu
                orderData={data}
                onTotalPriceChange={handleTotalPrice}
                onSelectedItemsChange={handleSelectedItemsChange}
                sortingOption={selectedOption}
                selectedCategory={selectedCategory}
                clearMenuSignal={clearMenuSignal}
                searchTerm={searchTerm}
              />
            </div>
          </div>

          <div className="modal-buttons">
            <button
              onClick={() => handleHoldSubmit(data._id)}
              type="button"
              className="modal-btn"
            >
              {" "}
              Hold{" "}
            </button>

            <TableKotSummaryModal
              open={modalHold}
              onCancel={() => setModalHold(false)}
              cancelButtonProps={{ style: { display: "none" } }}
              okButtonProps={{ style: { display: "none" } }}
              kotData={selectedItems}
              TotalPrice={totalPrice}
              orderData={data}
              onKotIdChange={handleModalHoldOpen}
            />

            <button
              onClick={handleModalKotOpen}
              type="button"
              className="modal-btn"
            >
              {" "}
              KOT{" "}
            </button>

            <TableKotSummaryModal
              open={modalKot}
              onCancel={() => setModalKot(false)}
              sendClearMenuSignal={sendClearMenuSignal}
              cancelButtonProps={{ style: { display: "none" } }}
              clearItems={clearItems}
              okButtonProps={{ style: { display: "none" } }}
              kotData={selectedItems}
              TotalPrice={totalPrice}
              orderData={data}
              // onKotIdChange={handleKotIdChange}
            />

            {ordered.length > 0 && ordered[0].kotStatus ? (
              <div className="" style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleSendToPos}
                  type="button"
                  className="modal-btn"
                  style={{ width: "250px" }}

                  // hidden={data && data.orderMode === "Swiggy"||"Zomato"||"Bromag"||"Others"}
                >
                  <FaPrint className="btn-icon " /> Send to 
                </button>
                <select
                  className="form-select"
                  value={selectedPOSManager}
                  onChange={(e) => setSelectedPosManager(e.target.value)}
                >
                  <option value="">Select a POS</option>
                  {registeredPosManager.map((posManager) => (
                    <option key={posManager._id} value={posManager._id}>
                      {posManager.username}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <button
                onClick={handleSendToPos}
                type="button"
                className="modal-btn1"
                disabled={true}
              >
                <IoMdPrint className="btn-icon" /> Send to 
              </button>
            )}

            {/* dropdown to select the employee */}

            <TableOrderSummeryModal
              open={modalPrintBill}
              onCancel={() => setModalPrintBill(false)}
              cancelButtonProps={{ style: { display: "none" } }}
              okButtonProps={{ style: { display: "none" } }}
              ordered={ordered}
              tableName={data.tableName}
              posManager={selectedPOSManager}
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default CaptainMenu;
