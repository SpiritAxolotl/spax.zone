class Timer {
  constructor(what, announce=true) {
    this.start(what, announce);
  }
  start = (what, announce=true) => {
    this.startTime = Date.now();
    if (announce)
      console.log(`${what[0].toUpperCase()}${what.substring(1)}...`);
  }
  stop = (what, announce=true) => {
    this.endTime = Date.now();
    if (announce)
      console.log(`It took ${(this.endTime - this.startTime) / 1000}s to ${what}.`);
  }
}

module.exports = { Timer };