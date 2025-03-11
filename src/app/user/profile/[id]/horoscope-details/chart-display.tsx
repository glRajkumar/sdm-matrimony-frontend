
function ChartDisplay({ chart }: { chart: chartT }) {
  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-1 h-[400px]">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((house) => {
        const houseKey = `house${house}` as keyof chartT
        const planets = chart[houseKey]

        return (
          <div
            key={house}
            className="border rounded-md p-2 flex flex-col"
            style={{
              gridRow: house <= 3 ? 1 : house <= 6 ? 2 : house <= 9 ? 3 : 4,
              gridColumn: house % 3 === 1 ? 1 : house % 3 === 2 ? 2 : 3,
              order: house <= 3 || (house > 6 && house <= 9) ? house % 3 : 3 - (house % 3) || 3,
            }}
          >
            <div className="text-xs font-bold mb-1">House {house}</div>
            <div className="text-xs space-y-1">
              {planets.length > 0 ? (
                planets.map((planet, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{planet.planet}</span>
                    <span>
                      {planet.degree}° {planet.sign}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground">No planets</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChartDisplay
