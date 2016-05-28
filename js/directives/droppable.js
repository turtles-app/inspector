app.directive('myDroppable', function() {
	return {
		scope: {
			allowed: '&',
			drop: '&'
			// dragenter: '&',
			// dragleave: '&'
		},
		link: function (scope, element, attrs) {
			var el = element[0];
			el.addEventListener("dragover", function (ev) {
				var allowed = scope.allowed();
				if (allowed()) {
					ev.preventDefault();
				}
			});

			el.addEventListener("drop", function (ev) {
				var drop = scope.drop();
				drop();
			});

		}
	}
});