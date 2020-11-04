const Relation = require("../models/relation");
const BFSData = require("./bfsdata");

async function searchLevel(sourceData, destData) {
  /*
    Para:
        sourceData - Data Object of type BFSData
        destData - Data Object of type BFSData
    Returns:
        none
    searchLevel(sourceData, destData) - Search of one level to find 
        if there is any path between source to destination 
    */
  let size = sourceData.toVisit.length;
  for (let i = 0; i < size; i++) {
    let curr = sourceData.toVisit.shift();
    if (destData.visited.hasOwnProperty(curr)) {
      return curr;
    }
    let relationObject = await Relation.findOne({ userId: curr });
    if (relationObject != null) {
      let relations = relationObject.relations.map((obj) => obj.user);
      for (let j = 0; j < relations.length; j++) {
        if (!sourceData.visited.hasOwnProperty(relations[j])) {
          sourceData.toVisit.push(relations[j]);
          sourceData.visited[relations[j]] = [...sourceData.visited[curr]];
          sourceData.visited[relations[j]].push(relations[j]);
        }
      }
    }
  }
}

function mergePath(sourceData, destData, collision) {
  /*
    Para:
        sourceData - Data Object of type BFSData
        destData - Data Object of type BFSData
        collision - String
    Result:
        path - List
    mergePath(sourceData, destData, collision) - Combine the data from 
        sourceData and destData to form the complete path from 
        source to destination
    */
  let fromSource = sourceData.visited[collision];
  let fromDestination = destData.visited[collision];
  fromDestination.pop();
  for (let i = 0; i < fromDestination.length; i++) {
    fromSource.push(fromDestination.pop());
  }
  return fromSource;
}

async function findPath(user1, user2) {
  /*
    Para:
        user1 : String
        user2 : String
    Result:
        path - List
    findPath(user1, user2) - Return a complete and shortest 
        path from user1 to user2 
  */
  if (user1 == user2) return [user1];
  let sourceData = new BFSData(user1);
  let destData = new BFSData(user2);
  while (!sourceData.isFinished() && !destData.isFinished()) {
    let collision = await searchLevel(sourceData, destData);
    if (collision != null) {
      return mergePath(sourceData, destData, collision);
    }
    collision = await searchLevel(destData, sourceData);
    if (collision != null) {
      return mergePath(sourceData, destData, collision);
    }
  }
  return null;
}

module.exports = findPath;
