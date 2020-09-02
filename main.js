import { quickSort } from "./quickSort.js";

async function getData(name, url, queryParams, adjust = parseInt) {
  const res = await fetch(`/.netlify/functions/fetchCovidStats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url,
      queryParams: queryParams,
    }),
  });
  if (res.ok) {
    let resData = await res.json();
    return {
      name: name,
      cases: adjust(resData.cases),
      url: url,
    };
  }
}

async function main() {
  let data = await Promise.all([
    getData(
      "Miami University",
      "https://miamioh.edu/healthy-together/status-updates/dashboard/",
      ".week.totals .students span"
    ),
    getData(
      "UC",
      "https://www.uc.edu/publichealth/covid-19-dashboard.html",
      ".p-sub-number"
    ),
    getData(
      "University of Richmond",
      "https://www.richmond.edu/coronavirus/dashboard/index.html",
      ".fact"
    ),
  ]);
  console.log(data);
  let sortedData = quickSort(data, (a, b) => {
    if (a.cases > b.cases) {
      return -1;
    }
    if (a.cases < b.cases) {
      return 1;
    }
    return 0;
  });

  const stats = document.getElementById("stats");
  sortedData.forEach((d) => {
    let row = document.createElement("a");
    row.innerHTML = `<span>${d.name}</span><span>${d.cases}</span>`;
    row.href = d.url;
    row.target = "_blank";
    row.classList.add("row");
    stats.appendChild(row);
  });
  console.log(sortedData);
}

main();
