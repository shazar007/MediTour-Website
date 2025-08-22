import React, { useRef, useState } from "react";
import classNames from "classnames";
import Styles from "./PaymentOrder/LaboratoryPayments/LaboratoryPayments.module.css";
import commonStyles from "shared/utils/common.module.css";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import {
  CustomInput,
  CustomModal,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import { IoClose } from "react-icons/io5";
import Upload from "assets/images/upload.png";
import { MdOutlineDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { payToVendor } from "shared/services";
import ImgPicker from "shared/components/Img-picker";
export default function ProceedPayment() {
  const [showMessageCard, setShowMessageCard] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  let totalAmount = state?.selectedItems?.reduce(
    (acc: any, obj: any) => acc + (obj["paidByUserAmount"] || 0),
    0
  );
  const idsArray = state?.selectedItems?.map((obj: any) => obj._id);
  //

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const pmdcInitialUrl = imageUrl ? imageUrl?.split("/")?.pop() : "";

  const handlePmdcImageUrl = (url: any) => {
    setImageUrl(url);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleShowMessage = () => {
    setShowMessageCard(true);
  };

  const handlecloseModel = () => {
    setShowMessageCard(false);
  };
  const handleSendPayment = () => {
    setLoading(true);
    let params = {
      vendorId: state?.vendor?._id,
      vendorModelType: state?.VendorModalType,
      items: idsArray,
      itemModelType: state?.itemModelType,
      noOfitems: state?.selectedItems?.length,
      totalAmount: totalAmount,
      totalTax: 0,
      payableAmount: totalAmount,
      receiptImage: imageUrl,
    };
    console.log("🚀 ~ handleSendPayment ~ params,.......:", params);

    payToVendor(params)
      .then((res: any) => {
        setShowMessageCard(false);
        navigate("/admin/Payments");
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };
  const handleDeleteClick = () => {
    setSelectedFile(null);
  };

  return (
    <div className={commonStyles.col12}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payments Orders" />
      </div>
      <div
        className={classNames(Styles.mainOuter)}
        style={{
          padding: "0px 0.083%",
        }}
      >
        <div className={classNames(commonStyles.flxBetween)}>
          <p
            className={classNames(
              commonStyles.fs22,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            Proceed Payment
          </p>
          <button
            className={classNames(Styles.continue)}
            onClick={handleShowMessage}
          >
            Continue
          </button>
        </div>
        <CustomModal showModal={showMessageCard}>
          <div style={{ width: "400px", color: "#00276d" }}>
            <IoClose className={Styles.close} onClick={handlecloseModel} />
            <div className={Styles.FLXcENTER}>
              <p
                className={classNames(commonStyles.fs16, commonStyles.semiBold)}
              >
                Invoice Image
              </p>
              <p
                className={classNames(
                  commonStyles.fs12,
                  commonStyles.medium,
                  Styles.colorGray,
                  Styles.mt8
                )}
              >
                To proceed, please upload Image of payment.
              </p>
              {!imageUrl ? (
                <div className={Styles.UploadOuter}>
                  {/* <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <img
                    src={Upload}
                    className={Styles.Uploade}
                    onClick={handleImageClick}
                  /> */}
                  <ImgPicker
                    placeholder="Receipt"
                    setData={handlePmdcImageUrl}
                    initialValue={pmdcInitialUrl}
                  />
                  <p
                    className={classNames(
                      commonStyles.fs16,
                      commonStyles.medium
                    )}
                  >
                    Take photo or{" "}
                    <strong className={commonStyles.colorOrange}>
                      choose file
                    </strong>{" "}
                    to upload
                  </p>
                  <p
                    className={classNames(
                      commonStyles.fs12,
                      commonStyles.medium
                    )}
                  >
                    Select JPEG, PNG, or PDF up to 6MB.
                  </p>
                </div>
              ) : (
                <>
                  <div className={Styles.UploadOuter}>
                    <div className={commonStyles.flxBetween}>
                      <div className={commonStyles.flx}>
                        <img
                          src={Upload}
                          alt="upload"
                          className={Styles.Uploade22}
                          onClick={handleImageClick}
                        />
                        <p
                          className={classNames(
                            commonStyles.fs12,
                            commonStyles.medium
                          )}
                        >
                          {pmdcInitialUrl}
                        </p>
                      </div>
                      <MdOutlineDelete
                        className={Styles.Delete}
                        onClick={handleDeleteClick}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      margin: "32px auto 0 auto",
                      width: "136px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <PrimaryButton
                      children={
                        loading ? (
                          <RingLoader size={35} color={"#fff"} />
                        ) : (
                          "Send"
                        )
                      }
                      colorType={"blue"}
                      onClick={handleSendPayment}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </CustomModal>
        <div className={classNames(commonStyles.flx, Styles.mt24)}>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                VENDER DETAILS
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Id:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vendor?.vendorId}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Name:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vendor?.name}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Contact:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vendor?.phoneNumber}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Email:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vendor?.email}
                </p>
              </div>
              {/* <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Address:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  154A Johar Town, LHR
                </p>
              </div> */}
            </div>
          </div>
          <div className={classNames(Styles.DetailCard2)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                TOTAL PAYMENTS
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(Styles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Total No. of orders:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.selectedItems?.length}
                </p>
              </div>

              <div className={classNames(Styles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Total Amount:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {totalAmount}
                </p>
              </div>
              {/* <div className={classNames(Styles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Total Tax:
                </p>
                <div
                  className={classNames(commonStyles.fs14, Styles.colorGray)}
                >
                  <CustomInput placeholder="Enter Amount of tax" />
                </div>
              </div> */}
              <div className={classNames(Styles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Payable Amount:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {totalAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <div className={Styles.payment}>
            <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
              <p className={Styles.headerclass}>PAYMENT AT</p>
              <p className={Styles.headerclass}>ORDER ID</p>
              <p className={Styles.headerclass}>MR NO.</p>
              <p className={Styles.headerclass}>{state?.UserName}</p>
              <p
                style={{ textTransform: "uppercase" }}
                className={Styles.headerclass}
              >
                {state?.VenderName} NAME
              </p>
              <p className={Styles.headerclass}>TOTAL PAYMENTS</p>
              <p className={Styles.headerclass}>STATUS</p>
            </div>
            <div className={Styles.tableData22}>
              <table
                style={{
                  margin: "0px",
                  borderCollapse: "separate",
                  borderSpacing: "0 4px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                <tbody className={Styles.wapper}>
                  {data.map((rowData, rowIndex) => (
                    <tr className={Styles.tableRow} key={rowIndex}>
                      {" "}
                      <td className={Styles.w20}>{rowData.PAYMENTAT}</td>
                      <td className={Styles.w20}>{rowData.ORDERid}</td>
                      <td className={Styles.w20}>{rowData.MRNo}</td>
                      <td className={Styles.w20}>{rowData.USERNAME}</td>
                      <td className={Styles.w20}>{rowData.LABNAME}</td>
                      <td className={Styles.w20}>{rowData.TOTALPAYMENTS}</td>
                      <td className={Styles.w20}>
                        <p
                          className={classNames(Styles.statusComp, {
                            [Styles.statusPendingText]:
                              rowData.STATUS === "Pending",
                          })}
                        >
                          {rowData.STATUS}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
