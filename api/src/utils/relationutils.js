let relations = {
  sibling: "sibling",
  child: "father",
  father: "child",
  "grand father": "grand son",
  "grand son": "grand father",
  friend: "friend",
};

function findOppositeRelation(relation) {
  return relations[relation];
}

module.exports = { findOppositeRelation };
