module.exports = {
  colors: {
    primary: "#0C3CFD", 
    catalinaBlue: "#082C75", 
    whiteLilac: "#F6F8FC",
    mischka: "#D0D5E1", 
    regentGray: "#8595A3", 
    porcelain: "#E3E6E9", 
    mineShaft: "#232323", 
    caribbeanGreen: "#00C48B", 
    coralRed: "#FB3F3F", 
    soltitude: "#E7EFFE", 
    seashellPeach: "#FFF7F3",
    paleSky: "#69747E",
    zumthor: "#ECF4FF"
  },
  fontFamily: {
    poppins: ["Poppins", "sans-serif"], // Breeze
  },
  keyframes: {
    authLeft: {
      "0%": { width: "100%" },
      "50%": { width: "100%" },
      "100%": { width: "30%" },
    },
    authRight: {
      "0%": { width: "0%", display: "none", opacity: 0 },
      "50%": { width: "0%", opacity: 0 },
      "70%": { opacity: 0 },
      "100%": { width: "70%" },
    },
    showRight: {
      "0%": { display: "none" },
      "50%": { display: "none" },
      "70%": { display: "none" },
      "100%": { display: "flex", width: "600px" },
    },
  },
  animation: {
    authLeft: "authLeft 2s linear",
    authRight: "authRight 2s linear",
    showRight: "showRight 2s linear",
  },
  screens: {
    //four views
    //1.phone is default
    //2.tablet
    //3.laptop
    //4.desktop
    tablet: "768px",
    laptop: "1280px",
    desktop: "1920px",
  },
};
