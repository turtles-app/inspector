app.controller('inspectorController', [function () {
	var self = this;

	/*
	*
	***Instance Data
	*
	*	 Simple Sets 	*/
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
	***Composite Sets (Union)
	*	
	* A u B 					*/
	self.union1 = union("union1", self.a, self.b);
	// C u D
	self.union2 = union("union2", self.c, self.d);
	// (C u D) u E
	self.union3 = union("union3", self.union2, self.e);
	// (A u B) u [(C u D) u E]
	self.union4 = union("union4", self.union1, self.union3);
	self.union1.groupIndex = 5;
	self.union2.groupIndex = 6;
	self.union3.groupIndex = 7;
	self.union4.groupIndex = 8;
	self.sets.push(self.union1, self.union2, self.union3, self.union4);

	/*
	***Network Data & Config
	*/
	self.nodes = rawNodesForInspector(self.union4, 1, 0);
	self.edges = rawEdgesForInspector(self.union4);
	self.data = {nodes: self.nodes, edges: self.edges};
	// Container element of api generated network
	var container = document.getElementById("apiNetwork");
	
	//Configure options
	this.options = {
	nodes: {physics: false},
	layout: {hierarchical: true},
	interaction: {dragView: false}
	};

	this.tree = new vis.Network(container, this.data, this.options);
}]);