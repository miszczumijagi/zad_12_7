// KLASA KANBAN CARD
function Card(id, name, bootcamp_kanban_column_id) {
	var self = this;
	
	this.id = id /*zamiast funkcji randomString()*/;
	this.name = name /* zamiast description*/ || 'No name given';
	this.bootcamp_kanban_column_id = bootcamp_kanban_column_id;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var cardEdit = $('<button class="btn-edit">Edit</button>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardEdit.click(function () {
			self.editCard();
		});
		
		card.append(cardDeleteBtn);
		card.append(cardEdit);
		cardDescription.text(self.name);
		card.append(cardDescription);
		
		return card;
	}
}

Card.prototype = {
	removeCard: function() {
	    var self = this;
	    $.ajax({
		    url: baseUrl + '/card/' + self.id,
		    method: 'DELETE',
		    success: function(){
		       	self.element.remove();
		    }
	    });
	},

	editCard: function() {
		var self = this;
		self.name = prompt('Edit your card:', self.name);

		var parentColumn =  self.bootcamp_kanban_column_id;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
				name: self.name,
				bootcamp_kanban_column_id: parentColumn,
			},
			success: function(response) {
				self.element.children('.card-description').text(self.name);
			}

		});

	}
}
	
