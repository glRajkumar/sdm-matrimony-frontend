"use client";

import React from 'react';
import { FaUser, FaEnvelope, FaRing, FaVenusMars, FaBirthdayCake, FaStar, FaGraduationCap, FaLaptopCode, FaMoneyBillWave, FaUsers, FaRulerVertical, FaPalette, FaHome, FaMapMarkerAlt, FaHourglassHalf } from 'react-icons/fa';

const userDetails = [
  {
    fullName: "raj",
    email: "raj7@gmail.com",
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    isMarried: true,
    gender: "male",
    dob: "21-06-2002 10:10 AM",
    nakshatra: "nagam",
    rasi: "thulam",
    lagna: "mirugam",
    qualification: "bsc",
    work: "it",
    salary: 25000,
    fatherName: "nallu",
    motherName: "angali",
    noOfBrothers: 1,
    noOfSisters: 2,
    birthOrder: 2,
    expectation: "nothing else",
    formalities: "all",
    houseType: "own",
    address: "chennai",
    dashaPeriod: "4months",
    height: "180",
    color: "white",
  }
];

const UserProfile = () => {
  const user = userDetails[0];

  const detailsWithIcons = [
    { label: 'Full Name', value: user.fullName, icon: <FaUser /> },
    { label: 'Email', value: user.email, icon: <FaEnvelope /> },
    { label: 'Marital Status', value: user.isMarried ? 'Married' : 'Single', icon: <FaRing /> },
    { label: 'Gender', value: user.gender, icon: <FaVenusMars /> },
    { label: 'Date of Birth', value: user.dob, icon: <FaBirthdayCake /> },
    { label: 'Nakshatra', value: user.nakshatra, icon: <FaStar /> },
    { label: 'Rasi', value: user.rasi, icon: <FaStar /> },
    { label: 'Lagna', value: user.lagna, icon: <FaStar /> },
    { label: 'Qualification', value: user.qualification, icon: <FaGraduationCap /> },
    { label: 'Work', value: user.work, icon: <FaLaptopCode /> },
    { label: 'Salary', value: `₹${user.salary}`, icon: <FaMoneyBillWave /> },
    { label: 'Father\'s Name', value: user.fatherName, icon: <FaUsers /> },
    { label: 'Mother\'s Name', value: user.motherName, icon: <FaUsers /> },
    { label: 'Siblings', value: `${user.noOfBrothers} brother(s), ${user.noOfSisters} sister(s)`, icon: <FaUsers /> },
    { label: 'Birth Order', value: user.birthOrder, icon: <FaUsers /> },
    { label: 'Expectation', value: user.expectation, icon: <FaUsers /> },
    { label: 'Formalities', value: user.formalities, icon: <FaUsers /> },
    { label: 'House Type', value: user.houseType, icon: <FaHome /> },
    { label: 'Address', value: user.address, icon: <FaMapMarkerAlt /> },
    { label: 'Dasha Period', value: user.dashaPeriod, icon: <FaHourglassHalf /> },
    { label: 'Height', value: `${user.height} cm`, icon: <FaRulerVertical /> },
    { label: 'Color', value: user.color, icon: <FaPalette /> },
  ];

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-100">
      {/* Left Side: Images */}
      <div className="w-full md:w-1/2 p-2">
        <div className="mb-4">
          <img src={user.images[0]} alt="User" className="w-full h-[500px] object-cover rounded-lg shadow-lg" />
        </div>
        <div className="h-56 overflow-y-auto">
          <div className="grid grid-cols-3 gap-2">
            {user.images.slice(1).map((image, index) => (
              <img key={index} src={image} alt={`User ${index + 2}`} className="w-full h-52 object-cover rounded-lg shadow-md" />
            ))}
          </div>
        </div>
      </div>
      {/* Right Side: User Details */}
      <div className="w-full md:w-1/2 p-2 overflow-y-auto max-h-[calc(100vh-2rem)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {detailsWithIcons.map((detail, index) => (
            <div key={index} className="flex items-center border p-3 rounded-lg bg-white shadow-sm">
              <span className="mr-2 text-blue-500">{detail.icon}</span>
              <div>
                <strong className="text-gray-700">{detail.label}:</strong>
                <span className="ml-1 text-gray-600">{detail.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;