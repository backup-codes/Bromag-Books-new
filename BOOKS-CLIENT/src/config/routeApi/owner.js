import { restaurantOwnerAxiosInstance } from "../apiInterceptor";

const EmployDetails = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("employDetails");
    return response;
  } catch (error) {
    console.log(error);
  }
};
// Get all the employees
const getAllRegisteredPos = async () => {
  try {
    return await restaurantOwnerAxiosInstance.get("getAllRegisteredPos");
  } catch (err) {
    console.log(err);
  }
};

export const getStockOutDetails = async () => {
  try {
    return await restaurantOwnerAxiosInstance.get("getStockOutDetails");
  } catch (err) {
    console.log(err);
  }
};

export const commodityStockOut = async ({
  data: { description, quantity },
  _id,
  date,
  commodity,
  stockInward,
  VendorId,
  amount,
  billURL,
  createdAt,
  restaurant,
  unit,
  updatedAt,
  __v,
}) => {
  const payload = {
    description,
    quantity,
    StockIn_ID: _id,
    // date,
    commodity,
    // stockInward,
    // VendorId: VendorId._id,
    // amount,
    // billURL,
    // createdAt,
    restaurant,
    unit,
    // updatedAt,
  };

  return await restaurantOwnerAxiosInstance.post("commodityStockOut", payload);
};

const getAllVendors = async () => {
  return await restaurantOwnerAxiosInstance.get("getAllvendors");
};
const getCommoditiesOfRestaurant = async () => {
  return await restaurantOwnerAxiosInstance.get("getCommidities");
};

export const getStockInDetails = async () => {
  return await restaurantOwnerAxiosInstance.get("getStockInDetails");
};

