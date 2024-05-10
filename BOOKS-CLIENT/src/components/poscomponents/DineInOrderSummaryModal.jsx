import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { useEffect, useState } from "react";
import { PrintBill, posDashboard } from "../../config/routeApi/pos";
import {
  calculateGST,
  formatDate,
  toastError,
  toastSuccess,
} from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

const DineInOrderSummaryModal = (props) => {
  const { orderDetails } = props;
  const { KotItems, Amount, billId, date, paymentMethod } = orderDetails;

  const navigate = useNavigate();

  const [manager, setManager] = useState({});
  const [restaurant, setRestaurant] = useState({});

  const dateObject = new Date(date);

  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDateTime = dateObject.toLocaleDateString("en-US", options);

  useEffect(() => {
    const handleManagerData = async () => {
      try {
        const response = await posDashboard();
        if (response.data.success) {
          setManager(response.data.ManagerData);
          setRestaurant(response.data.RestaurantData);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleManagerData();
  }, []);

  useEffect(() => {
    console.log("Restaurant Data:", restaurant);
    console.log("Username:", restaurant.username);
    console.log("Address:", restaurant.address);
  }, [restaurant]);

  const { gstAmount, grandTotal } = calculateGST(Amount);

  const handleOrderSubmit = async () => {
    try {
      const restaurantAddressHtml =
        restaurant.address && restaurant.address.length > 0
          ? restaurant.address
              .map(
                (addressItem, index) =>
                  `<div key=${index}>
          <p>
            ${addressItem.building}, ${addressItem.city}, ${addressItem.pin}, ${addressItem.district}, ${addressItem.state}
          </p>
          <p>Phone: ${addressItem.phone}</p>
        </div>`
              )
              .join("")
          : "";
      const printWindow = window.open("", "_blank");
      printWindow.document.write(
        `

      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title> </title>

          <style>

          .body-print{
            width:300px;
          }
          .title {
            text-align: center;
            font-weight: 700;
            color: #393939;
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
            text-transform: uppercase;
            margin:0px
          }
          
          .bill-header {
            width: 100%;
          
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .restaurant-header {
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 15px;
            p {
              font-size: 12px;
              font-weight: 500;
              margin-bottom: 0px;
            }
          }
          .header-div {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .header-info > p {
            font-size: 12px;
            margin: 0px;
          }

         
          .summary-heading {
            width: 100%;
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            gap:10px;
            align-items: center;
            p {
              font-weight: 700;
            }
          }
          .menu-item-name{
            width:100%;
          }
        
          .food-check{
            width: 100%;
            display: grid;
            flex-direction: row;
            grid-template-columns: repeat(3, 50px);
            justify-items: center;
        
          }
         
          .single-item {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid #c1c1c1;
            margin-bottom: 5px;
            p {
              font-size: 16px;
              margin-bottom: 5px;
            }
          }
        
          .quantity {
            text-align: center;
           
            color: #b6b6b6;
          }
          .price {
            text-align: center;
          
            font-weight: 600;
            font-size: 14px;
          }
          .total {
            text-align: center;
            
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
              font-weight: 700;
              font-size: 16px;
              margin:5px 0;
            }
          }
          .gst {
            p {
              font-weight: 400;
              font-size: 14px;
              margin-bottom: 0px;
            }
          }
     
        </style>

        </head>
        <body>
        <div class=body-print>
          <h4 class="title">Order Summary</h4>
          <div class="form-div">
            <div class="bill-header">
              <div class="restaurant-header">
                <h5>${restaurant.username || "Restaurant"}</h5>
                ${
                  restaurant.address && restaurant.address.length > 0
                    ? restaurant.address
                        .map(
                          (addressItem, index) =>
                            `<div key=${index}>
                        <p>${addressItem.building}, ${addressItem.city}, ${addressItem.pin}, ${addressItem.district}, ${addressItem.state}</p>
                        <p>Phone: ${addressItem.phone}</p>
                      </div>`
                        )
                        .join("")
                    : "<p>No address found</p>"
                }
              </div>

              <div class="header-div">
                  <div class="header-info">
                  <p>BILL NO: ${orderDetails.billId}</p>
                  <p>DATE: ${formatDate(orderDetails.date)}</p>
                   
                   
                  </div>
                  <div class="header-info">
            
                    <p>POS ID: ${manager && manager.employeeId}</p>
                    <p>Table : ${orderDetails && orderDetails.tableNumber}</p>
                  </div>
              </div>
            </div>

            <div class="summary-items">
              <div class="summary-heading">
                <p class="menu-item-name">Menu Item</p>

                <div class="food-check">
                  <p>Qty</p>
                  <p>Price</p>
                  <p>Value</p>
                </div>
               
                
              </div>
              ${orderDetails?.KotItems?.map((val, index) => {
                // const subtotal = val.quantity * val.price;

                return `<div key=${index} class="single-item">
                          <p class="menu-item-name">${val.item}</p> 
                          <div class="food-check">
                            <p class="quantity">x${val.quantity}</p>
                            <p class="price">
                            
                            &#x20B9; ${val.price}
                            </p>
                            <p class="price">
                            &#x20B9; ${val.quantity * val.price}
                            </p>
                          </div>
                        </div>`;
              })}
            </div>

            <div class="total">
              <p>SubTotal Amount</p>
              <p>
               &#x20B9; ${orderDetails.Amount && orderDetails.Amount}
              </p>
            </div>
            <div class="total gst">
              <p>Gst Amount</p>
              <p>
              &#x20B9; ${gstAmount}
              </p>
            </div>

            <div class="total">
              <p>Total Amount</p>
              <p>
              &#x20B9; ${grandTotal}
              </p>
            </div>

            <div class="restaurant-header" style={{ marginTop: "20px" }}>
              <h6>thank you for your visit!</h6>
              <p>have a nice day!</p>
            </div>
          </div>
        </div>

        </body>
        </html>

        `
      );

      printWindow.document.close();
      printWindow.print();

      const data = {
        userId: orderDetails._id,
        amount: Amount,
        tableId: orderDetails.tableId._id
      };


      const response = await PrintBill(data);

      if (response.data.success) {
        toastSuccess("Order saved");pos-dinein

        navigate("/pos-dashboard");
        props.onCancel();
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper centered {...props}>
      <div>
        <h4 className="title">Order Summary</h4>
        <div className="form-div">
          <div className="bill-header">
            <div className="restaurant-header">
              <h5>{restaurant.username || "Restaurant"}</h5>
              {restaurant.address && restaurant.address.length > 0 && (
                <div>
                  {restaurant.address.map((addressItem, index) => (
                    <div key={index}>
                      <p>
                        {addressItem.building}, {addressItem.city},{" "}
                        {addressItem.pin},{addressItem.district},{" "}
                        {addressItem.state}
                      </p>

                      <p>Phone: {addressItem.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="header-div">
              <div className="header-info">
                <p>BILL NO: {billId}</p>
                <p>DATE&TIME: {formattedDateTime}</p>
              </div>
              <div className="header-info">
                <p>TABLE NO: {orderDetails.tableNumber}</p>
                <p>CAPTAIN : {orderDetails.tableId.captainId}</p>
              </div>
            </div>
          </div>
          <div className="summary-items">
            <div className="summary-heading">
              <p className="menu-item-name">Menu Item</p>
              <p style={{ width: "15%", textAlign: "center" }}>Quantity</p>
              <p style={{ width: "15%", textAlign: "center" }}>Price</p>
              <p style={{ width: "15%", textAlign: "center" }}>Value</p>
            </div>
            {KotItems.map((val, index) => {
              const subtotal = val.quantity * val.price;
              return (
                <div key={index} className="single-item">
                  <p className="menu-item-name">{val.item}</p>
                  <p className="quantity">x{val.quantity}</p>
                  <p className="price">
                    <MdCurrencyRupee />
                    {val.price}
                  </p>
                  <p className="price">
                    <MdCurrencyRupee />
                    {subtotal}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="total">
            <p>SubTotal Amount</p>
            <p>
              <MdCurrencyRupee />
              {Amount && Amount}
            </p>
          </div>
          <div className="total gst">
            <p>Gst Amount</p>
            <p>
              <MdCurrencyRupee />
              {gstAmount && gstAmount}
            </p>
          </div>

          <div className="total">
            <p>Total Amount</p>
            <p>
              <MdCurrencyRupee />
              {grandTotal && grandTotal}
            </p>
          </div>
          <div className="total gst">
            <p style={{ fontSize: "12px", margin: "10px 0px" }}>
              POS ID: {manager && manager.employeeId}
            </p>
          </div>
          <div className="restaurant-header" style={{ marginTop: "20px" }}>
            <h6>thank you for your visit!</h6>
            <p>have a nice day!</p>
          </div>

          <div className="form-btn">
            <button onClick={handleOrderSubmit}>
              <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
              Print Bill
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default DineInOrderSummaryModal;
