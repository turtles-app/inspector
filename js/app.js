var app = angular.module("app", []);
var dragData = {
	type: '',
	index: null
};

var nodes = new vis.DataSet([
	{id: 1, label: '(A u B) u ( (C u D) u E)', level: 0},
	{id: 2, label: '(A U B)', level: 1},
	{id: 3, label: '( (C u D) u E', level: 1},
	{id: 4, label: 'A', level: 2},
	{id: 5, label: 'B', level: 2},
	{id: 6, label: '(C u D)', level: 2},
	{id: 7, label: 'E', level: 2},
	{id: 8, label: 'C', level: 3},
	{id: 9, label: 'D', level: 3}
]);

var edges = new vis.DataSet([
	{from: 1, to: 2},
	{from: 1, to: 3},
	{from: 2, to: 4},
	{from: 2, to: 5},
	{from: 3, to: 6},
	{from: 3, to: 7},
	{from: 6, to: 8},
	{from: 6, to: 9}
]);

// //Capture container for network
var container = document.getElementById('mynetwork');

//Format network data
var data = {
	nodes: nodes,
	edges: edges
};

// Configure options
var options = {
	nodes: {physics: false},
	layout: {hierarchical: true},
	interaction: {dragView: false}
};

// var network = new vis.Network(container, data, options);
