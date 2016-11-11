import angular from 'angular';

export default DnD;

DnD.$inject = ['$document'];

function DnD($document) {
  var dragSrcEl = null,
    cols = [],
    tickets = [];

  return {
    handleDragStart: function(e) {
      dragSrcEl = this;
      console.log('start', e);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.outerHTML);
    },

    init: function() {
      var that = this;

      console.log('init ', this);
      $document.ready(function() {
        cols = document.getElementsByClassName("column");
        tickets = document.getElementsByClassName("ticket");

        angular.forEach(cols, function(col) {
          col.addEventListener('dragenter', that.handleDragEnter, false);
          col.addEventListener('dragover', that.handleDragOver, false);
          col.addEventListener('dragleave', that.handleDragLeave, false);
          col.addEventListener('drop', that.handleDrop, false);
        });
        angular.forEach(tickets, function(ticket) {
          // console.log(ticket);
          ticket.addEventListener('dragstart', that.handleDragStart, false);
          // ticket.addEventListener('drop', that.handleDrop, false);
          ticket.addEventListener('dragend', that.handleDragEnd, false);
        })
      })
    },

    handleDragOver: function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }

      e.dataTransfer.dropEffect = 'move';
      return false;
    },

    handleDragEnter: function(e) {
      this.classList.add('over');
    },

    handleDragLeave: function(e) {
      this.classList.remove('over');
    },

    handleDrop: function(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      console.log('drop ', $(this).find('.ticket')[0], dragSrcEl);

      if (dragSrcEl != $(this).find('.ticket')[0]) {
        /*dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');*/
        // dragSrcEl.outerHTML = this.innerHTML;
        $(dragSrcEl).replaceWith($(this).html());
        this.innerHTML = e.dataTransfer.getData('text/html');
      }

      // dragSrcEl = $(this).find('.ticket')[0];

      return false;
    },

    handleDragEnd: function(e) {
      angular.forEach(cols, function (col) {
        col.classList.remove('over');
      });
    }
  }
}
