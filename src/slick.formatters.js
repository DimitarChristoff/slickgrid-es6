const percentCompleteFormatter = (row, cell, value, columnDef, dataContext) => {
  if (value == null || value === ''){
    return '-';
  } else if (value < 50){
    return `<span style='color:red;font-weight:bold;'>${value}%</span>`;
  } else {
    return `<span style='color:green'>${value}%</span>`;
  }
};

const percentCompleteBarFormatter = (row, cell, value, columnDef, dataContext) => {
  if (value == null || value === ''){
    return '';
  }

  let color;

  if (value < 30){
    color = 'red';
  } else if (value < 70){
    color = 'silver';
  } else {
    color = 'green';
  }

  return `<span class="percent-complete-bar" style="background: ${color};width:${value}%"></span>`;
};

const yesNoFormatter = (row, cell, value) => value ? 'Yes' : 'No';
const checkmarkFormatter = (row, cell, value) => value ? '✔' : '';

export default {
  PercentComplete: percentCompleteFormatter,
  PercentCompleteBar: percentCompleteBarFormatter,
  YesNo: yesNoFormatter,
  Checkmark: checkmarkFormatter
};
