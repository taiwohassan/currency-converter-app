import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('EUR');
  const [toCur, setToCur] = useState('USD'); // Default to some currency
  const [converted, setConverted] = useState("");

  useEffect(() => {
    async function convert() {
      if (toCur) { // Ensure toCur is not empty
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`);
        const data = await res.json();
        setConverted(data.rates[toCur]);
      }
    }
    convert();
  }, [amount, fromCur, toCur]); // Add dependencies

  return (
    <div className="app">
      <input value={amount} type="number" onChange={e => setAmount(e.target.value)} />
      <select value={fromCur} onChange={e => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={e => setToCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>Converted Amount: {converted} {toCur}</p>
    </div>
  );
}
