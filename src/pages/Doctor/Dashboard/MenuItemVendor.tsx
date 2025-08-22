import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import MenuImage1 from "../../../assets/images/MenuImage1.png";
import MenuImage2 from "../../../assets/images/MenuImage2.png";
import MenuImage3 from "../../../assets/images/MenuImage3.png";
import MenuImage4 from "../../../assets/images/MenuImage4.png";
import MenuImage5 from "../../../assets/images/MenuImage5.png";
import MenuImage6 from "../../../assets/images/MenuImage6.png";
import MenuImage7 from "../../../assets/images/MenuImage7.png";
import MenuImage8 from "../../../assets/images/MenuImage8.png";
import MenuImage9 from "../../../assets/images/MenuImage9.png";
import styles from "./MenuItemVendor.module.css";
import CenteredLayout from "./DoctorNewDashboard";

const MenuItemsVendor = () => {
  const images = [
    { src: MenuImage1, name: "Dashboard" },
    { src: MenuImage2, name: "Availability" },
    { src: MenuImage3, name: "Requests" },
    { src: MenuImage4, name: "Appointments" },
    { src: MenuImage5, name: "Treatments" },
    { src: MenuImage6, name: "Patient History" },
    { src: MenuImage7, name: "Payments" },
    { src: MenuImage8, name: "Settings" },
    { src: MenuImage9, name: "Logout" },
  ];

  const [hoveredImage, setHoveredImage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className={styles.menuItemsVendorContainer}>
      {!isMenuOpen && (
        <button
          className={`${styles.menuIconButton} ${styles.openIcon}`}
          onClick={toggleMenu}
        >
          <GiHamburgerMenu size={30} />
        </button>
      )}

      {isMenuOpen && (
        <button
          className={`${styles.menuIconButton} ${styles.closeIcon}`}
          onClick={toggleMenu}
        >
          <AiOutlineClose size={20} />
        </button>
      )}

      <div
        className={`${styles.menuItemsVendor} ${
          isMenuOpen ? styles.mobileOpen : ""
        }`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.menuImageItem}
            onMouseEnter={() => setHoveredImage(image.name)}
            onMouseLeave={() => setHoveredImage("")}
          >
            <img src={image.src} alt={image.name} width={30} height={30} />
            {hoveredImage === image.name && (
              <div className={styles.imageName}>{image.name}</div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.centeredLayoutContainer}>
        <CenteredLayout />
      </div>
    </div>
  );
};

export default MenuItemsVendor;
