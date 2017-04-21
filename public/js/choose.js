var app = new Vue({
	el: '#app',
	data: {
		roomName: '',
		err: ''
	},
	methods: {
		create: function() {
			if (this.roomName) {
				window.open('http://' + this.roomName + '.rainy.dev/dev', '_self');
			} else {
				this.err = 'Please enter a room name';
			}
		}
	}
});
