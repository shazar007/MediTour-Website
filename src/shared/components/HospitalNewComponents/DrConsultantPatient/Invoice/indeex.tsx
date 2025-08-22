import React, { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import style from "./style.module.css";
import downloadicon from "assets/images/HospitalDashboard/downloadicon.png";
import { Checkbox } from "@mui/material";
import { createInvoice } from "shared/services";
import RingLoader from "shared/components/RingLoader";
import DeleteIcon from "@mui/icons-material/Delete";
import HospitalInvoice from "pages/Hospital/HospitalInvoice";
import { notifySuccess, notifyWarning } from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";

interface ItemData {
  item: string;
  price: string;
}
interface ItemData2 {
  item: string;
  rate: string;
  quantity: string;
  price: string;
}

interface HospitalInvoiceProps {
  data: any;
  onPressSave?: any;
  item?: any;
}

const Hospital_Invoice: React.FC<HospitalInvoiceProps> = ({
  data,
  item,
}) => {
  const {t} : any = useTranslation()
  const [extraSelectedItems, setExtrsSelectedItems] = useState<any>([]);
  const [selectedExtraInvoiceLines, setSelectedExtraInvoiceLines] =
    useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [selectedInvoiceLines, setSelectedInvoiceLines] = useState<any>([]);
  const [initialCostPrice, setInitialCostPrice] = useState<any>(null);
  const [extraCosting, setExtraCosting] = useState<any>(null);
  const [discount, setDiscount] = useState<any>(null);
  const [advance, setAdvance] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const initial = [...selectedItems, ...selectedInvoiceLines];
  const extra = [...extraSelectedItems, ...selectedExtraInvoiceLines];
  const initailCosting = [...selectedItems, ...selectedInvoiceLines];
  const extraCostinG = [...extraSelectedItems, ...selectedExtraInvoiceLines];
  const totalPrice = initialCostPrice + extraCosting;
  const minusDiscount = totalPrice - discount;
  const payableAmount = minusDiscount - advance;

  const handleInvoice = () => {
    setShowInvoice(true);
  };


  const handleSave = () => {
    const extraCosting = extra.map((item: any) => ({
      [item.item]: Number(item.rate),
      quantity: Number(item.quantity),
      price: item.price,
    }));
    const hasInvalidInitialItem = initial?.some(
      (item: any) => item?.item && item?.price === ""
    );
    
    if (hasInvalidInitialItem) {
      notifyWarning(t("itemPriceIsEmpty"));
      setLoading(false);
      return;
    }
    
    // Proceed only if all valid items have prices
    let initialCosting = initial?.reduce((acc: any, item: any) => {
      acc[item?.item] = Number(item?.price);
      return acc;
    }, {});


    const invalidItems = extraCosting.filter((item) => item.price === "");
    if (invalidItems.length > 0) {
      notifyWarning(t("pleaseFillInAllPrices"));
      setLoading(false);
      return;
    }
    setLoading(true)


    const validExtraCosting = extra.map((item: any) => {
      return {
        item: item?.item,
        rate: item?.rate,
        quantity: item?.quantity,
        price: item?.price,
      };
    });


    let body = {
      patientId: data?.patientId,
      appointmentId: data?._id,
      initialCosting,
      extraCosting: validExtraCosting,
      advance: Number(advance),
      discount: Number(discount),
    };
    createInvoice(body)
      .then((res: any) => {
        notifySuccess(t("saveInvoiceSuccessfully"));
        return;
      })
      .catch((err: any) => {
        console.log("🚀 ~ handleSave ~ err:", err);
        return;
      })
      .finally(() => setLoading(false));
  };
  
  useEffect(() => {
    if (selectedItems || selectedInvoiceLines) {
      const totalPrice = initailCosting.reduce((total, item) => {
        return total + parseFloat(item.price || "0");
      }, 0);
      setInitialCostPrice(totalPrice);
    }
  }, [selectedItems, selectedInvoiceLines]);

  useEffect(() => {
    if (extraSelectedItems || selectedExtraInvoiceLines) {
      const totalPrice = extraCostinG.reduce((total: any, item: any) => {
        return total + parseFloat(item.price || "0");
      }, 0);
      setExtraCosting(totalPrice);
    }
  }, [extraSelectedItems, selectedExtraInvoiceLines]);

  return (
    <>
      <div className={style.maincontainer}>
       <div className={style.innerContent}>



       <div
          className={classNames(
            commonstyle.flxBetween,
            commonstyle.flxWrap,
            commonstyle.mb16,
            commonstyle.mt16
          )}
        >
          <p className={style.headertag}></p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button className={style.downloadbutton} onClick={handleInvoice}>
              <img
                src={downloadicon}
                alt="download icon"
                className={style.downlodimg}
              />
            </button>
            <button className={style.draftbutton}>
              <p style={{ whiteSpace: "nowrap" }}>{t("download")}</p>
            </button>
          </div>
        </div>

        <p className={style.titletag}>{t("initialCosting")}</p>
        <div className={classNames(style.borderline)}></div>
        <InitialCosting
          price={initialCostPrice}
          item={item}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedInvoiceLines={selectedInvoiceLines}
          setSelectedInvoiceLines={setSelectedInvoiceLines}
        />

        <p className={style.titletag} style={{ marginTop: 20 }}>
          {t("extraCosting")}
        </p>
        <div className={classNames(style.borderline)}></div>
        <ExtraCosting
          price={extraCosting}
          item={item}
          extraSelectedItems={extraSelectedItems}
          setExtrsSelectedItems={setExtrsSelectedItems}
          selectedExtraInvoiceLines={selectedExtraInvoiceLines}
          setSelectedExtraInvoiceLines={setSelectedExtraInvoiceLines}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            alignItems: "flex-end",
            padding: "0 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap:10
            }}
          >
            <p className={classNames(style.advanced)}>{t("total")}</p>
            <p className={classNames(style.advanced)}>
              <span>Rs:</span>
              {totalPrice}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "78px",
              margin: "10px 0",
              alignItems: "center",
            }}
          >
            <p className={classNames(style.advanced)}>{t("discount")}</p>
            <input
              placeholder=" "
              onChange={(e) => setDiscount(e.target.value)}
              className={style.datainput}
              type="number"
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "78px",
              margin: "10px 0",
              alignItems: "center",
            }}
          >
            <p className={classNames(style.advanced)}>{t("advance")}</p>
            <input
              placeholder=" "
              onChange={(e) => setAdvance(e.target.value)}
              className={style.datainput}
              type="number"
            />
          </div>
        </div>
        <div className={style.borderline}></div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 10px",
            gap:10
          }}
        >
          <p className={classNames(style.total)}>{t("payable")}</p>
         <span>
         <p className={classNames(style.total)}>
            <span>Rs:</span>
            {payableAmount}
          </p>
         </span>
        </div>

        {showInvoice && (
          <HospitalInvoice
            showInvoice={showInvoice}
            setShowInvoice={setShowInvoice}
            item={item}
          />
        )}

        <button
          disabled={loading}
          onClick={handleSave}
          className={style.submitbtn}
        >
          {loading ? (
            <RingLoader color={"#0D47A1"} size={30} />
          ) : (
            t("saveInvoice")
          )}
        </button>
       </div>
      </div>
    </>
  );
  
};

