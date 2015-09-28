if(Meteor.isClient) {

	//main input area textbox
	Template.mainInputArea.events({
		'keypress .input-message': function (event) { 
			if (event.charCode == 13) {
				event.stopPropagation();
				if($('.input-message').val().length > 0) {

					//insert into the chatroom that is currently opened

					var activeChatroomId = Session.get('chatroom-clicked');
					var inputMessage = $('.input-message').val();
					Chatrooms.update({_id: activeChatroomId}, 
									 {$push: {messagesList:
									 	{
									 	text: inputMessage,
										author: Meteor.user().username,
										timestamp: new Date() 
									 	}
									 }}); 					
					$('.input-message').val('');
				}
				return false;
			}
		}
	});

	//account navigationi side bar
	Template.accountNavigation.events({
		'click #userprofile-chatroom': function () {
			
		},
		'click #logout-chatroom': function (e) {
			e.preventDefault();
			Meteor.logout();
			Router.go('/');
		},
		'click #create-chatroom': function (e) {
			e.preventDefault();

			Chatrooms.insert({
				name: $('#create-chatroom-textbox').val().trim(),
				messagesList: 	
						[{
							author: "CinderChatTeam",
							timestamp: new Date(),
							text: "Welcome to " + $('#create-chatroom-textbox').val().trim()
						}]
			});
			//alert(Chatrooms.findOne({name: $('#create-chatroom-textbox').val().trim()}).messagesList[0].author);
			$('#create-chatroom-textbox').val('');
		}
	});


	//template in message area
	Template.mainMessages.helpers({
		chatroomMessages: function () {
			var chatroomsSubscribe = Meteor.subscribe('chatroomList');
			if (chatroomsSubscribe.ready()) {
				var activeChatroomId = Session.get('chatroom-clicked');
										//identify document			//return specific field from document
				return Chatrooms.findOne({ _id: activeChatroomId}).messagesList;  
				//return the messages array pretaining to the chatroom that is clicked
			};
		}
	});

	//message data
	Template.message.helpers({
		
	});

	//List of chatrooms on sidebar
	Template.channelsList.helpers({
		chatrooms: function () {
			var chatroomSubscribe = Meteor.subscribe('chatroomList');
			if (chatroomSubscribe.ready()) {
				return Chatrooms.find();
			}
		},
		messageTotal: function() {

		}
	});

	Template.channelsList.events({
		'click li': function (e) {
			e.preventDefault();
			$('.channelslist-item').removeClass('active');
			$(event.target).addClass('active');
			var activeChatroomId = $(event.target).attr('id');
			Session.set('chatroom-clicked', activeChatroomId);
			//only one list item can be active at any one time (check)
			//each list item refers to a chatroom (check)
			//when a list iteam is clicked, the corresponding chatroom messages (check) and title (check) (along with input) should be displayed
			//
		}
	});

	//title
	Template.mainHeader.helpers({
		chatroomTitle: function () {
			//works with e.preventDefault()
			var activeChatroomId = Session.get('chatroom-clicked');
			var chatroomName = Chatrooms.findOne({ _id: activeChatroomId}).name;
			return chatroomName;
		}
	});

	//userlist

	Template.usersOnlineList.helpers({
		usersOnline: function () {
				var arrayUserNames = Meteor.users.find({}, {username: 1}).fetch();
				return arrayUserNames;
		},

	});
}