import classNames from "classnames";
import React, { useEffect, useState } from "react";
import CardStyless from "./Cards.module.css";
import CommonStyless from "shared/utils/common.module.css";
import { getAll_Doctors } from "shared/services/UserService";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import NewFilterSearch from "shared/components/A_New_Components/NewFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import ServiceHeader from "shared/components/ServicesHeaders";
import Doctor_Card from "shared/components/Doctor_Card";
import { RingLoader } from "shared/components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const DoctorCards: React.FC<{}> = ({}) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["doctors"],
      queryFn: ({ pageParam = 1 }) => getAll_Doctors(pageParam, {}),
      getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
      staleTime: 5 * 60 * 1000,
      initialPageParam: 1,
    });
  let doctors = data?.pages?.flatMap((page: any) => page.doctors);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const filteredDoctors: any = doctors?.filter((i: any) => {
    const debounceDaata = debouncedSearch?.toLowerCase();
    return i?.name?.toLowerCase().includes(debounceDaata);
  });

  const idCount: Record<string, number> = {};
  doctors?.forEach((doctor: any) => {
    const id = doctor?._id;
    idCount[id] = (idCount[id] || 0) + 1;
  });

  const handleViewMoreClick = (doc: any) => {
    navigate(`/services/doctor/DoctorDetail`, {
      state: { serviceName: "Doctor", doc, hospitalId: null },
    });
  };
  return (
    <div style={{ backgroundColor: "#FDFDFD", paddingBottom: "32px" }}>
      <ServiceHeader
        headingBlue={t("suitedFor")}
        headingOrange={t("yourTreatment")}
        content={t("docServicesContent")}
      />{" "}
      <div className={classNames(CommonStyless.container)}>
        <div
          style={
            isRtl
              ? {
                  display: "flex",
                }
              : {}
          }
        >
          <NewFilterSearch onSearchChange={(v: any) => setSearch(v)} />
        </div>
        <div
          className={classNames(CardStyless.flxendfilter, CardStyless.main)}
        ></div>
        <div className={classNames(CommonStyless.mb28, CommonStyless.mt28)}>
          <div>
            {isLoading ? (
              <div
                style={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RingLoader color={"#0D47A1"} size={50} />
              </div>
            ) : (
              <>
                {filteredDoctors && filteredDoctors.length > 0 ? (
                  filteredDoctors?.map((docs: any, index: number) => {
                    return (
                      <Doctor_Card
                        key={index}
                        data={docs}
                        goToDetails={() => handleViewMoreClick(docs)}
                      />
                    );
                  })
                ) : (
                  <div
                    className={classNames(
                      CommonStyless.flx,
                      CommonStyless.flxCenter
                    )}
                    style={{
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    {!isLoading && (
                      <div className={classNames(CommonStyless.flx)}>
                        <PhysiotheristsEmpty />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {hasNextPage && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              className={CardStyless.loadMoreButton}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? t("loading") : t("loadMore")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCards;
