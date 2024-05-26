"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface SharedState {
  selectedGovIdPROV: string;
  setSelectedGovId: (govId: string) => void;

  selectedAreaIdPROV: string;
  setSelectedAreaId: (govId: string) => void;

  selectedBranchIdPROV: string;
  setSelectedBranchId: (govId: string) => void;

  selectedAreaRatePROV: string;
  setSelectedAreaRate: (govId: string) => void;

  selectGovName: string;
  setSelectGovName: React.Dispatch<React.SetStateAction<string>>;

  selectAreaName: string;
  setSelectAreaName: React.Dispatch<React.SetStateAction<string>>;

  walletDiscount: string;
  setWalletDiscount: (discount: string) => void;

  couponDiscount: string;
  setCouponDiscount: (discount: string) => void;

  couponCode: string;
  setCouponCode: (discount: string) => void;

  couponFreeShipping: boolean;
  setCouponFreeShipping: (discount: boolean) => void;
}

const SharedStateContext = createContext<SharedState | undefined>(undefined);

export function useSharedState(): SharedState {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
}

export function SharedStateProvider({ children }: React.PropsWithChildren<{}>) {
  const [selectedGovIdPROV, setSelectedGovId] = useState(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sharedState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState.selectedGovIdPROV || "";
      }
    }
    return "";
  });

  const [selectedAreaIdPROV, setSelectedAreaId] = useState(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sharedState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState.selectedAreaIdPROV || "";
      }
    }
    return "";
  });

  const [selectedBranchIdPROV, setSelectedBranchId] = useState(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sharedState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState.selectedBranchIdPROV || "";
      }
    }
    return "";
  });
  const [selectedAreaRatePROV, setSelectedAreaRate] = useState(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sharedState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState.selectedAreaRatePROV || "0";
      }
    }
    return "0";
  });

  // console.log("in SharedStateProvider", selectedAreaRatePROV);
  // console.log("in SharedStateProvider", selectedAreaRatePROV);

  const [selectGovName, setSelectGovName] = useState(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sharedState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState.selectGovName || "";
      }
    }
    return "";
  });

  const [selectAreaName, setSelectAreaName] = useState(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sharedState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState.selectAreaName || "";
      }
    }
    return "";
  });
  const [walletDiscount, setWalletDiscount] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sharedState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState.walletDiscount || "";
      }
    }
    return "";
  });
  const [couponDiscount, setCouponDiscount] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sharedState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState.couponDiscount || "";
      }
    }
    return "";
  });
  const [couponCode, setCouponCode] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sharedState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState.couponCode || "";
      }
    }
    return "";
  });
  const [couponFreeShipping, setCouponFreeShipping] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sharedState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState.couponFreeShipping || false;
      }
    }
    return false;
  });

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("sharedState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setSelectedGovId(parsedState.selectedGovIdPROV);
      setSelectedAreaId(parsedState.selectedAreaIdPROV);
      setSelectedBranchId(parsedState.selectedBranchIdPROV);
      setSelectedAreaRate(parsedState.selectedAreaRatePROV);
      setSelectGovName(parsedState.selectGovName);
      setSelectAreaName(parsedState.selectAreaName);
      setWalletDiscount(parsedState.walletDiscount);
      setCouponDiscount(parsedState.couponDiscount);
      setCouponCode(parsedState.couponCode);
      setCouponFreeShipping(parsedState.couponFreeShipping);
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    const stateToSave = {
      selectedGovIdPROV,
      selectedAreaIdPROV,
      selectedBranchIdPROV,
      selectedAreaRatePROV,
      selectGovName,
      selectAreaName,
      walletDiscount,
      couponDiscount,
      couponCode,
      couponFreeShipping,
    };
    localStorage.setItem("sharedState", JSON.stringify(stateToSave));
  }, [
    selectedGovIdPROV,
    selectedAreaIdPROV,
    selectedAreaRatePROV,
    selectGovName,
    selectAreaName,
    walletDiscount,
    couponDiscount,
    couponCode,
    couponFreeShipping,
  ]);

  const value = {
    selectedGovIdPROV,
    setSelectedGovId,
    selectedAreaIdPROV,
    setSelectedAreaId,
    selectedBranchIdPROV,
    setSelectedBranchId,
    selectedAreaRatePROV,
    setSelectedAreaRate,
    selectGovName,
    setSelectGovName,
    selectAreaName,
    setSelectAreaName,
    walletDiscount,
    setWalletDiscount,
    couponDiscount,
    setCouponDiscount,
    couponCode,
    setCouponCode,
    couponFreeShipping,
    setCouponFreeShipping,
  };

  return (
    <SharedStateContext.Provider value={value}>
      {children}
    </SharedStateContext.Provider>
  );
}
