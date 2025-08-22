// import styles from "./ambulances.module.css";
// import React, { useState } from "react";
// import classNames from "classnames";
// import { addAmbulance } from "shared/services/Ambulance";
// import dayjs from "dayjs";
// import style from "./ambulances.module.css";
// import commonstyle from "shared/utils/common.module.css";
// import { ambulanceInfoSchema } from "shared/utils";
// import commonStyles from "shared/utils/common.module.css";
// import { setAmbulanceLength, setAmbulances } from "shared/redux";
// import { ambulancePriceSchema } from "shared/utils";
// import { getAllAmbulance } from "../../../../shared/services/Ambulance";
// import VehicleList from "shared/components/AmbulanceTables/Vehicle List";
// import { Typography } from "@mui/material";
// import { BiSolidMessageSquareAdd } from "react-icons/bi";
// import { PrimaryButton } from "shared/components";
// import CustomSelect from "shared/components/CustomSelect";
// import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   CustomInput,
//   CustomModal,
//   CustomStepper,
//   LoadingModal,
// } from "shared/components";
// import NewPagination from "shared/components/NewPagination/NewPagination";
// import { TbRefresh } from "react-icons/tb";
// import CustomMultiSelect from "shared/components/CustomMultiSelect";
// import Datepicker from "shared/components/DatePicker";
// import { useTranslation } from "react-i18next";

// const Ambulancestypes = ["Car ", "Small SUV", "Truck style", "Van"];

// const ambulanceFacilities = [
//   "Air Conditioned",
//   "Oxygen Gas",
//   "Wheel Chair",
//   "ICU facilities",
//   "Emergency Kit",
//   "Medical consumables",
// ];

// const steps = [
//   {
//     id: "1",
//     lable: " Ambulance Info",
//   },
//   {
//     id: "2",
//     lable: "Ambulance price",
//   },
// ];

// function Ambulances() {
//   const { t }: any = useTranslation();
//   const { ambulances, currentPage } = useSelector(
//     (state: any) => state.root.ambulance
//   );

//   const dispatch = useDispatch();

//   const [rotation, setRotation] = useState(0);
//   const rotationIncrement = 90;
//   const [loading, setLoading] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const handleOpenModal = () => {
//     setShowAddModal(true);
//   };
//   const handleRotate = () => {
//     fechAllAmbulances(currentPage);
//     setRotation(rotation - rotationIncrement);
//   };

//   const fechAllAmbulances = (pageno: number) => {
//     setLoading(true);
//     getAllAmbulance(pageno)
//       .then((res: any) => {
//         if (res?.data?.auth) {
//           dispatch(setAmbulances(res?.data?.ambulances));
//           dispatch(setAmbulanceLength(res.data.totalAmbulance));
//         }
//       })
//       .catch((err: any) => {})
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div>
//       <div className={commonstyle.pr36}>
//         <div className={style.outerContainer}>
//           <div className={classNames(commonstyle.flxBetween, style.mb24)}>
//             <div className={commonstyle.flx}>
//               <p
//                 className={classNames(
//                   commonstyle.fs24,
//                   commonstyle.semiBold,
//                   commonstyle.colorBlue
//                 )}
//               >
//                 {t("vehicleList")}
//               </p>
//               <div className={style.outerRefresh}>
//                 <BiSolidMessageSquareAdd
//                   className={style.RefreshIcon}
//                   onClick={handleOpenModal}
//                 />
//               </div>
//               <div className={style.outerRefresh}>
//                 <TbRefresh
//                   className={styles.RefreshIcon}
//                   style={{ transform: `rotate(${rotation}deg)` }}
//                   onClick={() => {
//                     handleRotate();
//                   }}
//                 />
//               </div>
//             </div>
//             <NewPagination />
//           </div>
//           {loading ? (
//             <LoadingModal showModal={loading} />
//           ) : (
//             <VehicleList
//               ambulance={ambulances}
//               setShowModal={setShowAddModal}
//             />
//           )}
//           <CustomModal
//             showModal={showAddModal}
//             children={
//               <AddAmbulance
//                 setShowAddModal={setShowAddModal}
//                 ambulance={ambulances}
//                 fechAllAmbulances={fechAllAmbulances}
//               />
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Ambulances;

// interface AmbProps {
//   setShowAddModal: any;
//   ambulance: any;
//   fechAllAmbulances: any;
// }
// const AddAmbulance = (props: Partial<AmbProps>) => {
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
//   const { setShowAddModal, ambulance, fechAllAmbulances } = props;
//   const [screenName, setScreenName] = useState("AmbulanceInfo");
//   const [selectedStep, setSelectedStep] = useState(0);
//   const [addData, setAddData] = useState({});

//   const handleClickNext = () => {
//     if (screenName === "AmbulanceInfo") {
//       setScreenName("Ambulanceprice");
//     }

//     if (selectedStep < 3) {
//       setSelectedStep(selectedStep + 1);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowAddModal(false);
//   };

