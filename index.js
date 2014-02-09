//Dependencies
var net = require('net');


//Keep track of connections
var counter = 0;
var users = [];


//Server
var server = net.createServer(function(conn)
{
	conn.setEncoding('utf8');

	var nickname;
	var buffer = '';

	//Broadcasts a message to everyone
	function broadcast(msg, exceptMyself)
	{
		for(var i in users)
		{
			if(!exceptMyself || i != nickname)
			{
				users[i].write(msg);
			}
		}
	}

	conn.write(
		'\r\n > Welcome to \033[96mMattChatt\033[39m! \r\n'
	  + ' > ' + counter + ' other people are connected at this time. \r\n'
	  + ' > Please write your name and press Enter: ' 
		);

	counter++;

	conn.on('data', function(data)
	{
		if(data == '\r\n')
		{
			data.replace('\r\n', '');

			if(!nickname)
			{
				if(users[buffer])
				{
					conn.write('\033[93m> Name already in use. Try again:\033[39m ');
					return;
				}
				else
				{
					nickname = buffer;
					users[nickname] = conn;

					broadcast('\033[90m > ' + nickname + ' joined the room.\033[39m \r\n');
				}
				console.log(buffer);
			}
			else
			{
				broadcast('\033[96m > ' + nickname + ' :\033[39m ' + buffer + '\r\n', true);
			}

			buffer = '';
		}
		else
		{
			buffer += data;
			console.log(data);
		}
	})

	conn.on('close', function()
	{
		broadcast('\033[90m > ' + users[nickname] + ' left the room.\033[39m', true);
		delete users[nickname];
		counter--;
	});
});


//Listen
server.listen(3000, function()
{
	console.log('\033[96m server listening on *:3000\033[39m');
});