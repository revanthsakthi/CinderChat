Messages = new Mongo.Collection('messages');
Chatrooms = new Mongo.Collection('chatrooms');

/*
--------------------------------
	MESSAGES Schema:
	----------------------------

	*create new object for each message
	{
		_id: (...)   --> message ID
		chatroomId: (...),
		userId: (...),
		date: (...),
		text: ()
	},
	{...},
	...

--------------------------------
	CHATROOM Schema:
	----------------------------
	
	*create new object for each chatroom
		{
			id: (...),
			name: (...),
			messagesList: [
					
			]

		},
		{...},
		...
*/

/*

Chatrooms.insert({
	name: 'general',
	messagesList: [
		{
			userId: 'CinderChatTeam',
			date: 'a long time ago',
			text: 'Hey, there! Say something...'
		}
	]
});

Chatrooms.insert({
	name: 'random',
	messagesList: [
		{
			userId: 'CinderChatTeam',
			date: 'a long time ago',
			text: 'Hey, there! Say something random...'
		}
	]
});

*/
