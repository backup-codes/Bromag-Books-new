
import {
    CheckIcon,
    CrossIcon,
    DownloadIcon,
    EyeIcon,
    Share2Icon,
    X,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { useState, useMemo, memo, useCallback, useEffect } from "react";
import { Input } from "../ui/input";
import { DeleteBill, GenerateKOT, UpdateBill } from "@/config/routeApi/owner";
import { CreateNewKotAPI, GetKotUniqueIdAPI } from "@/config/routeApi/Owner/kot.owner.api";
import { UpdateBillWithCompleteStatusAPI, UpdateBillWithHoldStatusAPI, DeleteOrderBillAPI } from "@/config/routeApi/Owner/billing.owner.api";
import { toastError, toastSuccess } from "@/helpers/helpers";
import { redirect, useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger } from "../ui/dialog";
// import ViewBill from "./ViewBill";
// import DownloadBill from "./DownloadBill";
import ViewKOT from "./ViewKOT";
import ViewBillByMe from "./ViewBillByMe";

const UpdateOrderBill = memo(({ bill, billItems, addItem, subtractItem, handleBillItemsWhenKotMovedToKitchen }) => {
    // console.log('billItems:', billItems)
    // console.log('bill:', bill)
    const [instructions, setInstructions] = useState([]);
    // console.log('instructions:', instructions)
    const [printBillStatus, setPrintBillStatus] = useState(!!(bill?.items?.length));
    const navigate = useNavigate();
    const [paymentMode, setPaymentMode] = useState("cash");
    // console.log('paymentMode:', paymentMode)
    const [inputInstruction, setInputInstruction] = useState("");
    const [showInstruction, setShowIntruction] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // console.log('isDialogOpen:', isDialogOpen)
    const [kotUniqueId, setKotUniqueId] = useState("")
    // console.log('isDialogOpen:', isDialogOpen)
    const address = bill?.restrauntAddress[0];
    const printAddress = `${address.building}, ${address.district}, ${address.city}, ${address.state}`;

    const valueCalculator = useMemo(() => {
        const valueObject = billItems.reduce((value, item) => {
            value.grossValueTotal += item.quantity * item.actualPrice;
            value.discountTotal += item.discountPrice * item.quantity;
            return value;
        }, {
            grossValueTotal: 0,
            discountTotal: 0,
            netValue: 0,
            tax: 0,
            totalPayValValue: 0,
            roundOff: 0
        })
        // console.log('valueObject:', valueObject)
        valueObject.netValue = valueObject.grossValueTotal - valueObject.discountTotal
        let taxRate = 5;
        valueObject.tax = (taxRate / 100) * valueObject.netValue;
        valueObject.totalPayValValue = valueObject.netValue + valueObject.tax
        // console.log('valueObject:', valueObject)
        if (paymentMode === "cash") {
            valueObject.roundOff = valueObject.totalPayValValue - Math.round(valueObject.totalPayValValue);
            valueObject.roundOff = valueObject.roundOff * -1
            // console.log('valueObject.roundOff:', valueObject.roundOff)
            valueObject.totalPayValValue = Math.round(valueObject.totalPayValValue);
            // console.log('valueObject.totalPayValValue:', valueObject.totalPayValValue)
        }
        return valueObject;
    }, [billItems, paymentMode])
    // console.log('valueCalculator:', valueCalculator)

    const removeInstruction = (index) => setInstructions((prev) => prev.filter((instruct, idx) => index !== idx));

    const addInstruction = () => {
        setInstructions((prev) => [...prev, inputInstruction]);
        setInputInstruction("");
        setShowIntruction(false);
    };

    const handleOpenDialog = useCallback(() => {
        // console.log('billItems in:', billItems)
        if (billItems.length > 0) {
            setIsDialogOpen(!isDialogOpen);
            // console.log("here1")
        } else {
            // console.log("here2")
            setIsDialogOpen(false);
            toastError("Please add some item into your cart before sending to KOT!");
        }
    }, [isDialogOpen, billItems])

    useEffect(() => {
        getKotUniqueIdFn();
    }, [])
    const getKotUniqueIdFn = async () => {
        try {
            const { data } = await GetKotUniqueIdAPI({ name: bill?.restrauntName, street: bill?.billNo })
            console.log('data:', data)
            if (data?.success) {
                setKotUniqueId(data?.getKotUniqueId)
            }
        } catch (error) {
            console.error("error in getKotUniqueIdFn :", error);
            toastError(error?.response?.data?.message);
        }
    }

    const handleCreateNewKotAPI = useCallback(async () => {
        try {
            const { data } = await CreateNewKotAPI({
                billId: bill?._id,
                billItems: billItems,
                kotUniqueId: kotUniqueId,
                instructions: instructions,
                paymentMode: paymentMode
            })
            // console.log('data:', data)
            if (data?.success) {
                toastSuccess(data?.message);
                handleBillItemsWhenKotMovedToKitchen();
                getKotUniqueIdFn();
                setPrintBillStatus(true);
                setIsDialogOpen(false);
                setInstructions([]);
            }
        } catch (error) {
            console.error("error in handleCreateNewKotAPI :", error);

        }
    }, [billItems, kotUniqueId, instructions])

    const handlePrintBill = async () => {
        try {
            const { data } = await UpdateBillWithCompleteStatusAPI({
                billId: bill?._id,
                status: "COMPLETED"
            })
            // console.log('data:', data)
            if (data?.success) {
                toastSuccess(data?.message);
                setTimeout(() => {
                    navigate("/dashboard/billing-management")
                }, 2000)
            }
        } catch (error) {
            console.error("error in handlePrintBill :", error);
        }
    }

    const handleHoldBill = async () => {
        try {
            const { data } = await UpdateBillWithHoldStatusAPI({
                billId: bill?._id,
                status: "HOLD"
            })
            console.log('data:', data)
            if (data?.success) {
                toastSuccess(data?.message);
                setTimeout(() => {
                    navigate("/dashboard/billing-management")
                }, 2000)
            }
        } catch (error) {
            console.error("error in handlePrintBill :", error);
        }
    }

    const handleDeleteBill = async () => {
        try {
            const { data } = await DeleteOrderBillAPI(bill?._id)
            console.log('data:', data)
            if (data?.success) {
                toastSuccess(data?.message);
                setTimeout(() => {
                    navigate("/dashboard/billing-management")
                }, 2000)
            }
        } catch (error) {
            console.error("error in handlePrintBill :", error);
        }
    }

    return (
        <div className="rounded-2xl w-full px-0 py-4 flex flex-col justify-between gap-3 bg-white shadow">
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xl font-semibold">{bill?.restrauntName}</p>
                    <p className="text-xs text-gray-500 w-1/2 text-center">
                        {printAddress}
                    </p>
                    <p className="text-sm text-gray-500">{"address.phone"}</p>
                </div>
                <div className="flex items-end gap-0 px-3 justify-between">
                    <div className="flex gap-1 text-[10px] w-1/3">
                        <div className="flex flex-col">
                            <p className="">Date</p>
                            <p className="">Time</p>
                            <p className="">Bill No</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="">: {new Date(bill?.date).toLocaleDateString()}</p>
                            <p className="">: {new Date(bill?.date).toLocaleTimeString()}</p>
                            <p className="">: {bill?.billNo}</p>
                        </div>
                    </div>
                    <p className="text-2xl text-center font-semibold">INVOICE</p>
                    <div className="w-1/3 flex gap-2 p-2 justify-end text-gray-600">
                        <Dialog>
                            <DialogTrigger>
                                <EyeIcon className="w-5 h- cursor-pointer" />
                            </DialogTrigger>
                            {/* <ViewBill
                                bill={"bill"}
                                billItems={"billItems"}
                                paymentMode={"paymentMode"}
                                instructions={"instructions"}
                            /> */}
                        </Dialog>
                        <Dialog>
                            <DialogTrigger>
                                <DownloadIcon className="w-5 h-5 cursor-pointer" />
                            </DialogTrigger>
                            {/* <DownloadBill
                                bill={"bill"}
                                billItems={"billItems"}
                                paymentMode={"paymentMode"}
                                instructions={"instructions"}
                            /> */}
                        </Dialog>
                        <Share2Icon className="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
                <div className="border-0 w-full">
                    <div className="w-full grid grid-cols-7 text-[12px] text-color-1F303C font-bold border-gray-500">
                        <div className="border-dashed w-[3rem]  border-1 border-r-0 h-6 uppercase text-center flex items-center justify-center">
                            S.NO
                        </div>
                        <div className="border-dashed relative w-[9.5rem] left-[-17px] border-1 border-x-0 h-6 uppercase col-span-2 text-center flex items-center justify-center">
                            Menu Name
                        </div>
                        <div className="border-dashed relative w-[5.5rem] left-[8.4px]  border-1 border-x-0 h-6 uppercase col-span-2 text-center flex items-center justify-center">
                            Portion
                        </div>
                        <div className="border-dashed relative border-1 w-[5rem] left-[-32px] flex items-center justify-center border-x-0 h-6 uppercase text-center">
                            Quantity
                        </div>
                        <div className="border-dashed relative w-[5rem] left-[-16px] border-1 border-l-0 h-6 uppercase flex items-center justify-center text-center">
                            Price
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-7 text-[12px] text-color-1F303C font-normal">
                        {billItems?.map((item, index) => (
                            <>
                                <div className="border-dashed border-1 w-[3rem] border-r-0 py-2 text-center flex items-center justify-center">
                                    {index + 1}
                                </div>
                                <div className="border-dashed relative w-[9.5rem] left-[-17px] border-1 border-x-0 py-2 col-span-2 text-center flex items-center justify-center">
                                    {item.name}
                                </div>
                                <div className="border-dashed relative w-[5.5rem] left-[8.4px] border-1 border-x-0 py-2 col-span-2 text-center flex items-center justify-center">
                                    {item.portion}
                                </div>
                                <div className="border-dashed relative left-[-32px] w-[5rem] border-1 flex py-2 items-center justify-center border-x-0  text-center gap-2">
                                    <span
                                        className="text-base cursor-pointer"
                                        onClick={() => subtractItem(item)}
                                    >
                                        -
                                    </span>
                                    {item.quantity}
                                    <span
                                        className="cursor-pointer text-base"
                                        onClick={() => addItem(item)}
                                    >
                                        +
                                    </span>
                                </div>
                                <div className="border-dashed relative w-[5rem] left-[-16px] border-1 border-l-0 py-2  flex items-center justify-center text-center">
                                    {(item.actualPrice - item.discountPrice) * item.quantity}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between px-3 uppercase text-xs">
                <div className="flex flex-col gap-1">
                    <p>Gross Value</p>
                    <p>Discount</p>
                    <p>Net Value</p>
                    <p>Taxes</p>
                    <p>Round Off</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p>{valueCalculator?.grossValueTotal}</p>
                    <p>{valueCalculator?.discountTotal}</p>
                    <p>{valueCalculator?.netValue}</p>
                    <p>{valueCalculator?.tax}</p>
                    <p>{valueCalculator?.roundOff}</p>
                </div>
            </div>
            <div className="flex justify-between px-3 uppercase text-sm font-bold border-dashed border-y border-gray-500">
                <div className="flex flex-col gap-1 py-2">
                    <p>Total Amount</p>
                </div>
                <div className="flex flex-col gap-1 py-2">
                    <p>{valueCalculator?.totalPayValValue}</p>
                </div>
            </div>

            <div className="text-sm px-3 border-dashed border-b pb-2 border-gray-500">
                <p className="uppercase">
                    Instructions{" "}
                    <span
                        className="text-xl cursor-pointer"
                        onClick={() => setShowIntruction(true)}
                    >
                        +
                    </span>
                </p>
                <ul className="list-disc text-xs px-3">
                    {instructions?.map((instruction, index) => (
                        <li
                            className="group text-[12px] flex gap-2 mb-[3px] border-1 border-[#ffffff] items-center h-4 cursor-pointer"
                            onClick={() => removeInstruction(index)}
                            key={index}
                        >
                            <span className="hidden border-1 group-hover:block text-[12px] cursor-pointer ml-[-15px]">
                                <X className="h-3 w-3" />
                            </span>
                            {instruction}
                        </li>
                    ))}
                    {showInstruction && (
                        <div className="flex gap-1 mt-1 items-center">
                            <Input
                                className="text-sm h-6"
                                onChange={(e) => setInputInstruction(e.target.value)}
                            />
                            <Button
                                onClick={addInstruction}
                                className="h-6 w-auto px-2"
                            >
                                <CheckIcon />
                            </Button>
                            <Button
                                onClick={() => setShowIntruction(false)}
                                className="h-6 w-auto px-2"
                            >
                                <X />
                            </Button>
                        </div>
                    )}
                </ul>
            </div>

            <div className="flex items-end gap-10 border-gray-500 pb-2 border-dashed border-b text-sm px-3 justify-between">
                {bill?.mode === "online" ? (
                    <div className="flex gap-2 ">
                        <div className="flex flex-col">
                            <p className="">Order Mode</p>
                            <p className="">Aggregator</p>
                            <p className="">Order Id</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="">: {"bill.mode"}</p>
                            <p className="">: {"bill.aggregator"}</p>
                            <p className="">: {"bill.aggregatorOrderId"}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-4 ">
                        <div className="flex flex-col">
                            <p className="">Customer Name</p>
                            <p className="">Customer Number</p>
                            <p className="">Order Mode</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="">: {bill?.customerName}</p>
                            <p className="">: {bill?.customerPhone}</p>
                            <p className="">: {bill?.mode}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="text-sm px-3 pb-2 flex flex-col gap-2">
                <p className="uppercase">Mode of Payment</p>
                <RadioGroup
                    className="flex flex-col gap-1"
                    value={paymentMode}
                    onValueChange={setPaymentMode}
                >
                    <div className="flex gap-1">
                        <RadioGroupItem value="card" />
                        <Label className="">Credit/Debit Card</Label>
                    </div>
                    <div className="flex gap-1">
                        <RadioGroupItem value="upi" />
                        <Label className="">UPI Payment</Label>
                    </div>
                    <div className="flex gap-1">
                        <RadioGroupItem value="cash" />
                        <Label className="">Cash</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex gap-2 justify-center text-sm border-dashed border-b pb-2 border-gray-500 p-2">
                    {
                        bill?.items?.length > 0 ? (
                            <Button
                                onClick={"handleCancelBill"}
                                className="text-center px-2 h-10 w-[8rem] flex text-[12px] font-normal justify-center items-center rounded-3xl border-2 bg-color-FF4141 text-white"
                            >
                                CANCEL BILL
                            </Button>
                        ) : (
                            <Button
                                onClick={handleDeleteBill}
                                className="text-center px-2 h-10 w-[8rem] flex text-[12px] font-normal justify-center items-center rounded-3xl border-2 bg-color-FF4141 text-white"
                            >
                                DELETE BILL
                            </Button>
                        )
                    }
                    <Dialog open={isDialogOpen}>
                        <DialogTrigger>
                            <Button
                                type="button"
                                className="text-center px-4 h-10 w-[5rem] flex text-[12px] justify-center items-center rounded-3xl border-2 bg-white text-color-1F303C"
                                onClick={handleOpenDialog}
                            >
                                KOT
                            </Button>
                        </DialogTrigger>
                        <ViewKOT
                            bill={bill}
                            billItems={billItems}
                            instructions={instructions}
                            paymentMode={paymentMode}
                            handleOpenDialog={handleOpenDialog}
                            kotUniqueId={kotUniqueId}
                            handleCreateNewKotAPI={handleCreateNewKotAPI}
                        />
                    </Dialog>
                    <Button
                        disabled={!printBillStatus}
                        onClick={handleHoldBill}
                        className="text-center px-2 h-10 w-[7rem] text-[12px] font-normal flex justify-center items-center rounded-3xl border-2 bg-color-FF4141 text-white"
                    >
                        HOLD ORDER
                    </Button>
                </div>
                <div className="border-0 w-full gap-3 flex justify-center">
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                disabled={!printBillStatus}
                                className="bg-[#486072] rounded-3xl w-[12rem]  flex justify-center items-center text-white py-1 h-8 "
                            >
                                View BILL
                            </Button>
                        </DialogTrigger>
                        <ViewBillByMe

                            bill={bill}
                        />
                    </Dialog>
                    <Button
                        disabled={!printBillStatus}
                        onClick={handlePrintBill}
                        className="bg-[#486072] rounded-3xl w-[12rem]  flex justify-center items-center text-white py-1 h-8 "
                    >
                        PRINT BILL
                    </Button>
                </div>
            </div>
        </div>
    );
});

export default UpdateOrderBill;