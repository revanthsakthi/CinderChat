Meteor.publish('userMessages', function(){
	return Messages.find();
});

Meteor.publish('chatroomList', function() {
	return Chatrooms.find();
});


/*
Meteor.publish('allUsers', function() {
	return Meteor.users.find({}, {fields: {
		'username': true
	}
	});
});
*/