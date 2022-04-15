import QRCode from "qrcode.react";
export default function Qr() {
   return (
      <div style={{ marginTop: 200, display: "flex",flexDirection: "row" }}>
         <div>
            <QRCode
               value="http://localhost:3000/login"style={{ marginRight: 50 }}/>
            <p>Tutorialspoint </p>
         </div>
          </div>
   );
}