var myKey = process.env.BOX_VIEW_API_TOKEN || "";
if (myKey === "") {
  console.log("Package ox2:box-view error: no BOX_VIEW_API_TOKEN env variable set")
}
var boxViewClient = Npm.require('box-view').createClient(myKey);

// console.log("Key: " + myKey);
// console.log(boxViewClient);

// Wrapped async methods from the Box View API
var documentsUploadURL = Async.wrap(boxViewClient.documents, 'uploadURL');
var sessionsCreate = Async.wrap(boxViewClient.sessions, 'create');
var documentsDelete = Async.wrap(boxViewClient.documents, 'delete');

Meteor.methods({

    /**
     * Given a url to a file, creates a
     * document in the Box View API and
     * a corresponding entry in the DB
     *
     * @param <String> fileUrl:
     * @return <String> presenterId
     */
  createPresentation: function(fileUrl) {
        // Upload the document to the Box View API
        var response = documentsUploadURL(fileUrl);

        // Create the presentation in the DB
        // var presentation = Presentations.insert({
        //     documentId: response.id,
        //     sessionId: '',
        //     page: 1
        // });
        console.log("-------------------------------------")
        console.log(response)
        console.log("-------------------------------------")
        console.log(response.id)
        return response.id;
    },

    /**
     * Given a Box View API document ID,
     * creates a Box View API session
     *
     * @param <String> documentId:
     * @return <Object> response
     */
    createSession: function(documentId) {
        // Create the Box View API session
        console.log('%c documentId   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', documentId);
        var response = sessionsCreate(documentId, {}, function(err,data, res){
        console.log("-------------------------------------")
            console.log(data)
        console.log("-------------------------------------")
            // console.log(res)
        });
        console.log('%c response   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', response);

        // TODO(seanrose): handle rate limiting

        return response;
    },

    /**
     * Given a Box View API document ID,
     * deletes the document in the View API
     *
     * @param <String> documentId:
     * @return <Boolean>
     */
    deleteDocument: function(documentId) {
        // Delete the document
        // Wrapped with blocking package to force box-view to be synchronous
        var response = documentsDelete(documentId);

        // TODO(seanrose): handle rate limiting

        return true;
    }
});

