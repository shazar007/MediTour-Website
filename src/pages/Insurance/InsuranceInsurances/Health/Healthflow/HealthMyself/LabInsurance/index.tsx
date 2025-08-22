import React, { useState, useEffect } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";

import { CustomModal, PrimaryButton } from "shared/components";
import style from "./LabInsurance.module.css";
import { Avatar, Checkbox } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IoIosClose } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { getLabInsurance } from "shared/services/Insurance";
import { setInsuranceMySelfPackage } from "shared/redux";
import { useTranslation } from "react-i18next";
interface Props {
  handleClickNext: any;
}
export default function MYselfLabInsurance(props: Partial<Props>) {
  const { t, i18n }: any = useTranslation();
  const [error, setError] = React.useState("");
  const { handleClickNext } = props;
  const [labs, setLabs] = useState<string[]>([]);
  const [showHospitalSearchModal, setShowHospitalSearchModal] = useState(false);
  const dispatch = useDispatch();
  const { insuranceMySelfPackage } = useSelector(
    (state: any) => state.root.insurance
  );

  const [labCards, setLabCards] = useState<{ id: number; name: string }[]>([]);
  const handleSaveButtonClick = (
    updatedNames: string[],
    updatedIds: string[]
  ) => {
    const updatedLABSCards = updatedNames.map((name, index) => ({
      id: index + 1,
      name: name,
    }));
    setLabCards(updatedLABSCards);

    setLabs(updatedIds);
  };
  const handleCardClick = () => {
    setShowHospitalSearchModal(true);
  };

  const handleRemoveHospitalCard = (id: number) => {
    // Filter out the hospital card with the specified id
    const updatedLABSCards = labCards.filter((card) => card.id !== id);
    setLabCards(updatedLABSCards);
  };

  const ClickNextt = () => {
    if (labs.length === 0) {
      setError("Select the Lab");
    } else {
      dispatch(setInsuranceMySelfPackage({ ...insuranceMySelfPackage, labs }));
      handleClickNext();
    }
  };
  return (
    <div className={classNames(commonStyles.col6)}>
      <div style={{ width: "204px" }}>
        <PrimaryButton
          children={"Add Lab"}
          colorType={"New_blue"}
          onClick={handleCardClick}
        />
      </div>
      <div className={style.flxWrap}>
        {labCards.map((labs) => (
          <div className={style.hospitalNameCard}>
            <p>{labs.name}</p>
            <div
              className={
                ["ur", "ar", "ps", "pr"].includes(i18n.language)
                  ? style.closeouterlag
                  : style.closeouter
              }
            >
              <IoIosClose
                className={style.closeIcon}
                onClick={() => handleRemoveHospitalCard(labs.id)}
              />
            </div>
          </div>
        ))}
      </div>
      {error && <div className={classNames(style.error)}>*{error}</div>}
      <div style={{ width: "210px", marginTop: "56px" }}>
        <PrimaryButton
          children={"Next"}
          colorType={"New_blue"}
          onClick={ClickNextt}
        />
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

interface Labs {
  name: string;
  _id: string;
  logo: string;
}
const Hospitalseq = (props: any) => {
  const [selectedLabNames, setSelectedLabNames] = useState<string[]>([]);
  const [selectedLabIds, setSelectedLabIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [labs, setLabs] = useState<Labs[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const { setShowHospitalSearchModal } = props;
  const handleCloseModal = () => {
    setShowHospitalSearchModal(false);
  };
  const handleSaveButtonClick = () => {
    props.onSaveButtonClick(selectedLabNames, selectedLabIds);
    setShowHospitalSearchModal(false);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const handleCheckboxChange = (labId: string, labName: string) => {
    if (labId) {
      setSelectedLabIds((prevIds) => {
        const isAlreadySelected = prevIds.includes(labId);
        let updatedNames: string[];
        if (isAlreadySelected) {
          const updatedIds = prevIds.filter((id) => id !== labId);
          updatedNames = selectedLabNames.filter((name) => name !== labName);

          setSelectedLabNames(updatedNames);
          // setUpdatedNames(updatedIds);
          return updatedIds;
        } else {
          const updatedIds = [...prevIds, labId];
          updatedNames = [...selectedLabNames, labName];
          setSelectedLabNames(updatedNames);
          return updatedIds;
        }
      });
    }
  };

  const getAllLab = (searchInput: string) => {
    setLoading(true);
    getLabInsurance(searchInput)
      .then((res: any) => {
        setLabs(res.data.labs);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllLab(searchInput);
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
      {labs.map((labs) => (
        <div className={classNames(style.hospitalcard)}>
          <div className={commonStyles.flx} style={{ gap: "16px" }}>
            <Avatar src={labs?.logo} className={style.avatar} />
            <p className={classNames(commonStyles.fs14, commonStyles.semiBold)}>
              {labs.name}
            </p>
          </div>
          <div>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={
                <CheckCircleOutlineIcon style={{ color: "green" }} />
              }
              onChange={() => handleCheckboxChange(labs._id, labs.name)}
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
