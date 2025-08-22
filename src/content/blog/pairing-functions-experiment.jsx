import React from "react";
import { Link } from "react-router-dom";

const blogPost = {
  title: "Comparison of Pairing Functions: Szudzik, Cantor, and Bit Interleaving",
  date: "2025-08-23",
  tags: ["math", "pairing functions", "visualization", "experiment"],
  summary:
    "A visual and mathematical comparison of Szudzik's, Cantor's, and Bit Interleaving pairing functions, including interactive chart and code.",
  content: (
    <>
      <p>
        In this experiment, we explore different mathematical pairing functions that uniquely map two integers into a single integer. We start with two sequences of numbers, <b>x</b> and <b>y</b>, where x starts at 1 and y starts at 2, incrementing both by 1 in each iteration up to 100.
      </p>
      <p>
        The pairing functions included are Szudzik's Elegant Pairing Function, Cantor's Pairing Function, and a Bit Interleaving method. The purpose is to observe how each function grows compared to the original sequences and to visually compare the differences in the resulting values.
      </p>
      <h2>Mathematical Formulas</h2>
      <p>Szudzik's Elegant Pairing Function:</p>
      <pre>x &gt;= y ? x² + x + y : y² + x</pre>
      <p>Cantor Pairing Function:</p>
      <pre>(x + y)(x + y + 1)/2 + y</pre>
      <p>Bit Interleaving Pair Function:</p>
      <pre>Interleave the bits of x and y to form a single integer z</pre>
      <h2>Interactive Experiment</h2>
      <p>
        Try the interactive chart on the <Link to="/experiment/pairing-functions">Pairing Functions Experiment page</Link>.
      </p>
      <h2>TypeScript/JavaScript Functions</h2>
      <pre>{`
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
    </>
  ),
};

export default blogPost;
