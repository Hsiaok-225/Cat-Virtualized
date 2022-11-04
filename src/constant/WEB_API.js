export const BASE_URL = `https://cat-node-api.onrender.com`;
export const PORT = `http://localhost:5001`;

export const divideCats = (arr, num) => {
  const res = [];
  for (let i = 0; i < arr.length; i += num) {
    const parts = arr.slice(i, i + num);
    res.push(parts);
  }
  return res;
};
