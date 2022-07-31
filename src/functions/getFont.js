export default function getFont(theme) {

  console.log(theme);

  switch (theme) {
    case ('day'):
      return 'Quicksand';
    case ('night'):
      return 'Helvetica';
    case ('cyber'):
      return "Courier, monospace";
    case ('synth'):
      return 'Futura';
    case ('blue'):
      return "Courier, monospace";
    case ('sunrise'):
      return "Quicksand";
    default:
      return 'Times New Roman';
  };

}