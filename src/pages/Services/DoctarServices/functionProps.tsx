export const ALL_DOC_PARAMAS = (
  location: any,
  activeTab: any,
  searchValue: any,
  serviceName: any,
  selectedIndex: any
) => ({
  doctorType:
    serviceName == "Paramedic Staff" ? "paramedic" : serviceName.toLowerCase(),
  filter:
    activeTab == "Near by me"
      ? "nearby"
      : activeTab == "Search by city"
      ? "city"
      : activeTab?.toLowerCase(),
  lat: activeTab == "Near by me" ? location?.latitude : "",
  long: activeTab == "Near by me" ? location?.longitude : "",
  search: searchValue,
  city: activeTab == "Search by city" ? selectedIndex : "",
  speciality: "",
});
