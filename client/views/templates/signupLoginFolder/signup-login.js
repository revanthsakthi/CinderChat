if(Meteor.isClient) {
Template.login.events({
	'click #login-button': function (e,template) {
		e.preventDefault();

		var emailVar = template.find('#login-email').value.trim().toLowerCase();
		var passwordVar = template.find('#login-password').value;


		Meteor.loginWithPassword(emailVar, passwordVar , function(err) {
			if(err) {
				alert('incorrect password or username');
			}
			else {
				//user logged in
				//indicate user is logged in
				Router.go('/cinder-chatroom');
				

			}
		});
		return false;
	}

	//need to handle already exisiting email, username
});

Template.signup.events({
	'click #signup-button': function (e, template) {
		e.preventDefault();

		var usernameVar = template.find('#signup-username').value;
		var emailVar = template.find('#signup-email').value.trim().toLowerCase(); //trim on serverside
		var passwordVar = template.find('#signup-password').value; 

		Accounts.createUser({
			password: passwordVar,
			email: emailVar,
			username: usernameVar,
			loggedin: 2
		}, function (err) {
			if(err){
				Router.go('/');
			}
			else {
				Router.go('/cinder-chatroom');

			}
		});
	}
	//need to validate email, username, password
});
}