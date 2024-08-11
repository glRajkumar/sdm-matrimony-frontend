import React from 'react'
import SelectWrapper from '../ui/select'

interface props {
  filterData: any,
  setFilterData: (val: any) => void
}
function Filter({ filterData, setFilterData }: props) {
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]

  const marriedOptions = [
    { label: "Married", value: "married" },
    { label: "UnMarried", value: "unmarried" },
  ]

  const ageOptions = [
    { label: 'Below 25', value: 'below_25' },
    { label: '25 to 30', value: '25_30' },
    { label: '30 to 40', value: '30_40' },
    { label: 'Above 40', value: 'above_50' },
  ];

  const salaryRanges = [
    { label: 'Below ₹20,000', value: 'below_20000' },
    { label: '₹20,000 - ₹30,000', value: '20000_30000' },
    { label: '₹30,000 - ₹40,000', value: '30000_40000' },
    { label: '₹40,000 - ₹50,000', value: '40000_50000' },
    { label: 'Above ₹50,000', value: 'above_50000' },
  ];

  const RasiList = [
    { label: "Mesha", value: "mesha" },
    { label: "Rishabha", value: "rishabha" },
    { label: "Mithuna", value: "mithuna" },
    { label: "Karka", value: "karka" },
    { label: "Simha", value: "simha" },
    { label: "Kanni", value: "kanni" },
    { label: "Tula", value: "tula" },
    { label: "Vrichika", value: "vrichika" },
    { label: "Dhanu", value: "dhanu" },
    { label: "Makara", value: "makara" },
    { label: "Kumbha", value: "kumbha" },
    { label: "Meena", value: "meena" }
  ];
  return (
    <div>
      {/* Filters */}
      <div className="flex justify-between gap-2">

        <SelectWrapper
          contentCls="text-black"
          value={filterData?.gender}
          items={genderOptions}
          onChange={(val) => {
            setFilterData((pre: any) => ({
              ...pre,
              gender: val
            }))
          }}
          placeholder='Select a Gender'
        />
        <SelectWrapper
          value={filterData?.marriedStatus}
          items={marriedOptions}
          onChange={(val) => {
            setFilterData((pre: any) => ({
              ...pre,
              marriedStatus: val
            }))
          }}
          placeholder='Select a MarriedStatus'
        />
        <SelectWrapper
          value={filterData?.age}
          items={ageOptions}
          onChange={(val) => {
            setFilterData((pre: any) => ({
              ...pre,
              age: val
            }))
          }}
          placeholder='Select a Age'
        />
        <SelectWrapper
          value={filterData?.salrayRange}
          items={salaryRanges}
          onChange={(val) => {
            setFilterData((pre: any) => ({
              ...pre,
              salrayRange: val
            }))
          }}
          placeholder='Select a salrayRange'
        />
        <SelectWrapper
          value={filterData?.rasi}
          items={RasiList}
          onChange={(val) => {
            setFilterData((pre: any) => ({
              ...pre,
              rasi: val
            }))
          }}
          placeholder='Select a Rasi'
        />
      </div>
    </div>
  )
}

export default Filter