//   return (
//     <Typography
//       id="modal-modal-description"
//       sx={{ textAlign: "center", color: "#001F57" }}
//     >
//       <div className={commonstyle.flx}>
//         <div className={styles.end}>
//           <button className={styles.close} onClick={handleCloseModal}>
//             &#10006;
//           </button>
//         </div>
//       </div>

//       <div style={{ marginTop: "30px" }}>
//         <CustomStepper steps={steps} selectedStep={selectedStep} />
//       </div>
//       <div>
//         {screenName == "AmbulanceInfo" && (
//           <AmbulanceInfo
//             selectedOptions={selectedOptions}
//             setSelectedOptions={setSelectedOptions}
//             handleClickNext={handleClickNext}
//             setAddData={setAddData}
//           />
//         )}
//         {screenName == "Ambulanceprice" && (
//           <Ambulanceprice
//             selectedOptions={selectedOptions}
//             handleClickNext={handleClickNext}
//             addData={addData}
//             setAddData={setAddData}
//             setShowAddModal={setShowAddModal}
//             ambulance={ambulance}
//             fechAllAmbulances={fechAllAmbulances}
//           />
//         )}
//       </div>
//       <div
//         style={{ width: "210px", marginTop: "56px" }}
//         className={styles.start}
//       ></div>
//     </Typography>
//   );
// };

// interface Props {
//   handleClickNext: any;
//   setAddData: any;
//   addData: any;
//   setShowAddModal: any;
//   setSelectedOptions: any;
//   selectedOptions: any;
// }
// const AmbulanceInfo = (props: Partial<Props>) => {
//   const { handleClickNext, setAddData, setSelectedOptions, selectedOptions } =
//     props;
//   const [error, setError] = React.useState("");
//   const formik = useFormik({
//     initialValues: {
//       vehicleType: "",
//       vehicleName: "",
//       vehicleModel: "",
//       vehicleYear: "",
//       vehicleColor: "",
//       vehicleRegistrationNumber: "",
//       vehicleRegistrationDate: "",
//     },
//     validationSchema: Yup.object(ambulanceInfoSchema),
//     onSubmit: (values) => {
//       handleSubmit();
//     },
//   });
//   const handleSelect = (selectedOption: string) => {
//     formik.setFieldValue("vehicleType", selectedOption);
//   };
//   const handleRegistrationExpiry = (date: any) => {
//     const selectedDate = dayjs(date);
//     const formattedDate = selectedDate.format("YYYY-MM-DD");

//     formik.setFieldValue("vehicleRegistrationDate", formattedDate);
//   };

//   const handleSelectQualification = (values: string[]) => {
//     if (values.length > 0) {
//       //
//     } else {
//       //
//     }
//     setSelectedOptions(values);
//   };
//   const handleSubmit = async () => {
//     if (selectedOptions.length === 0) {
//       setError("Required field");
//     } else {
//       const currentData = formik.values;
//       handleClickNext();
//       setAddData({
//         vehicleType: currentData.vehicleType,
//         vehicleName: currentData.vehicleName,
//         vehicleModel: currentData.vehicleModel,
//         vehicleYear: currentData.vehicleYear,
//         vehicleColor: currentData.vehicleColor,
//         registrationNo: currentData.vehicleRegistrationNumber,
//         registrationDate: currentData.vehicleRegistrationDate,
//       });
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <div style={{ marginTop: "24px" }} className={commonstyle.flx}>
//           <div style={{ width: "210px" }}>
//             <CustomSelect
//               options={Ambulancestypes}
//               placeholder="Vehicle Type"
//               onSelect={handleSelect}
//             />

//             {formik.touched.vehicleType && formik.errors.vehicleType ? (
//               <div className={classNames(commonstyle.error)}>
//                 *{formik.errors.vehicleType}
//               </div>
//             ) : null}
//           </div>
//           <div style={{ width: "210px", marginLeft: "86px" }}>
//             <CustomInput
//               placeholder="Vehicle Name"
//               id="vehicleName"
//               name="vehicleName"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.vehicleName}
//             />

//             {formik.touched.vehicleName && formik.errors.vehicleName ? (
//               <div className={classNames(commonstyle.error)}>
//                 *{formik.errors.vehicleName}
//               </div>
//             ) : null}
//           </div>
//         </div>

//         <div style={{ marginTop: "24px" }} className={commonstyle.flx}>
//           <div style={{ width: "210px" }}>
//             <CustomInput
//               placeholder="Vehicle Model"
//               id="vehicleModel"
//               name="vehicleModel"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.vehicleModel}
//             />

//             {formik.touched.vehicleModel && formik.errors.vehicleModel ? (
//               <div className={classNames(commonstyle.error)}>
//                 *{formik.errors.vehicleModel}
//               </div>
//             ) : null}
//           </div>
//           <div style={{ width: "210px", marginLeft: "86px" }}>
//             <CustomInput
//               placeholder="Vehicle Year"
//               id="vehicleYear"
//               name="vehicleYear"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.vehicleYear}
//             />

