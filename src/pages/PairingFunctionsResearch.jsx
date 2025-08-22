import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const PairingFunctionsExperiment = () => {
  // Pairing functions
  function szudzikPair(x, y) {
    return x >= y ? x * x + x + y : y * y + x;
  }
  function cantorPair(x, y) {
    return ((x + y) * (x + y + 1)) / 2 + y;
  }
  function bitInterleavePair(x, y) {
    let z = 0;
    for (let i = 0; i < 32; i++) {
      z |= ((y >> i) & 1) << (2 * i);
      z |= ((x >> i) & 1) << (2 * i + 1);
    }
    return z;
  }
  const xs = [], ys = [], szudzik = [], cantor = [], bitInterleave = [];
  let x = 1, y = 2;
  for (let i = 0; i < 100; i++) {
    xs.push(x);
    ys.push(y);
    szudzik.push(szudzikPair(x, y));
    cantor.push(cantorPair(x, y));
    bitInterleave.push(bitInterleavePair(x, y));
    x++; y++;
  }
  const data = {
    labels: Array.from({ length: 100 }, (_, i) => i + 1),
    datasets: [
      { label: "x", data: xs, borderColor: "green", fill: false },
      { label: "y", data: ys, borderColor: "blue", fill: false },
      { label: "Szudzik Pair", data: szudzik, borderColor: "orange", fill: false },
      { label: "Cantor Pair", data: cantor, borderColor: "red", fill: false },
      { label: "Bit Interleave Pair", data: bitInterleave, borderColor: "purple", fill: false }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" }, tooltip: { mode: "index", intersect: false } },
    interaction: { mode: "index", intersect: false },
    scales: {
      x: { title: { display: true, text: "Iteration" } },
      y: { title: { display: true, text: "Values" } }
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <main className="flex-grow flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-3xl bg-dark dark:bg-light rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-center text-primary mb-4">
            Comparison of Pairing Functions: Szudzik, Cantor, and Bit Interleaving
          </h1>
          <p className="text-base-content mb-4">
            In this experiment, we explore different mathematical pairing functions that uniquely map two integers into a single integer. We start with two sequences of numbers, <b>x</b> and <b>y</b>, where x starts at 1 and y starts at 2, incrementing both by 1 in each iteration up to 100.
          </p>
          <p className="text-base-content mb-6">
            The pairing functions included are Szudzik's Elegant Pairing Function, Cantor's Pairing Function, and a Bit Interleaving method. The purpose is to observe how each function grows compared to the original sequences and to visually compare the differences in the resulting values.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2">Mathematical Formulas</h2>
          <p className="mb-1">Szudzik's Elegant Pairing Function:</p>
          <pre className="bg-base-200 rounded p-2 mb-2">x &gt;= y ? x² + x + y : y² + x</pre>
          <p className="mb-1">Cantor Pairing Function:</p>
          <pre className="bg-base-200 rounded p-2 mb-2">(x + y)(x + y + 1)/2 + y</pre>
          <p className="mb-1">Bit Interleaving Pair Function:</p>
          <pre className="bg-base-200 rounded p-2 mb-4">Interleave the bits of x and y to form a single integer z</pre>
          <h2 className="text-xl font-semibold mt-6 mb-2">TypeScript/JavaScript Functions</h2>
          <pre className="bg-base-200 rounded p-2 mb-6 overflow-x-auto text-sm">{`
function szudzikPair(x: number, y: number): number {
  return x >= y ? x * x + x + y : y * y + x;
}

function cantorPair(x: number, y: number): number {
  return ((x + y) * (x + y + 1)) / 2 + y;
}

function bitInterleavePair(x: number, y: number): number {
  let z = 0;
  for (let i = 0; i < 32; i++) {
    z |= ((y >> i) & 1) << (2 * i);
    z |= ((x >> i) & 1) << (2 * i + 1);
  }
  return z;
}
`}</pre>
          <h2 className="text-xl font-semibold mt-6 mb-2">Chart of Values</h2>
          <div style={{ width: "100%", height: 420 }} className="mb-6">
            <Line data={data} options={options} height={420} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PairingFunctionsExperiment;
