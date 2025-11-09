import { getDistance } from "geolib";
import { useData } from "../../Context/DataContext";
import React, { useEffect, useState } from "react";

const LocationCompare = () => {
  const [closestHospital, setClosestHospital] = useState(null);
  const [sortedHospitals, setSortedHospitals] = useState([]);
  const [findHospitalDistances, setFindHospitalDistances] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { hospitals } = useData();

  useEffect(() => {
    if (!navigator?.geolocation) {
      setSelectedLocation({ lat: 13.7712627, lng: 100.5879442 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        setSelectedLocation({ lat: userLat, lng: userLon });
        console.log("ตำแหน่งของผู้ใช้:", userLat, userLon);
      },
      (error) => {
        console.error("ไม่สามารถรับตำแหน่งได้:", error);
        setSelectedLocation({ lat: 13.822, lng: 100.5879442 });
      }
    );
  }, []);

  useEffect(() => {
    if (!selectedLocation) return;
    if (!hospitals || hospitals.length === 0) return;

    const distances = hospitals.map((hospital) => {
      const hLat = hospital.lat;
      const hLon = hospital.lng;
      const distance = getDistance(
        { latitude: selectedLocation.lat, longitude: selectedLocation.lng },
        { latitude: hLat, longitude: hLon }
      );
      return { hospital, distance, lat: hLat, lon: hLon };
    });

    setFindHospitalDistances(distances);
    const sorted = [...distances].sort((a, b) => a.distance - b.distance);
    setSortedHospitals(sorted);
    const closest = sorted[0] || null;
    setClosestHospital(closest);

    try {
      localStorage.setItem("hq_closest_hospital", JSON.stringify(closest));
    } catch (err) {
      console.warn("Could not persist closest hospital", err);
    }
    console.log(
      "ตำแหน่งของผู้ใช้:",
      selectedLocation.lat,
      selectedLocation.lng
    );

    console.log("Closest Hospital :", closest);
  }, [selectedLocation, hospitals]);

  return null;
};

export default LocationCompare;
