import React, { useEffect, useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { CustomModal, PrimaryButton, RingLoader } from "shared/components";
import style from "./HospitalSearch.module.css";
import { Avatar, Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IoIosClose } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
  getHosiptalInsurance,
  getLabInsurance,
} from "shared/services/Insurance";
import { setAddInsuranceForm } from "shared/redux";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

interface Props {
  handleClickNext: any;
  stateKey: any;
  selectedIds: any;
  setSelectedIds: any;
  selectedNames: any;
  setSelectedNames: any;
}

export default function MYselfHospitalInsurance(props: Partial<Props>) {
  const {
    handleClickNext,
    stateKey,
    selectedIds,
    setSelectedIds,
    selectedNames,
    setSelectedNames,
  } = props;
  const dispatch = useDispatch();
  const { t, i18n }: any = useTranslation();
  const [error, setError] = React.useState("");
  const [showHospitalSearchModal, setShowHospitalSearchModal] = useState(false);

  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );

  const handleSaveButtonClick = (
    updatedNames: string[],
    updatedIds: string[]
  ) => {
    const selectedItems = updatedIds.map((id, index) => ({
      id,
      name: updatedNames[index],
    }));
    setSelectedIds(updatedIds);
    setSelectedNames(updatedNames);

    if (updatedIds.length > 0) {
      setError("");
    }

    dispatch(
      setAddInsuranceForm({
        ...addInsuranceForm,
        [stateKey]: selectedItems,
      })
    );
  };

  const handleCardClick = () => {
    setShowHospitalSearchModal(true);
  };

  const handleRemoveHospitalCard = (id: number) => {
    const updatedHospitalCards = addInsuranceForm?.[stateKey].filter(
      (card: any) => card.id !== id
    );

    dispatch(
      setAddInsuranceForm({
        ...addInsuranceForm,
        [stateKey]: updatedHospitalCards,
      })
    );

    setSelectedIds((prev: any) =>
      prev.filter((hId: any) => hId !== id.toString())
    );
    const removedName = addInsuranceForm?.[stateKey].find(
      (card: any) => card.id === id
    )?.name;
    setSelectedNames((prev: any) =>
      prev.filter((name: any) => name !== removedName)
    );
  };

  const ClickNextt = () => {
    if (selectedIds?.length === 0) {
      setError(
        stateKey === "selectedHospitals"
          ? t("selectHospital")
          : t("selectLaboratory")
      );
    } else {
      handleClickNext();
    }
  };

  return (
    <div className={classNames(commonStyles.col6)}>
      <div style={{ width: "204px" }}>
        <PrimaryButton
          children={
            stateKey === "selectedHospitals"
              ? t("addHospitals")
              : t("addLaboratory")
          }
          colorType={"New_blue"}
          onClick={handleCardClick}
        />
      </div>
      <div className={style.flxWrap}>
        {addInsuranceForm?.[stateKey]?.map((hospital: any) => (
          <div className={style.hospitalNameCard} key={hospital.id}>
            <p>{hospital.name}</p>
            <div
              className={
                ["ur", "ar", "ps", "pr"].includes(i18n.language)
                  ? style.closeouterlag
                  : style.closeouter
              }
            >
              <IoIosClose
                className={style.closeIcon}
                onClick={() => handleRemoveHospitalCard(hospital.id)}
              />
            </div>
          </div>
        ))}
      </div>
      {error && <div className={classNames(style.error)}>*{error}</div>}

      <div style={{ width: "210px", marginTop: "56px" }}>
        <PrimaryButton
          children={t("next")}
          colorType={"New_blue"}
          onClick={ClickNextt}
        />
      </div>

      <CustomModal
        showModal={showHospitalSearchModal}
        children={
          <Hospitalseq
            t={t}
            stateKey={stateKey}
            setShowHospitalSearchModal={setShowHospitalSearchModal}
            onSaveButtonClick={handleSaveButtonClick}
            selectedHospitalIds={selectedIds}
            selectedHospitalNames={selectedNames}
          />
        }
      />
    </div>
  );
}

const Hospitalseq = (props: any) => {
  const {
    t,
    stateKey,
    setShowHospitalSearchModal,
    selectedHospitalIds,
    selectedHospitalNames,
  } = props;

  const [searchInput, setSearchInput] = useState("");
  const [localSelectedIds, setLocalSelectedIds] = useState<string[]>([]);
  const [localSelectedNames, setLocalSelectedNames] = useState<string[]>([]);

  useEffect(() => {
    setLocalSelectedIds(selectedHospitalIds);
    setLocalSelectedNames(selectedHospitalNames);
  }, [selectedHospitalIds, selectedHospitalNames]);

  const handleCloseModal = () => {
    setShowHospitalSearchModal(false);
  };

  const handleSaveButtonClick = () => {
    props.onSaveButtonClick(localSelectedNames, localSelectedIds);
    setShowHospitalSearchModal(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleCheckboxChange = (itemId: string, itemName: string) => {
    const isAlreadySelected = localSelectedIds.includes(itemId);

    if (isAlreadySelected) {
      setLocalSelectedIds((prev) => prev.filter((id) => id !== itemId));
      setLocalSelectedNames((prev) => prev.filter((name) => name !== itemName));
    } else {
      setLocalSelectedIds((prev) => [...prev, itemId]);
      setLocalSelectedNames((prev) => [...prev, itemName]);
    }
  };

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: [stateKey],
    queryFn: () =>
      stateKey === "selectedHospitals"
        ? getHosiptalInsurance(searchInput)
        : getLabInsurance(searchInput),
    staleTime: 5 * 60 * 1000,
  });

  const hospitals =
    stateKey === "selectedHospitals" ? data?.data?.hospitals : data?.data.labs;

  return (
    <div style={{ width: "500px" }}>
      <div className={style.HospitalSearch}>
        <input
          type="Search by Name"
          placeholder={t("search")}
          value={searchInput}
          onChange={handleInputChange}
        />
        <IoClose className={style.close} onClick={handleCloseModal} />
      </div>

      {isFetching ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RingLoader color={"#0D47A1"} />
        </div>
      ) : (
        <>
          {hospitals.map((item: any) => (
            <div className={classNames(style.hospitalcard)}>
              <div className={commonStyles.flx} style={{ gap: "16px" }}>
                <Avatar src={item?.logo} className={style.avatar} />
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  {item.name}
                </p>
              </div>
              <div>
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={
                    <CheckCircleOutlineIcon style={{ color: "green" }} />
                  }
                  checked={localSelectedIds.includes(item._id)}
                  onChange={() => handleCheckboxChange(item._id, item.name)}
                />
              </div>
            </div>
          ))}
        </>
      )}

      <div className={style.mt16}>
        <PrimaryButton
          children={t("save")}
          colorType={"New_blue"}
          onClick={handleSaveButtonClick}
        />
      </div>
    </div>
  );
};
