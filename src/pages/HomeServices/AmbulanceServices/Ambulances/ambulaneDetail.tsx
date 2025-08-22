import { useState, useEffect } from "react";
import { CustomModal, PrimaryButton } from "shared/components";
import classNames from "classnames";
import SearchBar from "shared/components/Searchbar";
import { useParams } from "react-router-dom";
import commonstyle from "shared/utils/common.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./ambulances.module.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { BiSolidEdit } from "react-icons/bi";
import {
  getAmbulanceDetails,
  delAmbulanceDelete,
  AmbulanceEdit,
} from "shared/services/Ambulance";
import { Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdDeleteOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { ArrowBack, CustomInput, CustomStepper } from "shared/components";
import { ambulanceInfoSchema, ambulancePriceSchema } from "shared/utils";
import { useDispatch } from "react-redux";
import CustomSelect from "shared/components/CustomSelect";
import { setAmbulanceAmbulancerenderFlag } from "shared/redux";

import Datepicker from "shared/components/DatePicker";
import CustomLoader from "shared/components/New_Loader/Loader";

const steps = [
  {
    id: "1",
    lable: " AmbulanceInfo",
  },
  {
    id: "2",
    lable: "Ambulanceprice",
  },
];

const Ambulancestypes = ["Car ", "Small SUV", "Truck style", "Van"];

interface Props {
  setShowAddModal: any;
}
const AmbulanceConfirmDelete = (props: Partial<Props>) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const deleteAmbulance = () => {
    setLoading(true);
    const ambulanceId = id || "";
    delAmbulanceDelete(ambulanceId)
      .then((res: any) => {
        if (res?.status === 200) {
          navigate("/ambulance/ambulances");
          dispatch(setAmbulanceAmbulancerenderFlag(true));
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const { setShowAddModal } = props;
  return (
    <div className={styles.modelwidth}>
      <div className={styles.end}>
        <IoClose
          className={styles.closeicon}
          onClick={() => setShowAddModal(false)}
        />
      </div>
      <p
        className={classNames(
          commonstyle.fs16,
          commonstyle.semiBold,
          styles.mt16,
          commonstyle.coloBlue,
          styles.textjustifys
        )}
      >
        Are you sure you want to delete this ambulance?
      </p>
      <div className={classNames(commonstyle.flxBetween, styles.mt32)}>
        <button
          onClick={() => setShowAddModal(false)}
          className={styles.cancel}
        >
          Cancel
        </button>
        <button className={styles.delete} onClick={deleteAmbulance}>
          Delete
        </button>
      </div>
    </div>
  );
};

interface AmbProps {
  setShowEditModel: any;
  ambulancedetails: AmbulanceDetail | null;
}
const EditAmbulance = (props: Partial<AmbProps>) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { setShowEditModel, ambulancedetails } = props;

  const [screenName, setScreenName] = useState("AmbulanceInfo");
  const [selectedStep, setSelectedStep] = useState(0);
  const [addData, setAddData] = useState({});

  const handleClickNext = () => {
    if (screenName === "AmbulanceInfo") {
      setScreenName("Ambulanceprice");
    }

    if (selectedStep < 3) {
      setSelectedStep(selectedStep + 1);
    }
  };

  const handleClicKPrev = () => {
    if (screenName === "Ambulanceprice") {
      setScreenName("AmbulanceInfo");
    }

    if (selectedStep > 0) {
      setSelectedStep(selectedStep - 1);
    }
  };

  const handleCloseModal = () => {
    setShowEditModel(false);
  };

  return (
    <Typography
      id="modal-modal-description"
      sx={{ textAlign: "center", color: "#001F57" }}
    >
      <div className={commonstyle.flx}>
        <div className={commonstyle.flx} style={{ width: "97%" }}>
          <ArrowBack onClick={handleClicKPrev} />
          <p className={classNames(commonstyle.semiBold, commonstyle.fs16)}>
            Previous
          </p>
        </div>
        <div className={styles.end}>
          <button className={styles.close} onClick={handleCloseModal}>
            &#10006;
          </button>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <CustomStepper steps={steps} selectedStep={selectedStep} />
      </div>
      <div>
        {screenName === "AmbulanceInfo" && (
          <AmbulanceInfo
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            handleClickNext={handleClickNext}
            setAddData={setAddData}
            ambulancedetails={ambulancedetails}
          />
        )}
        {screenName === "Ambulanceprice" && (
          <Ambulanceprice
            selectedOptions={selectedOptions}
            handleClickNext={handleClickNext}
            addData={addData}
            setAddData={setAddData}
            setShowEditModel={setShowEditModel}
            ambulancedetails={ambulancedetails}
          />
        )}
      </div>
      <div
        style={{ width: "210px", marginTop: "56px" }}
        className={styles.start}
      ></div>
    </Typography>
  );
};

interface Props {
  handleClickNext: any;
  setAddData: any;
  addData: any;
  setShowEditModel: any;
  ambulancedetails?: AmbulanceDetail | null;
  selectedOptions: any;
  setSelectedOptions: any;
}
const AmbulanceInfo = (props: Partial<Props>) => {
  const {
    handleClickNext,
    setAddData,
    ambulancedetails,
    selectedOptions,
    setSelectedOptions,
  } = props;

  const [registrationDate, setRegistrationDate] = useState(
    ambulancedetails?.registrationDate
      ? dayjs(ambulancedetails.registrationDate)
      : null
  );

  const formik = useFormik({
    initialValues: {
      vehicleType: ambulancedetails?.vehicleType || "",
      vehicleName: ambulancedetails?.vehicleName || "",
      vehicleModel: ambulancedetails?.vehicleModel || "",
      vehicleYear: ambulancedetails?.vehicleYear || "",
      vehicleColor: ambulancedetails?.vehicleColor || "",
      vehicleRegistrationNumber: ambulancedetails?.registrationNo || "",
      vehicleRegistrationDate: ambulancedetails?.registrationDate || "",
    },
    validationSchema: Yup.object(ambulanceInfoSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSelect = (selectedOption: string) => {
    formik.setFieldValue("vehicleType", selectedOption);
  };
  const handleRegistrationExpiry = (date: any) => {
    const selectedDate = dayjs(date);
    setRegistrationDate(selectedDate);
    const formattedDate = selectedDate.format("YYYY-MM-DD");

    formik.setFieldValue("vehicleRegistrationDate", formattedDate);
  };
  const handleSubmit = async () => {
    if (selectedOptions.length === 0) {
    } else {
      const currentData = formik.values;
      handleClickNext();
      setAddData({
        vehicleType: currentData.vehicleType,
        vehicleName: currentData.vehicleName,
        vehicleModel: currentData.vehicleModel,
        vehicleYear: currentData.vehicleYear,
        vehicleColor: currentData.vehicleColor,
        registrationNo: currentData.vehicleRegistrationNumber,
        registrationDate: currentData.vehicleRegistrationDate,
      });
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginTop: "24px" }} className={commonstyle.flx}>
          <div style={{ width: "210px" }}>
            <CustomSelect
              options={Ambulancestypes}
              placeholder={
                ambulancedetails?.vehicleType
                  ? ambulancedetails.vehicleType
                  : "Vehicle Type"
              }
              onSelect={handleSelect}
              value={formik.values.vehicleType}
            />

            {formik.touched.vehicleType && formik.errors.vehicleType ? (
              <div className={classNames(commonstyle.error)}>
                *{formik.errors.vehicleType}
              </div>
            ) : null}
          </div>
          <div style={{ width: "210px", marginLeft: "86px" }}>
            <CustomInput
              placeholder="Vehicle Name"
              id="vehicleName"
              name="vehicleName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.vehicleName}
            />

            {formik.touched.vehicleName && formik.errors.vehicleName ? (
              <div className={classNames(commonstyle.error)}>
                *{formik.errors.vehicleName}
              </div>
            ) : null}
          </div>
        </div>

        <div style={{ marginTop: "24px" }} className={commonstyle.flx}>
          <div style={{ width: "210px" }}>
            <CustomInput
              placeholder="Vehicle Model"
              id="vehicleModel"
              name="vehicleModel"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.vehicleModel}
            />

            {formik.touched.vehicleModel && formik.errors.vehicleModel ? (
              <div className={classNames(commonstyle.error)}>
                *{formik.errors.vehicleModel}
              </div>
            ) : null}
          </div>
          <div style={{ width: "210px", marginLeft: "86px" }}>
            <CustomInput
              placeholder="Vehicle Year"
              id="vehicleYear"
              name="vehicleYear"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.vehicleYear}
            />

            {formik.touched.vehicleYear && formik.errors.vehicleYear ? (
              <div className={classNames(commonstyle.error)}>
                *{formik.errors.vehicleYear}
              </div>
            ) : null}
          </div>
        </div>
        <div style={{ marginTop: "24px" }} className={commonstyle.flx}>
          <div style={{ width: "210px" }}>
            <CustomInput
              placeholder="Vehicle Colour"
              id="vehicleColor"
              name="vehicleColor"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.vehicleColor}
            />

            {formik.touched.vehicleColor && formik.errors.vehicleColor ? (
              <div className={classNames(commonstyle.error)}>
                *{formik.errors.vehicleColor}
              </div>
            ) : null}
          </div>
        </div>

        <div style={{ marginTop: "24px" }} className={commonstyle.flx}>
          <div style={{ width: "210px" }}>
            <CustomInput
              placeholder="Registration Number"
              id="vehicleRegistrationNumber"
              name="vehicleRegistrationNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.vehicleRegistrationNumber}
            />

            {formik.touched.vehicleRegistrationNumber &&
            formik.errors.vehicleRegistrationNumber ? (
              <div className={classNames(commonstyle.error)}>
                *{formik.errors.vehicleRegistrationNumber}
              </div>
            ) : null}
          </div>
          <div style={{ width: "210px", marginLeft: "86px" }}>
            <Datepicker
              placeholder="Registration Date"
              setData={handleRegistrationExpiry}
              value={registrationDate}
              futureDisable={true}
            />

            {formik.touched.vehicleRegistrationDate &&
            formik.errors.vehicleRegistrationDate ? (
              <div className={classNames(commonstyle.error)}>
                *{formik.errors.vehicleRegistrationDate}
              </div>
            ) : null}
          </div>
        </div>
        <div style={{ width: "210px", marginTop: "56px" }}>
          <PrimaryButton
            children={"Next Step"}
            type="submit"
            colorType={"blue"}
          />
        </div>
      </form>
    </div>
  );
};

interface Props {
  handleClickNext: any;
  addData: any;
  setShowEditModel: any;
  ambulance: any;
  setAmbulance: any;
  ambulancedetails?: AmbulanceDetail | null;
  selectedOptions: any;
}
const Ambulanceprice = (props: Partial<Props>) => {
  const dispatch = useDispatch();
  const {
    handleClickNext,
    addData,
    setShowEditModel,
    ambulancedetails,
    selectedOptions,
  } = props;
  const ID = ambulancedetails?._id || "";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      actualPrice: ambulancedetails?.actualPrice || "",
      priceForMeditour: ambulancedetails?.priceForMeditour || "",
    },
    validationSchema: Yup.object(ambulancePriceSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = async () => {
    const curr_data = formik.values;
    handleClickNext();
    setLoading(true);

    let params = {
      ...addData,
      vehicleFacilities: selectedOptions,
      actualPrice: curr_data.actualPrice,
      priceForMeditour: curr_data.priceForMeditour,
    };

    AmbulanceEdit(ID || "", params)
      .then((res: any) => {
        handleClickNext();
        if (res.status === 200) {
        }
        setShowEditModel(false);
        navigate("/ambulance/ambulances");
        dispatch(setAmbulanceAmbulancerenderFlag(true));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ width: "528px" }}>
          <div style={{ marginTop: "24px" }} className={commonstyle.flx}>
            <div style={{ marginRight: "12px" }} className={commonstyle.col6}>
              <CustomInput
                placeholder="Actual Price"
                id="actualPrice"
                name="actualPrice"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.actualPrice}
              />

              {formik.touched.actualPrice && formik.errors.actualPrice ? (
                <div className={classNames(commonstyle.error)}>
                  *{formik.errors.actualPrice}
                </div>
              ) : null}
            </div>
            <div style={{ marginLeft: "12px" }} className={commonstyle.col6}>
              <CustomInput
                placeholder="Price For MediTour"
                id="priceForMeditour"
                name="priceForMeditour"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.priceForMeditour}
              />

              {formik.touched.priceForMeditour &&
              formik.errors.priceForMeditour ? (
                <div className={classNames(commonstyle.error)}>
                  *{formik.errors.priceForMeditour}
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ width: "110px", marginTop: "56px" }}>
            <PrimaryButton
              children={loading ? "loading..." : "Save"}
              disabled={loading ? true : false}
              type="submit"
              colorType={"green"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

interface AmbulanceDetail {
  vehicleType: string;
  vehicleName: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleColor: string;
  vehicleFacilities: any;
  registrationNo: string;
  registrationDate: string;
  ambulanceCompanyId: string;
  actualPrice: number;
  priceForMeditour: number;
  _id: string;
}

export default function AmbulaneDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [ambulancedetail, setAmbulanceDetail] =
    useState<AmbulanceDetail | null>(null);

  const handleOpenModal = () => {
    setShowAddModal(true);
  };
  const handleEditModel = () => {
    setShowEditModel(true);
  };

  const fechAmbulanceDetails = () => {
    setLoading(true);
    if (id === undefined) {
      console.error("ID is undefined");
      setLoading(false);
      return;
    }
    setLoading(true);
    getAmbulanceDetails(id)
      .then((res: any) => {
        if (res?.status === 200) {
          setAmbulanceDetail(res?.data?.ambulance);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fechAmbulanceDetails();
  }, []);

  const navigate = useNavigate();
  const handleGoToBack = () => {
    navigate("/ambulance/ambulances");
  };
  return loading ? (
    <CustomLoader />
  ) : (
    <div className={classNames(commonstyle.col12, commonstyle.coloBlue)}>
      <SearchBar />

      <div className={commonstyle.mr87}>
        <div className={styles.outerContainer}>
          <div className={commonstyle.flx}>
            <div className={commonstyle.flx}>
              <IoMdArrowRoundBack
                className={styles.back}
                onClick={handleGoToBack}
              />
              <p
                className={classNames(
                  commonstyle.fs20,
                  commonstyle.semiBold,
                  commonstyle.colorBlue
                )}
              >
                Back
              </p>
            </div>
            <div className={classNames(styles.end, commonstyle.flx)}>
              <div className={styles.buttoons}>
                <BiSolidEdit
                  className={styles.reset}
                  onClick={handleEditModel}
                />
              </div>
              <div className={styles.buttoons}>
                <MdDeleteOutline
                  className={styles.reset}
                  onClick={handleOpenModal}
                />
              </div>
              <CustomModal
                showModal={showAddModal}
                children={
                  <AmbulanceConfirmDelete setShowAddModal={setShowAddModal} />
                }
              />
              <CustomModal
                showModal={showEditModel}
                children={
                  <EditAmbulance
                    setShowEditModel={setShowEditModel}
                    ambulancedetails={ambulancedetail}
                  />
                }
              />
            </div>
          </div>
          <div className={styles.my40}>
            <p
              className={classNames(
                commonstyle.fs24,
                commonstyle.semiBold,
                commonstyle.colorBlue
              )}
            >
              Vehicle details
            </p>
          </div>
          <div
            className={classNames(
              styles.fleex,
              commonstyle.fs20,
              commonstyle.colorBlue
            )}
          >
            <div style={{ width: "50%" }} className={styles.fleex}>
              <div style={{ width: "30%" }} className={commonstyle.semiBold}>
                <p className={styles.mt8}>Vehicle Name:</p>
                <p className={styles.mt8}>Vehicle Model:</p>
                <p className={styles.mt8}>Vehicle Type:</p>
                <p className={styles.mt8}>Vehicle color:</p>
                <p className={styles.mt8}>Vehicle Facilities:</p>
              </div>
              <div style={{ width: "50%" }}>
                <p className={styles.mt8}>{ambulancedetail?.vehicleName}</p>
                <p className={styles.mt8}>{ambulancedetail?.vehicleModel}</p>
                <p className={styles.mt8}>{ambulancedetail?.vehicleType}</p>
                <p className={styles.mt8}>{ambulancedetail?.vehicleColor}</p>
                <p className={styles.mt8}>
                  {Array.isArray(ambulancedetail?.vehicleFacilities)
                    ? ambulancedetail?.vehicleFacilities.join(", ")
                    : ""}
                </p>
              </div>
            </div>

            <div style={{ width: "50%" }} className={styles.fleex}>
              <div style={{ width: "30%" }} className={commonstyle.semiBold}>
                <p className={styles.mt8}>Reg Number:</p>
                <p className={styles.mt8}>Reg Date:</p>
              </div>

              <div>
                <p className={styles.mt8}>{ambulancedetail?.registrationNo}</p>

                <p className={styles.mt8}>
                  {ambulancedetail?.registrationDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
