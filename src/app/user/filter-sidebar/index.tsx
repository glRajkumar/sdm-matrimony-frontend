import MobileSheet from "./mobile-sheet";
import Filters from "./filters";

interface props {
  hasFilters: boolean
  onSave: (filterData: any) => void
}

function FilterSideBar({ hasFilters, onSave }: props) {
  return (
    <>
      <MobileSheet hasFilters={hasFilters} onSave={onSave} />

      <div className="hidden md:block p-6 border-r relative">
        <div className='sticky top-20'>
          <Filters hasFilters={hasFilters} onSave={onSave} />
        </div>
      </div>
    </>
  )
}

export default FilterSideBar