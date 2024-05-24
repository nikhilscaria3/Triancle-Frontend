import React from "react";
import QRCode from "qrcode.react";
const QrCode = ({ tid }) => {
  return <div>{tid && <QRCode value={tid} />}</div>;
};

export default QrCode;
