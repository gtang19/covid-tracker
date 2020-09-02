const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function main() {
  let res = await axios.get(
    "https://miamioh.edu/healthy-together/status-updates/dashboard/"
  );

  console.log(res);
}

// main();

JSDOM.fromURL(
  "https://miamioh.edu/healthy-together/status-updates/dashboard/"
).then((dom) => {
  const document = dom.window.document;
  let students = document.querySelector(".week.totals .students span");
  console.log(
    `The number of students who have tested positive at Miami is: ${students.innerHTML}`
  );

  //console.log(dom.serialize());
});
