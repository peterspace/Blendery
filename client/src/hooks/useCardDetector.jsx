import { useState, useEffect } from "react";
import VisaIcon from "../assets/icons/visa.svg";
import MaestroIcon from "../assets/icons/maestro.svg";
import MirIcon from "../assets/icons/mir.svg";
import MasterCardIcon from "../assets/icons/mastercard.svg";
import UnionPayIcon from "../assets/icons/unionpay.svg";

export const useCardPaymentSystemIcon = (cardNumber) => {
  const [paymentSystemIcon, setPaymentSystemIcon] = useState(null);

  useEffect(() => {
    const patterns = [
      { system: "Visa", icon: VisaIcon, pattern: /^4/ },
      { system: "MasterCard", icon: MasterCardIcon, pattern: /^5[1-5]/ },
      {
        system: "Maestro",
        icon: MaestroIcon,
        pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
      },
      { system: "Mir", icon: MirIcon, pattern: /^220[0-4]/ },
      { system: "UnionPay", icon: UnionPayIcon, pattern: /^(62|81)/ },
    ];

    for (const { icon, pattern } of patterns) {
      if (cardNumber.match(pattern)) {
        setPaymentSystemIcon(icon);
        return;
      }
    }

    setPaymentSystemIcon(null);
  }, [cardNumber]);

  return paymentSystemIcon;
};
