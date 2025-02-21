import logoWhite from "@/assets/images/login/logo_white.svg";
import group from "@/assets/images/login/Group 207.svg";

//backend imports
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RestaurantAdminApi } from "../config/global";
import { toastError, toastSuccess } from "../helpers/helpers";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { employeeLogin } from "../config/routeApi/restaurant";
import { adminLogin } from "../config/routeApi/restaurant";
import ellipse545 from '@/assets/images/landing-images/Ellipse 545.svg'
import ellipse544 from '@/assets/images/landing-images/Ellipse 544.svg'
import group212 from '@/assets/images/landing-images/Group 212.svg'
import subtract from '@/assets/images/landing-images/Subtract.svg';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


const RestaurantHome = () => {
  const [restaurant, setRestaurant] = useState({});
  const [selectedRole, setSelectedRole] = useState("admin");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);

    // Redirect based on the selected role
    switch (newRole) {
      case "admin":
        navigate("/admin-login");
        break;
      case "employee":
        navigate("/employee-login");
        break;

      default:
        navigate("/restaurant-home");
        break;
    }
  };

  const token = localStorage.getItem("restaurant");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const axiosConfig = {
    method: "get",
    url: `${RestaurantAdminApi}accessRestaurantHome`,
    headers: headers,
  };

  useEffect(() => {
    const handleHomeAccess = async () => {
      try {
        const response = await axios(axiosConfig);
        if (response.data.success == false) {
          toastError(response.data.message);
          navigate("/login");
        } else {
          console.log(response.data);
          setRestaurant(response.data.restaurantData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (token) {
      handleHomeAccess();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {

    console.log(selectedRole);

  }, [selectedRole]);

  const handleShow = () => {
    setShow(!show);
  };
  //password hide and show usestate end

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEmployeeLoginSubmit = async (data) => {
    try {
      const response = await employeeLogin(data);

      if (response.data.success) {
        if (response.data.PosManager) {
          navigate("/pos-dashboard");
          localStorage.setItem("posToken", response.data.token);
        } else if (response.data.Captain) {
          navigate("/captain-dashboard");
          localStorage.setItem("capToken", response.data.token);
        }
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.error("Error during login submit:", error);
    }
  };

  const handleAdminLoginSubmit = async (data) => {
    try {
      const response = await adminLogin(data);

      console.log(response.data);

      if (response.data.success) {
        localStorage.setItem("atoken", response.data.Token)
        navigate("/dashboard");
        toastSuccess(response.data.message)

      } else {

        toastError(response.data.message)

      }
    } catch (error) {
      console.error("Error during login submit:", error);
    } finally {
      // Set the button back to enabled after the asynchronous operation completes
      setButtonDisabled(false);
    }
  };

  const handleLoginSubmit = async (data) => {
    if (selectedRole === 'admin') await handleAdminLoginSubmit(data);
    if (selectedRole === 'employee') await handleEmployeeLoginSubmit(data);
  }

  return (
    <div className="w-screen h-screen flex md:block flex-col items-center justify-center bg-[#1F303C]">
      <div className="relative h-0 ">
        <img className="relative z-10 w-[23rem] md:w-auto top-[1rem] left-[8%] md:left-[20%] opacity-50" src={subtract} />
      </div>
      <div className="relative h-0">
        <img className="relative z-0 w-[9rem]  md:w-auto left-[70%] md:left-[100%] top-[10rem] md:top-10" src={ellipse545} />
      </div>
      <div className="relative h-0">
        <img className="relative z-10 w-[20rem] md:w-auto right-[11rem] md:right-[33rem] top-32 md:top-20" src={ellipse544} />
      </div>
      <div className="md:w-3/5 md:h-full px-12 py-16 rounded-3xl md:rounded-none md:p-0 md:rounded-r-[4rem] ">
        <div className="flex items-center justify-center h-full text-white font-roboto z-40">
          <form
            onSubmit={handleSubmit(handleLoginSubmit)}
            className="md:w-2/4 flex flex-col gap-4 z-40"
          >
            <p className=" text-white text-4xl mb-10 -mt-10 font-semibold text-center">
              WELCOME TO BROMAG BOOKS
            </p>
            <p className=" text-gray-500 text-3xl font-semibold text-center">
              {restaurant.username}
            </p>
            <p className=" text-[#62BFD4] text-lg text-center">
              Kindly Select one login to continue
            </p>
            <Separator className="bg-[#0E69AC]" />
            <RadioGroup
              value={selectedRole}
              className="flex justify-center gap-2 text-black"
              onValueChange={setSelectedRole}
            >
              <div className="flex items-center text-white space-x-2 rounded-xl border-2 p-3">
                <RadioGroupItem value="admin" id="option-one" />
                <Label htmlFor="option-one">Admin Login</Label>
              </div>
              <div className="flex items-center text-white space-x-2 rounded-xl border-2 p-3">
                <RadioGroupItem value="employee" id="option-two" />
                <Label htmlFor="option-two">Employee Login</Label>
              </div>
            </RadioGroup>

            <div className="flex flex-col gap-2">
              <p className=" font-semibold text-[#3197AE]">User Name*</p>
              <Input
                {...register("username", { required: true })}
                type="username"
                id="username"
                placeholder="Enter your username"
                className="text-black"
              />
            </div>
            {errors.username && errors.username.type === "required" && (
              <label>* Please enter the username</label>
            )}
            <div className="flex flex-col gap-2">
              <p className=" font-semibold text-[#3197AE]">Password*</p>
              <Input
                {...register("password", { required: true })}
                type={show ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                className="text-black"
              />
              {/* <button type="button" className="eye-btn" onClick={handleShow}>
                {show ? <IoEyeOff /> : <IoEye />}
              </button> */}
            </div>
            {errors.password && errors.password.type === "required" && (
              <label>* Please enter the password</label>
            )}
            {/* <Link to="/forgot-password">Forgot password?</Link> */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#56DDE8]  w-2/3 rounded-lg p-3 text-xl uppercase text-black"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="relative h-0 hidden md:block">
        <img
          className="relative z-0 left-[94%] bottom-[42rem]"
          src={logoWhite}
        />
      </div> */}
      <div className="relative h-0 hidden md:block">
        <img
          className="relative z-0 left-[75%] w-[24rem] bottom-[34.5rem]"
          src={group}
        />
      </div>
    </div>
  );
};
export default RestaurantHome;
