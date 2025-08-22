import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import style from "./style.module.css";
import LimitIncreasePayment from "./DrlimitScreen";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface Props {
  showModel: boolean;
  setShowModel: (value: boolean) => void;
}

const LimitModel: React.FC<Props> = ({ showModel, setShowModel }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [showPayment, setShowPayment] = useState(false);
  const location = useLocation();

console.log("...rrrrr",location)

const navigate = useNavigate();

// navigate('hospital/LimitIncreasePayment')



  const { systemType } = useSelector((state: any) => state.root.common);




  const handlePayment = () => {
    const checkRoute=`/${systemType}/LimitIncreasePayment`
// console.log("chck.......",checkRoute)

navigate(checkRoute);
// setShowPayment(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        setShowModel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Modal */}
      <Modal
        open={showModel}
        onClose={() => setShowModel(false)}
        aria-describedby="modal-modal-description"
      >
        <div className={style.modal}>
          <div className={style.modalContent} ref={modalContentRef}>
            <div className={style.innerContent}>
              <p className={style.heading}>You reached your limit</p>
              <p className={style.subheading} style={{ marginTop: "10px" }}>
                You reached your limit
              </p>

              <div style={{ margin: "48px 0" }}>
                <div className={style.noteContainer}>
                  <p className={style.Containertext}>
                    To increase your limit, please proceed to the payment process,
                    as you have reached the current limit for your account.
                  </p>
                </div>
              </div>
              <button className={style.paybtn} onClick={handlePayment}>
                Pay
              </button>
            </div>
          </div>
        </div>
      </Modal>

     
    </>
  );
};

export default LimitModel;
