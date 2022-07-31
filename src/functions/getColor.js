export default function getColor(theme, type) {

  let themeArray = [];
  //synth, day, night, cyber, blue, sunrise

  switch (type) {
    case 'text':
      themeArray = ['#ff0080', '#011c45', '#fffb00', '#1ecc18', "#ffffff", '#0009b8'];
      break;
    case 'card_background':
      themeArray = ['#0e02b5', '#FFFFFF', '#111466', '#000000', "#003cff", "#fafa7d"];
      break;
    case 'error_card_background':
      themeArray = ['#000073', '#fac3c3', '#000073', '#400206', "#ff0000", "#ff7645"];
      break;
    case 'border':
      themeArray = ['#00fff7', '#c2c2c4', '#00fbff', '#09f205', "#ffffff", "#0015ff"];
      break;
    case 'box_shadow':
      themeArray = ['#00d5ff', '#03005e', '#0802c2', '#015c07', "#000000", "#0015ff"];
      break;
    case 'full_background':
      themeArray = ['#1f0140', '#d7f1f7', '#01032e', '#000000', "#000475", "#ffba82"];
      break;
    case 'primary': 
      themeArray = ['#b030e3', '#111466', '#30bbe6', '#3dd422', "#009dff", "#008275"];
      break;
    case 'secondary':
      themeArray = ['#4d69ff', '#c61df0', '#61cfe8', '#eef765', "#7515eb", "#8400ff"];
      break;
    case 'success':
      themeArray = ['#adffa1', '#19690e', '#34bf21', '#22f505', "#2e9100", "#ff00e1"];
      break;
    case 'error':
      themeArray = ['#ff1100', '#fa2f20', '#d60e00', '#d60e00', "#db0209", "#ff0059"];
      break;
    case 'info':
      themeArray = ['#dd00ff', '#000b45', '#61cfe8', '#11ff00', "#009dff", "#b200d9"];
      break;
    default:
      themeArray = ['#030303', '#030303', '#030303', '#030303', "#030303", "#030303"];
      break;
  };

  switch (theme) {
    case 'synth':
      return themeArray[0];
    case 'day':
      return themeArray[1];
    case 'night':
      return themeArray[2];
    case 'cyber':
      return themeArray[3];
    case 'blue':
      return themeArray[4];
    case 'sunrise':
      return themeArray[5];
    default:
      return themeArray[0];
  }

}