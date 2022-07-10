export default function getFont(theme) {

  console.log(theme);

  switch (theme) {
    case ('day'):
      return 'Quicksand';
    case ('night'):
      return 'Helvetica';
    case ('cyber'):
      return 'Consolas, monaco, monospace';
    case ('synth'):
      return 'Futura';
    default:
      return 'Times New Roman';
  }
}