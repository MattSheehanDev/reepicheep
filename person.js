module.exports = Person;

function Person() {}

Person.prototype.name = ''
Person.prototype.buffer = '';
Person.prototype.login = false;

Person.prototype.connection;

var delimiter = '\r\n';

Person.prototype.welcome = function(counter)
{
	this.connection.write(
		delimiter + ' > Welcome to \033[96mMattChatt\033[39m!' + delimiter
	    + ' > ' + counter + ' other people are connected at this time.' + delimiter
	    + ' > Please write your name and press Enter: ' 
		);
}

Person.prototype.clearBuffer = function()
{
	this.buffer = '';
}