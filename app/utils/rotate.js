export default function rotate(matrix, count = 1) {
  for (let i = 0; i < count; i++) {
    const N = matrix.length - 1; // use a constant
    // use arrow functions and nested map;
    const result = matrix.map((row, i) =>
      row.map((val, j) => matrix[N - j][i])
    );
    matrix.length = 0; // hold original array reference
    matrix.push(...result); // Spread operator
  }

  return matrix;
}
