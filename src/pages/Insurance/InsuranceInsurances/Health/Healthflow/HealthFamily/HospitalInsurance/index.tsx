import React, { useEffect, useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { CustomModal, PrimaryButton } from "shared/components";
import style from "./Hospitalfamily.module.css";
import { Avatar, Checkbox } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IoIosClose } from "react-icons/io";
import { setInsuranceHealthFamilyPackage } from "shared/redux";
import { getHosiptalInsurance } from "shared/services/Insurance";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
interface Props {
  handleClickNext: any;
}
export default function MYFamilyHospitalInsurance(props: Partial<Props>) {
  const {t} : any = useTranslation()
  const [error, setError] = React.useState("");
  const { handleClickNext } = props;
  const { insuranceHealthFamilyPackage } = useSelector(
    (state: any) => state.root.insurance
  );

  const [hospitals, sethospitals] = useState<string[]>([]);
  const [showHospitalSearchModal, setShowHospitalSearchModal] = useState(false);
  const [hospitalCards, setHospitalCards] = useState<
    { id: number; name: string }[]
  >([]);

  const dispatch = useDispatch();
  const handleSaveButtonClick = (
    updatedNames: string[],
    updatedIds: string[]
  ) => {
    const updatedHospitalCards = updatedNames.map((name, index) => ({
      id: index + 1,
      name: name,
    }));
    setHospitalCards(updatedHospitalCards);

    sethospitals(updatedIds);
  };

  const handleCardClick = () => {
    setShowHospitalSearchModal(true);
  };

  const handleRemoveHospitalCard = (id: number) => {
    const updatedHospitalCards = hospitalCards.filter((card) => card.id !== id);
    setHospitalCards(updatedHospitalCards);
  };
  const ClickNextt = () => {
    if (hospitals.length === 0) {
      setError(t("addHospitals"));
    } else {
      dispatch(
        setInsuranceHealthFamilyPackage({
          ...insuranceHealthFamilyPackage,
          hospitals,
        })
      );
      handleClickNext();
    }
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div style={{ width: "204px" }}>
        <PrimaryButton
          children={t("Add Hospitals")}
          colorType={"New_blue"}
          onClick={handleCardClick}
        />
      </div>
      <div className={style.flxWrap}>
        {hospitalCards.map((hospital) => (
          <div className={style.hospitalNameCard} key={hospital.id}>
            <p>{hospital.name}</p>
            <div className={style.closeouter}>
              <IoIosClose
                className={style.closeIcon}
                onClick={() => handleRemoveHospitalCard(hospital.id)}
              />
            </div>
          </div>
        ))}
      </div>
      {error && <div className={classNames(style.error)}>*{error}</div>}
      <div className={commonStyles.flxEnd}>
        <div style={{ width: "210px", marginTop: "56px" }}>
          <PrimaryButton
            children={"Next"}
            colorType={"New_blue"}
            onClick={ClickNextt}
          />
        </div>
      </div>

      <CustomModal
        showModal={showHospitalSearchModal}
        children={
          <Hospitalseq
            setShowHospitalSearchModal={setShowHospitalSearchModal}
            onSaveButtonClick={handleSaveButtonClick}
          />
        }
      />
    </div>
  );
}

interface Hospital {
  name: string;
  _id: string;
  logo: string;
}

const Hospitalseq = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [hospitals, sethospital] = useState<Hospital[]>([]);
  const [selectedHospitalNames, setSelectedHospitalNames] = useState<string[]>(
    []
  );
  const [selectedHospitalIds, setSelectedHospitalIds] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const { setShowHospitalSearchModal } = props;
  const handleCloseModal = () => {
    setShowHospitalSearchModal(false);
  };

  const handleSaveButtonClick = () => {
    props.onSaveButtonClick(selectedHospitalNames, selectedHospitalIds);
    setShowHospitalSearchModal(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleCheckboxChange = (hospitalId: string, hospitalName: string) => {
    if (hospitalId) {
      setSelectedHospitalIds((prevIds) => {
        const isAlreadySelected = prevIds.includes(hospitalId);
        let updatedNames: string[];
        if (isAlreadySelected) {
          const updatedIds = prevIds.filter((id) => id !== hospitalId);
          updatedNames = selectedHospitalNames.filter(
            (name) => name !== hospitalName
          );

          setSelectedHospitalNames(updatedNames);
          // setUpdatedNames(updatedIds);
          return updatedIds;
        } else {
          const updatedIds = [...prevIds, hospitalId];
          updatedNames = [...selectedHospitalNames, hospitalName];
          setSelectedHospitalNames(updatedNames);
          return updatedIds;
        }
      });
    }
  };

  const getAllHospital = (searchInput: string) => {
    setLoading(true);
    getHosiptalInsurance(searchInput)
      .then((res: any) => {
        sethospital(res.data.hospitals);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllHospital(searchInput);
  }, [searchInput]);
  return (
    <div style={{ width: "500px" }}>
      <div className={style.HospitalSearch}>
        <input
          type="Search by Name"
          placeholder="Search"
          value={searchInput}
          onChange={handleInputChange}
        />
        <IoClose className={style.close} onClick={handleCloseModal} />
      </div>
      {hospitals.map((hospitals) => (
        <div className={classNames(commonStyles.flx, style.hospitalcard)}>
          <Avatar src={hospitals?.logo} className={style.avatar} />
          <p className={classNames(commonStyles.fs14, commonStyles.semiBold)}>
            {hospitals.name}
          </p>
          <div className={style.end}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={
                <CheckCircleOutlineIcon style={{ color: "green" }} />
              }
              onChange={() =>
                handleCheckboxChange(hospitals._id, hospitals.name)
              }
            />
          </div>
        </div>
      ))}

      <div className={style.mt16}>
        <PrimaryButton
          children={"Save"}
          colorType={"New_blue"}
          onClick={handleSaveButtonClick}
        />
      </div>
    </div>
  );
};
