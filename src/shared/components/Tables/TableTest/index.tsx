import * as React from "react";
import tabletest from "./tabletest.module.css";
import {  useNavigate } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";

interface Props {
  tests: any;
  setShowModal: any;
  editTest?:any;
}
function Tabletest(props: Partial<Props>) {
  const navigate = useNavigate();
  const { tests, } = props;
  const handleGoToTestDetail = (id: string) => {
    navigate(`/testDetail/${id}`);
  };
  return (
    <div className={tabletest.outerContainer}>
      <div className={tabletest.payment}>
        <div className={tabletest.headerOuter}>
          <p className={tabletest.headerclass}>Test Code</p>
          <p className={tabletest.headerclass}>Test Name</p>
          <p className={tabletest.headerclass}>Test Category</p>
          <p className={tabletest.headerclass}>MediTour Price</p>
          <p className={tabletest.headerclass}>Duration</p>
          <p className={tabletest.headerclass}>Price</p>
        </div>
        <div className={tabletest.tableData}>
          <table
            style={{
              margin: "0px",
            }}
          >
            <tbody className={tabletest.wapper}>
              {tests.map((val: any, key: any) => {
                return (
                  <tr
                    className={tabletest.tableRow}
                    key={key}
                    onClick={() => handleGoToTestDetail(val?._id)}
                  >
                    <td className={tabletest.w20}>{val?.testCode}</td>
                    <td className={tabletest.w20}>{val?.testNameId?.name}</td>
                    <td className={tabletest.w20}>
                      {val?.testNameId?.categoryName}
                    </td>
                    <td className={tabletest.w20}>{val?.priceForMeditour}</td>
                    <td className={tabletest.w20}>{val?.duration}</td>
                    <td className={tabletest.w20}>{val?.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tabletest;