export default Hospital_Invoice;

interface InitialCostingProps {
  itemsData?: ItemData[]; 
  handlePriceChange?: any;
  handleCheckboxChange?: any;
  selectedItems?: any;
  invoiceLines?: ItemData[];
  selectedInvoiceLines?: any;
  setSelectedInvoiceLines: (v: any) => void;
  setSelectedItems: (v: any) => void;
  handleCheckboxChange_2?: any;
  removeInvoiceLine?: any;
  handleInvoiceLineChange?: any;
  errorMessage?: any;
  price?: any;
  item?: any;
}

export const InitialCosting: React.FC<InitialCostingProps> = ({
  selectedItems,
  setSelectedItems,
  selectedInvoiceLines,
  setSelectedInvoiceLines,
  price,
  item,
}) => {
  const {t,i18n} : any = useTranslation()
  const initialItemsData: ItemData[] = [
    {
      item: "Admission Fee",
      price: "1000",
    },
    { item: "Security Fee", price: "2000" },
    { item: "ICU", price: "1500" },
  ];
  const [itemsData, setItemsData] = useState<ItemData[]>(initialItemsData);
  const [invoiceLines, setInvoiceLines] = useState<ItemData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    if (item?.[0]?.invoiceId?.initialCosting) {
      const selectedItems = Object.entries(item?.[0]?.invoiceId.initialCosting || {}).map(
        ([key, value]: [string, any]) => ({
          item: key,
          price: value,
        })
      );
  
      // Update itemsData
      setItemsData((prevItems) =>
        prevItems.map((prevItem) => {
          const matchingItem = selectedItems.find(
            (selected: any) => selected.item === prevItem.item
          );
          return matchingItem
            ? {
                ...prevItem,
                item: matchingItem.item,
                price: matchingItem.price,
              }
            : prevItem;
        })
      );
  
      // Set selected items to match initialCosting
      setSelectedItems(selectedItems);
  
      // Identify additional invoice lines
      const predefinedItems = initialItemsData.map((item) => item.item);
      const additionalItems = selectedItems.filter(
        (item: any) => !predefinedItems.includes(item.item)
      );
      setInvoiceLines(additionalItems);
    }
  }, [item?.[0]?.invoiceId?.initialCosting]);
  
  

  const handlePriceChange = (index: number, value: string) => {
    const newItemsData = [...itemsData];
    newItemsData[index].price = value;
    const updatedSelectedItems = selectedItems.map((item: any) =>
      item.item === newItemsData[index].item ? { ...item, price: value } : item
    );
    if (
      !updatedSelectedItems.some(
        (item: any) => item.item === newItemsData[index].item
      )
    ) {
      updatedSelectedItems.push({
        item: newItemsData[index].item,
        price: value,
      });
    }
    setItemsData(newItemsData);
    setSelectedItems(updatedSelectedItems);
  };

  const handleInvoiceLineChange = (
    index: number,
    field: "item" | "price",
    value: string
  ) => {
    const newInvoiceLines = [...invoiceLines];
    newInvoiceLines[index][field] = value;
    setInvoiceLines(newInvoiceLines);
    const existingIndex = selectedInvoiceLines.findIndex(
      (line: any) => line.item === newInvoiceLines[index].item
    );
    if (existingIndex !== -1) {
      const updatedInvoiceLines = [...selectedInvoiceLines];
      updatedInvoiceLines[existingIndex] = newInvoiceLines[index];
      setSelectedInvoiceLines(updatedInvoiceLines);
    } else {
      setSelectedInvoiceLines([
        ...selectedInvoiceLines,
        newInvoiceLines[index],
      ]);
    }
    if (newInvoiceLines[index].item && newInvoiceLines[index].price) {
      setErrorMessage("");
    }
  };

  const handleCheckboxChange = (index: number) => {
    const selectedItem: any = itemsData[index];
    const isSelected: any = selectedItems?.some(
      (item: any) => item.item === selectedItem.item
    );
    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((item: any) => item.item !== selectedItem.item)
      );
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const addNewInvoiceLine = () => {
    const lastLine = invoiceLines[invoiceLines.length - 1];
    if (lastLine && (!lastLine.item || !lastLine.price)) {
      setErrorMessage(
        t("pleaseFillPrevious_")
      );
      return;
    }
    const newLine = { item: "", price: "" };
    setInvoiceLines([...invoiceLines, newLine]);
    setErrorMessage(""); // Clear error message when adding a valid new line
  };

  useEffect(()=>{
    if(errorMessage === ""){
     return
    }
    else {
      setErrorMessage(
        t("pleaseFillPrevious_")
      )
    }
  },[i18n.language])

  const handleCheckboxChange_2 = (line: ItemData) => {
    const isSelected = selectedInvoiceLines.some(
      (item: any) => item.item === line.item
    );
    if (isSelected) {
      setSelectedInvoiceLines((prev: any) =>
        prev.filter((item: any) => item.item !== line.item)
      );
    } else {
      setSelectedInvoiceLines((prev: any) => [...prev, line]);
    }
  };

  const removeInvoiceLine = (line: ItemData) => {
    setInvoiceLines(invoiceLines.filter((item) => item !== line));
    setSelectedInvoiceLines(
      selectedInvoiceLines.filter((item: any) => item !== line)
    );
    setErrorMessage("");
  };

  return (
    <div
    //  style={{ border: "1px solid black" }}
    >
      {itemsData.map((data, index) => (
        <div
          key={index}
          style={{
            paddingRight: 16,
            marginBottom: 8,
          }}
          className={classNames(style.itemcontainer)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "30%",
              gap: 16,
            }}
          >
            <Checkbox
              checked={selectedItems.some(
                (item: any) => item.item === data.item
              )}
              onChange={() => handleCheckboxChange(index)}
              sx={{
                "&.Mui-checked": {
                  color: "#0D47A1",
                },
                margin: 0,
                padding: 0,
                paddingLeft: 0,
              }}
            />
            {data.item}
          </div>
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <input
              placeholder=" "
              className={style.datainput}
              type="number"
              value={data.price}
              onChange={(e) => handlePriceChange(index, e.target.value)}
            />
          </div>
        </div>
      ))}

      {invoiceLines.map((line, index) => (
        <div
          key={`invoice-line-${index}`}
          style={{
            paddingRight: 16,
            marginBottom: 8,
          }}
          className={classNames(style.itemcontainer)}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <DeleteIcon
              sx={{ color: "#D32F2F", cursor: "pointer", fontSize: 18 }}
              onClick={() => removeInvoiceLine(line)}
            />
            <input
              placeholder=" "
              className={style.datainput}
              type="text"
              value={line.item}
              onChange={(e) =>
                handleInvoiceLineChange(index, "item", e.target.value)
              }
            />
          </div>
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <input
              placeholder=" "
              className={style.datainput}
              type="number"
              value={line.price}
              onChange={(e) =>
                handleInvoiceLineChange(index, "price", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      {errorMessage && (
        <p
          className={style.errorMessage}
          style={{ color: "red", fontSize: 14 }}
        >
          {errorMessage}
        </p>
      )}
      <div className={style.borderline}></div>
      <p
        className={style.invoicetitle}
        style={{ cursor: "pointer" }}
        onClick={addNewInvoiceLine}
      >
        + {t("newInvoiceLine")}
      </p>
      {/* <p className={style.titletag}>Total Price {price}</p> */}
      <div className={style.borderline}></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 20, 
          paddingBottom: 20,
          paddingRight: 16,
          justifyContent: "flex-end",
          gap: 20,
        }}
      >
        <p className={style.titletag} >
          {t("totalPrice")}
        </p>

        <p className={style.titletag} style={{ width: 115 }}>
          Rs{price}
        </p>
      </div>
      <div className={style.borderline} style={{ marginBottom: 0 }}></div>
    </div>
  );
};
interface ExtraCostingProps {
  itemsData?: ItemData2[]; // Optional for initial costing
  handlePriceChange?: any;
  handleCheckboxChange?: any;
  selectedItems?: any;
  extraInvoiceLines?: ItemData2[];
  handleCheckboxChange_2?: any;
  removeInvoiceLine?: any;
  handleInvoiceLineChange?: any;
  errorMessage?: any;
  selectedExtraInvoiceLines: ItemData2[];
  setSelectedExtraInvoiceLines: (a: any) => void; // Prop for updating the selected lines
  extraSelectedItems?: any;
  setExtrsSelectedItems: (v: any) => void;
  price?: any;
  item?: any;
}

export const ExtraCosting: React.FC<ExtraCostingProps> = ({
  extraSelectedItems,
  setExtrsSelectedItems,
  selectedExtraInvoiceLines,
  setSelectedExtraInvoiceLines,
  price,
  item,
}) => {
  const {t,i18n} : any = useTranslation()
  const extraCostingItemsData: ItemData2[] = [
    { item: "Test", rate: "", quantity: "", price: "" },
    { item: "food", rate: "", quantity: "", price: "" },
    { item: "Service", rate: "", quantity: "", price: "" },
    { item: "Pharmacy", rate: "", quantity: "", price: "" },
    { item: "Parking", rate: "", quantity: "", price: "" },
  ];

  const [itemsData, setItemsData] = useState<ItemData2[]>(
    extraCostingItemsData
  );
  const [extraInvoiceLines, setInvoiceLines] = useState<ItemData2[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    if (item?.[0]?.invoiceId?.extraCosting) {
      const selectedItems = item?.[0]?.invoiceId.extraCosting.map(
        (item: any) => ({
          item: item.item,
          rate: item.rate,
          quantity: item.quantity,
          price: item.price,
        })
      );
      const predefinedItems = extraCostingItemsData.map((item) => item.item);
      const additionalItems = selectedItems.filter(
        (item: any) => !predefinedItems.includes(item.item)
      );
      setInvoiceLines(additionalItems);
      setExtrsSelectedItems(selectedItems);
      setItemsData((prevItems) =>
        prevItems.map((prevItem) => {
          const matchingItem = selectedItems.find(
            (selected: any) => selected.item === prevItem.item
          );
          return matchingItem
            ? {
                ...prevItem,
                rate: matchingItem.rate,
                quantity: matchingItem.quantity,
                price: matchingItem.price,
              }
            : prevItem;
        })
      );
    }
  }, [item?.[0]?.invoiceId?.extraCosting]);
  const handleQuantityOrRateChange = (
    index: number,
    field: "quantity" | "rate",
    value: string
  ) => {
    const newItemsData: any = [...itemsData];
    newItemsData[index][field] = value;
    const quantity = parseFloat(newItemsData[index].quantity || "0");
    const rate = parseFloat(newItemsData[index].rate || "0");
    const newPrice = quantity * rate;
    newItemsData[index].price = newPrice;
    setItemsData(newItemsData);

    const selectedItem = newItemsData[index];
    const isSelected = extraSelectedItems.some(
      (item: any) => item.item === selectedItem.item
    );

    if (!isSelected) {
      setExtrsSelectedItems((prevItems: any) => [...prevItems, selectedItem]);
    } else {
      setExtrsSelectedItems((prevItems: any) => {
        const updatedItems = [...prevItems];
        const itemIndex = updatedItems.findIndex(
          (item: any) => item.item === selectedItem.item
        );
        if (itemIndex !== -1) {
          updatedItems[itemIndex] = selectedItem;
        }
        return updatedItems;
      });
    }
  };
  const handleCheckboxChange = (index: number) => {
    const selectedItem = itemsData[index];
    const isSelected = extraSelectedItems.some(
      (item: any) => item.item === selectedItem.item
    );
    if (isSelected) {
      setExtrsSelectedItems(
        extraSelectedItems.filter(
          (item: any) => item.item !== selectedItem.item
        )
      );
    } else {
      setExtrsSelectedItems([...extraSelectedItems, selectedItem]);
    }
  };
  const addNewInvoiceLine = () => {
    const lastLine = extraInvoiceLines[extraInvoiceLines.length - 1];
    if (
      lastLine &&
      (!lastLine.item ||
        !lastLine.price ||
        !lastLine.rate ||
        !lastLine.quantity)
    ) {
      setErrorMessage(
        t("pleaseFillPrevious_")
      );
      return;
    }
    const newLine = { item: "", price: "", rate: "", quantity: "" };
    setInvoiceLines([...extraInvoiceLines, newLine]);
    setErrorMessage("");
  };
useEffect(()=>{
  if(errorMessage === ""){
   return
  }
  else {
    setErrorMessage(
      t("pleaseFillPrevious_")
    )
  }
},[i18n.language])


  const handleCheckboxChange_2 = (line: any) => {
    const updatedSelectedItems = selectedExtraInvoiceLines.includes(line)
      ? selectedExtraInvoiceLines.filter((item: any) => item !== line)
      : [...selectedExtraInvoiceLines, line];
    setSelectedExtraInvoiceLines(updatedSelectedItems);
  };
  const removeInvoiceLine = (line: ItemData2) => {
    setInvoiceLines(extraInvoiceLines.filter((item) => item !== line));
    setSelectedExtraInvoiceLines(
      selectedExtraInvoiceLines.filter((item) => item !== line)
    );
    setErrorMessage("");
  };
  const handleInvoiceLineChange = (
    index: number,
    field: "item" | "rate" | "quantity",
    value: string
  ) => {
    const newInvoiceLines = [...extraInvoiceLines];
    newInvoiceLines[index][field] = value;

    // Recalculate price
    const rate = parseFloat(newInvoiceLines[index].rate || "0");
    const quantity = parseFloat(newInvoiceLines[index].quantity || "0");
    const newPrice = rate * quantity;
    newInvoiceLines[index].price = newPrice.toString();

    setInvoiceLines(newInvoiceLines);

    const currentLine = newInvoiceLines[index];

    // Check if the invoice line is fully filled
    if (
      currentLine.item.trim() !== "" &&
      currentLine.rate !== "" &&
      currentLine.quantity !== "" &&
      currentLine.price !== ""
    ) {
      const isAlreadySelected = selectedExtraInvoiceLines.some(
        (line) => line.item === currentLine.item
      );

      if (!isAlreadySelected) {
        setSelectedExtraInvoiceLines((prevSelected: any) => [
          ...prevSelected,
          currentLine,
        ]);
      } else {
        // Update existing line
        setSelectedExtraInvoiceLines((prevSelected: any) =>
          prevSelected.map((line: any) =>
            line.item === currentLine.item ? currentLine : line
          )
        );
      }
    }

    if (currentLine.item && currentLine.price) {
      setErrorMessage("");
    }
  };
  return (
    <div style={{
      // border:'2px solid'
    }}>
      {/* Render predefined extra costing items */}
      {itemsData.map((data, index) => (
        <div key={index} className={classNames(style.itemcontainer)}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "33.33%",
            }}
          >
            <Checkbox
              checked={extraSelectedItems.some(
                (item: any) => item.item === data.item
              )}
              onChange={() => handleCheckboxChange(index)}
              sx={{
                "&.Mui-checked": {
                  color: "#0D47A1",
                },
              }}
            />
            {data.item}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              width: "33.33%",
            }}
          >
            <input
              placeholder="Rate"
              value={data.rate}
              onChange={(e) =>
                handleQuantityOrRateChange(index, "rate", e.target.value)
              }
              className={style.datainput}
              type="number"
            />
            <input
              placeholder="Quantity"
              value={data.quantity}
              onChange={(e) =>
                handleQuantityOrRateChange(index, "quantity", e.target.value)
              }
              className={style.datainput}
              type="number"
            />
          </div>
          <div
            style={{
              width: "33.33%",

              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <input
              readOnly
              disabled
              placeholder="Price"
              className={style.datainput}
              value={data.price}
            />
          </div>
        </div>
      ))}

      {/* Render custom invoice lines */}
      {extraInvoiceLines.map((line, index) => (
        <div
          key={`invoice-line-${index}`}
          className={classNames(style.itemcontainer)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "33.33%",
            }}
          >
            <DeleteIcon
              sx={{ color: "#D32F2F", cursor: "pointer", fontSize: 18 }}
              onClick={() => removeInvoiceLine(line)}
            />
            <input
              placeholder="Item"
              className={style.datainput}
              type="text"
              value={line.item}
              onChange={(e) =>
                handleInvoiceLineChange(index, "item", e.target.value)
              }
            />
          </div>
          <div
            style={{
              width: "33.33%",

              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <input
              placeholder="Rate"
              value={line.rate}
              onChange={(e) =>
                handleInvoiceLineChange(index, "rate", e.target.value)
              }
              className={style.datainput}
              type="number"
            />
            <input
              placeholder="Quantity"
              value={line.quantity}
              onChange={(e) =>
                handleInvoiceLineChange(index, "quantity", e.target.value)
              }
              className={style.datainput}
              type="number"
            />
          </div>
          <div
            style={{
              width: "33.33%",
              display: "flex",

              justifyContent: "flex-end",
            }}
          >
            <input
              readOnly
              disabled
              style={{
                border:
                  line.price === "" ? "1px solid red" : "1px #7d7d7d solid",
              }}
              placeholder="Price"
              className={style.datainput}
              type="number"
              value={line.price}
            />
          </div>
        </div>
      ))}

      {/* Display error message if any */}
      {errorMessage && (
        <p
          className={style.errorMessage}
          style={{ color: "red", fontSize: 14 }}
        >
          {errorMessage}
        </p>
      )}

      {/* Add new invoice line and display total price */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          className={style.invoicetitle}
          style={{ cursor: "pointer", marginTop: 14 }}
          onClick={addNewInvoiceLine}
        >
          + {t("newInvoiceLine")}
        </p>
        <p className={style.titletag}>{t("totalPrice")} {price}</p>
      </div>
      <div className={style.borderline}></div>
    </div>
  );
};
