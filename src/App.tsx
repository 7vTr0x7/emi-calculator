import { ChangeEvent, useEffect, useState } from "react";
import { tenureData } from "./utils/constants";

const App = () => {
  const [cost, setCost] = useState<number>(0);
  const [interest, setInterest] = useState<number>(10);
  const [fee, setFee] = useState<number>(1);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(12);
  const [emi, setEmi] = useState<number>(0);

  const calculateEMI = (downPay: number): number => {
    if (!cost) return 0;

    const loanAmt = cost - downPay;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);

    return Number((EMI / 12).toFixed(0));
  };

  const calculateDP = (emiAmt: number): number => {
    if (!cost) return 0;

    const downPayPer = 100 - (emiAmt / calculateEMI(0)) * 100;
    return Number(((downPayPer / 100) * cost).toFixed(0));
  };

  const updateEMI = (e: ChangeEvent<HTMLInputElement>) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(Number(dp.toFixed(0)));

    const updatedEmi = calculateEMI(dp);
    setEmi(updatedEmi);
  };
  const updateDownPayment = (e: ChangeEvent<HTMLInputElement>) => {
    if (!cost) return 0;
    const emi = Number(e.target.value);
    setEmi(Number(emi.toFixed(0)));

    const updatedDp = calculateDP(emi);
    setDownPayment(updatedDp);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setEmi(0);
      setDownPayment(0);
    }

    const updatedEmi = calculateEMI(downPayment);
    setEmi(updatedEmi);
  }, [tenure]);

  return (
    <div className="mt-7 flex px-4 flex-col gap-5">
      <span className="font-bold text-3xl ">EMI Calculator</span>
      <span className="font-bold text-xl ">Total Cost</span>
      <input
        type="number"
        className="border border-black px-2 py-1 w-3/12 text-black placeholder-gray-500"
        value={cost}
        placeholder="Total Cost Of Assets"
        onChange={(e) => setCost(Number(e.target.value))}
      />
      <span className="font-bold text-xl ">Interest Rate In % </span>
      <input
        type="number"
        className="border border-black px-2 py-1 w-3/12 text-black placeholder-gray-500"
        value={interest}
        placeholder="Interest Rate"
        onChange={(e) => setInterest(Number(e.target.value))}
      />
      <span className="font-bold text-xl ">Processing Fees In % </span>
      <input
        type="number"
        className="border border-black px-2 py-1 w-3/12 text-black placeholder-gray-500"
        value={fee}
        placeholder="Processing Fees"
        onChange={(e) => setFee(Number(e.target.value))}
      />
      <span className="font-bold text-xl ">Down Payment</span>
      <span className="font-bold text-lg underline">
        Total Down Payment :
        {Number(downPayment + (cost - downPayment) * (fee / 100)).toFixed(0)}
      </span>
      <div>
        <input
          type="range"
          className="w-3/12"
          min={0}
          max={cost}
          value={downPayment}
          onChange={updateEMI}
        />
        <div className="w-3/12 flex justify-between">
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>
      </div>
      <span className="font-bold text-xl ">Loan Per Month</span>
      <div>
        <input
          type="range"
          className="w-3/12"
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          value={emi}
          onChange={updateDownPayment}
        />
        <div className="w-3/12 flex justify-between">
          <label>{calculateEMI(cost)}</label>
          <b>{emi}</b>
          <label>{calculateEMI(0)}</label>
        </div>
      </div>
      <span className="font-bold text-xl ">Tenure</span>
      <div className="flex w-3/12 justify-between gap-3">
        {tenureData.map((ten) => (
          <button
            className={`bg-gray-300 h-9 w-[12%] rounded-xl ${
              ten === tenure && "bg-blue-200"
            } `}
            key={ten}
            onClick={() => setTenure(ten)}>
            {ten}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
