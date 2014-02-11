//Dependencies
var net = require('net');
var Person = require('./person');


//Keep track of connections and users
var counter = 0;
var users = [];

//Know when user hit Enter key
var delimiter = '\r\n';


//Server
var server = net.createServer(function(conn)
{
	conn.setEncoding('utf8');

	var person = new Person();
	person.connection = conn;

	//Broadcasts a message to everyone
	function broadcast(msg, exceptMyself)
	{
		for(var i in users)
		{
			if(!exceptMyself || i != person.name)
			{
				users[i].connection.write(msg);
			}
		}
	}

	//Send welcome message
	person.welcome(counter);

	//increment counter
	counter++;

	conn.on('data', function(data)
	{
		if(data == delimiter)
		{
			data.replace(delimiter, '');

			if(!person.login)
			{
				if(users[person.buffer])
				{
					conn.write('\033[33m> Name already in use. Try again:\033[39m ');
					person.clearBuffer();
				}
				else
				{
					person.name = person.buffer;
					users[person.name] = person;

					person.login = true;

					broadcast('\033[33m > ' + person.name + ' joined the room. \033[39m \r\n');
				}
				console.log(person.buffer);

			}
			else
			{
				broadcast('\033[33m > ' + person.name + ' : ' + person.buffer + delimiter + '\033[39m', true);
				console.log(person.buffer);
			}

			person.clearBuffer();
		}
		else
		{
			person.buffer += data;
		}
	})

	conn.on('close', function()
	{
		counter--;
		delete users[person.name];
		broadcast('\033[33m > ' + person.name + ' left the room.\033[39m', true);
	});
});


//Listen
server.listen(23, function()
{
	console.log('\033[96m server listening on *:3000\033[39m');
});