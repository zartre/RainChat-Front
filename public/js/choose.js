var app = new Vue({
	el: '#app',
	data: {
		roomName: ''
	},
	methods: {
		create: function() {
			window.open('http://' + this.roomName + '.rainy.chat/dev', '_self');
		}
	}
});
