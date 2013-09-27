/*$(function(){

    // Keep a mapping of url-to-container for caching purposes.
    var cache = {
        // If url is '' (no fragment), display this div's content.
        '': $('.bbq-default')
    };

    // Bind an event to window.onhashchange that, when the history state changes,
    // gets the url from the hash and displays either our cached content or fetches
    // new content to be displayed.
    $(window).bind( 'hashchange', function(e) {

        // Get the hash (fragment) as a string, with any leading # removed. Note that
        // in jQuery 1.4, you should use e.fragment instead of $.param.fragment().
        var url = $.param.fragment();
            console.log("url: ", url);
        // Remove .bbq-current class from any previously "current" link(s).
        $( 'a.bbq-current' ).removeClass( 'bbq-current' );

        // Hide any visible ajax content.
        $( '.my_content' ).children( ':visible' ).hide();

        // Add .bbq-current class to "current" nav link(s), only if url isn't empty.
        url && $( 'a[href="#' + url + '"]' ).addClass( 'bbq-current' );

        if ( cache[ url ] ) {
            // Since the element is already in the cache, it doesn't need to be
            // created, so instead of creating it again, let's just show it!
            cache[ url ].show();

        } else {
            // Show "loading" content while AJAX content loads.
           // $( '.bbq-loading' ).show(); pkostov <-----------------

            // Create container for this url's content and store a reference to it in
            // the cache.
            cache[ url ] = $( '<div class="bbq-item"/>' )

                // Append the content container to the parent container.
                .appendTo( '.bbq-content' )

                // Load external content via AJAX. Note that in order to keep this
                // example streamlined, only the content in .infobox is shown. You'll
                // want to change this based on your needs.
                .load(    url, function(){
                        // Content loaded, hide "loading" content.
                        $( '.bbq-loading' ).hide();
                    });
        }
    })

    // Since the event is only triggered when the hash changes, we need to trigger
    // the event now, to handle the hash the page may have loaded with.
    $(window).trigger( 'hashchange' );

});*/


////////////// end of the BBQ     /////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    // alert("JQuery is set up too :}");

    window.onhashchange = locationHashChanged;

    function locationHashChanged(){
        var my_hash = window.location.hash.substr(1);
        if (my_hash == "session") {
            document.getElementById('session').style.display = '';  // toFix duplicate code
            document.getElementById('user_log').style.display = 'none';
            showTableSession();
        }
        if (my_hash == "user_log") {
            document.getElementById('user_log').style.display = ''; // toFix duplicate code
            document.getElementById('session').style.display = 'none';
            showTableUserLog();
        }
    }

    var list = document.getElementsByTagName("li");
  //  console.log("list: ", list);
    for (var i = 0; i < list.length; i++) {

        //var href = list[i].childNodes[0].getAttribute('id');

    //    console.log("list[i]: ", list[i]);
    //    console.log("out i: ", i);
     //   console.log("href: ", href);
        var href = list[i].childNodes[0].getAttribute('id');
        list[i].onclick = showTable;
    }
    showTableSession();




function showTable(e){ // TODO make more generic
    var href = this.childNodes[0].getAttribute('id');
    if(href == "my_session") {
        this.style.display = '';
     //   console.log("li child id",this.childNodes[0].getAttribute('id'));
        document.getElementById('session').style.display = '';
        document.getElementById('user_log').style.display = 'none';
        console.log("getElementById(user_log):", document.getElementById('user_log'));
        showTableSession();
    }
    if(href == "my_user_log") {
        this.style.display = '';
        console.log("li child id",this.childNodes[0].getAttribute('id'));
        document.getElementById('user_log').style.display = '';
        document.getElementById('session').style.display = 'none';
        console.log("getElementById(session):", document.getElementById('session'));
        showTableUserLog();
    }
    return false;
}

////////////////

    function showTableSession() {
        console.log("Wea are showTableSession");
        jQuery("#my_table_1").jqGrid({   // Table 1
            url: 'my_data_1.php',
            datatype: "json",
            colNames: ['ID', 'Username', 'IP Address', 'PHP SID', 'Shared Secret', 'User ID', 'Created', 'Modified'],
            colModel: [
                {name: 'id', width: 55, sortable: true, sorttype: 'int'},
                {name: 'username', width: 90, sortable: true},
                {name: 'ip_address', width: 90, sortable: true, sorttype: 'int'},
                {name: 'php_sid', width: 80, sortable: true},
                {name: 'shared_secret', width: 110, sortable: true},
                {name: 'user_id', width: 70, sortable: true, sorttype: 'int'},
                {name: 'created',  sortable: true},
                {name: 'modified',  sortable: true}
            ],
            rowNum: 4,
            // rowList:[2,4,8,10],
            pager: '#my_pager_1',
            sortname: 'id',
            viewrecords: true,
            sortorder: "asc",
            height: 'auto',
            caption: "My PHP Query Generated Table [newmg.session]",
            loadonce: false     // needed for the paging and sorting [false to execute the query in url:p[location] every time]
            /*jsonReader: {
             //    repeatitems: true,

             id: "0",
             cell: "",
             //  root: "data",
             page: function() { return 1; },
             total: function() { return 4; },
             records: function(obj) { return obj.length; }
             }*/

        });
        jQuery("#my_table_1").jqGrid('navGrid','#my_pager_1',{edit:false,add:false,del:false});
     }
    // --------------------------------------------------

 function showTableUserLog() {
     console.log("Wea are showTableUserLog");
    jQuery("#my_table_2").jqGrid({   // Table 2
        url: 'my_data_2.php',
        datatype: "json",
        colNames: ['Message', 'Category', 'Created', 'Created by', 'Email', 'Role', 'Modified at:'],
        colModel:[
            {name:'message', width: 200, sortable:true },
            {name:'category', width: 90, sortable:true},
            {name:'created', width:100, sortable:true },
            {name:'username', width:80, sortable:true},
            {name:'email', width:110, sortable:true},
            {name:'role', width:70, sortable:true},
            {name:'modified',  sortable:true}
        ],
        rowNum:5,
        // rowList:[2,4,8,10],
        pager: '#my_pager_2',
        sortname: 'created',
        viewrecords: true,
        sortorder: "asc",
        height: 'auto',
        caption:"My PHP Query Generated Table [newmg.user & newmg.log]",
        loadonce: false     // needed for the paging and sorting [false to execute the query in url:p[location] every time]
        /*jsonReader: {
         //    repeatitems: true,

         id: "0",
         cell: "",
         //  root: "data",
         page: function() { return 1; },
         total: function() { return 4; },
         records: function(obj) { return obj.length; }
         }*/

    });
    jQuery("#my_table_2").jqGrid('navGrid','#my_pager_2',{edit:false,add:false,del:false});
 }

});



