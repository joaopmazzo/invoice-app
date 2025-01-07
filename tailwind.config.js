/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "01": "#7c5dfa",
        "02": "#9277ff",
        "03": "#1e2139",
        "04": "#252945",
        "05": "#dfe3fa",
        "06": "#888eb0",
        "07": "#7e88c3",
        "08": "#0c0e16",
        "09": "#ec5757",
        10: "#FF9797",
        11: "#F8F8FB",
        12: "#141625",
        "status-paid": "#33D69F",
        "status-pending": "#FF8F00",
        "status-draft": "#373B53",
      },
      fontFamily: {
        Spartan: ["League Spartan", "sans-serif"],
      },
      fontSize: {
        headingL: "36px",
        headingM: "24px",
        headingS: "15px",
        headingSVariant: "15px",
        body: "13px",
        bodyVariant: "13px",
      },
      lineHeight: {
        headingL: "33px",
        headingM: "22px",
        headingS: "24px",
        headingSVariant: "15px",
        body: "18px",
        bodyVariant: "15px",
      },
      letterSpacing: {
        headingL: "-1px",
        headingM: "-0.75px",
        headingS: "-0.25px",
        headingSVariant: "-0.25px",
        body: "-0.1px",
        bodyVariant: "-0.25px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
