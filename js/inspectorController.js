app.controller('inspectorController', ['$scope', function ($scope) {
	var self = this;

	/*
	*
	***Instance Data
	*
	*	 Simple Sigils (Sets) 	*/
	self.a = new Set("sets", "A");
	self.b = new Set("sets", "B");
	self.c = new Set("sets", "C");
	self.d = new Set("sets", "D");
	self.e = new Set("sets", "E");
	self.a.groupIndex = 0;
	self.b.groupIndex = 1;
	self.c.groupIndex = 2;
	self.d.groupIndex =	3;
	self.e.groupIndex = 4;
	self.sets = [self.a, self.b, self.c, self.d, self.e];


	/*
	***Stones (Elements)
	*/
	self.ruby = new Element("ruby", self.a);
	self.topaz = new Element("topaz", self.b);
	self.sapphire = new Element("sapphire", self.c);
	self.emerald = new Element("emerald", self.d);
	self.amethyst = new Element("amethyst", self.e);
	self.stones = [self.ruby, self.topaz, self.sapphire, self.emerald, self.amethyst];
	self.inspectedStones = [];

	/*
	***Composite Sigils (Sets)
	*	
	* A u B 					*/
	self.union1 = union("union1", self.a, self.b);
	// C u D
	self.union2 = union("union2", self.c, self.d);
	// (C u D) u E
	self.union3 = union("union3", self.union2, self.e);
	// (A u B) u [(C u D) u E]
	self.union4 = union("union4", self.union1, self.union3);
	// A n (A u B)
	self.intersection1 = intersection("intersection1", self.union1, self.a);
	self.union5 = union("union5", self.intersection1, self.a);
	self.union1.groupIndex = 5;
	self.union2.groupIndex = 6;
	self.union3.groupIndex = 7;
	self.union4.groupIndex = 8;
	self.intersection1.groupIndex = 9;
	self.union5.groupIndex = 10;
	self.sets.push(self.union1, self.union2, self.union3, self.union4, self.intersection1, self.union5);

	/*
	***Runes (Facts)
	*/
	self.rune1 = new Fact("ruby", true, self.a.equivalents[self.a.eqActiveIndex]);
	self.rune2 = new Fact("topaz", true, self.b.equivalents[self.b.eqActiveIndex]);
	self.rune3 = new Fact("sapphire", true, self.c.equivalents[self.c.eqActiveIndex]);
	self.rune4 = new Fact("emerald", true, self.d.equivalents[self.d.eqActiveIndex]);
	self.rune5 = new Fact("amethyst", true, self.e.equivalents[self.e.eqActiveIndex]);
	self.runes = [self.rune1, self.rune2, self.rune3, self.rune4, self.rune5];

	/*
	***Network Data & Config
	*/
	// self.nodes = rawNodesForInspector(self.union4, 1, 0);
	// self.edges = rawEdgesForInspector(self.union4);
	self.data = sigilTreeData(self.union5, 0, {});
	// Container element of api generated network
	// var container = document.getElementById("apiNetwork");
	var container = document.getElementById("newNetwork");
	
	//Configure options
	self.options = {
	nodes: {physics: false},
	layout: {hierarchical: true},
	interaction: {dragView: false}
	};

	self.tree = new vis.Network(container, this.data, this.options);

	/*
	***Inspect Callback
	*/
	self.inspect = function(index) {
		switch (dragData.type) {
			case 'sigil':
			case 'fuse':
			case 'trim':
				self.target = self.sets[index];
				self.target.setKnownElements(self.runes);
				self.inspectedStones = self.target.knownElements;
				self.data = sigilTreeData(self.target, 0, {});
				var data = {
					'nodes': self.data.nodes,
					'edges': self.data.edges
				};
				// self.tree.setData(container2, self.data, self.options);
				self.tree.setData({nodes: data.nodes, edges: data.edges});
				$scope.$apply();
			break;
		}
	};

	/*
	***Drop functionality
	*/
	self.dropAllowed = function () {
		if (dragData.type === 'sigil' || dragData.type === 'fuse' || dragData.type === "trim" || dragData.type === "core" || dragData.type === "stone" || dragData.type === "rune" || dragData.type === "tool") {
			return true;
		} else {
			return false;
		}		
	};

	self.drop = function () {
		switch (dragData.type) {
			case 'sigil':
			case 'fuse':
			case 'trim':
				self.inspect(dragData.index);
				break;
		}
		dragData = {type: "", index: null};
	};
	self.inspect(7);
}]);