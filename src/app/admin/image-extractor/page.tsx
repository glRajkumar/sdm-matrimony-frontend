"use client";

import { useState } from 'react';

import { dataT } from './type';

import Extractor from "./extractor";
import SaveUser from './save-user';

function Page() {
  const [data, setData] = useState<dataT>({ image: null, uploaded: [] })
  const [step, setStep] = useState(0)

  function updateStep(step: number, data: dataT | null = null) {
    setStep(step)
    setData(data || { image: null, uploaded: [] })
  }

  if (step === 0) return <Extractor updateStep={updateStep} />
  return <SaveUser data={data} updateStep={updateStep} />
}

export default Page