module.exports = Person;

function Person() {}

Person.prototype.name = ''
Person.prototype.buffer = '';
Person.prototype.login = false;

Person.prototype.connection;

Person.prototype.welcome = function(counter)
{
	this.connection.write(
		'\r\n > Welcome to \033[96mMattChatt\033[39m! \r\n'
	    + ' > ' + counter + ' other people are connected at this time. \r\n'
	    + ' > Please write your name and press Enter: ' 
		);
}

Person.prototype.clearBuffer = function()
{
	this.buffer = '';
}