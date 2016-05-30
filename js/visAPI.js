var sigilTreeData = function (set, initialLevel, occurances) {
	var nodes = [];
	var edges = [];
	var id = set.groupIndex;
	var setName = set.strEquivalents[set.eqActiveIndex];

	if (_.hasIn(occurances, setName)) {
		id += 100*occurances[setName];
		occurances[setName]++;
	} else {
		occurances[setName] = 1;
	}
	var initialNode = {
		'id': id, 'label': setName, level: initialLevel, 'shape': 'image', image: './img/inspector-img/inspector-' + set.type + '.png'
	};
	nodes.push(initialNode);
	// Draw edges and recurse if sigil is composite
	if (!set.simple) {
		var leftId = set.components[0].groupIndex;
		var rightId = set.components[1].groupIndex;
		var leftName = set.components[0].strEquivalents[set.components[0].eqActiveIndex];
		var rightName = set.components[1].strEquivalents[set.components[1].eqActiveIndex];
		// If components are repeated nodes,
		// adjust the IDs used to draw edges to them
		// Objects to store deeper levels of nodes and edges
		var leftData = {'nodes': [], 'edges': [], 'occurances': occurances};
		var rightData = {'nodes': [], 'edges': [], 'occurances': occurances};
		// Recurse for component sigils' nodes and edges 
		leftData = sigilTreeData(set.components[0], initialLevel+1, occurances);
		// Capture any reoccuring nodes from previous recursion
		occurances = leftData.occurances;
		if ( occurances[leftName] > 1) {
			// Adjust id of child sigil for edge (in repeat case)
			leftId += 100*(occurances[leftName] - 1);
			occurances[leftName]++;
		}
		rightData = sigilTreeData(set.components[1], initialLevel+1, occurances);
		occurances = rightData.occurances;
		
		if ( occurances[rightName] > 1) {
			// Adjust id of child sigil for edge (in repeat case)
			rightId += 100*(occurances[rightName] - 1);
			occurances[rightName]++;
		}
		// Edges to direct children
		var leftEdge = {'from': id, 'to': leftId};
		var rightEdge = {'from': id, 'to': rightId};
		edges.push(leftEdge, rightEdge);
		// Compile data
		nodes = nodes.concat(leftData.nodes, rightData.nodes);
		edges = edges.concat(leftData.edges, rightData.edges);
	}

	var res = {
		nodes: nodes,
		edges: edges,
		occurances: occurances
	};

	return res;
}