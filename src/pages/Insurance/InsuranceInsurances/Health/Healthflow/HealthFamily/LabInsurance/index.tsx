import React, { useState, useEffect } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { CustomModal, PrimaryButton } from "shared/components";
import { useSelector, useDispatch } from "react-redux";
import style from "./Familylab.module.css";
import { Avatar, Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IoIosClose } from "react-icons/io";
import { getLabInsurance } from "shared/services/Insurance";
import { IoClose } from "react-icons/io5";
import { setInsuranceHealthFamilyPackage } from "shared/redux";
interface Props {
  handleClickNext: any;
}
export default function MYFamilyLabInsurance(props: Partial<Props>) {
  const { handleClickNext } = props;
  const [error, setError] = React.useState("");
  const [labs, setLabs] = useState<string[]>([]);
  const [showHospitalSearchModal, setShowHospitalSearchModal] = useState(false);
  const dispatch = useDispatch();
  const { insuranceHealthFamilyPackage } = useSelector(
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
    const updatedLABSCards = labCards.filter((card) => card.id !== id);
    setLabCards(updatedLABSCards);
  };

  const ClickNextt = () => {
    if (labs.length === 0) {
      setError("Add the Lab");
    } else {
      dispatch(
        setInsuranceHealthFamilyPackage({
          ...insuranceHealthFamilyPackage,
          labs,
        })
      );
      handleClickNext();
    }
  };

  return (
    <div className={classNames(commonStyles.col12)}>
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
            <div className={style.closeouter}>
              <IoIosClose
                className={style.closeIcon}
                onClick={() => handleRemoveHospitalCard(labs.id)}
              />
            </div>
          </div>
        ))}
      </div>
      {error && <div className={classNames(style.error)}>*{error}</div>}
      <div className={classNames(commonStyles.flxEnd)}>
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

interface Labs {
  name: string;
  _id: string;
  logo: string;
}
const Hospitalseq = (props: any) => {
  const [selectedLabNames, setSelectedLabNames] = useState<string[]>([]);
  const [selectedLabIds, setSelectedLabIds] = useState<string[]>([]);
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
    getLabInsurance(searchInput)
      .then((res: any) => {
        setLabs(res.data.labs);
      })
      .catch((err: any) => {})
      .finally(() => {});
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
        <div className={classNames(commonStyles.flx, style.hospitalcard)}>
          <Avatar src={labs?.logo} className={style.avatar} />
          <p className={classNames(commonStyles.fs14, commonStyles.semiBold)}>
            {labs.name}
          </p>
          <div className={style.end}>
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
