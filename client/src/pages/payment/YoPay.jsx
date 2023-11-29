import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const YoPay = () => {
  // const shopId = 'YOUR_SHOP_ID';
  // const secretKey = 'YOUR_SECRET_KEY';

  const shopId = "253989";
  const secretKey = "test_5OmBQDJ16mWQO8_9YoYAttxknu4jgar9uC1o-xwOGak";

  const [confirmationToken, setConfirmationToken] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const { values, handleChange, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        cardholder: "",
        cardNumber: "",
        expiration: "",
        cvv: "",
      },
      validate: (values) => {
        const errors = {};

        if (!values.cardholder) {
          errors.cardholder = "Cardholder is required!";
        }

        if (!values.cardNumber) {
          errors.cardNumber = "Card number is required!";
        }

        if (!values.expiration) {
          errors.expiration = "Expiration date is required!";
        }

        if (!values.cvv) {
          errors.cvv = "CVV is required!";
        }

        return errors;
      },
      onSubmit: async () => {
        if (confirmationToken) {
          // e.preventDefault();

          if (confirmationToken) {
            try {
              const idempotenceKey = uuidv4(); // Generate a unique idempotenceKey

              // Combine shopId and secretKey, and encode as base64
              const credentials = btoa(`${shopId}:${secretKey}`);

              const response = await axios.post(
                `https://api.yookassa.ru/v3/payments/${confirmationToken}/capture`,
                {
                  amount: 1000, // Replace with the actual payment amount
                },
                {
                  headers: {
                    Authorization: `Basic ${credentials}`,
                    "Idempotence-Key": idempotenceKey, // Include the Idempotence-Key header
                    // Other headers
                  },
                }
              );

              setPaymentStatus(response.data.status);
            } catch (error) {
              console.error("Payment error:", error);
              setPaymentStatus("failed");
            }
          } else {
            toast.error(
              "Confirmation token is missing. Please obtain it before submitting the payment."
            );
          }
        } else {
          toast.error(
            "Confirmation token is missing. Please obtain it before submitting the payment"
          );
        }
      },
    });

  const handleGetConfirmationToken = async () => {
    const { cardNumber, cardholder, expiration, cvv } = values;
    try {
      const idempotenceKey = uuidv4(); // Generate a unique idempotenceKey

      // Combine shopId and secretKey, and encode as base64
      const credentials = btoa(`${shopId}:${secretKey}`);

      const response = await axios.post(
        "https://api.yookassa.ru/v3/payments",
        {
          amount: 1000, // Replace with the actual payment amount
          confirmation: {
            type: "redirect",
            return_url: "YOUR_RETURN_URL",
          },
          description: "Payment for XYZ Product",
          payment_method_data: {
            type: "bank_card",
            card: {
              number: cardNumber,
              cardholder: cardholder,
              expiration_month: expiration.split("/")[0],
              expiration_year: expiration.split("/")[1],
              cvv: cvv,
            },
          },
        },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            "Idempotence-Key": idempotenceKey, // Include the Idempotence-Key header
            // Other headers
          },
        }
      );

      setConfirmationToken(response.data.confirmation.confirmation_token);
    } catch (error) {
      console.error("Error obtaining confirmation token:", error);
    }
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Payment form fields */}
        <div className="form-group">
          <label htmlFor="cardholder">Cardholder Name</label>
          <input
            id="cardholder"
            name="cardholder"
            type="text"
            placeholder="Cardholder Name"
            value={values.cardholder}
            onChange={handleChange}
          />
          <div>
            {touched.cardholder && errors.cardholder ? (
              <div className="mt-6 text-[#ef4444]">{errors.cardholder}</div>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            placeholder="Card Number"
            value={values.cardNumber}
            onChange={handleChange}
          />
          <div>
            {touched.cardNumber && errors.cardNumber ? (
              <div className="mt-6 text-[#ef4444]">{errors.cardNumber}</div>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="expiration">Expiration Date</label>
          <input
            id="expiration"
            name="expiration"
            type="text"
            value={values.expiration}
            placeholder="MM/YYYY"
            onChange={handleChange}
          />
          <div>
            {touched.expiration && errors.expiration ? (
              <div className="mt-6 text-[#ef4444]">{errors.expiration}</div>
            ) : null}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            name="cvv"
            type="text"
            value={values.cvv}
            onChange={handleChange}
          />
          <div>
            {touched.cvv && errors.cvv ? (
              <div className="mt-6 text-[#ef4444]">{errors.cvv}</div>
            ) : null}
          </div>
        </div>
        <button type="button" onClick={handleGetConfirmationToken}>
          Get Confirmation Token
        </button>
        {confirmationToken && <button type="submit">Submit Payment</button>}
      </form>
      {paymentStatus && (
        <div>
          <h3>Payment Status: {paymentStatus}</h3>
        </div>
      )}
    </div>
  );
};

export default YoPay;
