
export type INumber = {
  number: number;
  decimal_places: number;
};

export function styleNumber(number: number){
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
  
export function getDecimal({ number, decimal_places}: INumber){
    var decimal = number - Math.floor(number)
    return (decimal.toFixed(decimal_places)+"").split(".")[1];
}
    