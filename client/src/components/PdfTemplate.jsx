import { Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo } from "react";
import { OrganizationContextProvider } from "../providers/ContextProvider";

const PdfTemplate = ({
  billingAddress,
  shippingAddress,
  data,
  type,
  address,
  formatCurrency,
}) => {
  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        marginTop: "40px",
        marginBottom: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src="https://www.ashitservice.com/ash6.png"
            alt="logo"
            width="80px"
          />
        </div>
        <h1
          style={{
            fontFamily: "sans-serif",
            fontWeight: 500,
            fontSize: "50px",
          }}
        >
          {type == "invoice"
            ? "INVOICE"
            : type == "salesOrder"
            ? "SALES ORDER"
            : "PURCHASE ORDER"}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* hr line */}
        <div
          style={{
            backgroundColor: "#f5f6fa",
            width: "50%",
            height: "24px",
            borderRadius: "10px",
          }}
        ></div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Invoice No */}
          {type == "invoice" && (
            <>
              <p>
                Invoice No :
                <span style={{ fontWeight: 600, color: "blue" }}>
                  &nbsp;#{data.invoiceNo}
                </span>
              </p>
              <p style={{ paddingLeft: "12px" }}>
                Date :{" "}
                <span style={{ fontWeight: 600, color: "blue" }}>
                  &nbsp;{data.invoiceDate}
                </span>
              </p>
            </>
          )}

          {type == "salesOrder" && (
            <>
              <p>
                Order No :
                <span style={{ fontWeight: 600, color: "blue" }}>
                  &nbsp;#{data.salesOrderNo}
                </span>
              </p>
              <p style={{ paddingLeft: "12px" }}>
                Date :{" "}
                <span style={{ fontWeight: 600, color: "blue" }}>
                  &nbsp;{data.salesOrderDate}
                </span>
              </p>
            </>
          )}

          {type == "purchaseOrder" && (
            <>
              <p>
                Order No :
                <span style={{ fontWeight: 600, color: "blue" }}>
                  &nbsp;#{data.purchaseOrderNo}
                </span>
              </p>
              <p style={{ paddingLeft: "12px" }}>
                Date :{" "}
                <span style={{ fontWeight: 600, color: "blue" }}>
                  &nbsp;{data.purchaseOrderDate}
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {billingAddress && (
          <div>
            <h3>Bill To</h3>
            <div style={{ lineHeight: "1ch", color: "gray" }}>
              <p>{billingAddress?.street}</p>
              <p>{billingAddress?.city}</p>
              <p>
                {billingAddress?.state}, {billingAddress?.country}
              </p>
            </div>
          </div>
        )}
        {shippingAddress && (
          <div>
            <h3>Ship To</h3>
            <div style={{ lineHeight: "1ch", color: "gray" }}>
              <p>{shippingAddress.street}</p>
              <p>{shippingAddress.city}</p>
              <p>
                {shippingAddress.state}, {shippingAddress.country}
              </p>
            </div>
          </div>
        )}

        {address && (
          <div>
            <h3>Delivered To</h3>
            <div style={{ lineHeight: "1ch", color: "gray" }}>
              <p>{address.street}</p>
              <p>{address.city}</p>
              <p>
                {address.state}, {address.country}
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          border: "1px solid",
          borderColor: "#f5f6fa",
          marginTop: "50px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead style={{ backgroundColor: "#f5f6fa" }}>
            <tr>
              <th
                style={{
                  padding: "10px",
                }}
              >
                DESCRIPTION
              </th>
              <th
                style={{
                  padding: "10px",
                }}
              >
                QTY
              </th>
              <th
                style={{
                  padding: "10px",
                }}
              >
                UNIT PRICE
              </th>
              {type == "invoice" && type == "salesOrder" && (
                <th
                  style={{
                    padding: "10px",
                  }}
                >
                  DISCOUNT
                </th>
              )}

              <th
                style={{
                  padding: "10px",
                }}
              >
                AMOUNT
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.itemDetails?.map((item) => (
              <tr key={item?._id}>
                <td style={{ padding: "10px", color: "gray" }}>{item?.name}</td>
                <td style={{ padding: "10px", color: "gray" }}>
                  {item?.quantity}
                </td>
                <td style={{ padding: "10px", color: "gray" }}>{item?.rate}</td>
                {type == "invoice" && type == "salesOrder" && (
                  <td style={{ padding: "10px", color: "gray" }}>
                    -{item?.discountPercent}%
                  </td>
                )}

                <td style={{ padding: "10px", color: "gray" }}>
                  {formatCurrency(item?.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <div>
          <h4>Payment Info :</h4>
          <p style={{ color: "gray" }}>Credit Card - 236************928</p>
          <p style={{ color: "gray" }}>
            Amount:&nbsp;{formatCurrency(data.total)}
          </p>
        </div>
        <table style={{ textAlign: "left" }}>
          <tr>
            <th style={{ padding: "10px" }}>Sub Total : </th>
            <td style={{ textAlign: "right", color: "gray" }}>
              {formatCurrency(data?.subTotal)}
            </td>
          </tr>
          {(type === "invoice" || type === "salesOrder") && (
            <tr>
              <th style={{ padding: "10px" }}>Shipping Charges :</th>
              <td style={{ textAlign: "right", color: "gray" }}>
                +{formatCurrency(data.shippingCharges)}
              </td>
            </tr>
          )}

          {(type === "invoice" || type === "salesOrder") && (
            <tr>
              <th style={{ padding: "10px" }}>Other Charges :</th>
              <td style={{ textAlign: "right", color: "gray" }}>
                +{formatCurrency(data.otherCharges)}
              </td>
            </tr>
          )}

          {type == "purchaseOrder" && (
            <tr>
              <th style={{ padding: "10px" }}>Discount :</th>
              <td style={{ textAlign: "right", color: "gray" }}>
                {" "}
                -{formatCurrency(data?.discount)}
              </td>
            </tr>
          )}

          <tr>
            <th
              style={{
                padding: "10px",
                fontSize: "16px",
                borderTop: "0.5px dashed black",
              }}
            >
              Total :
            </th>
            <td
              style={{
                textAlign: "right",
                fontSize: "16px",
                borderTop: "0.5px dashed black",
              }}
            >
              {formatCurrency(data?.total)}
            </td>
          </tr>
        </table>
      </div>

      <div
        style={{
          border: "1px solid #f5f6fa",
          padding: "6px",
          marginTop: "100px",
        }}
      >
        <h4>Terma & Conditions : </h4>
        <ul style={{ color: "gray", listStylePosition: "outside" }}>
          <li style={{ marginBottom: "10px" }}>
            All claims relating to quantity or shipping errors shall be waived
            by Buyer unless made in writing to Seller within thirty (30) days
            after delivery of goods to the address stated.
          </li>

          <li style={{ marginBottom: "10px" }}>
            Delivery dates are not guaranteed and Seller has no liability for
            damages that may be incurred due to any delay in shipment of goods
            hereunder. Taxes are excluded unless otherwise stated.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PdfTemplate;
