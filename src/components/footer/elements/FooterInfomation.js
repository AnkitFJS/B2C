import React from "react";
import Link from "next/link";

import SocialIcons from "../../other/SocialIcons";

export default function FooterInfomation() {
  return (
    <div className="footer-info">
      <Link href={process.env.PUBLIC_URL + "/"}>
        <a className="footer-info__logo">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logoo.png"}
            alt="Ogami Logo"
            style={{width:200,marginTop:20}}
          />
              {/* Footer LOGO HERE */}

        </a>
      </Link>
      <ul >
        <li className="text-white">Address: 60-49 Road 11378 New York</li>
        <li className="text-white">Phone: +65 11.188.888</li>
        <li className="text-white">Email: info.deercreative@gmail.com</li>
      </ul>
      <SocialIcons type="primary" shape="circle" className="-btn-light" />
    </div>
  );
}
