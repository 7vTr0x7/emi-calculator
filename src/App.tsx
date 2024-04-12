import { useState } from "react";

const App = () => {
  const [cost, setCost] = useState<number>(0);
  const [interest, setInterest] = useState<number>(10);
  const [fee, setFee] = useState<number>(1);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(10);
  const [emi, setEmi] = useState<number>(0);

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
      <span className="font-bold text-xl ">Loan Per Month</span>
      <span className="font-bold text-xl ">Tenure</span>
    </div>
  );
};

export default App;