//             {formik.touched.vehicleYear && formik.errors.vehicleYear ? (
//               <div className={classNames(commonstyle.error)}>
//                 *{formik.errors.vehicleYear}
//               </div>
//             ) : null}
//           </div>
//         </div>
//         <div style={{ marginTop: "24px" }} className={commonstyle.flx}>
//           <div style={{ width: "210px" }}>
//             <CustomInput
//               placeholder="Vehicle Color"
//               id="vehicleColor"
//               name="vehicleColor"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.vehicleColor}
//             />

//             {formik.touched.vehicleColor && formik.errors.vehicleColor ? (
//               <div className={classNames(commonstyle.error)}>
//                 *{formik.errors.vehicleColor}
//               </div>
//             ) : null}
//           </div>
//           <div style={{ width: "210px", marginLeft: "86px" }}>
//             <CustomMultiSelect
//               placeholder="Vehicle Facilities for patient"
//               options={ambulanceFacilities}
//               onSelect={(value) => handleSelectQualification(value)}
//               selectedOptions={selectedOptions}
//             />
//             {error && (
//               <div className={classNames(commonStyles.error)}>*{error}</div>
//             )}
//           </div>
//         </div>

//         <div style={{ marginTop: "24px" }} className={commonstyle.flx}>
//           <div style={{ width: "210px" }}>
//             <CustomInput
//               placeholder="Registration Number"
//               id="vehicleRegistrationNumber"
//               name="vehicleRegistrationNumber"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.vehicleRegistrationNumber}
//             />

//             {formik.touched.vehicleRegistrationNumber &&
//             formik.errors.vehicleRegistrationNumber ? (
//               <div className={classNames(commonstyle.error)}>
//                 *{formik.errors.vehicleRegistrationNumber}
//               </div>
//             ) : null}
//           </div>
//           <div style={{ width: "210px", marginLeft: "86px" }}>
//             <Datepicker
//               placeholder="Registration Date"
//               setData={handleRegistrationExpiry}
//               futureDisable={true}
//             />

//             {formik.touched.vehicleRegistrationDate &&
//             formik.errors.vehicleRegistrationDate ? (
//               <div className={classNames(commonstyle.error)}>
//                 *{formik.errors.vehicleRegistrationDate}
//               </div>
//             ) : null}
//           </div>
//         </div>
//         <div style={{ width: "210px", marginTop: "56px" }}>
//           <PrimaryButton
//             children={"Next Step"}
//             type="submit"
//             colorType={"blue"}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// interface Props {
//   handleClickNext: any;
//   addData: any;
//   setShowAddModal: any;
//   ambulance: any;
//   setAmbulance: any;
//   fechAllAmbulances: any;
// }
// const Ambulanceprice = (props: Partial<Props>) => {
//   const {
//     handleClickNext,
//     addData,
//     setShowAddModal,
//     fechAllAmbulances,
//     selectedOptions,
//   } = props;

//   const [loading, setLoading] = useState(false);
//   const formik = useFormik({
//     initialValues: {
//       actualPrice: "",
//       priceForMeditour: "",
//     },
//     validationSchema: Yup.object(ambulancePriceSchema),
//     onSubmit: (values) => {
//       handleSubmit();
//     },
//   });
//   const handleSubmit = async () => {
//     const curr_data = formik.values;
//     handleClickNext();
//     setLoading(true);

//     let params = {
//       ...addData,
//       vehicleFacilities: selectedOptions,
//       actualPrice: curr_data.actualPrice,
//       priceForMeditour: curr_data.priceForMeditour,
//     };

//     addAmbulance(params)
//       .then((res: any) => {
//         handleClickNext();
//         if (res.data.auth) {
//           setShowAddModal(false);
//           fechAllAmbulances();
//         }
//       })
//       .catch((err: any) => {})
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <div style={{ width: "528px" }}>
//           <div style={{ marginTop: "24px" }} className={commonstyle.flx}>
//             <div style={{ marginRight: "12px" }} className={commonstyle.col6}>
//               <CustomInput
//                 placeholder="Actual Price"
//                 id="actualPrice"
//                 name="actualPrice"
//                 type="text"
//                 onChange={formik.handleChange}
//                 value={formik.values.actualPrice}
//               />

//               {formik.touched.actualPrice && formik.errors.actualPrice ? (
//                 <div className={classNames(commonstyle.error)}>
//                   *{formik.errors.actualPrice}
//                 </div>
//               ) : null}
//             </div>
//             <div style={{ marginLeft: "12px" }} className={commonstyle.col6}>
//               <CustomInput
//                 placeholder="Price For MediTour"
//                 id="priceForMeditour"
//                 name="priceForMeditour"
//                 type="text"
//                 onChange={formik.handleChange}
//                 value={formik.values.priceForMeditour}
//               />

//               {formik.touched.priceForMeditour &&
//               formik.errors.priceForMeditour ? (
//                 <div className={classNames(commonstyle.error)}>
//                   *{formik.errors.priceForMeditour}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//           <div style={{ width: "110px", marginTop: "56px" }}>
//             <PrimaryButton
//               children={loading ? "loading..." : "Save"}
//               disabled={loading ? true : false}
//               type="submit"
//               colorType={"green"}
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };
