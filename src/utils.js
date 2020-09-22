export function pad(num, size) {
    var s = String(num);
  
    while (s.length < size) {
      s = "0" + s;
    }
  
    return s;
  }