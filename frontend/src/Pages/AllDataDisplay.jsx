import React from 'react';
import { useData } from '../Context/DataContext';

const AllDataDisplay = () => {
  const {
    specialties,
    doctors,
    hospitals,
    appointments,
    usersInfo,
    usersCredentials,
    searchData,
    symptomsListData,
    loading,
    error,
    token,
    currentUser,
  } = useData();

  if (loading) {
    return <div>Loading all data...</div>;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Database Data</h1>

      <h2>Specialties</h2>
      <pre>{JSON.stringify(specialties, null, 2)}</pre>

      <h2>Doctors</h2>
      <pre>{JSON.stringify(doctors, null, 2)}</pre>

      <h2>Hospitals</h2>
      <pre>{JSON.stringify(hospitals, null, 2)}</pre>

      <h2>Appointments</h2>
      <pre>{JSON.stringify(appointments, null, 2)}</pre>

      <h2>Users Info (User Profiles)</h2>
      <pre>{JSON.stringify(usersInfo, null, 2)}</pre>

      <h2>Users Credentials</h2>
      <pre>{JSON.stringify(usersCredentials, null, 2)}</pre>

      <h2>Search Data</h2>
      <pre>{JSON.stringify(searchData, null, 2)}</pre>

      <h2>Symptoms List</h2>
      <pre>{JSON.stringify(symptomsListData, null, 2)}</pre>

      <h2>Auth Token</h2>
      <pre>{token ? 'Token exists' : 'No Token'}</pre>

      <h2>Current User</h2>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  );
};

export default AllDataDisplay;
