var app = new Vue({
	el: '#app',
	data: {
		roomName: '',
		err: ''
	},
	methods: {
		create: function() {
			var rn = this.roomName;
			if (rn.charAt(rn.length - 1) == '.') {
				rn = rn.substr(0, rn.length - 1);
				this.roomName = rn;
			}
			if (this.roomName) {
				window.open('http://' + this.roomName + '.rainy.dev/dev', '_self');
			} else {
				this.err = 'Please enter a room name';
			}
		}
	}
});
