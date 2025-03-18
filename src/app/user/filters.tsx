import { useState } from 'react';

import { maritalStatus, raasi, ageRange, salaryRange } from '@/utils';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface props {
  onSave: (filterData: any) => void
}

function Filters({ onSave }: props) {
  const [filterData, setFilterData] = useState({
    maritalStatus: '',
    salrayRange: '',
    ageRange: '',
    rasi: '',
  })

  function updateFilter(key: string, val: string) {
    setFilterData(prev => ({ ...prev, [key]: val }))
  }

  return (
    <div className="p-6 border-r relative">
      <div className='sticky top-20 space-y-4'>
        <h5 className='text-sm font-medium'>Filters</h5>
        <Select
          value={filterData?.maritalStatus}
          onValueChange={val => updateFilter("maritalStatus", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a MarriedStatus" />
          </SelectTrigger>

          <SelectContent>
            {
              maritalStatus?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>

        <Select
          value={filterData?.ageRange}
          onValueChange={val => updateFilter("ageRange", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Age" />
          </SelectTrigger>

          <SelectContent>
            {
              ageRange?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>

        <Select
          value={filterData?.salrayRange}
          onValueChange={val => updateFilter("salrayRange", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a salrayRange" />
          </SelectTrigger>

          <SelectContent>
            {
              salaryRange?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>

        <Select
          value={filterData?.rasi}
          onValueChange={val => updateFilter("rasi", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Rasi" />
          </SelectTrigger>

          <SelectContent>
            {
              raasi.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setFilterData({
                maritalStatus: '',
                ageRange: '',
                salrayRange: '',
                rasi: '',
              })
              onSave({})
            }}
          >
            Reset
          </Button>

          <Button
            onClick={() => onSave(filterData)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Filters
