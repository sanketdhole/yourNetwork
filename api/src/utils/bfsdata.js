class BFSData {
  toVisit = [];
  visited = {};
  constructor(userid) {
    this.toVisit.push(userid);
    this.visited[userid] = [userid];
  }

  isFinished = () => {
    return this.toVisit.length == 0;
  };
}

module.exports = BFSData;
