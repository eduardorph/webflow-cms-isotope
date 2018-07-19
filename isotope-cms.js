$(document).ready( function() {
    const filterToggles = document.querySelectorAll('[data-filter]');

    filterToggles.forEach(function(toggle) {
      
      let attrVal = toggle.getAttribute(['data-filter']);
      let newVal = attrVal.toLowerCase().replace('&', '').replace(/\s/g,'');
      toggle.setAttribute('data-filter', newVal);
      
    });

    $('.our-team .our-team-job-titles p').each(function(index, element) {
      var _this = $( element );

      var this_text = _this.text().split("|");

      for (var i = 0; i < this_text.length; i++) {
        var only_string = this_text[i].split("-");

        _this.parent().parent().addClass( only_string[1].toLowerCase().replace('&', '').replace(/\s/g,'') );
      }
    });


    var qsRegex;
    var buttonFilter;

    // init Isotope
    var $grid = $('.our-team-grid').isotope({
      itemSelector: '.collection-item',
      layoutMode: 'fitRows',
      filter: function() {
        var $this = $(this);
        var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
        var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
        return searchResult && buttonResult;
      }
    });

    $(document).on( 'click', '.jobs-button', function() {
      buttonFilter = $( this ).attr('data-filter');
      $grid.isotope();
    });

    // use value of search field to filter
    var $quicksearch = $('#quicksearch').keyup( debounce( function() {
      qsRegex = new RegExp( $quicksearch.val(), 'gi' );
      $grid.isotope();
    }) );


      // change is-checked class on buttons
    $('.filter_group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', '.jobs-button', function() {
        $buttonGroup.find('.active').removeClass('active');
        $( this ).addClass('active');
      });
    });
      

    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
      var timeout;
      threshold = threshold || 100;
      return function debounced() {
        clearTimeout( timeout );
        var args = arguments;
        var _this = this;
        function delayed() {
          fn.apply( _this, args );
        }
        timeout = setTimeout( delayed, threshold );
      };
    }
});