var rawNodesForInspector = function (set, initialId, initialLevel) {
	var id = initialId;
	var level = initialLevel;
	var nodes = [];
	var initialNode = {id: set.groupIndex, label: set.strEquivalents[set.eqActiveIndex], level: level, shape: 'image', image: './img/inspector-img/inspector-' + set.type + '.png'};
	nodes.push(initialNode);
	// Recurse if set has component sets (deeper levels)
	if (!set.simple) {
		// id = nodes[nodes.length - 1].id + 1;
		level++;
		// Recurse for 1st half of component sets
		var leftNodes = rawNodesForInspector(set.components[0], id, level);
		id = leftNodes[leftNodes.length - 1].id + 1;
		level = leftNodes[0].level;
		// Recurse for 2nd half of component sets
		var rightNodes = rawNodesForInspector(set.components[1], id, level);
		nodes = nodes.concat(leftNodes, rightNodes);
	}

	return nodes;

};

var rawEdgesForInspector = function (set) {
	var edges = [];
	if (!set.simple) {
		// First layer of edges
		edges.push({from: set.groupIndex, to: set.components[0].groupIndex});
		edges.push({from: set.groupIndex, to: set.components[1].groupIndex});

		// console.log("\nFirst layer of edges for " + set.strEquivalents[set.eqActiveIndex]);
		// console.log(set.components[0].strEquivalents[set.components[0].eqActiveIndex] + " group index: " + set.components[0].groupIndex);
		// console.log({from: set.groupIndex, to: set.components[0].groupIndex});
		// console.log(set.components[1].strEquivalents[set.components[1].eqActiveIndex] + " group index: " + set.components[1].groupIndex);
		// console.log({from: set.groupIndex, to: set.components[1].groupIndex});
		
		// Recursive calls for deeper edges
		var leftEdges = rawEdgesForInspector(set.components[0]);
		var rightEdges = rawEdgesForInspector(set.components[1]);
		edges = edges.concat(leftEdges, rightEdges);
	}
	return edges;
}