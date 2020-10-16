export default function generateRandom (min:number,max:number){
  return Math.floor(Math.random() * (max - min)) + min;
}