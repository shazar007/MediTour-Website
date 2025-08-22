// import React, { useEffect, useState } from "react";
// import tableorder from "./tableorder.module.css";
// import classNames from "classnames";
// import Done from "assets/images/done.png";
// import commonStyles from "shared/utils/common.module.css";
// import commonstyles from "../../../utils/common.module.css";
// import styles from "../../../../pages/Laboratory/Tests/test.module.css";
// import empty from "assets/images/empty2.png";
// import Tickmark from "assets/images/GreenTickmark.png";
// // Example of a data array that
// // you might receive from an API
// import ImgPicker from "shared/components/Img-picker";
// import CustomSelectOrder from "pages/Laboratory/Orders/CustomSelectOrder";
// import { labStatusChange, labUploadResult } from "shared/services";
// import { useNavigate } from "react-router-dom";
// import ImagePickerTable from "shared/components/Img-picker/ImagePickerTable";
// import LabEmpty from "shared/components/LabEmpty";

// interface Props {
//   orders: any;
//   setShowModal: any;
//   onStatusChange: any;
// }
// function Tableorder(props: Partial<Props>) {
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();
//   const handleGoToOrderDeatil = (id: string) => {
//     navigate(`/laboratory/order/Detail/${id}`);
//   };

//   const [loading, setLoading] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState<any>(null);
//   const { orders, onStatusChange } = props;
//   const uploadStatus = (id: any, status: string, index: any) => {
//     setSelectedIndex(index);
//     let params = {
//       status: status,
//     };
//     labStatusChange(id, params)
//       .then((res: any) => {
//         onStatusChange();
//       })
//       .catch((err: any) => {
//         setError(err?.response?.data?.message);
//         setTimeout(() => {
//           onStatusChange();
//         }, 1000);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const uploadResult = (url: any, id: any) => {
//     let params = {
//       resultUrl: url,
//     };
//     labUploadResult(id, params)
//       .then((res: any) => {
//         onStatusChange();
//       })
//       .catch((err: any) => {
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     setError(false);
//   }, [orders, selectedIndex]);
//   return (
//     <>
//       <div className={tableorder.outerContainer}>
//         <div className={tableorder.payment}>
//           {orders.length > 0 && (
//             <div className={tableorder.headerOuter}>
//               <p className={tableorder.headerclass}>Order ID</p>
//               <p className={tableorder.headerclass}>Patient Name</p>
//               <p className={tableorder.headerclass}>MR No</p>
//               <p className={tableorder.headerclass}>Date</p>
//               <p className={tableorder.headerclass}>Status</p>
//               <p className={tableorder.headerclass}>Results</p>
//             </div>
//           )}
//           <div className={tableorder.tableData}>
//             {orders.length > 0 ? (
//               <table
//                 style={{
//                   margin: "0px",
//                 }}
//               >
//                 <tbody className={tableorder.wapper}>
//                   {orders.map((val: any, key: any) => {
//                     console.log(val,'....vallong')
//                     return (
//                       <>
//                         <tr
//                           className={tableorder.tableRow}
//                           style={{ marginBottom: "24px" }}
//                         >
//                           <td
//                             className={tableorder.w20}
//                             onClick={() => handleGoToOrderDeatil(val._id)}
//                           >
//                             {val.orderId}
//                           </td>
//                           <td
//                             className={tableorder.w20}
//                             onClick={() => handleGoToOrderDeatil(val._id)}
//                           >
//                             {val.customerName}
//                           </td>
//                           <td
//                             className={tableorder.w20}
//                             onClick={() => handleGoToOrderDeatil(val._id)}
//                           >
//                             {val.MR_NO}
//                           </td>
//                           <td
//                             className={tableorder.w20}
//                             onClick={() => handleGoToOrderDeatil(val._id)}
//                           >
//                             {new Date(val?.createdAt).toLocaleDateString()}
//                           </td>

//                           <td className={tableorder.w20}>
//                             {
//                               <CustomSelectOrder
//                                 error={error}
//                                 setSelectedValue={(d: any) =>
//                                   uploadStatus(val._id, d, key)
//                                 }
//                                 initialValue={val.status}
//                               />
//                             }
//                           </td>

//                           <td className={tableorder.w20}>
//                             {val.results ? (
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "center",
//                                   width: "100%",
//                                   textAlign: "center",
//                                 }}
//                               >
//                                 <div
//                                   style={{
//                                     display: "flex",
//                                     justifyContent: "center",

//                                     width: "60%",
//                                     alignItems: "center",
//                                     height: "100%",

//                                     margin: "10px 50% ",
//                                   }}
//                                 >
//                                   <ImagePickerTable
//                                     setData={(status: any) =>
//                                       uploadResult(status, val._id)
//                                     }
//                                     initialValue={val.results}
//                                   />
//                                   <img
//                                     src={Tickmark}
//                                     alt="Test Result"
//                                     style={{
//                                       width: "24px",
//                                       height: "24px",
//                                       marginLeft: "8px",
//                                       alignSelf: "center",
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                             ) : (
//                               <>
//                                 <ImagePickerTable
//                                   setData={(status: any) =>
//                                     uploadResult(status, val._id)
//                                   }
//                                 />
//                                 <br />
//                                 {error && selectedIndex === key && (
//                                   <div
//                                     className={classNames(commonStyles.error)}
//                                     style={{
//                                       textAlign: "center",
//                                       marginTop: "8px",
//                                     }}
//                                   >
//                                     {error}
//                                   </div>
//                                 )}
//                               </>
//                             )}
//                           </td>
//                         </tr>
//                       </>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             ) : (
//               <div>
//                 <LabEmpty />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Tableorder;
