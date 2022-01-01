

// export default {
//   primary: "#5C7AEA",
//   secondary: "#E26A2C",
//   danger:'#df3b3b',
//   backgroundSecondary : "#fff",
//   backgroundPrimary : "#f5f5f5",
//   borderPrimary: "#ddd",
//   borderSecondary: "#eee",
//   textColor : "#111",
//   buttomTextColor : "#fff",
//   buttomTextColor2 : "#fff",
//   transparentBackground:"rgba(0,0,0,0)",
//   subTextColor : "#aaa",
//   navbar:"#fff",
//   statusBar: 'dark-content',
//   };
  
//   export default {
//     primary: "#5C7AEA",
//     secondary: "#E26A2C",
//     danger:'#df3b3b',
//     backgroundSecondary : "#1a1a1a",
//     backgroundPrimary : "#111",
//     borderPrimary: "#111",
//     borderSecondary: "#222",
//     textColor : "#eee",
//     buttomTextColor : "#111",
//     buttomTextColor2 : "#eee",
//     subTextColor : "#aaa",
//     statusBar: 'light-content',
//     navbar:"#000",
//     transparentBackground:"rgba(0,0,0,0)",
//     };
    


  import { Appearance } from 'react-native'
  const colorScheme = Appearance.getColorScheme();
  function choosColormode() {
  if (colorScheme === 'dark') {
  return (
  {
    primary: "#5C7AEA",
    secondary: "#E26A2C",
    danger:'#df3b3b',
    backgroundSecondary : "#1a1a1a",
    backgroundPrimary : "#111",
    borderPrimary: "#111",
    borderSecondary: "#222",
    textColor : "#eee",
    buttomTextColor : "#111",
    buttomTextColor2 : "#eee",
    subTextColor : "#aaa",
    statusBar: 'light-content',
    navbar:"#000",
    transparentBackground:"rgba(0,0,0,0)",
  }
  );
  }
  else {
  return (
  {
    primary: "#5C7AEA",
    secondary: "#E26A2C",
    danger:'#df3b3b',
    backgroundSecondary : "#fff",
    backgroundPrimary : "#f5f5f5",
    borderPrimary: "#ddd",
    borderSecondary: "#eee",
    textColor : "#111",
    buttomTextColor : "#fff",
    buttomTextColor2 : "#fff",
    transparentBackground:"rgba(0,0,0,0)",
    subTextColor : "#aaa",
    navbar:"#fff",
    statusBar: 'dark-content',
  }
  )
  }
  }
  export default choosColormode();