const AddEmployeeAccess = async (
  { username, password, email, accessAs },
  image
) => {
  try {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("accessAs", accessAs);

    const response = await restaurantOwnerAxiosInstance.post(
      `addAccess`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchAcessDetail = async (ID) => {
  try {
    return await restaurantOwnerAxiosInstance.get(`fetchAcessDetail/${ID}`);
  } catch (err) { }
};
const updateEmployeeAccess = async ({
  username,
  email,
  ID,
  password,
  accessAs,
  image,
}) => {
  try {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("username", username);
    formData.append("ID", ID);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("accessAs", accessAs);

    return await restaurantOwnerAxiosInstance.patch(
      "updatEmployeAccess",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const AccessedEmployees = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "accessedEmployees",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getEmployeesData = async () => {
  return await restaurantOwnerAxiosInstance.get(`customerDetails`);
};

const getCustomerDetailByID = async (id) => {
  return await restaurantOwnerAxiosInstance.get(`getCustomerDetail/${id}`);
};

const DeleteEmployeeAccess = async (employId) => {
  try {
    const response = await restaurantOwnerAxiosInstance.delete(
      "deleteEmployeeAccess",
      { data: { employId: employId } }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const DeleteEmploymentData = async (employId) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "deleteEmploymentData",
      { employId: employId }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const AddEmploymentData = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "addEmploymentDetails",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const addMenuCategory = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "addMenuCategory",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const AddEmployDetails = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "addEmployDetails",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const AddVenderDetails = async ({
  AccountNumber,
  BranchCode,
  GST,
  category,
  contact,
  ifsc,
  image,
  vendorName,
}) => {
  try {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("AccountNumber", AccountNumber);
    formData.append("BranchCode", BranchCode);
    formData.append("GST", GST);
    formData.append("category", category);
    formData.append("contact", contact);
    formData.append("vendorName", vendorName);
    formData.append("ifsc", ifsc);

    return await restaurantOwnerAxiosInstance.post(
      "addVenderDetails",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const handledeleteVendor = async (vendor_id) => {
  try {
    return await restaurantOwnerAxiosInstance.delete("deleteVendor", {
      data: { vendor_id: vendor_id },
    });
  } catch (err) {
    console.log(err);
  }
};

const UpdateVenderDetails = async ({
  id,
  AccountNumber,
  BranchCode,
  GST,
  category,
  contact,
  ifsc,
  image,
  vendorName,
}) => {
  try {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("AccountNumber", AccountNumber);
    formData.append("BranchCode", BranchCode);
    formData.append("GST", GST);
    formData.append("category", category);
    formData.append("contact", contact);
    formData.append("vendorName", vendorName);
    formData.append("ifsc", ifsc);
    formData.append("id", id);

    return await restaurantOwnerAxiosInstance.post(
      "updateVenderDetails",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getVendorCategories = async () => {
  try {
    return await restaurantOwnerAxiosInstance.get("getAllVendorCategories");
  } catch (err) {
    console.log(err);
  }
};

const getVendorData = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getVenderDetails");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const postIngredientsDetails = async ({
  vendorId,
  description,
  commodities,
  totalAmount,
  image,
  paymentMode,
}) => {
  try {
    const formData = new FormData();
    const commoditiesString = JSON.stringify(commodities);

    formData.append("image", image);
    formData.append("description", description);
    formData.append("vendorDetails", vendorId);
    formData.append("commodities", commoditiesString);
    formData.append("totalAmount", totalAmount);
    formData.append("paymentMode", paymentMode);

    return await restaurantOwnerAxiosInstance.post(
      "addIngredientsDetails",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getIngredientsData = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "getIngredientsData"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const VendorDashboard = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "vendor-management"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const StockDashboard = async () => {
  try {
    return await restaurantOwnerAxiosInstance.get("StockDashboard");
  } catch (error) {
    console.log(error);
  }
};


const GenerateBill = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post("generateBill", data);
    return response;
  } catch (error) {
    console.error("error GenerateBill:", error);
    throw error
  }
}
const FetchBill = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post("fetchBill", data);
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
}
const FetchHoldBills = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(`fetchHoldBills?type=${data}`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const FetchCompletedBills = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(`fetchCompletedBills?type=${data}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const GetTotalBillsEitherForTakeAwayOrOnlineOrders = async (page, type) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(`getTotalBillsEitherForTakeAwayOrOnlineOrders?page=${page}&type=${type}`);
    return response;
  } catch (error) {
    console.error("error in GetTotalBillsEitherForTakeAwayOrOnlineOrders owner.js:", error);
    throw error
  }
}
const UpdateBill = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.patch("updateBill", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const DeleteBill = async (data) => {
  try {
    // console.log("HERERE");
    const response = await restaurantOwnerAxiosInstance.post("deleteBill", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

// Get Total And Hold Orders Bill Count Either For TakeAway or For Online Orders
const GetTotalAndHoldOrdersCountEitherForTakeAwayOrForOnline = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(`getTotalAndHoldOrdersCountEitherForTakeAwayOrForOnline?type=${data}`);
    return response;
  } catch (error) {
    console.error("Error in GetTotalAndHoldOrdersCountEitherForTakeAwayOrForOnline owner.js :", error);
    throw error;
  }
}

// Get Tables Hold And Available Count
const GetTablesHoldAndAvailableCount = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getTablesHoldAndAvailableCount", data);
    return response;
  } catch (error) {
    console.error("Error in GetTablesHoldAndAvailableCount owner.js :", error);
    throw error;
  }
}

// Get Hold Table Data
const GetTablesOnHoldData = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getTablesOnHoldData", data);
    return response;
  } catch (error) {
    console.error("Error in GetTablesOnHoldData owner.js :", error);
    throw error;
  }
}

// Get Hold And Available Table Data
const GetHoldAndAvailableTableData = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getHoldAndAvailableTableData", data);
    return response;
  } catch (error) {
    console.error("Error in GetHoldAndAvailableTableData owner.js :", error);
    throw error;
  }
}

const AddOpeningReport = async (data) => {
  try {
    console.log("HERERE");
    const response = await restaurantOwnerAxiosInstance.post("addOpeningReport", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const GetOpeningReports = async (data) => {
  try {
    console.log("HERERE");
    const response = await restaurantOwnerAxiosInstance.get("getOpeningReports", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const IsOpeningReportCreatedToday = async (data) => {
  try {
    console.log("HERERE");
    const response = await restaurantOwnerAxiosInstance.get("isOpeningReportCreatedToday", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const AddExpense = async (data) => {
  try {
    console.log("HERERE");
    const response = await restaurantOwnerAxiosInstance.post("addExpense", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const GetExpenses = async (data) => {
  try {
    console.log("HERERE");
    const response = await restaurantOwnerAxiosInstance.get("getExpenses", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const AddClosingReport = async (data) => {
  try {
    console.log("HERERE");
    const response = await restaurantOwnerAxiosInstance.post("addClosingReport", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const GetClosingReports = async (data) => {
  try {
    console.log("HERERE");
    const response = await restaurantOwnerAxiosInstance.get("getClosingReports", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const IsClosingReportCreatedToday = async (data) => {
  try {
    console.log("HERERE");
    const response = await restaurantOwnerAxiosInstance.get("isClosingReportCreatedToday", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const GetPassbookData = async (data) => {
  try {
    console.log("HERERE");
    const response = await restaurantOwnerAxiosInstance.post("getPassbookData", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const GetCardAnalytics = async (data) => {
  try {
    console.log("card owner");
    const response = await restaurantOwnerAxiosInstance.post("getCardAnalytics", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const GetDashboardAnalytics = async (data) => {
  // console.log('data2:', data)
  try {
    console.log("dashboard owner");
    const response = await restaurantOwnerAxiosInstance.post("getDashboardAnalytics", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const OnlineOrderDataOrderManagement = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getOnlineOrderData");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getTotalDineInOrderData = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("TotalDineInOrderData");
    return response;
  } catch (error) {
    console.log(error);
  }
};


const GenerateKOT = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post("generateKOT", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const AddAggregator = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post("addAggregator", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const GetAllAggregators = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getAllAggregators", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}


const AddCuisine = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post("addCuisine", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const GetAllCuisines = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getAllCuisines", data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


const AddMenuItem = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post("addMenuItem", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const DeleteMenuItem = async (menuItemId) => {
  try {
    const response = await restaurantOwnerAxiosInstance.delete(`deleteMenuItem/${menuItemId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const GetAllMenuItems = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getAllMenuItems", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const UpdateMenuItemAvailableStatus = async (data) => {
  // console.log('data:', data)
  try {
    const response = await restaurantOwnerAxiosInstance.put("updateMenuItemAvailableStatus", data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const MenuCategory = async () => {
  try {
    console.log("Here");
    const response = await restaurantOwnerAxiosInstance.get("getMenuCategory");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const DeleteMenuCategory = async (categoryId) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "deleteMenuCategory",
      { categoryId: categoryId }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getMenuCategoryById = async (categoryId) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      `getToEditMenuCategory/${categoryId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateMenuCategory = async (categoryId, data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      `updateMenuCategory/${categoryId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const MenuData = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getMenuData");

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const CustomerDetailssearchQuery = async (searchquery) => {
  try {

    return await restaurantOwnerAxiosInstance.get(
      `customerDetail/${searchquery}`
    );
  } catch (err) {
    console.log(err);
  }
};

const AddMenuData = async ({
  Cuisine,
  Item,
  Others,
  Swiggy,
  restaurant,
  ItemImage,
  Zomato,
  description,
  itemType,
  subCuisine,
  Bromag,
  Quantity,
}) => {
  try {
    const formData = new FormData();
    formData.append("ItemImage", ItemImage);
    formData.append("Cuisine", Cuisine);
    formData.append("subCuisine", subCuisine);
    formData.append("Item", Item);
    formData.append("description", description);
    formData.append("itemType", itemType);
    formData.append("Quantity", Quantity);
    formData.append("restaurant", JSON.stringify(restaurant));
    formData.append("Zomato", JSON.stringify(Zomato));
    formData.append("Swiggy", JSON.stringify(Swiggy));
    formData.append("Others", JSON.stringify(Others));
    formData.append("Bromag", JSON.stringify(Bromag));

    const response = await restaurantOwnerAxiosInstance.post(
      "addMenuData",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateMenuItem = async ({
  Quantity,
  plateform,
  itemId,
  actualPrice,
  discountPrice,
  Cuisine,
  Item,
  ItemImage,
  description,
  itemType,
  subCuisine,
}) => {
  try {
    const formData = new FormData();
    formData.append("ItemImage", ItemImage);
    formData.append("Cuisine", Cuisine);
    formData.append("subCuisine", subCuisine);
    formData.append("Item", Item);
    formData.append("description", description);
    formData.append("itemType", itemType);
    formData.append("actualPrice", actualPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("plateform", plateform);
    formData.append("itemId", itemId);
    formData.append("Quantity", Quantity);

    console.log(formData, "heyey");

    const response = await restaurantOwnerAxiosInstance.patch(
      "updateMenuData",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
export const UpdateOnlineAggregatorPrices = async ({
  plateform,
  itemId,
  actualPrice,
  discountPrice,
}) => {
  try {


    const data = {
      plateform, itemId, actualPrice, discountPrice
    }


    console.log(data, "formdataa");

    const response = await restaurantOwnerAxiosInstance.patch(
      "updateOnlineAggregatorPrices",
      { data }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const UpdateMenuActive = async (itemId, isShared, plateform) => {
  console.log(plateform);
  const response = await restaurantOwnerAxiosInstance.put(
    `updateMenuActive/${itemId}`,
    { isShared, plateform }
  );
  return response;
};

const VendorDateFilter = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "vendorDateFilter",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const MenuSharingUpdates = async (categoryName, plateform) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "menuSharingUpdates",
      { categoryName, plateform }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const PublishMenu = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "publishMenu",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const quantityIncrementAtMenu = async (data) => {
  try {
    console.log(data, "fropm quantity api");
    const response = await restaurantOwnerAxiosInstance.post(
      "quantityIncrementAtMenu",
      { data }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const DeleteMenu = async (menuId, plateform) => {
  try {
    console.log(menuId, plateform, "calledd menu");
    const response = await restaurantOwnerAxiosInstance.post("deleteMenu", {
      menuId: menuId,
      plateform: plateform,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const MenuDashboard = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("menu-management");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const MenuDateFilter = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "menuDateFilter",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getMenuById = async (menuId, plateform) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      `getToEditMenu/${menuId}`,
      {
        params: {
          plateform: plateform,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};


export const GetRestaurantDetail = async () => {
  try {
    return await restaurantOwnerAxiosInstance.get("GetRestaurantDetail");
  } catch (err) {
    console.log(err);
  }
}


const getAllSalesReport = async (POSManager, date) => {
  try {
    return await restaurantOwnerAxiosInstance.get("getAllSalesReport", {
      params: { POSManager, date },
    });
  } catch { }
};

const updateMenu = async (menuId, data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      `updateMenu/${menuId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const PassBookData = async () => {
  try {
    return await restaurantOwnerAxiosInstance.get("getPassBookData");
  } catch (error) {
    console.log(error);
  }
};

export const TodaysPassbookData = async (posManager) => {
  try {
    return await restaurantOwnerAxiosInstance.get("TodaysAdminPassbookData", {
      params: { posManager },
    });
  } catch (error) {
    console.log(error);
  }
};

const AdminPassbookDateFilter = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "adminPassbookDateFilter",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const OnlineOrderData = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getOnlineData");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const TakeAwayDataForAdmin = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "getTakeAwayForAdmin"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
const HighestBillingAmountDataForAdmin = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "getHighestBillingAmountPerHour"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
const getHourlySalesData = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "getHourlySalesData"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
const DineInDataForAdmin = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "getDineInForAdmin"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const TotalSalesData = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "getTotalSalesData"
    );
    console.log("TotalSalesData", response)
    return response;
  } catch (error) {
    console.log(error);
  }
};

const SalesDashboard = async (dates) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "getSalesDashboardData",
      { params: dates }
    );
    console.log("owner", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const AddTableData = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "addTableData",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// addNewTableData() for table management without captain
const AddNewTableData = async (data) => {
  try {
    console.log('data2:', data)
    const response = await restaurantOwnerAxiosInstance.post("addNewTableData", data);
    // console.log('response4:', response)
    return response;
  } catch (error) {
    // console.log("error4 : ", error);
    throw error;
  }
}

// getNewTableData() for table management without captain
const GetNewTableData = async (page, sortBy) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(`getNewTableData?page=${page}&sortBy=${sortBy}`);
    return response;
  } catch (error) {
    console.log("error in GetNewTableData :", error);
    throw error
  }
}

// getNewTableDatCount() for table management without captain
const GetNewTableDatCount = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(`getNewTableDatCount`, data);
    return response;
  } catch (error) {
    console.log("error in GetNewTableDatCount :", error);
    throw error
  }
}

// get single table data

const GetSingleTableInfo = async (tableId) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(`getSingleTableInfo/${tableId}`, tableId);
    return response;
  } catch (error) {
    console.error("error in GetSingleTableInfo :", error);
    throw error
  }
}

const UpdateTableForTableManagement = async (tableId, data) => {
  try {
    console.log('data4:', tableId, data)
    const response = await restaurantOwnerAxiosInstance.put(`updateTableForTableManagement/${tableId}`, data);
    return response;
  } catch (error) {
    console.error("error in UpdateTableForTableManagement :", error);
    throw error
  }
}

const TableDataAtAdmin = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "getTableDataAtAdmin"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const UpdateTableActive = async (tableId, isShared) => {
  const response = await restaurantOwnerAxiosInstance.put(
    `updateTableActive/${tableId}`,
    { isShared }
  );
  return response;
};

const GetTableById = async (tableId) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      `getToEditTableData/${tableId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const UpdateTableData = async (tableId, data) => {
  try {

    const response = await restaurantOwnerAxiosInstance.post(
      `updateTableData/${tableId}`,
      data
    );
    return response;


  } catch (error) {
    console.log(error);
  }
};

const DeleteTable = async (tableId) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post("deleteTable", {
      tableId: tableId,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const OrderDataAtAdmin = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("getOrderData");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const CaptainList = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get("captainList");
    return response;
  } catch (error) {
    console.log(error);
  }
};




export const TodaysOrderDataOfCap = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      `TodaysOrderDataOfCap`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
const OrderDataOfCap = async (captainId) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      `getOrderDataOfCap/${captainId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const SalesDataOfCap = async () => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      "getSalesDataOfCap"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const CaptainPassFilter = async (data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      "captainPassFilter",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getEmploymentDetailsById = async (employId) => {
  try {
    const response = await restaurantOwnerAxiosInstance.get(
      `getToEditEmploymentDetails/${employId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateEmploymentDetails = async (employId, data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      `updateEmploymentDetails/${employId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateEmploymentData = async (employId, data) => {
  try {
    const response = await restaurantOwnerAxiosInstance.post(
      `updateEmploymentData/${employId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  EmployDetails,
  AddEmployeeAccess,
  AccessedEmployees,
  DeleteEmployeeAccess,
  AddEmploymentData,
  AddVenderDetails,
  getVendorData,
  postIngredientsDetails,
  getIngredientsData,
  VendorDashboard,
  AddEmployDetails,
  DeleteEmploymentData,
  addMenuCategory,
  MenuCategory,
  UpdateVenderDetails,
  DeleteMenuCategory,
  getMenuCategoryById,
  updateMenuCategory,
  MenuData,
  AddMenuData,
  UpdateMenuActive,
  VendorDateFilter,
  MenuSharingUpdates,
  PublishMenu,
  quantityIncrementAtMenu,
  DeleteMenu,
  MenuDashboard,
  MenuDateFilter,
  getMenuById,
  updateMenu,
  PassBookData,
  AdminPassbookDateFilter,
  OnlineOrderData,
  getEmployeesData,
  getCustomerDetailByID,
  updateEmployeeAccess,
  fetchAcessDetail,
  TakeAwayDataForAdmin,
  DineInDataForAdmin,
  TotalSalesData,
  HighestBillingAmountDataForAdmin,
  getHourlySalesData,
  SalesDashboard,
  AddTableData,
  AddNewTableData,
  GetNewTableData,
  GetNewTableDatCount,
  GetSingleTableInfo,
  UpdateTableForTableManagement,
  TableDataAtAdmin,
  getAllSalesReport,
  UpdateTableActive,
  UpdateTableData,
  GetTableById,
  DeleteTable,
  OrderDataAtAdmin,
  CaptainList,
  getVendorCategories,
  handledeleteVendor,
  getAllVendors,
  getCommoditiesOfRestaurant,
  OrderDataOfCap,
  SalesDataOfCap,
  CaptainPassFilter,
  getEmploymentDetailsById,
  updateEmploymentDetails,
  updateEmploymentData,
  getAllRegisteredPos,
  GenerateBill,
  FetchBill,
  FetchHoldBills,
  FetchCompletedBills,
  GetTotalAndHoldOrdersCountEitherForTakeAwayOrForOnline,
  GetTotalBillsEitherForTakeAwayOrOnlineOrders,
  UpdateBill,
  GenerateKOT,
  DeleteBill,
  GetTablesHoldAndAvailableCount,
  GetTablesOnHoldData,
  GetHoldAndAvailableTableData,
  AddOpeningReport,
  GetOpeningReports,
  IsOpeningReportCreatedToday,
  AddExpense,
  GetExpenses,
  AddClosingReport,
  GetClosingReports,
  IsClosingReportCreatedToday,
  GetPassbookData,
  GetCardAnalytics,
  GetDashboardAnalytics,
  OnlineOrderDataOrderManagement,
  getTotalDineInOrderData,
  AddAggregator,
  GetAllAggregators,
  AddCuisine,
  GetAllCuisines,
  AddMenuItem,
  DeleteMenuItem,
  GetAllMenuItems,
  UpdateMenuItemAvailableStatus
};