export const generateToken=()=>{
    let min = Math.ceil(1000);
    let max = Math.floor(9999);
    return Math.floor(Math.random() * (max - min) + min);
}