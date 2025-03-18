
type readOnlyChildren = Readonly<{
  children: React.ReactNode;
}>

type primitiveT = string | number | boolean
type objT = Record<string, primitiveT>
