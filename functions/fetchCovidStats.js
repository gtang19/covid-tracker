const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.handler = async (event, context) => {
  try {
    const options = JSON.parse(event.body);

    const dom = await JSDOM.fromURL(options.url);
    const document = dom.window.document;
    let students = document.querySelector(options.queryParams);
    let cases = students.innerHTML;
    return {
      statusCode: 200,
      body: JSON.stringify({
        cases: cases,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
