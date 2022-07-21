export default function getColor(theme, type) {

  let themeArray = [];
  //synth, day, night, cyber

  switch (type) {
    case 'text':
      themeArray = ['#ff0080', '#011c45', '#fffb00', '#1ecc18'];
      break;
    case 'card_background':
      themeArray = ['#0e02b5', '#FFFFFF', '#111466', '#000000'];
      break;
    case 'error_card_background':
      themeArray = ['#000073', '#EEEEEE', '#000073', '#400206'];
      break;
    case 'border':
      themeArray = ['#00fff7', '#c2c2c4', '#00fbff', '#09f205'];
      break;
    case 'box_shadow':
      themeArray = ['#00d5ff', '#03005e', '#0802c2', '#015c07'];
      break;
    case 'full_background':
      themeArray = ['#1f0140', '#d7f1f7', '#01032e', '#000000'];
      break;
    case 'primary': 
      themeArray = ['#b030e3', '#111466', '#30bbe6', '#3dd422'];
      break;
    case 'secondary':
      themeArray = ['#4d69ff', '#c61df0', '#61cfe8', '#eef765'];
      break;
    case 'success':
      themeArray = ['#adffa1', '#19690e', '#34bf21', '#22f505'];
      break;
    case 'error':
      themeArray = ['#ff1100', '#ff4538', '#d60e00', '#d60e00'];
      break;
    case 'info':
      themeArray = ['#dd00ff', '#000b45', '#61cfe8', '#11ff00'];
      break;
    default:
      themeArray = ['#030303', '#030303', '#030303', '#030303'];
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
    default:
      return themeArray[0];
  }

}