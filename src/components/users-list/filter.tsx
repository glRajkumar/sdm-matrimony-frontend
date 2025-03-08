import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface props {
  filterData: any,
  setFilterData: (val: any) => void
}

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
]

const salaryRanges = [
  { label: 'Below ₹20,000', value: 'below_20000' },
  { label: '₹20,000 - ₹30,000', value: '20000_30000' },
  { label: '₹30,000 - ₹40,000', value: '30000_40000' },
  { label: '₹40,000 - ₹50,000', value: '40000_50000' },
  { label: 'Above ₹50,000', value: 'above_50000' },
]

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
]

function Filter({ filterData, setFilterData }: props) {
  return (
    <div className="df mb-4">
      <Select
        value={filterData?.gender}
        onValueChange={(val: any) => {
          setFilterData((pre: any) => ({
            ...pre,
            gender: val
          }))
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Gender" />
        </SelectTrigger>

        <SelectContent>
          {genderOptions?.map((option: any) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filterData?.marriedStatus}
        onValueChange={(val: any) => {
          setFilterData((pre: any) => ({
            ...pre,
            marriedStatus: val
          }))
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a MarriedStatus" />
        </SelectTrigger>

        <SelectContent>
          {marriedOptions?.map((option: any) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filterData?.age}
        onValueChange={(val: any) => {
          setFilterData((pre: any) => ({
            ...pre,
            age: val
          }))
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Age" />
        </SelectTrigger>

        <SelectContent>
          {ageOptions?.map((option: any) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filterData?.salrayRange}
        onValueChange={(val: any) => {
          setFilterData((pre: any) => ({
            ...pre,
            salrayRange: val
          }))
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a salrayRange" />
        </SelectTrigger>

        <SelectContent>
          {salaryRanges?.map((option: any) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filterData?.rasi}
        onValueChange={(val: any) => {
          setFilterData((pre: any) => ({
            ...pre,
            rasi: val
          }))
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Rasi" />
        </SelectTrigger>

        <SelectContent>
          {RasiList?.map((option: any) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default Filter
