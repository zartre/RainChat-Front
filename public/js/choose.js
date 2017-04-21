var app = new Vue({
	el: '#app',
	data: {
		roomName: ''
	},
	methods: {
		create: function() {
			var rn = this.roomName;
			var fixed = 0;
			while (!fixed) {
				if (rn.charAt(rn.length - 1) === '.') {
					rn = rn.substr(0, rn.length - 1);
					this.roomName = rn;
				} else {
					fixed = 1;
				}
			}
			if (this.validate()) {
				window.open('http://' + this.roomName + '.rainy.dev/dev', '_self');
			}
		},
		validate: function() {
			if (this.roomName.includes('www')) {
				return false;
			} else {
				return true;
			}
		}
	}
});
