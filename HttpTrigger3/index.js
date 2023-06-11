module.exports = async function (context, req) {
    var bookmark = context.bindings.bookmark;
    if(bookmark){
        context.log("Existente");

        context.res = {
            status: 422,
            body : "Bookmark already exists.",
            headers: {
            'Content-Type': 'application/json'
            }
        };
    }
    else {
        context.log("No Existe");
        // Create a JSON string of our bookmark.
        var bookmarkString = JSON.stringify({ 
            id: req.body.id,
            url: req.body.url
        });

        // Write this bookmark to our database.
        context.bindings.newbookmark = bookmarkString;
        context.log("Insertado");
        // Push this bookmark onto our queue for further processing.
        context.bindings.newmessage = bookmarkString;
        context.log("Encolado");
        // Tell the user all is well.
        context.res = {
            status: 200,
            body : "bookmark added & enqueued!",
            headers: {
            'Content-Type': 'application/json'
            }
        };
    }
    context.done();
}