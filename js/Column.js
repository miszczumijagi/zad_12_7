function Column(id, name) {
	var self = this;
	
	this.id = id /*randomString() -zamieniamy tą funkcję na id*/;
	this.name = name || 'No name given'; /*wartość domyślna dla nazwy kolumny, jeśli ta będzie pusta */
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnEdit = $('<button class="btn-col-edit">');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});

		columnEdit.click(function() {
            self.editColumn();
        });

		
		columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			$.ajax({
		    url: baseUrl + '/card',
		    method: 'POST',
		    data: {
		    name: cardName,
		    bootcamp_kanban_column_id: self.id
		    },
		    success: function(response) {
		        var card = new Card(response.id, cardName);
		        self.createCard(card);
		    }
		});
	});
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnEdit)
			.append(columnAddCard)
			.append(columnCardList);
		return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},

	deleteColumn: function() {
	    var self = this;
		$.ajax({
		    url: baseUrl + '/column/' + self.id,
		    method: 'DELETE',
		    success: function(response){
		       	self.element.remove();
		    }
		});
	},
	editColumn: function() {
		var self = this;
		var newName = prompt('Edit your column:', self.name);
		event.preventDefault();
		if (newName != self.name) {
			$.ajax({
				url: baseUrl + '/column/' + self.id,
				method: 'PUT',
				data: {
					id: self.id,
					name: newName,
				},
	    		success: function(response) {
					self.element.children('.column-title').text(newName);
	                   self.name = newName;
				}
			});
		}
	}
};