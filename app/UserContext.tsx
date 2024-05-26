"use client";
// UserContext.tsx

import { LocationInfo, UserInfo } from "@/types";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ProviderProps = {
  children: ReactNode;
};
interface UserContextType {
  userInfo: UserInfo | null;
  updateUserInfo: (newUserInfo: UserInfo) => void;
  locationInfo: LocationInfo | null; // Add locationInfo
  updateLocationInfo: (newLocationInfo: LocationInfo) => void; // Add updateLocationInfo
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    // Initialize userInfo from localStorage, or null if not found
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    }
  });

  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(() => {
    // Initialize locationInfo (you can fetch it here or set it to null)
    return null;
  });

  const updateUserInfo = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
    // Store userInfo in localStorage
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
  };

  const updateLocationInfo = (newLocationInfo: LocationInfo) => {
    setLocationInfo(newLocationInfo);
    // Store locationInfo in localStorage or perform any necessary actions
  };
  // const getGeoInfo = async () => {
  //   try {
  //     const response = await fetch("https://ipapi.co/json/");
  //     const data = await response.json();
  //     const newLocationInfo: LocationInfo = {
  //       ip: data.ip,
  //       countryName: data.country_name,
  //       countryCode: data.country_calling_code,
  //       city: data.city,
  //       timezone: data.timezone,
  //     };
  //     updateLocationInfo(newLocationInfo);
  //   } catch (error) {
  //     console.error("Error fetching location information:", error);
  //   }
  // };
  // useEffect(() => {
  //   // Fetch location information when the component mounts
  //   getGeoInfo();
  // }, []); // The empty dependency array ensures this runs only once on mount

  useEffect(() => {
    // Add a cleanup function to remove the userInfo from localStorage when component unmounts
    return () => {
      localStorage.removeItem("userInfo");
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ userInfo, locationInfo, updateUserInfo, updateLocationInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
