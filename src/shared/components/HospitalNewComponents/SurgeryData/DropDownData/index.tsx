import React from "react";
import style from "./Style.module.css";
const CustomDropDown = ({
  items,
  toggleExpand,
  expandedItems,
}: {
  items?: any;
  toggleExpand: any;
  expandedItems?: any;
}) => {
  return (
    <>
      {items.map((item: any) => {
        return (
          <div key={item.id}>
            <div className={style.item} onClick={() => toggleExpand(item.id)}>
              <span className={style.icon}>
                {expandedItems.includes(item.id) ? "−" : "+"}
              </span>
              {item.label}
            </div>
            {item.children && expandedItems.includes(item.id) && (
              <div className={style.children}>{item.children}</div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default CustomDropDown;
