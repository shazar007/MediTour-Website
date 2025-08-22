import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import style from "./style.module.css";
import classNames from "classnames";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";


interface TableNewProps {
  titles?: any;
  type?: any;
  data?: any[];
  isLoading?: boolean;
  handleGoToDetail?: (id: any) => void;
  headerWidth?: string;
  itemWidth?: string;
  edit?: (id: string) => void;
  onDelete?: (id: string) => void;
  setting?: (id: string) => void;
  height?: any;
  show?: any;
}

const TableNew: React.FC<TableNewProps> = ({
  titles,
  data,
  type,
  handleGoToDetail,
  headerWidth,
  itemWidth,
  height,
  show,
  isLoading,
}) => {
  const { t, i18n }: any = useTranslation();
const { isRtl } = useDirection();

  useEffect(() => {
    const rtlLanguages = ["ur", "ar", "ps", "pr"];

    document.body.classList.toggle("rtl", isRtl);
    document.body.classList.toggle("ltr", !isRtl);
  }, [i18n.language]);
  return (
    <div
      className={classNames(style.tableContainer)}
      style={{
        height: height ? height : "325px",
      }}
    >
      <table>
        <thead>
          <tr>
            {titles?.map((title: any, index: any) => (
              <th
                key={index}
                style={{
                  width: headerWidth,
                  textAlign: ["ur", "ar", "ps", "pr"].includes(i18n.language)
                    ? "right"
                    : "left",
                }}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data ? (
            <>
              {data?.map((row?: any, index?: any) => {
                return (
                  <tr
                    style={{ cursor: show ? show : "pointer" }}
                    key={index}
                    onClick={() =>
                      type === "appoitment"
                        ? handleGoToDetail && handleGoToDetail(row[0])
                        : handleGoToDetail && handleGoToDetail(index)
                    }
                  >
                    {row?.map((title: any, index: any) => {
                      if (title === null) {
                        return null;
                      }

                      return (
                        <td
                          key={index}
                          style={{
                            width: itemWidth,
                            textTransform: "capitalize",
                            textAlign: ["ur", "ar", "ps", "pr"].includes(
                              i18n.language
                            )
                              ? "right"
                              : "left",
                          }}
                        >
                          {title}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </>
          ) : (
            <PhysiotheristsEmpty />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableNew;
