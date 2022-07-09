export default function getFont(theme) {

  console.log(theme);

  switch (theme) {
    case ('day'):
      return 'Quicksand';
    case ('night'):
      return 'Futura';
    case ('cyber'):
      return 'Consolas, monaco, monospace';
    case ('synth'):
      return 'Helvetica';
    default:
      return 'Times New Roman';
  }
}