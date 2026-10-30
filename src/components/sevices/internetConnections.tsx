import { SettingsSlice } from "../../redux/Slices/SettingsSlice";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

function InternetConnections({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine ?? true);
  const dispatch = useDispatch();

  function offlineToast() {
    toast.error("You are offline. Please check your internet connection.", {
      id: "network-alert",
      duration: Infinity,
      position: "top-center",
      style: {
        background: "#ff4d4f",
        color: "#ffff",
        fontWeight: "bold",
      },
    });
  }

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      dispatch(SettingsSlice.actions.isOffline(false));
    };
    const handleOffline = () => {
      setIsOnline(false);
      dispatch(SettingsSlice.actions.isOffline(true));
      offlineToast();
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      // cleanup!!!
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      console.log("🧹 Event listeners cleaned up!");
    };
  }, [dispatch]);

  if (!isOnline) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return <>{children}</>;
}

export default InternetConnections;
